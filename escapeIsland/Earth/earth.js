//TODO
//Need to add disabled func to the first card that is open too so card count cant increase

window.onload = () => {
    // Arrays of interactive objects and the results of interaction
    const earthPanelInteractiveArray = document.querySelectorAll('.InteractiveObj')
    console.log(earthPanelInteractiveArray)

    //1. animate bag falling to retrieve apple(for later use)
    const bag = earthPanelInteractiveArray[4]
    const fallenBag = earthPanelInteractiveArray[5]
    const apple = document.querySelector('#apple')

    bag.addEventListener('click', () => {
        bag.style.display = 'none'
        fallenBag.style.display = 'block'
        apple.style.display = 'block'
    })

    //2. tent JS for matching card game
    const tent = earthPanelInteractiveArray[2]
    console.log(tent)
 
    const tentModal = document.querySelector('#tentModal')
    const tentModalCompleteBtn = document.querySelector('#tentModalCompleteBtn')
    
    //variables
    let cardOptions = ['fas fa-globe-asia','fas fa-mountain','fas fa-map','fas fa-paw','fas fa-globe-asia','fas fa-mountain','fas fa-map','fas fa-paw']
    let cardArray = document.querySelectorAll('.card')
    let cardClickedCount = 0
    let previousOpenCard = ''
    let completedCard = 0

    //shuffle func for cardOptions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function toggleCard(element,status) {
        switch(status) {
            case 'open':
                element.classList.remove('close')
                element.classList.add(status);
                element.classList.add('disabled')
                break;
            case 'close':
                element.classList.remove('open');
                element.classList.remove('disabled')
                element.classList.add(status)
                break;
            case 'disabled':
                element.classList.add(status)
        }
    }

    //open card
    function openCard(cardArray,i) {
        let icon = cardArray[i].querySelector('i')  
        icon.className = cardOptions[i]             
        console.log(icon)
        toggleCard(cardArray[i],'open')
    }

    //close current card and previous card
    function closeCard(cardArray,i) {
        let icon = cardArray[i].querySelector('i')
        icon.className = 'none'
        let previousCardIcon = previousOpenCard.querySelector('i')
        previousCardIcon.className = 'none'
        toggleCard(cardArray[i],'close')
        toggleCard(previousOpenCard,'close')
        previousOpenCard = ''
    }

    //match card function
    function matchCard(cardArray,i) {
        let previousOpenCardOption = previousOpenCard.querySelector('i').className

        if (cardOptions[i] === previousOpenCardOption) {
            //disable matched cards to keep it open
            toggleCard(previousOpenCard,'disabled')
            toggleCard(cardArray[i],'disabled')
            completedCard += 2
        }else {
            //close cards if no match
            setTimeout(closeCard,1000,cardArray,i)
        }
    }
    //End Result of Tent
    function showMatchSticks() {
        const match = document.querySelector('#match')
        match.style.display = 'block'
    }

    shuffleArray(cardOptions)

    //playCards
    function playCards () {
        for (let i = 0; i < cardOptions.length; i++) {
            cardArray[i].addEventListener('click', () => {
                cardClickedCount += 1
                openCard(cardArray,i)
                
                if (cardClickedCount%2 === 1) {
                    previousOpenCard = cardArray[i]
                }
                if (cardClickedCount%2 === 0) {
                    matchCard(cardArray,i)
                }
                //Result of completion
                if (completedCard === 8) {
                    tentModalCompleteBtn.removeAttribute('disabled')
                    tentModalCompleteBtn.addEventListener('click',showMatchSticks)
                }
            })
        }
    }
    const cardStartBtn = document.querySelector('#cardStartBtn')
    cardStartBtn.addEventListener('click',playCards)
   
    // maze game
    let levels = []
    levels[0] = {
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1]
        ],
        player: {
            x: 15,  //col number
            y: 18    //row number
        },
        goal: {
            x: 4,
            y: 0
        },
        theme: 'default'
    }
    // game creation
    function Game(id, level) {
        this.el = document.getElementById(id)
        this.tileTypes = ['floor', 'wall']
        this.tileDim = 5
        this.map = level.map
        this.theme = level.theme
        this.player = {...level.player}
        this.goal = {...level.goal}
        this.player.el = null
        this.rotation = 'up'
    }
    // Tile creation
    Game.prototype.createEl = function(x,type) {
        let el = document.createElement('div')
        el.className = type
        el.classList.add('col')
        return el
    }

    //map creation
    Game.prototype.populateMap = function() {
  
        this.el.className = 'game-container ' + this.theme;
        let tiles = document.getElementById('tiles');

        for (var y = 0; y < this.map.length; y++) {
            let row = document.createElement('div')
            row.className = 'row'
            tiles.appendChild(row)

           for (var x = 0; x < this.map[y].length; x++) {
                 let tileCode = this.map[y][x];
                 let tileType = this.tileTypes[tileCode];
                 let tile = this.createEl(x, tileType);
                 tile.classList.add('tile')
                 tile.setAttribute('id','row'+y+'col'+x)
                 row.appendChild(tile);
           }
        }

      }

     
    
    Game.prototype.placeSprite = function (type) {
        let x = this[type].x
        let y = this[type].y
        let sprite = document.createElement('div')
        let spriteIcon = document.createElement('span')
        spriteIcon.className = "fas fa-arrow-circle-up"
        sprite.appendChild(spriteIcon)
        let divToAppend = document.querySelector('#row'+y+'col'+x)
        sprite.id = type
        divToAppend.appendChild(sprite)
        return sprite
    }
    
    // Player movements. Only update orientation and position if able to move
    Game.prototype.moveUp = function(num) {   
        this.player.y -= 1
        if (this.checkWall(this.player.y,this.player.x)){
            this.updateOrientation(num)
            let rotation = this.rotation
            this.updatePosition(rotation)
            console.log(this.rotation)
        }else{
            this.player.y += 1
        }
    }
    Game.prototype.moveDown = function(num) {
        this.player.y += 1
        if (this.checkWall(this.player.y,this.player.x)){
            this.updateOrientation(num)
            let rotation = this.rotation
            this.updatePosition(rotation)
            console.log(this.rotation)
        }else{
            this.player.y -= 1
        }    
    }
    Game.prototype.moveLeft = function(num) {
        this.player.x -= 1
        if (this.checkWall(this.player.y,this.player.x)){
            this.updateOrientation(num)
            let rotation = this.rotation
            this.updatePosition(rotation)
            console.log(this.rotation)
        }else{
            this.player.x += 1
        }
    }
    Game.prototype.moveRight = function(num) {
        this.player.x += 1
        if (this.checkWall(this.player.y,this.player.x)) {
            this.updateOrientation(num)
            let rotation = this.rotation
            this.updatePosition(rotation)
            console.log(this.rotation)
        }else{
            this.player.x -= 1
        }
    }

    // Collision control
    Game.prototype.checkWall = function(y,x) {
        let divToAppend = document.querySelector('#row'+y+'col'+x)
        if (divToAppend.classList[0] === 'floor' && divToAppend !== null) {
            return true
        }else {
            return false
        }
    }
    
    //Update position
    Game.prototype.updatePosition = function(rotation) {
        let x = this.player.x
        let y = this.player.y
        let iconToChange = this.player.el.childNodes
        iconToChange[0].className = "fas fa-arrow-circle-"+rotation
        let divToAppend = document.querySelector('#row'+y+'col'+x)
        divToAppend.appendChild(this.player.el)
        
    };

    // Update orientation of object // consider rotation of img? 
    Game.prototype.updateOrientation = function(num) {
        let orientation = ['left','up','right','down']
        let index = orientation.indexOf(this.rotation)
        if (num === 37) {
            if (index > 0){
                this.rotation = orientation[index-1]
            }else{
                this.rotation = orientation[orientation.length -1]
            }
        }
        if (num === 38) {
            this.rotation = orientation[index]
        }
        if (num === 39) {
            if (index < orientation.length) {
                this.rotation = orientation[index+1]
            }else{
                this.rotation = orientation[0]
            }
        }
        if (num === 40) {
            if (index < 2) {
                this.rotation = orientation[index + 2]
            }else if (index === 3) {
                this.rotation = orientation[0]
            }else {
                this.rotation = orientation[1]
            }
        }
    }

    // moveFunction with rotation. only if player moved, then there is rotation
    Game.prototype.movePlayer = function(event) {
        event.preventDefault(); 
       
        if (event.keyCode > 36 && event.keyCode < 41) {
            switch (event.keyCode) {
        
                case 37:
                    if (this.rotation === 'down') {
                        this.moveRight(37)
                    }else if (this.rotation === 'left') {
                        this.moveDown(37)
                    }else if (this.rotation === 'right') {
                        this.moveUp(37)
                    }else{
                        this.moveLeft(37)
                        //Original key
                    }
                    break;
                
                case 38:
                    if (this.rotation === 'down') {
                        this.moveDown(38)
                    }else if (this.rotation === 'left') {
                        this.moveLeft(38)
                    }else if (this.rotation === 'right') {
                        this.moveRight(38)
                    }else{
                        this.moveUp(38)
                        //Original key
                    }
                    //rotation no change
                break;
                
                case 39:
                    if (this.rotation === 'down') {
                        this.moveLeft(39)
                    }else if (this.rotation === 'left') {
                        this.moveUp(39)
                    }else if (this.rotation === 'right') {
                        this.moveDown(39)
                    }else{
                        this.moveRight(39)
                        //Original key
                    }
                break;
            
                case 40:
                    if (this.rotation === 'down') {
                        this.moveUp(40)
                    }else if (this.rotation === 'left') {
                        this.moveRight(40)
                    }else if (this.rotation === 'right') {
                        this.moveLeft(40)
                    }else{
                        this.moveDown(40)
                        //Original key
                    }
                    break;
            }
        }
    }

    Game.prototype.keyboardListener = function() {
        document.addEventListener('keydown', event => {
            this.movePlayer(event);
        });
    
    }

    function init() {
        let myGame = new Game('game-container-1',levels[0]);
          
        myGame.populateMap();
        let playerSprite = myGame.placeSprite('player')
        myGame.player.el = playerSprite
        myGame.keyboardListener()

      }
      init();
}


// Get fire animation working upon drag and drop
// Drag and Drop functions using drag and drop api

function drop_handler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("application/my-app");

    //light fire if item is match
    if(ev.target.id === 'campfireInteraction' && data === 'match'){
        const fire = document.querySelector('#Fire')
        const fireglow = document.querySelector('#Fire_glow')
        const clue2 = document.querySelector('#clue2') 
        fire.style.display = 'block'
        fireglow.style.display = 'block'
        clue2.style.display = 'block'
    }
    // prevent other items from lightiing fire
    if(ev.target.id === 'campfireInteraction' && data !== 'match') {
        return
    }

    // Get the id of the target and add the moved element to slot
    if(ev.target.id !== 'campfireInteraction') {
    ev.target.appendChild(document.getElementById(data));
    console.log(ev.target)
    console.log(data)
    }
}

function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
   }

function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}