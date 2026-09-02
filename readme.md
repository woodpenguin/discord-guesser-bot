src/
├── index.js
│
├── commands/
│ ├── daily.js
│ └── guess.js
│
├── games/
│ └── smash/
│ ├── smashService.js
│ └── characters.json
│
├── services/
│ └── gameService.js
│
└── utils/

commands/
Discord-specific stuff
Read options
Reply to user

services/
General game coordination

games/smash/
Smash-specific rules

characters.json
Smash character data

    guess.js

↓
gameService.js
↓
smashService.js
↓
characters.json
