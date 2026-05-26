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
.nlvl{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--gold);margin-top:4px;}
.sr{display:flex;align-items:center;gap:6px;margin-bottom:5px;}
.sn{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--parch2);width:66px;text-transform:uppercase;letter-spacing:1px;}
.sbg{flex:1;height:3px;background:rgba(255,255,255,.07);}
.sf{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold2));transition:width .5s;}
.sv{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--gold2);width:20px;text-align:right;}
.sk{display:inline-flex;align-items:center;gap:3px;border:1px solid var(--border);padding:2px 6px;margin:2px;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--parch2);}
.sk.mod{border-color:rgba(0,255,180,.3);color:var(--sys);}
.sk.neg{border-color:#8b1a1a;color:#e07070;}
.sk.pos{border-color:rgba(0,255,180,.3);color:var(--sys);}
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
.hint{font-size:10px;opacity:.45;font-style:italic;color:var(--parch2);}
`;

// ============================================================
// CORE GAME DATA - PART 1
// ============================================================

// Growth rate multipliers for stat progression
const GROWTH_RATES = { S: 2.5, A: 2.0, B: 1.5, C: 1.0, D: 0.5, E: 0.1 };

// Trait pools
const TRAITS = {
  positive: [
    "Courageous", "Wise", "Loyal", "Strategic", "Charismatic",
    "Quick-Witted", "Resilient", "Honorable", "Compassionate", "Determined"
  ],
  negative: [
    "Arrogant", "Reckless", "Paranoid", "Stubborn", "Greedy",
    "Vindictive", "Cowardly", "Deceitful", "Jealous", "Volatile"
  ],
  neutral: [
    "Aloof", "Ambitious", "Cautious", "Curious", "Experimental",
    "Melancholic", "Pragmatic", "Sarcastic", "Serene", "Vigilant"
  ],
  overpowered: [
    "Immortal Fury", "Draconic Ascension", "Void Walker", "Phoenix Rebirth",
    "Titan's Strength", "Oracle's Foresight", "Nexus Convergence", "Absolute Will"
  ]
};

// NPC Definitions with full stat structure
const NPC_DATA = {
  zara: {
    name: "Zara", emoji: "🔥", title: "The Scarred Warrior",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 16, agility: 12, endurance: 15, morale: 14 },
    growth: { strength: 'S', agility: 'B', endurance: 'A', morale: 'C' },
    traits: ["Courageous", "Volatile"],
    loyalty: 50, trust: 40,
    milestones: { 10: "Scar Mastery", 20: "Battle Hardened", 30: "Inferno Ascension" }
  },
  kael: {
    name: "Kael", emoji: "❄️", title: "The Frozen Sage",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 10, agility: 14, endurance: 12, morale: 16 },
    growth: { strength: 'C', agility: 'A', endurance: 'C', morale: 'S' },
    traits: ["Wise", "Aloof"],
    loyalty: 45, trust: 55,
    milestones: { 10: "Frost Affinity", 20: "Ice Oracle", 30: "Absolute Zero" }
  },
  mira: {
    name: "Mira", emoji: "🌙", title: "The Shadow Dancer",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 11, agility: 18, endurance: 11, morale: 13 },
    growth: { strength: 'C', agility: 'S', endurance: 'D', morale: 'B' },
    traits: ["Quick-Witted", "Sarcastic"],
    loyalty: 35, trust: 50,
    milestones: { 10: "Shadow Clones", 20: "Void Step", 30: "Nexus Convergence" }
  },
  torvin: {
    name: "Torvin", emoji: "⚒️", title: "The Iron Forge",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 17, agility: 9, endurance: 18, morale: 12 },
    growth: { strength: 'A', agility: 'D', endurance: 'S', morale: 'D' },
    traits: ["Determined", "Pragmatic"],
    loyalty: 60, trust: 45,
    milestones: { 10: "Forge Master", 20: "Unbreakable", 30: "Titan's Strength" }
  },
  lyris: {
    name: "Lyris", emoji: "🌿", title: "The Naturalist",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 12, agility: 13, endurance: 14, morale: 17 },
    growth: { strength: 'B', agility: 'B', endurance: 'B', morale: 'A' },
    traits: ["Compassionate", "Serene"],
    loyalty: 55, trust: 60,
    milestones: { 10: "Green Affinity", 20: "Life Weaver", 30: "Nature's Avatar" }
  },
  vex: {
    name: "Vex", emoji: "🎭", title: "The Trickster",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 9, agility: 16, endurance: 10, morale: 15 },
    growth: { strength: 'D', agility: 'A', endurance: 'E', morale: 'B' },
    traits: ["Cunning", "Experimental"],
    loyalty: 30, trust: 35,
    milestones: { 10: "Master Deceiver", 20: "Illusion Master", 30: "Void Walker" }
  },
  cass: {
    name: "Cassandra", emoji: "📖", title: "The Archivist",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 8, agility: 11, endurance: 13, morale: 18 },
    growth: { strength: 'E', agility: 'C', endurance: 'C', morale: 'S' },
    traits: ["Wise", "Curious"],
    loyalty: 50, trust: 65,
    milestones: { 10: "Forbidden Lore", 20: "Reality Scholar", 30: "Oracle's Foresight" }
  },
  roku: {
    name: "Roku", emoji: "⚡", title: "The Storm Bearer",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 14, agility: 15, endurance: 13, morale: 14 },
    growth: { strength: 'B', agility: 'A', endurance: 'B', morale: 'B' },
    traits: ["Charismatic", "Ambitious"],
    loyalty: 48, trust: 52,
    milestones: { 10: "Storm Caller", 20: "Thunder Lord", 30: "Draconic Ascension" }
  },
  nyx: {
    name: "Nyx", emoji: "💀", title: "The Death Dealer",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 15, agility: 14, endurance: 12, morale: 11 },
    growth: { strength: 'A', agility: 'A', endurance: 'C', morale: 'D' },
    traits: ["Honorable", "Vigilant"],
    loyalty: 40, trust: 42,
    milestones: { 10: "Death's Shadow", 20: "Reaper's Covenant", 30: "Phoenix Rebirth" }
  },
  elis: {
    name: "Elis", emoji: "✨", title: "The Radiant",
    level: 1, exp: 0, expToNext: 100,
    stats: { strength: 10, agility: 12, endurance: 14, morale: 19 },
    growth: { strength: 'C', agility: 'C', endurance: 'B', morale: 'S' },
    traits: ["Compassionate", "Honorable"],
    loyalty: 70, trust: 70,
    milestones: { 10: "Divine Touch", 20: "Blessed Soul", 30: "Absolute Will" }
  }
};

export default function Game() {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [gameState, setGameState] = useState({
    day: 1, time: "dawn", location: "camp",
    inventory: [], gold: 100,
    npcs: JSON.parse(JSON.stringify(NPC_DATA))
  });
  
  const handleStart = () => setShowIntro(false);

  const introMessages = [
    {
      type: "mp",
      cap: "SYSTEM BOOT",
      txt: "The ashes settle. A crown lies before you."
    },
    {
      type: "mp red",
      cap: "WARNING",
      txt: "The old world burns. Will you rise from the ashes?"
    },
    {
      type: "si",
      cap: "INITIALIZE",
      txt: "Bonds will be forged.\nFates will be rewritten.\nA kingdom shall rise.\n\n> Press ENTER to begin"
    }
  };

  const intro = introMessages[introStep];

  if (showIntro) {
    return (
      <div className="intro">
        <style>{css}</style>
        <div className="intro-inner">
          <div className={intro.type}>
            <div className="mp-cap">{intro.cap}</div>
            <div className={intro.type === "si" ? "st" : "mp-txt"}>
              {intro.txt}
            </div>
          </div>
          {introStep === introMessages.length - 1 && (
            <button className="ibtn" onClick={handleStart}>
              Enter Game
            </button>
          )}
          {introStep < introMessages.length - 1 && (
            <button className="ibtn" onClick={() => setIntroStep(s => s + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="root">
      <style>{css}</style>
      <div className="game">
        <div className="topbar">
          <div className="gtitle">⚔ FROM ASHES TO CROWN</div>
          <div className="gdate">Day {gameState.day} — {gameState.time}</div>
          <div className="res-bar">
            <div className="res">
              <span className="rsp">◆</span> <span className="rv">{gameState.gold}</span>
            </div>
          </div>
        </div>
        
        <div className="lp">
          <div className="pt">Characters</div>
          {Object.entries(gameState.npcs).map(([key, npc]) => (
            <div key={key} className="nc">
              <div className="nav">{npc.emoji}</div>
              <div className="nname">{npc.name}</div>
              <div className="nttl">{npc.title}</div>
              <div className="nlvl">Lvl {npc.level} ({npc.exp}/{npc.expToNext})</div>
              <div className="sr">
                <span className="sn">MORALE</span>
                <div className="sbg"><div className="sf" style={{width: (npc.morale/20)*100 + '%'}}></div></div>
                <span className="sv">{npc.morale}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="ctr">
          <div className="story">
            <div className="ep">
              <div className="eph">Story</div>
              <div className="epb">
                <p>The kingdom lies in ruins. Ten souls gather at dawn to forge a new future.</p>
                <p>Your choices will shape their destinies and determine the fate of the realm.</p>
              </div>
            </div>
          </div>
          <div className="choices">
            <div className="clbl">Actions</div>
            <button className="cbtn">Train with the warriors</button>
            <button className="cbtn">Gather supplies in the market</button>
            <button className="cbtn">Rest and restore morale</button>
            <button className="cbtn">Advance time</button>
          </div>
        </div>

        <div className="rp">
          <div className="pt">Status</div>
          <div style={{fontSize: '12px', color: 'var(--parch2)', lineHeight: '1.6'}}>
            <p><strong>Location:</strong> {gameState.location}</p>
            <p><strong>Time:</strong> {gameState.time}</p>
            <p><strong>Characters:</strong> Ready</p>
            <p style={{opacity: 0.6, marginTop: '10px', fontSize: '10px'}}>
              System online. Awaiting command.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
