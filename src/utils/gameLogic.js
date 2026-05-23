import { TITLES } from '../data/constants';

export function getTitle(state) {
  let title = TITLES[0].n;
  for (const ti of TITLES) {
    if (state.reputation >= ti.r && state.gold >= ti.g && state.population >= ti.p) {
      title = ti.n;
    }
  }
  return title;
}

export function applyFx(state, fx) {
  const s = JSON.parse(JSON.stringify(state));

  if (fx.gold) s.gold = Math.max(0, s.gold + fx.gold);
  if (fx.food) s.food = Math.max(0, s.food + fx.food);
  if (fx.wood) s.wood = Math.max(0, s.wood + fx.wood);
  if (fx.stone) s.stone = Math.max(0, s.stone + fx.stone);
  if (fx.pop) s.population = Math.max(1, s.population + fx.pop);
  if (fx.rep) s.reputation = Math.max(0, Math.min(100, s.reputation + fx.rep));
  if (fx.sp) s.sp = Math.max(0, s.sp + fx.sp);
  if (fx.debt) s.debt = Math.max(0, s.debt + fx.debt);

  if (fx.day) {
    s.day += fx.day;
    if (s.buildings.find((b) => b.id === 'small_farm' && b.built)) s.food = Math.max(0, s.food + fx.day * 5);
    if (s.buildings.find((b) => b.id === 'woodcutter' && b.built)) s.wood = Math.max(0, s.wood + fx.day * 15);
    if (s.buildings.find((b) => b.id === 'quarry' && b.built)) s.stone = Math.max(0, s.stone + fx.day * 12);
    if (s.buildings.find((b) => b.id === 'market' && b.built)) s.gold = Math.max(0, s.gold + fx.day * 6);
    s.debt = Math.round(s.debt * Math.pow(1.003, fx.day));
  }

  if (fx.stats) {
    Object.entries(fx.stats).forEach(([k, v]) => {
      if (s.stats[k] !== undefined) s.stats[k] = Math.max(0, Math.min(100, s.stats[k] + v));
    });
  }

  if (fx.skill) {
    const ex = s.skills.find((sk) => sk.n === fx.skill.n);
    if (!ex) s.skills = [...s.skills, fx.skill];
  }

  if (fx.npcs) {
    fx.npcs.forEach((ch) => {
      const i = s.npcs.findIndex((n) => n.id === ch.id);
      if (i >= 0) {
        if (ch.l) s.npcs[i].l = Math.max(0, Math.min(100, s.npcs[i].l + (ch.l || 0)));
        if (ch.t) s.npcs[i].t = Math.max(0, Math.min(100, s.npcs[i].t + (ch.t || 0)));
        if (ch.a && s.npcs[i].a !== null) s.npcs[i].a = Math.max(0, Math.min(100, (s.npcs[i].a || 0) + (ch.a || 0)));
      }
    });
  }

  if (fx.bld) {
    const i = s.buildings.findIndex((b) => b.id === fx.bld);
    if (i >= 0) s.buildings[i].built = true;
  }

  if (fx.ach && !s.achievements.find((a) => a.n === fx.ach.n)) {
    s.achievements = [...s.achievements, fx.ach];
  }

  const builtIds = s.buildings.filter((b) => b.built).map((b) => b.id);
  s.npcs = s.npcs.map((npc) => {
    if (npc.un) return npc;
    let ok = true;
    if (npc.urb && !builtIds.includes(npc.urb)) ok = false;
    if (npc.ur && s.reputation < npc.ur) ok = false;
    return ok ? { ...npc, un: true } : npc;
  });

  return s;
}
