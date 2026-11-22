/* LAB 04 — Models 01–03: biallelic populations, two habitats and toy parsimony.
 * Educational simulations only; no measurement or exact biological reconstruction.
 */
(()=>{'use strict';
const $=id=>document.getElementById(id),module=document.body.dataset.module;
if(!['01','02','03'].includes(module))return;
const F=(n,d=1)=>new Intl.NumberFormat('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d}).format(n);
const T=(id,v)=>{if($(id))$(id).textContent=String(v)};
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const seed=(id,def)=>{const v=Math.floor(Number($(id).value));return Number.isFinite(v)&&v>0?Math.min(v,999999):def};
function randomGenerator(n){let state=(n>>>0)||1;return ()=>{state^=state<<13;state^=state>>>17;state^=state<<5;return (state>>>0)/4294967296}}
function binomial(n,p,r){let result=0;p=clamp(p);for(let i=0;i<n;i++)if(r()<p)result++;return result}
const fitness=(p,s)=>clamp(p*(1+s)/(1+p*s));
const mutation=(p,m)=>clamp(p*(1-m)+(1-p)*m);
function line(points,color){
 if(points.length<2)return '';
 return '<polyline points="'+points.map(v=>(56+v[0]*5.28).toFixed(2)+','+(232-183*v[1]).toFixed(2)).join(' ')+'" stroke="'+color+'" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
}
function plot(id,series){
 const y=[0,25,50,75,100].map(v=>'<line x1="56" y1="'+(232-v*1.83)+'" x2="584" y2="'+(232-v*1.83)+'" stroke="#588087" stroke-opacity=".36"/><text x="44" y="'+(236-v*1.83)+'" text-anchor="end" font-size="11" fill="#acc9be" font-family="monospace">'+v+'%</text>').join('');
 const x=[0,25,50,75,100].map(v=>'<text x="'+(56+v*5.28)+'" y="258" text-anchor="middle" font-size="11" fill="#a4c4bd" font-family="monospace">'+v+'</text>').join('');
 $(id).innerHTML='<rect width="630" height="305" fill="#102832"/>'+y+x+series.map(s=>line(s[0],s[1])).join('')+'<text x="320" y="285" fill="#a4c4bd" font-size="11" font-family="monospace" text-anchor="middle">GENERATION</text>';
}
function quiz(group,feedback,explain){
 const el=$(group),bs=[...el.querySelectorAll('button')],answer=Number(el.dataset.answer);
 bs.forEach((b,i)=>b.addEventListener('click',()=>{
  bs.forEach((item,j)=>{item.disabled=true;item.classList.toggle('correct',j===answer);item.classList.toggle('wrong',j===i&&i!==answer)});
  $(feedback).dataset.ok=String(i===answer);T(feedback,(i===answer?'Richtig. ':'Noch nicht. ')+explain);
 }));
}
function population(){
 const controls=['pop-N','pop-s','pop-mu','pop-p','pop-seed'];
 let r,N,gen,count,p,history;
 function par(){return{N:Number($('pop-N').value),s:Number($('pop-s').value)/100,mu:Number($('pop-mu').value)/1000,initial:Number($('pop-p').value)/100,seed:seed('pop-seed',1234)}}
 function view(){
  T('pop-gen',gen+' / 100');T('pop-freq',F(p*100)+' %');T('pop-a',count+' / '+N);plot('pop-chart',[[history,'#69e1c7']]);
  T('pop-state',gen===0?'Ausgangspopulation':p===0?'Allel A momentan verloren':p===1?'Allel A momentan fixiert':'Population verändert sich');
  T('pop-feedback',gen===0?'Starte einen Generationenschritt oder einen Block von zwanzig. Alle Werte sind simuliert.':
   'Generation '+gen+': A besitzt '+F(p*100)+' %. Selektion verändert die erwartete Häufigkeit; das tatsächliche Stichprobenergebnis schwankt.'+
   ((p===0||p===1)?' Bei einer positiven Mutationsrate kann die andere Allelvariante später erneut auftreten.':''));
 }
 function reset(){
  const v=par();N=v.N;r=randomGenerator(v.seed);gen=0;count=Math.round(v.initial*N);p=count/N;history=[[0,p]];
  T('pop-N-label',N);T('pop-s-label',F(v.s,2));T('pop-mu-label',F(v.mu,3));T('pop-p-label',F(v.initial*100,0)+' %');T('pop-seed-label',v.seed);view();
 }
 function step(steps=1){
  const v=par();for(let i=0;i<steps&&gen<100;i++){const expected=mutation(fitness(p,v.s),v.mu);count=binomial(N,expected,r);p=count/N;gen++;history.push([gen,p])}view();
 }
 controls.forEach(id=>$(id).addEventListener('input',reset));
 $('pop-step').addEventListener('click',()=>step(1));$('pop-run').addEventListener('click',()=>step(20));$('pop-reset').addEventListener('click',reset);
 $('pop-neutral').addEventListener('click',()=>{$('pop-N').value=20;$('pop-s').value=0;$('pop-mu').value=0;$('pop-p').value=50;reset()});
 $('pop-select').addEventListener('click',()=>{$('pop-N').value=100;$('pop-s').value=15;$('pop-mu').value=0;$('pop-p').value=50;reset()});
 quiz('pop-question','pop-quiz-feedback','Genetische Drift entsteht durch Zufallsstichproben bei der Fortpflanzung. Kleinere Populationen zeigen größere relative Schwankungen.');reset();
 window.EvolutionPopulationMath=Object.freeze({fitness,mutation,binomial,randomGenerator});
}
function isolation(){
 const controls=['iso-N','iso-m','iso-s','iso-seed'];let N,r,gen,a,b,as,bs;
 function par(){return{N:Number($('iso-N').value),m:Number($('iso-m').value)/100,s:Number($('iso-s').value)/100,seed:seed('iso-seed',5678)}}
 function view(){
  T('iso-pa',F(a*100)+' %');T('iso-pb',F(b*100)+' %');T('iso-delta',F(Math.abs(a-b)*100)+' Pp.');T('iso-status','GENERATION '+gen+' / 100');
  plot('iso-chart',[[as,'#70e0c6'],[bs,'#e6b48a']]);
  T('iso-feedback',gen===0?'Start: Habitat I hat 20 % A; Habitat II hat 80 % A. I begünstigt A, II begünstigt a.':
  'Generation '+gen+': Frequenzunterschied '+F(Math.abs(a-b)*100)+' Prozentpunkte. Das ist keine Artdefinition.');
 }
 function reset(){
  const v=par();N=v.N;r=randomGenerator(v.seed);gen=0;a=.2;b=.8;as=[[0,a]];bs=[[0,b]];
  T('iso-N-label',N);T('iso-m-label',F(v.m*100,0)+' %');T('iso-s-label',F(v.s,2));T('iso-seed-label',v.seed);view();
 }
 function step(steps=1){
  const v=par();
  for(let i=0;i<steps&&gen<100;i++){
   const pa=fitness(a,v.s),pb=fitness(b,-v.s);
   a=binomial(N,(1-v.m)*pa+v.m*pb,r)/N;
   b=binomial(N,(1-v.m)*pb+v.m*pa,r)/N;
   gen++;as.push([gen,a]);bs.push([gen,b]);
  }view();
 }
 controls.forEach(id=>$(id).addEventListener('input',reset));
 $('iso-step').addEventListener('click',()=>step(1));$('iso-run').addEventListener('click',()=>step(20));$('iso-reset').addEventListener('click',reset);
 $('iso-separated').addEventListener('click',()=>{$('iso-m').value=0;reset()});
 $('iso-connected').addEventListener('click',()=>{$('iso-m').value=30;reset()});
 quiz('iso-question','iso-quiz-feedback','Allelfrequenzunterschiede allein bedeuten noch keine reproduktive Isolation. Arten sind nicht mit einer frei gesetzten Prozentgrenze definiert.');reset();
}
function phylogeny(){
 const names=['Kuh','Delfin','Hai','Lachs'];
 const characters=[[1,1,0,0],[1,1,0,0],[0,1,1,0]];
 const trees=[[[0,1],[2,3]],[[0,2],[1,3]],[[0,3],[1,2]]];
 function combine(a,b){const intersect=a.filter(x=>b.includes(x));return{set:intersect.length?intersect:[...new Set(a.concat(b))],cost:intersect.length?0:1}}
 function score(c,t){const a=combine([c[t[0][0]]],[c[t[0][1]]]),b=combine([c[t[1][0]]],[c[t[1][1]]]),end=combine(a.set,b.set);return a.cost+b.cost+end.cost}
 const scores=trees.map(t=>characters.reduce((n,c)=>n+score(c,t),0));
 function draw(index){
  const tree=trees[index],lines=['<rect width="620" height="300" fill="#102832"/>','<path d="M225 140H390" stroke="#93c9c0" stroke-width="4" fill="none"/>'];
  tree.forEach((pair,side)=>{
   pair.forEach((person,row)=>{
    const from=side?390:225,to=side?480:140,y=row?210:70;
    lines.push('<path d="M'+from+' 140L'+to+' '+y+'" fill="none" stroke="'+(side?'#e4af86':'#83d8c5')+'" stroke-width="4"/>');
    lines.push('<rect x="'+(side?475:37)+'" y="'+(y-20)+'" width="108" height="40" rx="5" fill="#25434b" stroke="#9ec7bf"/>');
    lines.push('<text x="'+(side?529:91)+'" y="'+(y+6)+'" text-anchor="middle" font-size="16" fill="#eaf8f2" font-family="Liberation Sans,Arial">'+names[person]+'</text>');
   });
  });
  lines.push('<text x="310" y="280" font-family="monospace" fill="#a6c4bf" font-size="12" text-anchor="middle">UNGErICHTET / KEINE ASTLÄNGEN</text>');
  $('phy-tree').innerHTML=lines.join('');
  T('phy-score',scores[index]);T('phy-best',Math.min(...scores));
  T('phy-title',scores[index]===Math.min(...scores)?'Diese Gruppierung braucht die wenigsten Wechsel':'Mehr hypothetische Merkmalswechsel nötig');
  T('phy-comment',scores[index]===Math.min(...scores)?
    'Die Milchdrüsen und die Lungenatmung verbinden Kuh und Delfin als Säugetiere. Die Stromlinienform von Delfin und Hai kann unabhängig entstanden sein.':
    'Eine andere Gruppierung erfordert mehr Zustandswechsel für die beiden Säugetiermerkmale. Eine ähnliche Stromlinienform genügt nicht für nahe Abstammung.');
  document.querySelectorAll('[data-topology]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.topology)===index)));
 }
 document.querySelectorAll('[data-topology]').forEach(b=>b.addEventListener('click',()=>draw(Number(b.dataset.topology))));
 quiz('phy-question','phy-quiz-feedback','Die Stromlinienform von Delfin und Hai entstand unabhängig unter ähnlichen Umweltanforderungen: Konvergenz. Viele homologe Merkmale helfen bei Abstammungsrekonstruktionen.');draw(0);
 window.EvolutionPhylogenyMath=Object.freeze({score,characters,trees,scores});
}
if(module==='01')population();if(module==='02')isolation();if(module==='03')phylogeny();
})();