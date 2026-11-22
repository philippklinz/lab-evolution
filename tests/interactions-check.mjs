/* Functional browser regression tests for all evolution experiments. */
import {chromium} from 'playwright';
import {resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const browser=await chromium.launch({headless:true});
const failures=[];let passed=0;
async function test(file,fn){
 const p=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 try{
  await p.goto(pathToFileURL(join(root,file)).href,{waitUntil:'load'});
  await fn(p);
  if(errors.length)throw new Error('JavaScript: '+errors.join('; '));
  passed++;console.log('PASS',file);
 }catch(e){failures.push({file,message:String(e.stack||e),errors});console.error('FAIL',file,String(e))}
 finally{await p.close()}
}
async function expect(p,fn,msg){if(!(await p.evaluate(fn)))throw new Error(msg)}
async function range(p,id,value){await p.locator('#'+id).evaluate((el,v)=>{el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}))},value)}
try{
await test('01_populationen.html',async p=>{
 await expect(p,()=>Math.abs(window.EvolutionPopulationMath.fitness(.5,.2)-.54545454545)<1e-9,'Fitness calculation');
 await expect(p,()=>window.EvolutionPopulationMath.mutation(0,0)===0,'No spontaneous mutation');
 await p.locator('#pop-run').click();
 const first=await p.locator('#pop-chart').innerHTML();
 await p.locator('#pop-reset').click();await p.locator('#pop-run').click();
 if(first!==await p.locator('#pop-chart').innerHTML())throw new Error('Seed not deterministic');
 await range(p,'pop-N','20');await p.locator('#pop-step').click();
 await expect(p,()=>document.querySelector('#pop-gen').textContent.startsWith('1 /'),'Population single step');
 await p.locator('#pop-question button').nth(1).click();
 await expect(p,()=>document.querySelector('#pop-quiz-feedback').dataset.ok==='true','Population quiz');
});
await test('02_artbildung.html',async p=>{
 await p.locator('#iso-connected').click();await expect(p,()=>document.querySelector('#iso-m-label').textContent==='30 %','Migration preset');
 await p.locator('#iso-run').click();await expect(p,()=>document.querySelector('#iso-status').textContent.includes('20 /'),'Isolation model generations');
 await p.locator('#iso-reset').click();await expect(p,()=>document.querySelector('#iso-pa').textContent==='20,0 %','Isolation baseline');
 await p.locator('#iso-question button').nth(2).click();await expect(p,()=>document.querySelector('#iso-quiz-feedback').dataset.ok==='true','Speciation caveat quiz');
});
await test('03_stammbaeume.html',async p=>{
 await expect(p,()=>window.EvolutionPhylogenyMath.scores[0]===4&&window.EvolutionPhylogenyMath.scores[1]>4&&window.EvolutionPhylogenyMath.scores[2]>4,'Parsimony scores');
 await p.locator('[data-topology="2"]').click();await expect(p,()=>document.querySelector('#phy-score').textContent!=='4','Alternative tree score');
 await p.locator('[data-topology="0"]').click();await expect(p,()=>document.querySelector('#phy-score').textContent==='4','Best tree score');
 await p.locator('#phy-question button').nth(0).click();await expect(p,()=>document.querySelector('#phy-quiz-feedback').dataset.ok==='true','Convergence quiz');
});
await test('04_baum_des_lebens.html',async p=>{
 await p.locator('[data-node="euk"]').click();await expect(p,()=>document.querySelector('#life-title').textContent.includes('Eukaryoten'),'Eukaryote node');

 // Every evolutionary branch must connect exactly to both graphical endpoints.
 const connected=()=> {
  const svg=document.querySelector('#life-tree');
  const getPoint=id=>svg.querySelector('[data-life-node="'+id+'"],[data-life-junction="'+id+'"]');
  return [...svg.querySelectorAll('[data-life-edge]')].length===5 &&
    [...svg.querySelectorAll('[data-life-edge]')].every(path=>{
      const from=getPoint(path.dataset.from),to=getPoint(path.dataset.to);
      if(!from||!to)return false;
      const start=path.getPointAtLength(0),end=path.getPointAtLength(path.getTotalLength());
      const dist=(a,b)=>Math.hypot(a.x-b.cx.baseVal.value,a.y-b.cy.baseVal.value);
      return dist(start,from)<0.1&&dist(end,to)<0.1;
    });
 };
 await expect(p,connected,'All five LUCA tree branches must touch their nodes');
 await p.locator('#life-connections').click();await expect(p,()=>document.querySelector('#life-connections').getAttribute('aria-pressed')==='true','Horizontal connections');
 await expect(p,connected,'Edges must remain connected after toggling connections');
 await expect(p,()=>document.querySelectorAll('#life-tree [data-life-network]').length===2,'Both optional networks render');
 await p.locator('#life-connections').click();
 await expect(p,()=>document.querySelectorAll('#life-tree [data-life-network]').length===0,'Toggle hides additional networks');
 await expect(p,connected,'Tree remains connected when network is hidden');

 await p.locator('#life-question button').nth(1).click();await expect(p,()=>document.querySelector('#life-quiz-feedback').dataset.ok==='true','LUCA quiz');
});
await test('05_uebergaenge.html',async p=>{
 await p.locator('[data-transition="tetrapod"]').click();
 await expect(p,()=>document.querySelector('#transition-name').textContent.includes('Flossen'),'Transition topic');
 for(const n of [1,0,2,0,1]){
  await p.locator('#transition-answer button').nth(n).click();
  await expect(p,()=>document.querySelector('#transition-feedback').dataset.ok==='true','Transition quiz answer');
  await p.locator('#transition-next').click();
 }
 await expect(p,()=>document.querySelector('#transition-quiz-heading').textContent.includes('5 / 5'),'Transition quiz completion');
 await p.locator('#transition-restart').click();
 await expect(p,()=>document.querySelector('#transition-quiz-counter').textContent.includes('1 / 5'),'Transition restart');
});
await test('06_evidenz.html',async p=>{
 for(const n of [0,1,2,0,1,2]){
  await p.locator('#evidence-answers button').nth(n).click();
  await expect(p,()=>document.querySelector('#evidence-feedback').dataset.ok==='true','Evidence answer');
  await p.locator('#evidence-next').click();
 }
 await expect(p,()=>document.querySelector('#evidence-score').textContent==='6 / 6','Evidence complete');
 await p.locator('#evidence-reset').click();await expect(p,()=>document.querySelector('#evidence-score').textContent==='0 / 6','Evidence reset');
});
}finally{await browser.close()}
if(failures.length){console.error(JSON.stringify(failures,null,2));process.exitCode=1}
else console.log('PASS:',passed,'interactive experiments fully exercised.');
