// TRAIT POOLS
export const TRAIT_POOL={
  positive:[
    {n:"Hardworking",d:"Output +15%.",tp:"positive"},
    {n:"Brave",d:"Never retreats. +10% MOR in combat.",tp:"positive"},
    {n:"Quick Learner",d:"EXP gain +20%.",tp:"positive"},
    {n:"Loyal to the Bone",d:"Loyalty never drops below 30.",tp:"positive"},
    {n:"Eagle Eye",d:"Spots ambushes. -30% surprise chance.",tp:"positive"},
    {n:"Iron Will",d:"Fights at 10% HP without penalty.",tp:"positive"},
    {n:"Nimble",d:"AGI +20% in combat.",tp:"positive"},
    {n:"Natural Leader",d:"Adjacent serfs +10% all stats.",tp:"positive"},
    {n:"Resilient",d:"Recovers from injuries 50% faster.",tp:"positive"},
    {n:"Precise",d:"Critical hit chance +15%.",tp:"positive"},
    {n:"Patient",d:"Long tasks complete 20% faster.",tp:"positive"},
  ],
  negative:[
    {n:"Reckless",d:"-15% DEF in combat.",tp:"negative"},
    {n:"Resentful",d:"Loyalty gains halved.",tp:"negative"},
    {n:"Cowardly",d:"Retreats when HP < 40%.",tp:"negative"},
    {n:"Lazy",d:"Output -15% unsupervised.",tp:"negative"},
    {n:"Greedy",d:"Needs extra gold to maintain loyalty.",tp:"negative"},
    {n:"Hot-headed",d:"May disobey orders in heated combat.",tp:"negative"},
    {n:"Fragile",d:"END -20%. Injuries take longer.",tp:"negative"},
    {n:"Stubborn",d:"Refuses to change strategy mid-battle.",tp:"negative"},
  ],
  neutral:[
    {n:"Cautious",d:"Never takes unnecessary risks.",tp:"neutral"},
    {n:"Observant",d:"+SP on exploration.",tp:"neutral"},
    {n:"Secretive",d:"Trust grows and drops slowly.",tp:"neutral"},
    {n:"Superstitious",d:"Bad in war, good in religious events.",tp:"neutral"},
    {n:"Ambitious",d:"EXP +10% but loyalty harder to maintain.",tp:"neutral"},
    {n:"Stoic",d:"Unaffected by morale events — good and bad.",tp:"neutral"},
    {n:"Wanderer",d:"+20% exploration, -10% stationary tasks.",tp:"neutral"},
    {n:"Mercantile",d:"+15% gold from commercial activity.",tp:"neutral"},
  ],
  op:[
    {n:"Berserker",d:"Below 30% HP: damage doubles. Has never retreated.",tp:"op"},
    {n:"Aether Touched",d:"All stats +15% near ruins.",tp:"op"},
    {n:"Born Leader",d:"All nearby serfs +10% all stats. Extremely rare.",tp:"op"},
    {n:"Blood Memory",d:"Died and returned. Immune to fear.",tp:"op"},
    {n:"Overclock",d:"Produces 2x in specialty. Needs rest every 3 days.",tp:"op"},
    {n:"Shadow Marked",d:"+25% all combat. -10% loyalty always.",tp:"op"},
    {n:"Duellist",d:"1v1: always wins first exchange.",tp:"op"},
    {n:"Unbreakable",d:"Cannot be killed in combat. Survives with 1 HP.",tp:"op"},
  ],
};

// BUILDINGS
export const BUILDINGS_DEF=[
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

export function getRandTrait(pool,exclude=[]){
  const avail=(TRAIT_POOL[pool]||[]).filter(t=>!exclude.includes(t.n));
  if(!avail.length)return null;
  return {...avail[Math.floor(Math.random()*avail.length)]};
}

export function genTraitOptions(npc){
  const existing=npc.traits.map(t=>t.n);
  const options=[];
  const pos=getRandTrait("positive",existing.concat(options.map(o=>o.n)));
  if(pos)options.push(pos);
  const neu=getRandTrait("neutral",existing.concat(options.map(o=>o.n)));
  if(neu)options.push(neu);
  for(const pool of["positive","neutral","negative"]){
    if(options.length>=3)break;
    const t=getRandTrait(pool,existing.concat(options.map(o=>o.n)));
    if(t&&!options.find(o=>o.n===t.n))options.push(t);
  }
  return options.slice(0,3);
}
