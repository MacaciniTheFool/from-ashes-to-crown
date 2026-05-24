import { useState, useEffect, useRef } from "react";

// ============================================================
// STYLES
// ============================================================
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Share+Tech+Mono&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --gold:#c9922a;--gold2:#f0c050;--sys:#00ffb4;
  --bg:#080604;--panel:#0f0c08;--border:#2a2010;
  --parch:#f0e6c8;--parch2:#c8b98a;--red:#8b1a1a;
}
body{background:var(--bg);margin:0;}
.root{font-family:'Crimson Text',serif;background:var(--bg);color:var(--parch);min-height:100vh;}
.intro{position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100;padding:20px;}
.intro-inner{width:100%;max-width:560px;display:flex;flex-direction:column;gap:3px;}
.mp{border:2px solid #fff;padding:18px 22px;background:#000;animation:fi .4s ease;}
.mp.red{border-color:#c00;}
.mp-cap{font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:#fff;opacity:.4;text-transform:uppercase;margin-bottom:6px;}
.mp-txt{font-family:'Crimson Text',serif;font-size:15px;color:#fff;line-height:1.5;font-style:italic;}
.mp.red .mp-txt{color:#ff4444;}
.si{border:2px solid var(--sys);background:rgba(0,255,180,.05);padding:14px 18px;animation:fi .4s ease;}
.sl{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:3px;color:var(--sys);opacity:.6;margin-bottom:6px;}
.st{font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--sys);line-height:1.6;white-space:pre-line;}
.ibtn{margin-top:10px;background:transparent;border:2px solid var(--sys);color:var(--sys);font-family:'Share Tech Mono',monospace;font-size:13px;letter-spacing:2px;padding:11px;cursor:pointer;text-transform:uppercase;transition:all .2s;width:100%;}
.ibtn:hover{background:var(--sys);color:#000;}
@keyframes fi{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
.game{display:grid;grid-template-columns:220px 1fr 220px;grid-template-rows:50px 1fr;height:100vh;gap:2px;padding:2px;}
.topbar{grid-column:1/-1;background:var(--panel);border:1px solid var(--border);display:flex;align-items:center;padding:0 14px;gap:20px;}
.gtitle{font-family:'Cinzel',serif;font-size:12px;font-weight:900;letter-spacing:3px;color:var(--gold);white-space:nowrap;}
.gdate{font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--parch2);opacity:.7;letter-spacing:1px;}
.res-bar{display:flex;gap:14px;margin-left:auto;}
.res{display:flex;align-items:center;gap:4px;font-family:'Share Tech Mono',monospace;font-size:11px;}
.rv{color:var(--gold2);font-weight:bold;}
.rd{color:#e07070;}.rsp{color:var(--sys);}
.lp,.rp{background:var(--panel);border:1px solid var(--border);overflow-y:auto;padding:10px;}
.pt{font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;padding-bottom:5px;border-bottom:1px solid var(--border);margin-bottom:8px;}
.nc{text-align:center;padding:10px 6px;border:1px solid var(--border);background:rgba(201,146,42,.04);margin-bottom:10px;}
.nav{font-size:36px;line-height:1;margin-bottom:4px;}
.nname{font-family:'Cinzel',serif;font-size:12px;font-weight:700;color:var(--gold2);}
.nttl{font-size:10px;color:var(--parch2);opacity:.6;font-style:italic;margin-top:2px;}
.sr{display:flex;align-items:center;gap:6px;margin-bottom:5px;}
.sn{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--parch2);width:66px;text-transform:uppercase;letter-spacing:1px;}
.sbg{flex:1;height:3px;background:rgba(255,255,255,.07);}
.sf{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold2));transition:width .5s;}
.sv{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--gold2);width:20px;text-align:right;}
.sk{display:inline-flex;align-items:center;gap:3px;border:1px solid var(--border);padding:2px 6px;margin:2px;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--parch2);}
.sk.mod{border-color:rgba(0,255,180,.3);color:var(--sys);}
.skl{color:var(--gold2);font-size:8px;}
.noskill{font-size:10px;color:var(--parch2);opacity:.3;font-style:italic;text-align:center;padding:8px 4px;}
.ctr{background:var(--panel);border:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;}
.story{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;}
.ep{border:2px solid var(--border);background:rgba(0,0,0,.35);}
.eph{background:rgba(201,146,42,.08);border-bottom:1px solid var(--border);padding:5px 10px;font-family:'Cinzel',serif;font-size:8px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;}
.epb{padding:12px 14px;font-size:14px;line-height:1.7;color:var(--parch);}
.epb p{margin-bottom:8px;}.epb p:last-child{margin-bottom:0;}
.ep.sys{border-color:rgba(0,255,180,.35);background:rgba(0,255,180,.03);}
.ep.sys .eph{background:rgba(0,255,180,.07);border-color:rgba(0,255,180,.2);color:var(--sys);}
.ep.sys .epb{font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--sys);line-height:1.6;}
.ntf{border:2px solid var(--gold2);background:rgba(201,146,42,.08);padding:8px 12px;animation:si2 .3s ease;}
.ntft{font-family:'Cinzel',serif;font-size:9px;letter-spacing:2px;color:var(--gold2);text-transform:uppercase;margin-bottom:3px;}
.ntfb{font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--parch);}
.cm{font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--gold);padding:5px 10px;border-left:2px solid var(--gold);opacity:.65;}
@keyframes si2{from{transform:translateY(-8px);opacity:0;}to{transform:translateY(0);opacity:1;}}
.choices{border-top:1px solid var(--border);padding:12px 14px;background:rgba(0,0,0,.25);}
.clbl{font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;margin-bottom:8px;}
.cbtn{background:transparent;border:1px solid var(--border);color:var(--parch);font-family:'Crimson Text',serif;font-size:13px;padding:8px 12px;text-align:left;cursor:pointer;transition:all .15s;display:block;width:100%;margin-bottom:5px;line-height:1.4;}
.cbtn:hover{border-color:var(--gold);color:var(--gold2);background:rgba(201,146,42,.06);padding-left:18px;}
.hint{font-size:10px;opacity:.45;font-style:italic;margin-left:6px;}
.locked{border-color:var(--red)!important;opacity:.5;cursor:not-allowed!important;}
.locked:hover{padding-left:12px!important;color:var(--parch)!important;background:transparent!important;}
.pr{display:flex;justify-content:space-between;align-items:center;padding:5px 7px;border:1px solid var(--border);margin-bottom:3px;}
.prn{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--parch2);text-transform:uppercase;letter-spacing:1px;}
.prv{font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--gold2);font-weight:bold;}
.ncard{border:1px solid var(--border);padding:7px 9px;margin-bottom:6px;}
.ntop{display:flex;align-items:center;gap:7px;margin-bottom:5px;}
.nem{font-size:18px;}.nnm{font-family:'Cinzel',serif;font-size:10px;color:var(--gold2);}
.nrl{font-size:10px;color:var(--parch2);opacity:.55;font-style:italic;}
.nbr{display:flex;align-items:center;gap:5px;margin-bottom:2px;}
.nbl{font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--parch2);opacity:.4;width:32px;text-transform:uppercase;}
.nbg{flex:1;height:2px;background:rgba(255,255,255,.05);}
.nbf{height:100%;transition:width .5s;}
.nbf.l{background:var(--gold);}.nbf.t{background:#4a9eff;}.nbf.a{background:#ff6b9d;}
.tp{display:inline-block;border:1px solid rgba(255,255,255,.1);padding:1px 5px;font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--parch2);margin:1px;}
.tp.positive{border-color:rgba(42,92,42,.5);color:#7bc47b;}
.tp.negative{border-color:rgba(139,26,26,.5);color:#e07070;}
.tp.neutral{border-color:rgba(201,146,42,.25);color:var(--gold2);}
.tabs{display:flex;gap:1px;margin-bottom:8px;}
.tab{flex:1;background:transparent;border:1px solid var(--border);color:var(--parch2);font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:1px;padding:4px;cursor:pointer;text-transform:uppercase;transition:all .15s;}
.tab.active{background:rgba(201,146,42,.08);border-color:var(--gold);color:var(--gold);}
.ach{position:fixed;bottom:16px;right:16px;border:2px solid var(--gold2);background:var(--panel);padding:10px 14px;z-index:999;animation:si2 .4s ease;max-width:260px;}
.acht{font-family:'Cinzel',serif;font-size:8px;letter-spacing:3px;color:var(--gold2);text-transform:uppercase;margin-bottom:3px;}
.achn{font-family:'Cinzel',serif;font-size:12px;color:var(--parch);margin-bottom:1px;}
.achd{font-size:10px;color:var(--parch2);opacity:.65;font-style:italic;}
.bi{border:1px solid var(--border);padding:5px 7px;margin-bottom:3px;}
.btn{display:flex;align-items:center;justify-content:space-between;}
.bname{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--parch2);}
.bname.built{color:var(--gold2);}
.bstat{font-size:8px;color:var(--gold);opacity:.6;}
.breq{font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--parch2);opacity:.4;margin-top:2px;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:var(--border);}
`;

// ============================================================
// DATA (MONTHS, TITLES, BUILDINGS, NPCS, EVENTS)
// ============================================================
const MONTHS=["Ashmonth","Greenrise","Rainveil","Bloomtide","Goldmarch","Highsun","Dustwind","Embertide","Harvestfall","Amberleaf","Coldbreeze","Taxmonth","Frostcome","Deepwinter","Iceveil","Lastcold"];
const SEASONS={0:"Spring",1:"Spring",2:"Spring",3:"Spring",4:"Summer",5:"Summer",6:"Summer",7:"Summer",8:"Autumn",9:"Autumn",10:"Autumn",11:"Autumn",12:"Winter",13:"Winter",14:"Winter",15:"Winter"};
const TITLES=[{n:"Landed Knight (Exiled)",r:0,g:0,p:0},{n:"Baron of Embervale",r:25,g:500,p:20},{n:"Viscount of Embervale",r:50,g:2000,p:50},{n:"Count of Embervale",r:75,g:10000,p:100},{n:"Marquess of the West",r:82,g:30000,p:200},{n:"Duke of Valdris",r:90,g:50000,p:400}];
const BUILDINGS_DEF=[
  {id:"old_manor",n:"Old Manor",ic:"🏚️",built:true,rg:0,rw:0,rs:0,rp:0,eff:"Your home base"},
  {id:"small_farm",n:"Small Farm",ic:"🌾",built:true,rg:0,rw:0,rs:0,rp:0,eff:"+5 food/day"},
  {id:"woodcutter",n:"Woodcutter Camp",ic:"🪵",built:false,rg:30,rw:0,rs:0,rp:5,eff:"+15 wood/day"},
  {id:"granary",n:"Granary",ic:"🏪",built:false,rg:80,rw:20,rs:0,rp:5,eff:"Stop food waste"},
  {id:"well",n:"Stone Well",ic:"⛏️",built:false,rg:60,rw:0,rs:10,rp:5,eff:"+Serf health"},
  {id:"barracks",n:"Barracks",ic:"⚔️",built:false,rg:150,rw:40,rs:0,rp:15,eff:"Train soldiers"},
  {id:"market",n:"Market Stall",ic:"🛒",built:false,rg:120,rw:30,rs:0,rp:10,eff:"+Gold income"},
  {id:"quarry",n:"Stone Quarry",ic:"🪨",built:false,rg:100,rw:20,rs:0,rp:10,eff:"+15 stone/day"},
  {id:"tavern",n:"Tavern",ic:"🍺",built:false,rg:200,rw:60,rs:20,rp:15,eff:"+Rep, unlocks NPCs"},
  {id:"smithy",n:"Smithy",ic:"🔨",built:false,rg:300,rw:50,rs:40,rp:20,eff:"+Combat +Production"},
  {id:"watchtower",n:"Watch Tower",ic:"🗼",built:false,rg:200,rw:80,rs:60,rp:20,eff:"+Defense"},
  {id:"chapel",n:"Chapel",ic:"⛪",built:false,rg:400,rw:0,rs:80,rp:30,eff:"+Rep, Church ally"},
  {id:"library",n:"Library",ic:"📚",built:false,rg:500,rw:40,rs:60,rp:30,eff:"+SP/day"},
  {id:"manor_house",n:"Manor House",ic:"🏰",built:false,rg:1000,rw:200,rs:300,rp:50,eff:"+Rep, title req"},
  {id:"hospital",n:"Healing House",ic:"🏥",built:false,rg:800,rw:100,rs:150,rp:40,eff:"Prevent NPC death"},
  {id:"port",n:"River Dock",ic:"⚓",built:false,rg:2000,rw:300,rs:200,rp:60,eff:"Trade routes"},
  {id:"walls",n:"Stone Walls",ic:"🧱",built:false,rg:3000,rw:200,rs:500,rp:80,eff:"Major defense"},
  {id:"castle",n:"Castle Keep",ic:"🏯",built:false,rg:20000,rw:1000,rs:2000,rp:200,eff:"Max title req"},
];
const NPCS_DEF=[
  {id:"mira",n:"Mira",r:"House Servant",em:"👩",l:20,t:15,a:0,li:true,un:true,traits:["Sharp Eyes","Resilient","Cautious"],tt:["positive","positive","neutral"]},
  {id:"aldric",n:"Aldric",r:"Head Farmer",em:"👨‍🌾",l:12,t:10,a:null,li:false,un:true,traits:["Hardworking","Resentful","Knows the Land"],tt:["positive","negative","positive"]},
  {id:"zara",n:"Zara",r:"Forest Dweller",em:"🧝",l:0,t:0,a:0,li:true,un:false,traits:["Nature's Bond","Exiled","Perceptive"],tt:["positive","negative","positive"],urb:"woodcutter"},
  {id:"lyra",n:"Lyra",r:"Merchant's Daughter",em:"👩‍💼",l:0,t:0,a:0,li:true,un:false,traits:["Market Intuition","Ambitious","Trapped"],tt:["positive","positive","negative"],urb:"market"},
  {id:"brother_aldous",n:"Brother Aldous",r:"Fallen Priest",em:"👨‍⚖️",l:0,t:0,a:null,li:false,un:false,traits:["Forbidden Knowledge","Observant","Disgraced"],tt:["positive","positive","negative"],urb:"tavern"},
  {id:"ser_edwyn",n:"Ser Edwyn",r:"Wandering Knight",em:"⚔️",l:0,t:0,a:null,li:false,un:false,traits:["Old Techniques","Honorable","Guilt-ridden"],tt:["positive","positive","negative"],urb:"barracks",ur:40},
  {id:"seraphine",n:"Seraphine",r:"Young Sister",em:"😇",l:0,t:0,a:0,li:true,un:false,traits:["Devout","Questioning","Compassionate"],tt:["neutral","positive","positive"],urb:"chapel"},
  {id:"kaela",n:"Kaela",r:"Adventurer",em:"🗡️",l:0,t:0,a:0,li:true,un:false,traits:["Combat Veteran","Sarcastic","Loyal for Gold"],tt:["positive","neutral","neutral"],urb:"tavern"},
  {id:"isolde",n:"Isolde",r:"Arcane Apprentice",em:"🔮",l:0,t:0,a:0,li:true,un:false,traits:["Aether Sensitive","Curious","Watched"],tt:["positive","positive","negative"],ur:60},
  {id:"lady_evelyn",n:"Lady Evelyn",r:"Rival's Daughter",em:"👸",l:0,t:0,a:0,li:true,un:false,traits:["Noble Poise","Secret Agent","Conflicted"],tt:["positive","negative","neutral"],ur:50},
];

const EV = {}; // Events will be imported/defined in a separate file

// ============================================================
// HELPERS
// ============================================================
function getTitle(s){
  let t=TITLES[0].n;
  for(const ti of TITLES){if(s.reputation>=ti.r&&s.gold>=ti.g&&s.population>=ti.p)t=ti.n;}
  return t;
}

function applyFx(state,fx){
  const s=JSON.parse(JSON.stringify(state));
  if(fx.gold!==undefined)s.gold=Math.max(0,s.gold+fx.gold);
  if(fx.food!==undefined)s.food=Math.max(0,s.food+fx.food);
  if(fx.wood!==undefined)s.wood=Math.max(0,s.wood+fx.wood);
  if(fx.stone!==undefined)s.stone=Math.max(0,s.stone+fx.stone);
  if(fx.pop!==undefined)s.population=Math.max(1,s.population+fx.pop);
  const repDelta=(fx.rep||0)+(fx.reputation||0);
  if(repDelta!==0)s.reputation=Math.max(0,Math.min(100,s.reputation+repDelta));
  if(fx.sp!==undefined)s.sp=Math.max(0,s.sp+fx.sp);
  if(fx.debt!==undefined)s.debt=Math.max(0,s.debt+fx.debt);
  if(fx.day){
    s.day+=fx.day;
    if(s.buildings.find(b=>b.id==="small_farm"&&b.built))s.food=Math.max(0,s.food+fx.day*5);
    if(s.buildings.find(b=>b.id==="woodcutter"&&b.built))s.wood=Math.max(0,s.wood+fx.day*15);
    if(s.buildings.find(b=>b.id==="quarry"&&b.built))s.stone=Math.max(0,s.stone+fx.day*12);
    if(s.buildings.find(b=>b.id==="market"&&b.built))s.gold=Math.max(0,s.gold+fx.day*6);
    s.debt=Math.round(s.debt*Math.pow(1.003,fx.day));
  }
  if(fx.stats)Object.entries(fx.stats).forEach(([k,v])=>{if(v!==0&&s.stats[k]!==undefined)s.stats[k]=Math.max(0,Math.min(100,s.stats[k]+v));});
  if(fx.skill){const ex=s.skills.find(sk=>sk.n===fx.skill.n);if(!ex)s.skills=[...s.skills,fx.skill];}
  if(fx.npcs)fx.npcs.forEach(ch=>{
    const i=s.npcs.findIndex(n=>n.id===ch.id);
    if(i>=0){
      if(ch.l!==undefined)s.npcs[i].l=Math.max(0,Math.min(100,s.npcs[i].l+(ch.l||0)));
      if(ch.t!==undefined)s.npcs[i].t=Math.max(0,Math.min(100,s.npcs[i].t+(ch.t||0)));
      if(ch.a!==undefined&&s.npcs[i].a!==null)s.npcs[i].a=Math.max(0,Math.min(100,(s.npcs[i].a||0)+(ch.a||0)));
    }
  });
  if(fx.bld){const i=s.buildings.findIndex(b=>b.id===fx.bld);if(i>=0)s.buildings[i].built=true;}
  if(fx.ach&&!s.achievements.find(a=>a.n===fx.ach.n))s.achievements=[...s.achievements,fx.ach];
  const builtIds=s.buildings.filter(b=>b.built).map(b=>b.id);
  s.npcs=s.npcs.map(npc=>{if(npc.un)return npc;let ok=true;if(npc.urb&&!builtIds.includes(npc.urb))ok=false;if(npc.ur&&s.reputation<npc.ur)ok=false;return ok?{...npc,un:true}:npc;});
  return s;
}

// ============================================================
// MAIN APP
// ============================================================
export default function App(){
  const[showIntro,setShowIntro]=useState(true);
  const[state,setState]=useState({
    day:1,gold:47,debt:2340,sp:0,food:30,wood:10,stone:0,population:8,reputation:5,
    stats:{charisma:3,intelligence:8,strength:2,leadership:1,cunning:4},
    skills:[],buildings:BUILDINGS_DEF.map(b=>({...b})),npcs:NPCS_DEF.map(n=>({...n})),
    achievements:[],curEv:"start_arrival",
  });

  const handleStart=()=>setShowIntro(false);
  const handleExport=()=>{
    const json=JSON.stringify(state,null,2);
    const blob=new Blob([json],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`embervale-save-day${state.day}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleMenu=()=>{
    if(confirm("Return to menu? Game progress will be saved automatically.")){
      setShowIntro(true);
    }
  };

  return(
    <div className="root">
      <style>{css}</style>
      {showIntro
        ?<IntroScreen onStart={handleStart}/>
        :<Game state={state} setState={setState} onMenu={handleMenu} onExport={handleExport}/>
      }
    </div>
  );
}

