// EVENTS DATABASE - This is a partial set. The full event data is in the original file.
// Events are loaded dynamically and can be extended here.

export const EV = {
  start_arrival: {
    id: 'start_arrival',
    title: 'The Arrival',
    n: 'The carriage lurches to a stop. Through cracked wooden slats you glimpse your inheritance for the first time.\n\nEmbervale.\n\nThe name suggests fire and life. What you see is neither. Collapsed fencing. Fields that gave up two seasons ago. A manor house that looks ashamed of itself.\n\nMira stands at the gate, arms crossed. She has been dreading this.',
    s: 'New body assessment: passable. Estate: catastrophic. Debt: genuinely impressive — the previous owner had a talent for spending money that didn\'t exist. The only way from here is up. Statistically.',
    c: [
      { t: 'Step out and greet Mira with confidence — act like you belong here', h: 'Charisma', fx: { day: 1, stats: { charisma: 1 }, npcs: [{ id: 'mira', l: 3, t: 2 }] }, nx: 'mira_report' },
      { t: 'Ask Mira quietly what the real situation is before anything else', h: 'Intelligence', fx: { day: 1, stats: { intelligence: 1 }, npcs: [{ id: 'mira', l: 0, t: 5 }] }, nx: 'mira_report' },
      { t: 'Survey the land yourself first — walk the property before speaking', h: 'Unlock Observation', fx: { day: 1, stats: { intelligence: 1, cunning: 1 }, skill: { n: 'Observation', lv: 1, tp: 'medieval', d: 'You notice things others miss' } }, nx: 'mira_report' }
    ]
  },
  mira_report: {
    id: 'mira_report',
    title: 'Several Problems',
    n: 'Mira leads you through the manor with the brisk efficiency of someone who has accepted disaster as a lifestyle.\n\n"The roof leaks in three places. East field hasn\'t produced in two seasons. Eight serfs left — four fled when they heard you were coming back. Grain stores last thirty days if we\'re careful. Twenty if not."\n\nShe stops at the main room. Two chairs. A window with no glass.\n\n"A man named Cortez came two weeks ago. Said Lord Ashvane owes him two thousand three hundred and forty gold. He smiled when he said it. Men only smile like that when they\'re certain of the outcome."',
    s: 'Cortez charges 8% monthly interest. In three months you\'ll owe over three thousand coins. In a year, close to seven thousand. \'Problem\' feels inadequate. \'Catastrophe\' is more accurate.',
    c: [
      { t: 'Ask Mira how the previous lord let things get this bad', h: 'Learn history, +Trust', fx: { sp: 5, npcs: [{ id: 'mira', l: 0, t: 3 }] }, nx: 'hub' },
      { t: 'Focus on the debt — ask if there\'s anything to sell right now', h: 'Quick gold', fx: { gold: 45, rep: -2, sp: 5 }, nx: 'hub' },
      { t: 'Tell Mira you plan to turn this around — ask for her full cooperation', h: 'Leadership', fx: { stats: { leadership: 1 }, npcs: [{ id: 'mira', l: 5, t: 2 }] }, nx: 'hub' }
    ]
  },
  hub: {
    id: 'hub',
    title: 'What Next?',
    n: 'The day is yours. Embervale runs in the background — serfs at their tasks, crops growing or dying, the debt quietly accumulating interest. Every choice moves something forward and delays something else.\n\nThat\'s the job.',
    s: null,
    c: [
      { t: 'Work the fields with Aldric — hands in the soil', h: '+Food, +Aldric', fx: { day: 2, food: 10, npcs: [{ id: 'aldric', l: 3 }], stats: { strength: 1, leadership: 1 } }, nx: 'hub' },
      { t: 'Gather wood from the forest', h: '+Wood, possible encounter', fx: { day: 2, wood: 18, stats: { strength: 1 } }, nx: 'hub' },
      { t: 'Spend time with Mira — understand how this place really works', h: '+Mira trust', fx: { day: 1, npcs: [{ id: 'mira', l: 4, t: 4, a: 4 }], sp: 10 }, nx: 'hub' },
      { t: 'Return to main hub for more options', h: 'Continue', fx: {}, nx: 'hub' }
    ]
  }
};
