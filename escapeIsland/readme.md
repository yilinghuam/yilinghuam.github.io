# Escape Island Game
You are stranded on a island with 5 different areas. In order to escape, you have to survive through all 5 areas to leave the island. Each island is unique to its own element. 

## 5 Game Sections
* Earth
* Fire
* Wood
* Water
* Metal

## Game Components
* click events
* drag and drop api
* modal
* svg files
* mini games

## Earth
comprises of two sections, each with interactive objects in svg file format


### Section 1a: Earth Panel 1 Walkthrough

1. Tent [Card Matching Game] [item1]
Simple card matching game with 8 cards.
Upon completion, item1 is given.
Collection of [item1: matchstick] done using drag and drop
Bug: cards will not closed if clicked too quickly

2. Paper Bag [item2]
Collection of [item2: apple} done using drag and drop
To be used in section 2 of Earth

3. Campfire [Clue received using item 1]
Drag [item1: apple] to the campfire. 
This will light up the campfire which will show [clue: '2']

4. Boulder (story setting for going through tunnel)
- message pop up
- way ahead blocked

5. Tunnel[Maze game]
- only unlocked and clickable upon collecting apple and receiving clue from campfire. 
- goal: To escape the maze
- No left turn maze (only up and right allowed)
- orientation of player changes with each turn
Upon completion, player moves on to the next section of Earth

### Section 1b: Earth Panel 2 Walkthrough

1. Cave [clue]
Upon clicking the cave, bear comes out of the cave
[clue: '3'] is shown flashing in the cave.

2. Bear 
The bear is hungry and is blocking the gate to escape the Earth Section.
The bear can be removed by feeding it [item1: apple] received in the previous part.

3. Tunnel
Message that states that it is the tunnel which you have come from.

4. Note [number riddle] [clue]
- Mysterious note with a number riddle. 
- Solve the note to receive [clue: '6']

5. Door
Key in three numbers[clues tht you have received] according to the images shown to escape!

###Issues faced
1. Making svg element draggable
Even when i could make it draggable, I had problems figuring out how to drag it into a html element. 

Method used to overcome: use divs and set position of divs instead so i could use HTML5 drag and drop. Divs are made as responsive as possible by using relative positions instead of fixed positions.

2. Making orientation of player change with each turn in the maze game
Done by setting orientation of player with each key press. Then matching next keypress according to the player orientation. (eg. if player is facing right, up means the the moveRight function is invoked.)


###Possible improvements
1. Animations
- animation for movement through tunnel
- guide
- bear coming out from cave

2. Local storage
- to store progress of game


###Current bugs
1. Tent
- clicking too fast resulted in cards not closing




