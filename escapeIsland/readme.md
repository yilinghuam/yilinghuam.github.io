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

## Earth
comprises of two sections, each with interactive objects in svg file format


### Section 1: Earth Panel 1 Walkthrough

To do: add hover animations for svg elements 
    to remove left turn from maze
    tent bugs:if click too quickly, the card does not close
            Need to make tent unclickable once game completed
            maze reset button
    add modal for boulder

1. Tent [Card Matching Game] [item1] [Clue 2? ]
Simple card matching game with 8 cards.
Upon completion, item1 is given.
Collection of matchstick [item1] done using drag and drop

2. Paper Bag [Item 2]
Collection of apple done using drag and drop
To be used in section 2 of Earth

3. Campfire [Clue 1 using item 1]



4. Boulder (story setting for going through tunnel)

5. Tunnel[Maze game]
- goal: To escape the maze
- No left turn maze (only up,down,right allowed)
- orientation of player changes with each turn


###Issues faced
1. Making svg element draggable
Even when i could make it draggable, I had problems figuring out how to drag it into a html element. 

Method used to overcome: use divs and set position of divs instead so i could use HTML5 drag and drop. Divs are made as responsive as possible by using relative positions instead of fixed positions.





