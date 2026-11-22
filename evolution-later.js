/* LAB 04, modules 04-06: phylogenomic concepts, geological milestones, evidence.
 * Reference data and questions are didactic interpretations, not experimental data.
 */
(()=>{'use strict';
const $=id=>document.getElementById(id),chapter=document.body.dataset.module;
if(!['04','05','06'].includes(chapter))return;
const T=(id,v)=>{if($(id))$(id).textContent=String(v)};
const background='<rect width="640" height="340" fill="#102832"/>';
const svgText=(x,y,label,size=13,color='#dceee7',anchor='middle')=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+size+'" text-anchor="'+anchor+'" font-family="Liberation Sans,Arial">'+label+'</text>';
function oneQuestion(group,feedback,why){
 const element=$(group),answer=Number(element.dataset.answer),bs=[...element.querySelectorAll('button')];
 bs.forEach((b,i)=>b.addEventListener('click',()=>{
  bs.forEach((x,j)=>{x.disabled=true;x.classList.toggle('correct',j===answer);x.classList.toggle('wrong',j===i&&j!==answer)});
  $(feedback).dataset.ok=String(i===answer);T(feedback,(i===answer?'Richtig. ':'Noch nicht. ')+why);
 }));
}
function treeOfLife(){
 const nodes={
 luca:{tag:'LETZTER GEMEINSAMER VORFAHR',name:'LUCA · kein erstes Lebewesen',
 text:'LUCA ist die jüngste gemeinsame Vorfahrenpopulation der heutigen zellulären Linien. Ein evolutionärer Knoten, kein einzelnes nachweislich ausgegrabenes Individuum. Der Begriff sagt nichts darüber aus, wann das allererste Leben entstand.',
 limit:'Die Schätzung einer Publikation von 2024 liegt bei etwa 4,2 Milliarden Jahren. Das ist modellabhängig und älter als viele klassische Fossilbelege. Andere Linien könnten vor oder neben LUCA existiert haben.',
 source:'https://www.nature.com/articles/s41559-024-02461-1'},
 bacteria:{tag:'ZELLULÄRE LINIE',name:'Bakterien',
 text:'Bakterien bilden eine große und vielfältige Abstammungslinie zellulären Lebens. Zahlreiche Bakterien betreiben eigenständige Stoffwechselwege; Cyanobakterien sind bedeutend für die Geschichte der Sauerstoffproduktion.',
 limit:'Bakterien sind keine primitive, stehengebliebene Entwicklungsstufe. Ihre heutige Vielfalt entstand durch eine lange evolutionäre Geschichte einschließlich horizontaler Genübertragung.',
 source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11071111/'},
 archaea:{tag:'ZELLULÄRE LINIE',name:'Archaeen',
 text:'Archaeen sind eine eigenständige Hauptlinie zellulären Lebens. Genomvergleiche verbinden die Entstehung des eukaryotischen Wirts eng mit archaealen Abstammungslinien.',
 limit:'Die genaue tiefste Verzweigung und die Abstammung heutiger Archaeen sind Gegenstand molekularer Forschung. Ein Baum mit nur vier Beschriftungen vereinfacht ihre enorme Diversität.',
 source:'https://www.nature.com/articles/s41586-024-07677-6'},
 euk:{tag:'SYMBIOTISCHE ENTSTEHUNG',name:'Eukaryoten',
 text:'Eukaryotische Zellen besitzen unter anderem eine komplexe innere Organisation. Ihre Geschichte schließt eine archaeale Wirtslinie und einen bakteriellen Vorfahren der Mitochondrien ein.',
 limit:'Der Zeitpunkt und die Abfolge der Eukaryogenese sind nicht abschließend geklärt. Organellen und viele Gene besitzen unterschiedliche evolutionäre Geschichten; eine einfache Verzweigung zeigt dies nicht vollständig.',
 source:'https://www.nature.com/articles/s41586-024-07677-6'}
 };
 const bs=[...document.querySelectorAll('[data-node]')];let selected='luca',connections=false;
 function diagram(){
  // Shared coordinates make every visible branch terminate at a real node.
  // The archaeal stem and the eukaryotic host lineage share a junction;
  // this is conceptual, not a fully resolved phylogenomic reconstruction.
  const locations={
    luca:{x:100,y:174,r:20},
    bacteria:{x:510,y:87,r:14},
    archaea:{x:510,y:193,r:14},
    euk:{x:510,y:286,r:14},
    primary:{x:215,y:174},
    archaeal:{x:340,y:240}
  };
  const branches=[
    {name:'luca-primary',from:'luca',to:'primary',d:'M100 174 L215 174',color:'#89d9c5'},
    {name:'primary-bacteria',from:'primary',to:'bacteria',d:'M215 174 L335 87 L510 87',color:'#89d9c5'},
    {name:'primary-archaeal',from:'primary',to:'archaeal',d:'M215 174 L340 240',color:'#a1c7c1'},
    {name:'archaeal-archaea',from:'archaeal',to:'archaea',d:'M340 240 L401 193 L510 193',color:'#a1c7c1'},
    {name:'archaeal-euk',from:'archaeal',to:'euk',d:'M340 240 L415 286 L510 286',color:'#a1c7c1'}
  ];
  const edges=branches.map(edge=>
    '<path data-life-edge="'+edge.name+'" data-from="'+edge.from+'" data-to="'+edge.to+
    '" d="'+edge.d+'" fill="none" stroke="'+edge.color+
    '" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>'
  );
  let additional='';
  if(connections){
    // Curved orange line: bacterial endosymbiont contributing to eukaryotes.
    // Blue dashed line: purely illustrative lateral gene exchange.
    additional=
      '<path data-life-network="endosymbiosis" d="M510 87 C598 91 604 248 524 282"'+
      ' fill="none" stroke="#e4ad86" stroke-width="3" stroke-dasharray="8 7" stroke-linecap="round"/>'+
      '<path d="M525 270 L524 282 L537 279" fill="none" stroke="#e4ad86" stroke-width="2.5" stroke-linejoin="round"/>'+
      '<path data-life-network="hgt-example" d="M414 87 Q373 143 340 240"'+
      ' fill="none" stroke="#79b6d1" stroke-width="2.5" stroke-dasharray="4 7" stroke-linecap="round"/>';
  }
  const labels=[
    ['luca','LUCA'],
    ['bacteria','BAKTERIEN'],
    ['archaea','ARCHAEEN'],
    ['euk','EUKARYOTEN']
  ].map(([id,label])=>{
    const {x,y,r}=locations[id],on=id===selected;
    return '<circle data-life-node="'+id+'" cx="'+x+'" cy="'+y+'" r="'+r+
      '" fill="'+(on?'#f1c99f':'#5dbeb2')+'" stroke="'+
      (on?'#fbe2c2':'#b2e5d8')+'" stroke-width="2"/>'+
      svgText(x,y-(id==='luca'?31:29),label,12,on?'#f9deb5':'#d1e7de');
  }).join('');
  const junctions=['primary','archaeal'].map(id=>
    '<circle data-life-junction="'+id+'" cx="'+locations[id].x+
    '" cy="'+locations[id].y+'" r="4" fill="#9acdc3"/>'
  ).join('');
  $('life-tree').innerHTML=background+edges.join('')+additional+junctions+labels+
    svgText(320,325,connections?
      'ORANGE: ENDOSYMBIOSE · BLAU: BEISPIEL GENÜBERTRAGUNG':
      'VEREINFACHTE ABSTAMMUNG · KEINE ZEITACHSE',11,'#a8d3ca');
 }
 function render(){
  const n=nodes[selected];
  T('life-tag',n.tag);T('life-title',n.name);T('life-description',n.text);T('life-limit',n.limit);
  $('life-source').replaceChildren();
  const a=document.createElement('a');a.href=n.source;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Wissenschaftliche Quelle zum Abschnitt ↗';$('life-source').append(a);
  T('life-mode-label',connections?'MIT ZUSÄTZLICHEN VERBINDUNGEN':'VEREINFACHTE VERTIKALE LINIEN');
  $('life-connections').setAttribute('aria-pressed',String(connections));
  bs.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.node===selected)));
  diagram();
 }
 bs.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.node;render()}));
 $('life-connections').addEventListener('click',()=>{connections=!connections;render()});
 oneQuestion('life-question','life-quiz-feedback','LUCA ist eine rekonstruierte Ahnenpopulation der heute lebenden zellulären Linien, kein Beleg für die allererste Zelle.');render();
}

