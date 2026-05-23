import { BUILDINGS_DEF } from './buildings';
import { NPCS_DEF } from './characters';

export const initState = {
  day: 1,
  gold: 47,
  debt: 2340,
  sp: 0,
  food: 30,
  wood: 10,
  stone: 0,
  population: 8,
  reputation: 5,
  stats: { charisma: 3, intelligence: 8, strength: 2, leadership: 1, cunning: 4 },
  skills: [],
  buildings: BUILDINGS_DEF.map((b) => ({ ...b })),
  npcs: NPCS_DEF.map((n) => ({ ...n })),
  achievements: [],
  curEv: 'start_arrival'
};