function IntroScreen({onStart}){
  const[step,setStep]=useState(0);
  const panels=[
    {type:"n",cap:"ERYNDAL — YEAR 847",txt:"Rain hammers the cobblestones. A student walks home, earphones in, oblivious to everything except exam relief.",accent:"#c9922a"},
    {type:"n",cap:"A MOMENT OF INATTENTION",txt:"The light. The screech of tires. Then—",accent:"#cc0000",red:true},
    {type:"s",txt:"So. You're dead.\n\nDon't panic. I mean, you can — it won't help.\n\nI'm what you'd call a System.\nAnd you're about to be very confused.\n\nWelcome to Eryndal.\nTry not to die again.\nI'm still calibrating."},
    {type:"n",cap:"DAY 1 — INSIDE A CARRIAGE",txt:"You open your eyes. Smell of horse and damp wood. Hands that aren't yours. A royal decree of exile crumpled in your lap.",accent:"#c9922a"},
  ];
  const isLast=step===panels.length-1;

  function advance(){if(!isLast)setStep(s=>s+1);else onStart();}

  return(
    <div onClick={advance} style={{position:"fixed",inset:0,background:"#080604",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",userSelect:"none"}}>
      <style>{`@keyframes fi{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);}}@keyframes blink{0%,100%{opacity:.3;}50%{opacity:.8;}}`}</style>
      <div style={{width:"100%",maxWidth:560,padding:"0 20px",display:"flex",flexDirection:"column",gap:3}}>
        {panels.slice(0,step+1).map((p,i)=>p.type==="s"?(
          <div key={i} style={{border:"2px solid #00ffb4",background:"rgba(0,255,180,.04)",padding:"14px 18px",animation:"fi .4s ease"}}>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"9px",letterSpacing:"3px",color:"#00ffb4",opacity:.6,marginBottom:6}}>⚡ SYSTEM</div>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"12px",color:"#00ffb4",lineHeight:1.6,whiteSpace:"pre-line"}}>{p.txt}</div>
          </div>
        ):(
          <div key={i} style={{border:`2px solid ${p.accent||"#fff"}`,padding:"18px 22px",background:"#080604",animation:"fi .4s ease"}}>
            {p.cap&&<div style={{fontFamily:"'Cinzel',serif",fontSize:"9px",letterSpacing:"3px",color:p.accent||"#fff",opacity:.7,textTransform:"uppercase",marginBottom:"8px"}}>{p.cap}</div>}
            <div style={{fontFamily:"'Crimson Text',serif",fontSize:"16px",color:p.red?"#ff6666":"#f0e6c8",lineHeight:1.6,fontStyle:"italic"}}>{p.txt}</div>
          </div>
        ))}
      </div>
      <div style={{position:"fixed",bottom:24,fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:3,color:isLast?"#f0c050":"#c8b98a",opacity:.5,textTransform:"uppercase",animation:"blink 2s infinite"}}>[ {isLast?"Click to Begin":"Click to Continue"} ]</div>
      <div style={{position:"fixed",bottom:24,right:24,display:"flex",gap:5}}>{panels.map((_,i)=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:i<=step?"#c9922a":"#2a2010",transition:"background .3s"}}/>)}</div>
    </div>
  );
}

