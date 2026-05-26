// MONTHS & SEASONS
export const MONTHS=["Ashmonth","Greenrise","Rainveil","Bloomtide","Goldmarch","Highsun","Dustwind","Embertide","Harvestfall","Amberleaf","Coldbreeze","Taxmonth","Frostcome","Deepwinter","Iceveil","Lastcold"];
export const SEASONS={0:"Spring",1:"Spring",2:"Spring",3:"Spring",4:"Summer",5:"Summer",6:"Summer",7:"Summer",8:"Autumn",9:"Autumn",10:"Autumn",11:"Autumn",12:"Winter",13:"Winter",14:"Winter",15:"Winter"};

// TITLES
export const TITLES=[{n:"Landed Knight (Exiled)",r:0,g:0,p:0},{n:"Baron of Embervale",r:25,g:500,p:20},{n:"Viscount of Embervale",r:50,g:2000,p:50},{n:"Count of Embervale",r:75,g:10000,p:100},{n:"Marquess of the West",r:82,g:30000,p:200},{n:"Duke of Valdris",r:90,g:50000,p:400}];

// GROWTH RATES
export const GROWTHS={S:2.5,A:2.0,B:1.5,C:1.0,D:0.5,E:0.1};
export const SEASON_AP={Spring:3,Summer:4,Autumn:3,Winter:2};

// CALCULATIONS
export function getTitle(s){
  let t=TITLES[0].n;
  for(const ti of TITLES){if(s.reputation>=ti.r&&s.gold>=ti.g&&s.population>=ti.p)t=ti.n;}
  return t;
}

export function getSeasonAP(day){
  const mi=Math.max(0,Math.floor((day-1)/40)%16);
  return SEASON_AP[SEASONS[mi]]||3;
}

export function expForLevel(lv){
  return Math.round(100*Math.pow(1.3,lv-1));
}

export function calcStats(base,growths,level){
  const s={};
  Object.entries(base).forEach(([k,v])=>{
    s[k]=Math.round(v+(GROWTHS[growths[k]]||1.0)*(level-1));
  });
  return s;
}
