# From Ashes to Crown

A medieval narrative strategy game built with React. Rebuild your fallen estate through choices, relationships, and resource management.

## Features

✨ **100+ Branching Story Events** - Dynamic narrative with consequences
✨ **Character Relationships** - Build loyalty, trust, and romance with 10+ NPCs
✨ **Resource Management** - Gold, food, wood, stone, reputation
✨ **Building System** - 18 unique buildings with production chains
✨ **Stat & Skill Progression** - 5 stats that unlock new options
✨ **Achievement System** - Track your accomplishments
✨ **Medieval UI** - Gorgeous hand-crafted interface

## Quick Start

```bash
npm install
npm run dev
```

The game will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── IntroScreen.jsx
│   ├── Game.jsx
│   ├── Topbar.jsx
│   ├── LeftPanel.jsx
│   ├── CenterPanel.jsx
│   ├── RightPanel.jsx
│   └── Achievement.jsx
├── data/
│   ├── constants.js        # Months, seasons, titles
│   ├── buildings.js        # All building definitions
│   ├── characters.js       # NPC data
│   ├── events.js           # Story events
│   └── gameState.js        # Initial game state
├── utils/
│   └── gameLogic.js        # State logic, title calculation
└── styles/
    └── global.css          # All styling
```

## Game Mechanics

### Resources
- **Gold**: Currency for building and paying debts
- **Food**: Keeps serfs alive; decays weekly
- **Wood**: Building material
- **Stone**: Building material
- **Reputation**: Unlocks titles and story paths
- **SP (Story Points)**: Earned through choices; unlocks knowledge

### Character System
Each NPC has three tracked stats:
- **Loyalty**: How much they support you
- **Trust**: How much they confide in you
- **Affection**: Romantic interest (some characters only)

### Event System
Events trigger from story choices and are fully data-driven. Each event:
- Has a title and narrative text
- May include system commentary
- Offers 2-4 choices with different outcomes
- Triggers effects (stat gains, resource changes, NPC updates)
- Chains to next event

### Building System
Build structures to:
- Generate resources (farm, woodcutter, quarry)
- Improve living standards (well, granary)
- Unlock NPCs (tavern, chapel, barracks)
- Increase production (smithy, market, library)
- Defend the estate (watchtower, walls)

## Development Roadmap

### Phase 1 (Current)
- ✅ Modular component structure
- ✅ 100+ story events
- ✅ Basic resource management
- ✅ NPC relationship tracking

### Phase 2 (Next)
- 🔲 Combat system (training, raids, defense)
- 🔲 Marriage/romance mechanics
- 🔲 Faction system (Church, merchants, bandits)
- 🔲 Random events and disasters
- 🔲 NPC deaths and consequences

### Phase 3 (Future)
- 🔲 Save/load game state
- 🔲 Achievement notifications
- 🔲 Mobile optimization
- 🔲 Accessibility improvements
- 🔲 Sound design (ambient, UI feedback)

### Phase 4 (Advanced)
- 🔲 Modding API
- 🔲 Custom event editor
- 🔲 Community event sharing
- 🔲 Expanded map exploration

## Adding Content

### Adding a Story Event

Edit `src/data/events.js`:

```javascript
start_arrival: {
  id: 'start_arrival',
  title: 'The Arrival',
  n: 'Narrative text here',
  s: 'System commentary here',
  c: [
    {
      t: 'Choice text',
      h: 'Hint text',
      fx: { gold: 50, stats: { charisma: 1 } },
      nx: 'next_event_id'
    }
  ]
}
```

### Adding a Building

Edit `src/data/buildings.js`:

```javascript
{
  id: 'unique_id',
  n: 'Building Name',
  ic: '🏢',
  built: false,
  rg: 100,  // gold cost
  rw: 50,   // wood cost
  rs: 0,    // stone cost
  rp: 10,   // population required
  eff: 'Effect description'
}
```

### Adding an NPC

Edit `src/data/characters.js`:

```javascript
{
  id: 'unique_id',
  n: 'Character Name',
  r: 'Role',
  em: '🧑',
  l: 10,      // loyalty
  t: 5,       // trust
  a: 0,       // affection (or null if not romantic)
  li: true,   // likes you initially?
  un: true,   // unlocked from start?
  traits: ['Trait 1', 'Trait 2', 'Trait 3'],
  tt: ['positive', 'positive', 'negative'],
  urb: 'building_id_to_unlock',  // optional
  ur: 50      // reputation to unlock (optional)
}
```

## How Effects Work

When a choice is made, its `fx` object modifies game state:

```javascript
fx: {
  gold: 50,                    // Add/subtract gold
  food: -20,                   // Add/subtract food
  day: 2,                      // Advance time (triggers production)
  stats: { charisma: 2 },      // Boost stats
  npcs: [{ id: 'mira', l: 5 }], // Modify NPC relationships
  skill: {                      // Unlock a skill
    n: 'Observation',
    lv: 1,
    tp: 'medieval',
    d: 'You notice things others miss'
  },
  bld: 'granary',              // Mark building as built
  ach: {                        // Unlock achievement
    ic: '🏪',
    n: 'Against the Rot',
    d: 'Built your first proper building.'
  }
}
```

## Stats System

There are 5 player stats (0-100 scale):
- **Charisma**: Persuasion, charm, leadership
- **Intelligence**: Learning, planning, problem-solving
- **Strength**: Labor, combat, physical tasks
- **Leadership**: Managing people, inspiring loyalty
- **Cunning**: Deception, strategy, manipulation

Higher stats unlock new choices or provide bonuses to existing ones.

## Tips for Expanding

1. **Keep events modular** - Each event should be fairly self-contained
2. **Branch choices logically** - Consequences should make sense
3. **Balance immediate and long-term rewards** - Some choices are tradeoffs
4. **Use stat hints** - Let players know what stat is being tested
5. **Reference past choices** - Track state for continuity
6. **Give multiple paths to success** - Different stat combinations should work

## Build & Deploy

```bash
npm run build
```

Output goes to `dist/` - ready for static hosting.

## License

MIT - Feel free to expand and modify!

## Contributing

Want to add events, buildings, or mechanics? Submit a pull request with:
- New data files in `src/data/`
- Updated component if needed
- Description of what you added

---

**Play the story. Shape the future. Rise from ashes to crown.**