function Game({state,setState,onMenu,onExport}){
  const[msgs,setMsgs]=useState([]);
  const[curChoices,setCurChoices]=useState([]);
  const[ach,setAch]=useState(null);
  const[tab,setTab]=useState("people");
  const[picking,setPicking]=useState(false);
  const ref=useRef(null);
  const stateRef=useRef(state);
  useEffect(()=>{stateRef.current=state;},[state]);
  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[msgs]);
  useEffect(()=>{if(ach){const t=setTimeout(()=>setAch(null),4500);return()=>clearTimeout(t);}},[ach]);
  const startedRef=useRef(false);
  useEffect(()=>{if(!startedRef.current){startedRef.current=true;loadEv("start_arrival");}},[]); 

  function loadEv(id){
    const ev={start_arrival:{id:"start_arrival",title:"The Arrival",n:"The carriage lurches to a stop. Through cracked wooden slats you glimpse your inheritance for the first time.\n\nEmbervale.\n\nThe name suggests fire and life. What you see is neither. Collapsed fencing. Fields that gave up two seasons ago. A manor house that looks ashamed of itself.\n\nMira stands at the gate, arms crossed. She has been dreading this.",s:"New body assessment: passable. Estate: catastrophic. Debt: genuinely impressive — the previous owner had a talent for spending money that didn't exist. The only way from here is up. Statistically.",c:[{t:"Step out and greet Mira with confidence — act like you belong here",h:"Charisma",fx:{day:1,stats:{charisma:1},npcs:[{id:"mira",l:3,t:2}]},nx:"mira_report"},{t:"Ask Mira quietly what the real situation is before anything else",h:"Intelligence",fx:{day:1,stats:{intelligence:1},npcs:[{id:"mira",l:0,t:5}]},nx:"mira_report"},{t:"Survey the land yourself first — walk the property before speaking",h:"Unlock Observation",fx:{day:1,stats:{intelligence:1,cunning:1},skill:{n:"Observation",lv:1,tp:"medieval",d:"You notice things others miss"}},nx:"mira_report"}]},hub:{id:"hub",title:"What Next?",n:"The day is yours. Embervale runs in the background — serfs at their tasks, crops growing or dying, the debt quietly accumulating interest. Every choice moves something forward and delays something else.\n\nThat's the job.",s:null,c:[{t:"Rest and recover",h:"Refresh",fx:{day:1,sp:5},nx:"hub"}]}}[id]||{id:"hub",title:"What Next?",n:"Continue your journey in Embervale.",s:null,c:[{t:"Rest",h:"",fx:{day:1},nx:"hub"}]};
    if(!ev){loadEv("hub");return;}
    setMsgs(prev=>[...prev,{type:"n",title:ev.title,text:ev.n,id:Date.now()},...(ev.s?[{type:"s",text:ev.s,id:Date.now()+1}]:[])});
    setCurChoices(ev.c||[]);
    setState(prev=>({...prev,curEv:id}));
  }

  function pick(c){
    if(picking)return;
    const cur=stateRef.current;
    if(c.cg&&cur.gold<c.cg){setMsgs(p=>[...p,{type:"s",text:`Need ${c.cg} gold. You have ${cur.gold}. Earn more first.`,id:Date.now()}]);return;}
    if(c.cw&&cur.wood<c.cw){setMsgs(p=>[...p,{type:"s",text:`Need ${c.cw} wood. You have ${cur.wood}. Gather more first.`,id:Date.now()}]);return;}
    if(c.cs&&cur.stone<c.cs){setMsgs(p=>[...p,{type:"s",text:`Need ${c.cs} stone. You have ${cur.stone}. Mine more first.`,id:Date.now()}]);return;}
    setPicking(true);
    setCurChoices([]);
    setMsgs(p=>[...p,{type:"c",text:`▶ ${c.t}`,id:Date.now()}]);
    const ns=applyFx(cur,c.fx||{});
    if(c.fx?.skill&&!cur.skills.find(s=>s.n===c.fx.skill.n)){setMsgs(p=>[...p,{type:"ntf",title:`⚡ ${c.fx.skill.tp==="modern"?"MODERN KNOWLEDGE":"SKILL"} UNLOCKED`,body:`[ ${c.fx.skill.n} Lv.${c.fx.skill.lv} ] — "${c.fx.skill.d}"`,id:Date.now()+2}]);}
    if(c.fx?.ach)setAch(c.fx.ach);
    setState(ns);
    stateRef.current=ns;
    setTimeout(()=>{loadEv(c.nx||"hub");setPicking(false);},150);
  }
  const mi=Math.max(0,Math.floor((state.day-1)/40)%16);
  const month=MONTHS[mi];
  const season=SEASONS[mi];
  const title=getTitle(state);
  const unNPCs=state.npcs.filter(n=>n.un);
  const builtB=state.buildings.filter(b=>b.built);

  return(
    <div className="game">
      <style>{css}</style>
      <div className="topbar">
        <div className="gtitle">From Ashes to Crown</div>
        <div className="gdate">Day {state.day} · {month} · Year 1 · {season}</div>
        <div className="res-bar">
          <div className="res">💰<span className="rv">{state.gold}g</span></div>
          <div className="res">💀<span className="rd">-{state.debt}g</span></div>
          <div className="res">🌾<span className="rv">{state.food}</span></div>
          <div className="res">🪵<span className="rv">{state.wood}</span></div>
          <div className="res">🪨<span className="rv">{state.stone}</span></div>
          <div className="res">⚡<span className="rsp">{state.sp}SP</span></div>
          <div className="res">⭐<span className="rv">{state.reputation}</span></div>
          <button onClick={onExport} title="Export save file" style={{background:"transparent",border:"1px solid var(--border)",color:"var(--parch2)",fontFamily:"Share Tech Mono,monospace",fontSize:9,letterSpacing:1,padding:"3px 8px",cursor:"pointer",textTransform:"uppercase",transition:"all .2s"}} onMouseEnter={e=>e.target.style.borderColor="var(--gold)"} onMouseLeave={e=>e.target.style.borderColor="var(--border)"}>📤 Save</button>
          <button onClick={onMenu} style={{background:"transparent",border:"1px solid var(--border)",color:"var(--parch2)",fontFamily:"Share Tech Mono,monospace",fontSize:9,letterSpacing:1,padding:"3px 8px",cursor:"pointer",textTransform:"uppercase",transition:"all .2s"}} onMouseEnter={e=>e.target.style.borderColor="var(--gold)"} onMouseLeave={e=>e.target.style.borderColor="var(--border)"}>☰ Menu</button>
        </div>
      </div>
      <div className="lp">
        <div className="nc"><div className="nav">🧑‍🦱</div><div className="nname">Rean Ashvane</div><div className="nttl">{title}</div></div>
        <div className="pt">Stats</div>
        {Object.entries(state.stats).map(([k,v])=><div key={k} className="sr"><div className="sn">{k}</div><div className="sbg"><div className="sf" style={{width:`${v}%`}}/></div><div className="sv">{v}</div></div>)}
        <div className="pt" style={{marginTop:10}}>Skills</div>
        {state.skills.length===0?<div className="noskill">No skills yet.<br/>They unlock through action.</div>:state.skills.map((s,i)=><span key={i} className={`sk${s.tp==="modern"?" mod":""}`}>{s.tp==="modern"?"⚡":"⚔️"} {s.n} <span className="skl">Lv.{s.lv}</span></span>)}
        <div className="pt" style={{marginTop:10}}>Achievements</div>
        {state.achievements.length===0?<div className="noskill">None yet.</div>:state.achievements.map((a,i)=><div key={i} style={{fontSize:10,color:"var(--parch2)",marginBottom:3}}>{a.ic} {a.n}</div>)}
      </div>
      <div className="ctr">
        <div className="story" ref={ref}>
          {msgs.map(m=>{if(m.type==="n")return(<div key={m.id} className="ep"><div className="eph">◆ {m.title||"Embervale Chronicle"}</div><div className="epb">{m.text.split("\n").map((p,i)=>p.trim()?<p key={i}>{p}</p>:null)}</div></div>);if(m.type==="s")return(<div key={m.id} className="ep sys"><div className="eph">⚡ SYSTEM</div><div className="epb">{m.text}</div></div>);if(m.type==="ntf")return(<div key={m.id} className="ntf"><div className="ntft">{m.title}</div><div className="ntfb">{m.body}</div></div>);if(m.type==="c")return(<div key={m.id} className="cm">{m.text}</div>);return null;})}
        </div>
        {curChoices.length>0&&(<div className="choices"><div className="clbl">◆ What do you do?</div>{curChoices.map((c,i)=>{const lk=(c.cg&&state.gold<c.cg)||(c.cw&&state.wood<c.cw)||(c.cs&&state.stone<c.cs);return(<button key={i} className={`cbtn${lk?" locked":""}`} onClick={()=>!lk&&pick(c)}>{c.t}{c.h&&<span className="hint">({c.h})</span>}{lk&&<span className="hint" style={{color:"#e07070"}}>[Not enough resources]</span>}</button>);})}</div>)}
      </div>
      <div className="rp">
        <div className="tabs">
          <button className={`tab${tab==="people"?" active":""}`} onClick={()=>setTab("people")}>People</button>
          <button className={`tab${tab==="estate"?" active":""}`} onClick={()=>setTab("estate")}>Estate</button>
        </div>
        {tab==="people"&&(<><div className="pt">Characters</div>{unNPCs.map(n=><div key={n.id} className="ncard"><div className="ntop"><span className="nem">{n.em}</span><div><div className="nnm">{n.n}</div><div className="nrl">{n.r}</div></div></div><div className="nbr"><div className="nbl">Loyal</div><div className="nbg"><div className="nbf l" style={{width:`${n.l}%`}}/></div><span style={{fontSize:8,color:"var(--gold2)",fontFamily:"Share Tech Mono,monospace",marginLeft:3}}>{n.l}</span></div><div className="nbr"><div className="nbl">Trust</div><div className="nbg"><div className="nbf t" style={{width:`${n.t}%`}}/></div><span style={{fontSize:8,color:"#4a9eff",fontFamily:"Share Tech Mono,monospace",marginLeft:3}}>{n.t}</span></div>{n.a!==null&&<div className="nbr"><div className="nbl">❤️</div><div className="nbg"><div className="nbf a" style={{width:`${n.a||0}%`}}/></div><span style={{fontSize:8,color:"#ff6b9d",fontFamily:"Share Tech Mono,monospace",marginLeft:3}}>{n.a||0}</span></div>}<div style={{marginTop:4}}>{n.traits.map((tr,i)=><span key={i} className={`tp ${n.tt[i]}`}>{tr}</span>)}</div></div>)}</>)}
        {tab==="estate"&&(<><div className="pt">Embervale</div>{[["👥 Serfs",state.population],["🌾 Food",state.food],["🪵 Wood",state.wood],["🪨 Stone",state.stone],["⭐ Rep",`${state.reputation}/100`]].map(([k,v])=><div key={k} className="pr"><span className="prn">{k}</span><span className="prv">{v}</span></div>)}<div className="pt" style={{marginTop:8}}>Buildings</div>{builtB.map((b,i)=><div key={i} className="bi"><div className="btn"><span className="bname built">{b.ic} {b.n}</span><span className="bstat">Active</span></div><div className="breq">{b.eff}</div></div>)}</>) }
      </div>
      {ach&&<div className="ach"><div className="acht">⭐ Achievement Unlocked</div><div className="achn">{ach.ic} {ach.n}</div><div className="achd">{ach.d}</div></div>}
    </div>
  );
}