function transitions(){
 const src='https://pmc.ncbi.nlm.nih.gov/articles/PMC11071111/';
 const items=[
 {id:'oxygen',time:2400,when:'GROẞE SAUERSTOFFANREICHERUNG / CA. 2,4 GA',name:'Die Atmosphäre verändert sich',
 story:'Sauerstoffproduzierende Photosynthese entstand vor der Großen Sauerstoffanreicherung. Die Anhäufung atmosphärischen Sauerstoffs veränderte nach und nach chemische Kreisläufe, Lebensräume und Möglichkeiten der Energiegewinnung.',
 evidence:'Isotopensignaturen, Eisen- und Schwefelgeochemie und weitere Sedimentarchive zeigen eine grundlegende Veränderung des O₂-Haushalts.',
 limit:'Ein Sauerstoffanstieg ist nicht gleichbedeutend mit dem ersten photosynthetischen Lebewesen oder mit sofort überall sauerstoffreichen Meeren.',
 source:src,caption:'SAUERSTOFF / GEOCHEMISCHE SIGNALE',art:'<circle cx="215" cy="150" r="90" fill="#234e5a" stroke="#6fbbad" stroke-width="4"/><g fill="#96d6be"><circle cx="175" cy="138" r="11"/><circle cx="222" cy="110" r="8"/><circle cx="237" cy="178" r="12"/><circle cx="285" cy="140" r="8"/></g><g stroke="#90d8bc" stroke-width="3"><path d="M334 150h100m-15-10 15 10-15 10"/></g>'+svgText(485,155,'O₂',28)},
 {id:'euk',time:2100,when:'EUKARYOGENESE / ZEITRAUM UMSTRITTEN',name:'Die eukaryotische Zelle entsteht',
 story:'Eukaryoten besitzen einen komplexen Zellaufbau. Ein zentraler Evolutionsschritt umfasste die Beziehung zwischen einer archaealen Wirtslinie und einem bakteriellen Vorfahren der Mitochondrien.',
 evidence:'Genomverwandtschaft, mitochondriale Gene und Zellbiologie begründen eine bakterielle Abstammung der Mitochondrien.',
 limit:'Die hier gesetzte Position bei 2,1 Ga ist eine grobe Illustration innerhalb stark diskutierter Zeitfenster, keine allgemein anerkannte Geburtsstunde.',
 source:'https://www.nature.com/articles/s41586-024-07677-6',caption:'ARCHAEALER WIRT / BAKTERIELLER PARTNER',art:'<ellipse cx="297" cy="153" rx="145" ry="110" fill="#255861" stroke="#82d6c4" stroke-width="7"/><ellipse cx="245" cy="151" rx="43" ry="36" fill="#789b8a" stroke="#cfe2ca" stroke-width="4"/><ellipse cx="348" cy="140" rx="52" ry="27" fill="#ba875c" stroke="#f3c491" stroke-width="4"/>'+svgText(290,272,'SYMBIOSE',12)},
 {id:'multi',time:800,when:'VIELZELLIGKEIT / VIELE UNABHÄNGIGE WEGE',name:'Zellen bilden funktionelle Verbände',
 story:'Vielzelligkeit entstand mehrfach in unterschiedlichen Gruppen, mit jeweils eigenen Wegen zu Zellhaftung, Kommunikation, Differenzierung und gemeinsamer Reproduktion.',
 evidence:'Vergleichende Entwicklungsbiologie, Stammbäume und Laborexperimente mit beispielsweise Hefezellen zeigen, wie Zellverbände evolutionär entstehen und stabilisiert werden können.',
 limit:'800 Ma ist nur ein Unterrichtsanker für einige komplexe Vielzeller. Es gab verschiedene, auch deutlich ältere Ursprünge; die Kategorie hat kein einzelnes exaktes Startdatum.',
 source:'https://www.nature.com/articles/s41586-026-11038-w',caption:'VERBÄNDE / WIEDERHOLTE ENTSTEHUNG',art:Array.from({length:13},(_,i)=>'<circle cx="'+(195+(i%5)*48)+'" cy="'+(96+Math.floor(i/5)*55)+'" r="22" fill="'+(i%3===0?'#e1b08d':'#6cae9d')+'" stroke="#b7dfcd" stroke-width="3"/>').join('')},
 {id:'plants',time:470,when:'LANDBEWOHNER / PFLANZEN UM 470 MA',name:'Pflanzen verändern das Festland',
 story:'Frühe Landpflanzen gingen aus grünen Algenverwandten hervor. Landbesiedlung verlangte Anpassungen an Wasserhaushalt, Fortpflanzung und mechanische Stabilität.',
 evidence:'Sporen- und Pflanzenfossilien sowie Vergleiche mit heutigen Pflanzenlinien stützen die frühe Landkolonisation im Ordovizium.',
 limit:'Die Besiedlung des Festlands war ein langwieriger Prozess und umfasste auch Mikroben und Pilze. 470 Ma ist eine ungefähre Einordnung, nicht ein Ereignis an einem Tag.',
 source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11071111/',caption:'FESTLAND / PHOTOSYNTHESE',art:'<path d="M70 249Q260 208 542 245V300H70Z" fill="#8b8766"/><g stroke="#98d4ac" stroke-width="6" fill="none"><path d="M190 247V134m0 65-37-39m37 5 43-43M331 239V101m0 44-43-32m43 51 52-41M445 244V168m0 31-29-28"/></g><g fill="#7ebba2"><ellipse cx="150" cy="153" rx="25" ry="11" transform="rotate(30 150 153)"/><ellipse cx="236" cy="125" rx="27" ry="12" transform="rotate(-28 236 125)"/><ellipse cx="387" cy="121" rx="24" ry="11" transform="rotate(-40 387 121)"/></g>'},
 {id:'tetrapod',time:375,when:'STAMMLINIE LANDWIRBELTIERE / DEVON',name:'Aus Flossen werden Gliedmaßen',
 story:'Verschiedene fossile Formen dokumentieren schrittweise Veränderungen an Schulter, Flossen- und Gliedmaßenskelett sowie Körperhaltung in der Stammlinie der Landwirbeltiere.',
 evidence:'Tiktaalik roseae und weitere devonische Fossilien zeigen Übergangsmerkmale, etwa distal differenzierte Knochen in einer noch flossenartigen Extremität.',
 limit:'Tiktaalik ist nicht nachweislich der direkte Vorfahr heutiger Landwirbeltiere. Die Entwicklung war verzweigt, nicht eine lineare Kette vom „Fisch zum Menschen“.',
 source:'https://www.nature.com/articles/nature04637',caption:'FLOSSENKNOCHEN / LANDWIRBELTIERE',art:'<path d="M96 189l90-36 78 26 59-56 69 53 96 3" stroke="#7ac7bb" stroke-width="20" stroke-linecap="round" fill="none"/><g fill="#d9b38a" stroke="#ead7b5" stroke-width="3"><ellipse cx="185" cy="160" rx="45" ry="24" transform="rotate(-17 185 160)"/><circle cx="323" cy="123" r="26"/><rect x="389" y="157" width="55" height="29" rx="12"/></g><path d="M445 172l57-32m-56 32 63 12m-63-10 51 51" stroke="#c8d3a5" stroke-width="8" stroke-linecap="round"/>'}
 ];
 const quiz=[
 ['Was markiert die Große Sauerstoffanreicherung?',[
 'Die allererste Entstehung eines Organismus.','Eine langfristige geochemische Veränderung mit höherem atmosphärischem Sauerstoff.','Den Beginn des Kambriums.'],1,'Die Sauerstoffanreicherung ist ein geochemisches Signal; die Sauerstoffproduktion begann zuvor.'],
 ['Welcher Befund stützt die Endosymbiose der Mitochondrien?',[
 'Mitochondrien besitzen eine Abstammungsverwandtschaft mit Bakterien.','Alle heutigen Bakterien wurden dabei zu Mitochondrien.','Eukaryoten entstanden ohne andere Zelllinien.'],0,'Genomvergleiche und Zellbiologie zeigen die bakterielle Abstammung der Mitochondrien.'],
 ['Wie oft entstand Vielzelligkeit?',[
 'Genau einmal im Leben überhaupt.','Erst nach dem Erscheinen moderner Menschen.','Mehrfach unabhängig in unterschiedlichen Linien.'],2,'Vielzelligkeit besitzt mehrere evolutionäre Ursprünge.'],
 ['Was kennzeichnet die Landbesiedlung?',[
 'Pflanzen mussten unter anderem Austrocknung und neue Vermehrungsbedingungen bewältigen.','Alle Organismen verließen gleichzeitig das Meer.','Das war die Entstehung der ersten Zelle.'],0,'Die Besiedlung von Land erforderte vielfältige funktionelle Anpassungen und dauerte sehr lange.'],
 ['Was ist Tiktaalik?',[
 'Der bewiesene direkte Vorfahr aller Landwirbeltiere.','Ein Fossil mit Merkmalen, die Flossen und frühe Gliedmaßen funktionell verbinden.','Ein Säugetier aus dem Devon.'],1,'Tiktaalik liefert Übergangsmerkmale, ist aber nicht als direkter Vorfahr festgelegt.']
 ];
 let active='oxygen',q=0,score=0,answered=false;
 function renderTimeline(){
   let lines='<rect width="630" height="280" fill="#102832"/><line x1="55" y1="207" x2="585" y2="207" stroke="#b2d9ca" stroke-width="2"/>';
   for(const [age,label] of [[4600,'4,6 Ga'],[3000,'3,0 Ga'],[2000,'2,0 Ga'],[1000,'1,0 Ga'],[0,'0']]){
     const x=55+(4600-age)/4600*530;
     lines+='<line x1="'+x+'" y1="200" x2="'+x+'" y2="216" stroke="#95c7b8"/>'+svgText(x,235,label,12,'#abd0c5');
   }
   items.forEach((item,i)=>{
     const x=55+(4600-item.time)/4600*530;
     const y=65+(i%3)*38;
     lines+='<path d="M'+x+' '+(y+14)+'V207" stroke="#6fada3" stroke-width="1.5" stroke-dasharray="4 5"/>';
     lines+='<circle cx="'+x+'" cy="'+y+'" r="13" fill="'+(item.id===active?'#ecc69a':'#287a77')+'" stroke="#acdecf" stroke-width="2"/>'+svgText(x,y+4,i+1,12,item.id===active?'#1d3239':'#d7e8dd');
   });
   $('transition-timeline').innerHTML=lines+svgText(320,266,'ÄLTER  ←  MILLIONEN JAHRE VOR HEUTE  →  JÜNGER',11,'#a2c6bc');
 }
 function render(){
   const item=items.find(x=>x.id===active);if(!item)return;
   for(const [id,v] of Object.entries({'transition-time':item.when,'transition-name':item.name,'transition-story':item.story,'transition-evidence':item.evidence,'transition-limit':item.limit,'transition-art-label':'FIG. 05 / '+item.caption}))T(id,v);
   $('transition-art').innerHTML='<rect width="630" height="310" fill="#102832"/>'+item.art;
   $('transition-art').setAttribute('aria-label','Symbolische Illustration: '+item.name);
   $('transition-source').href=item.source;
   document.querySelectorAll('[data-transition]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.transition===active)));
   renderTimeline();
 }
 function question(){
   const item=quiz[q];answered=false;
   T('transition-quiz-counter','FRAGE '+(q+1)+' / '+quiz.length);
   T('transition-quiz-heading',item[0]);
   $('transition-answer').replaceChildren();$('transition-feedback').replaceChildren();
   $('transition-next').disabled=true;
   $('transition-next').textContent=q===quiz.length-1?'Ergebnis anzeigen →':'Nächste Frage →';
   item[1].forEach((label,i)=>{
     const b=document.createElement('button');b.type='button';b.textContent=label;
     b.addEventListener('click',()=>{
       if(answered)return;answered=true;if(i===item[2])score++;
       [...$('transition-answer').children].forEach((element,j)=>{element.disabled=true;element.classList.toggle('correct',j===item[2]);element.classList.toggle('wrong',j===i&&i!==item[2])});
       $('transition-feedback').dataset.ok=String(i===item[2]);T('transition-feedback',(i===item[2]?'Richtig. ':'Noch nicht. ')+item[3]);
       $('transition-next').disabled=false;
       $('transition-progress').setAttribute('aria-valuenow',String(q+1));
       $('transition-progress-bar').style.width=((q+1)/quiz.length*100)+'%';
     });$('transition-answer').append(b);
   });
 }
 document.querySelectorAll('[data-transition]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.transition;render()}));
 $('transition-next').addEventListener('click',()=>{
   if($('transition-next').disabled)return;
   if(q===quiz.length-1){
     $('transition-answer').replaceChildren();T('transition-quiz-heading','Fünf Fragen abgeschlossen · '+score+' / '+quiz.length+' richtig');
     T('transition-feedback','Nutze die Übergänge oberhalb, um offene Fragen und Quellen noch einmal anzusehen.');
     $('transition-next').disabled=true;return;
   }q++;question();
 });
 $('transition-restart').addEventListener('click',()=>{
   q=0;score=0;$('transition-progress').setAttribute('aria-valuenow','0');$('transition-progress-bar').style.width='0%';question();
 });
 render();question();
 window.EvolutionTransitions=Object.freeze({get count(){return items.length}});
}
function evidence(){
 const studies=[
  {title:'Darwinfinken: Feldselektion (Price et al., 1984)',
   question:'Welche Aussage wird von den Feldbeobachtungen gestützt?',
   choices:['Schnabelmerkmale konnten unter unterschiedlichen Nahrungsbedingungen gerichteter Selektion unterliegen.','Darwinfinken wollten aktiv größere Schnäbel entwickeln.','Alle Vogelarten entwickeln sich bei Dürre gleich.'],correct:0,
   summary:'Mehrjährige Felduntersuchungen quantifizierten gerichtete Selektionsmuster an Schnabel- und Körpermerkmalen unter periodischen Umweltbedingungen.',
   observation:'Unterschiedliche Merkmale wurden in mehreren Beobachtungsperioden direkt mit Überleben und Fitness verknüpft.',
   limit:'Kein Mechanismus beweist, dass einzelne Vögel ihre DNA zielgerichtet verändern oder dass alle Populationen gleich reagieren.',
   link:'https://www.nature.com/articles/309787a0'},
  {title:'E.-coli-Langzeitexperiment (Blount et al., 2008)',
   question:'Was zeigt die Evolution der Citrataufnahme in einer Population?',
   choices:['Alle zwölf Populationen entwickelten exakt gleichzeitig dieselbe Neuerung.','Eine neue nutzbare Eigenschaft entstand in einer Linie abhängig von vorherigen evolutionären Veränderungen.','Die Mutation geschah, weil die Bakterien sie bewusst brauchten.'],correct:1,
   summary:'In einem seit 1988 laufenden Experiment entstanden nach vielen Generationen unter kontrollierten Bedingungen neue Stoffwechselmöglichkeiten in einer bestimmten Population.',
   observation:'Die Nutzung von Citrat unter aeroben Bedingungen trat nach etwa 31.500 Generationen auf; Replay-Experimente stützten die Bedeutung der Vorgeschichte.',
   limit:'Ein Experiment mit Labor-E. coli beschreibt keine universelle Geschwindigkeit oder Richtung evolutionärer Innovationen.',
   link:'https://doi.org/10.1073/pnas.0803151105'},
  {title:'Tiktaalik roseae (Shubin et al., 2006)',
   question:'Was lässt sich aus dem fossilen Flossenskelett schließen?',
   choices:['Tiktaalik ist nachgewiesener direkter Vorfahr jedes heutigen Landwirbeltiers.','Es handelte sich um ein modernes Säugetier.','Anatomische Übergangsmerkmale zwischen bestimmten Flossen- und Gliedmaßenmustern sind fossil dokumentiert.'],correct:2,
   summary:'Ein fossiles Flossenskelett aus dem Devon zeigt eine Kombination von Merkmalen, die für die Entstehung belastbarer Gliedmaßen wichtig sind.',
   observation:'Ausgeprägte distale Skelettelemente und gelenknahe Strukturen in der Flosse von Tiktaalik.',
   limit:'Die fossile Art ist Teil einer Stammlinienverwandtschaft und muss kein direkter Ahne heute lebender Arten sein.',
   link:'https://doi.org/10.1038/nature04637'},
  {title:'Schneeflocken-Hefe (Ratcliff et al., 2012)',
   question:'Was dokumentierte das Laborversuchssystem?',
   choices:['Unter künstlicher Selektion entstanden in Hefe wiederholt vererbbare Zellverbände und einfache Arbeitsteilungsmerkmale.','Komplexe Tiere entstanden binnen Tagen.','Vielzelligkeit ist immer durch genau denselben Genweg entstanden.'],correct:0,
   summary:'Eine experimentelle Selektionsumgebung begünstigte Zellverbände der Hefe mit Merkmalen einer einfachen mehrzelligen Organisation.',
   observation:'Vielzellige Cluster und damit verknüpfte Eigenschaften entstanden und konnten über Generationen untersucht werden.',
   limit:'Die Resultate sind kein vollständiges Nachspielen der Entstehung aller historischen Vielzeller.',
   link:'https://doi.org/10.1073/pnas.1115323109'},
  {title:'Genome der Darwinfinken (Lamichhaney et al., 2015)',
   question:'Was ergaben die Genomvergleiche?',
   choices:['Finken besitzen keine gemeinsamen Gene.','Genfluss und Variation in genomischen Regionen hängen mit der Evolution von Schnabelformen zusammen.','Alle heutigen Finkenarten entstanden unabhängig aus unbelebter Materie.'],correct:1,
   summary:'Genome zahlreicher Darwinfinken und Verwandter wurden verglichen, einschließlich der genetischen Variation im Zusammenhang mit Schnabelmerkmalen.',
   observation:'Genomische Muster zeigten Genfluss zwischen Linien und Zusammenhänge einer Region um ALX1 mit Schnabelform.',
   limit:'Ein Genlokus allein erklärt nicht die gesamte evolutive Diversifizierung oder jeden Formunterschied.',
   link:'https://www.nature.com/articles/nature14181'},
  {title:'LUCA-Rekonstruktion (Moody et al., 2024)',
   question:'Was leistet eine solche phylogenomische Analyse?',
   choices:['Es wurde ein fossiles Einzelwesen LUCA mitsamt vollständiger DNA gefunden.','LUCA ist dasselbe wie der erste Ursprung des Lebens.','Aus Genverwandtschaft und Modellen können Eigenschaften und das Alter einer gemeinsamen Vorfahrenpopulation geschätzt werden.'],correct:2,
   summary:'Eine 2024 veröffentlichte Studie kombinierte Genfamilien und Datierungsmodelle zur Rekonstruktion eines frühen gemeinsamen Vorfahren zellulärer Linien.',
   observation:'Vergleichende Genomdaten und probabilistische Modelle führten unter getroffenen Annahmen zu einer Altersabschätzung um 4,2 Milliarden Jahre.',
   limit:'Schätzungen sind modellabhängig; sie identifizieren weder einen exakten ersten Organismus noch den einzigen historischen Weg zum Leben.',
   link:'https://www.nature.com/articles/s41559-024-02461-1'}
 ];
 let i=0,score=0,answered=false;
 function draw(){
   const study=studies[i];answered=false;
   for(const [id,v] of Object.entries({'evidence-number':'STUDIE '+(i+1)+' / '+studies.length,'evidence-title':study.title,'evidence-question':study.question,
     'evidence-abstract':study.summary,'evidence-observation':study.observation,'evidence-limit':study.limit}))T(id,v);
   $('evidence-link').href=study.link;$('evidence-answers').replaceChildren();$('evidence-feedback').replaceChildren();
   $('evidence-next').disabled=true;T('evidence-next',i===studies.length-1?'Ergebnis anzeigen →':'Nächste Studie →');
   study.choices.forEach((label,j)=>{
     const b=document.createElement('button');b.type='button';b.textContent=label;
     b.addEventListener('click',()=>{
       if(answered)return;answered=true;if(j===study.correct)score++;
       [...$('evidence-answers').children].forEach((node,k)=>{
         node.disabled=true;node.classList.toggle('correct',k===study.correct);node.classList.toggle('wrong',k===j&&j!==study.correct);
       });
       $('evidence-feedback').dataset.ok=String(j===study.correct);
       T('evidence-feedback',(j===study.correct?'Richtig. ':'Noch nicht. ')+study.observation+' Was damit nicht bewiesen ist: '+study.limit);
       T('evidence-score',score+' / 6');T('evidence-done',(i+1)+' / 6');
       $('evidence-progress').setAttribute('aria-valuenow',String(i+1));
       $('evidence-progress-bar').style.width=((i+1)/studies.length*100)+'%';
       $('evidence-next').disabled=false;
     });
     $('evidence-answers').append(b);
   });
 }
 $('evidence-next').addEventListener('click',()=>{
   if($('evidence-next').disabled)return;
   if(i===studies.length-1){
     $('evidence-answers').replaceChildren();
     T('evidence-question','Sechs Forschungsarbeiten abgeschlossen · '+score+' / 6 richtig');
     T('evidence-feedback','Du kannst alle Arbeiten erneut durchgehen und anhand der Primärquellen prüfen.');
     $('evidence-next').disabled=true;return;
   }
   i++;draw();
 });
 $('evidence-reset').addEventListener('click',()=>{
   i=0;score=0;T('evidence-score','0 / 6');T('evidence-done','0 / 6');
   $('evidence-progress').setAttribute('aria-valuenow','0');$('evidence-progress-bar').style.width='0%';draw();
 });
 draw();window.EvolutionEvidence=Object.freeze({get count(){return studies.length}});
}
if(chapter==='04')treeOfLife();
if(chapter==='05')transitions();
if(chapter==='06')evidence();
})();