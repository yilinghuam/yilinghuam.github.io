let myStorage = window.localStorage
let startGameBtn = document.querySelector('#startGameBtn')

// selects html file based on gameProgress
window.onload = () => {
    let gameProgress = myStorage.getItem('escapeIslandGameProgress')
    if (gameProgress === null) {
        startGameBtn.setAttribute('href','./Earth/earthIndex.html')
    }else if (gameProgress === 'earthPart1') {
        startGameBtn.setAttribute('href','./Earth/EarthPart1/earth.html')
    }else if (gameProgress === 'earthPart2') {
        startGameBtn.setAttribute('href','./Earth/EarthPart2/earthPart2.html')
    }else if (gameProgress === 'fireIndex') {
        startGameBtn.setAttribute('href', './Fire/indexFire.html')
    }

    let resetProgressBtn = document.querySelector('#resetProgressBtn')
    resetProgressBtn.addEventListener('click', () => {
        myStorage.removeItem('escapeIslandGameProgress')
        startGameBtn.setAttribute('href','./Earth/earthIndex.html')
    })
}