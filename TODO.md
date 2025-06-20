# TODO:

- [x] Basic Theme and colors
- [x] Basic UI Layout
- [x] Test Upgrade list
- [x] Upgrade shop
- [x] Save system
- [x] Load system
- [x] Reset progress logic
- [x] Display amount of upgrades bought
- [x] Upgrade logic
- [x] Options menu UI
- [x] Reset Button
- [x] Spacebar, enter for clicking
- [x] <a id="d1"></a>Add backdrop that closes siebars when clicked
- [x] Move all buttons to the bottom
- [x] Replace footer buttons with svg's
- [x] Add customisation window/screen
- [x] Add Prestiege window/screen
- [x] <a id="d2"></a>Add Statistics window
- [x] Statistics logic
- [x] Full Upgrade list
- [x] Move upgrade-buy update function into individual buttons
- [x] Pull files apart
- [x] Add customisation style and extra currency
- [x] Added Music and mute button, volume slider
- [x] Added Sounds
- [x] <a id="d3"></a>Roach-squasher minigame
- [ ] Minigame logic & sound
- [ ] Add extra currency style and logic
        - how to get currency, spending, saving
- [ ] Add customisation logic
- [ ] Add prestige logic
- [x] Export CSV savefile
- [x] Reset confirmation and CSV prompt
- [-] Sounds and Music
        - switch clothing sound, minigame sound
- [x] Options menu logic
- [ ] More hats
- [ ] Achievements / Meilensteine
        - savesystem, display/window

---

## Upgrades

When adding a new upgrade, add its definition to the upgrade_definitions.json file following the same format and add the upgrade-id to boughtUpgrades in script.js. boughtUpgrades entry must equal upgrade_definitoins.id!

---

### Feature ideas

- Upgrade Milestones lead to Upgrades... of the Upgrades!
- NO autoclick or bad autoclick progression
- Overdriver: timed multiplier, charged by clicking
- Multiplier: level based persistend multiplier, x number of clicks results in 0.01 mult increase, x increased with each level
- Mini-games: reward currency, upgrades or timed multiplier [IN_PROGRESS](#d3)
- CookieClickers style "cookie-showers"
- Dynamic Ui
- Over-the-top on screen effects and sounds
- Floating numbers?
- Progression: Upgrade unlocks at milestones, maybe also visual changes
- Secondary resource for specific occasions (milestone upgrades?)
- Progress bar, graph or other evolution (callback to visual changes)
- Random events [IN_PROGRESS](#d3)
- Stats - [DONE](#d2)
- Prestige System: Permanent Upgrades and Cosmetics
- Bug loan system: A certain upgrade, that will leave you with negative bugs fixed => UI glitchy/bugged
- litlle funny hats

---

### Emotional Manipulation

- Surprises and memorable moments
- Affection and Connection, bonding with pet/game
- Humor: tomfoolery and mischief
- Mystery and Lore (might be a bust)
- Progress Satisfaction: "celebration" for moments and milestones, visual elements(callback to progress bars), sounds ("Ding!")
- Personal acknowledgement: "I'm pround of you son."
- Leveling System: Make the User aware of the progress made

---

### Mobile

- Seperate mobile site for better ergonomics and styllle
- away with sidebars, popup windows for options/shop
- allow only "one tab" at a time - [DONE](#d1)
