let myStorage = window.localStorage
function setGameProgress(gameSection) {
    myStorage.setItem('escapeIslandGameProgress',gameSection)
}

// functions for display and pointer event changes
function changeDisplayStatus(element,status) {
    let el = document.querySelector(element)
    el.style.display = status
    return el
}
function changePointerEvent(element,status) {
    let el = document.querySelector(element)
    el.style.pointerEvents = status
}

window.onload = () => {

    // display bear upon clicking cave
    function showBear() {
        changeDisplayStatus('#Standing-bear','block')

        // remove pointer events from door 
        changePointerEvent('#Door','none')

        // remove pointer events for cave
        changePointerEvent('#Cave','none')

        // show clue 1
        changeDisplayStatus('#clue1','block')

        playMusic('#bearSound')
    }

    let cave = document.querySelector('#Cave')
    cave.addEventListener('click', showBear)

    let doorPasswordSubmitBtn = document.querySelector('#doorPasswordSubmitBtn')
    doorPasswordSubmitBtn.addEventListener('click',showSuccessMsg)

    function showSuccessMsg(event) {
        event.preventDefault()

        // show success message if password is correct
        if (checkPassword() === true) {
            changeDisplayStatus('#password','none')
            changeDisplayStatus('#earthSuccessModal','block')
            setGameProgress('fireIndex')
        }else{
            // if password is wrong, show error message according to validation type
            let invalidMsg = checkPassword()
            changeDisplayStatus('#invalid','block')
            let el = changeDisplayStatus('#invalid','block')
            el.innerText = invalidMsg
        }
    }

    // simple validation for password
    function checkPassword() {
        let num1 = document.querySelector('#numOne').value
        let num2 = document.querySelector('#numTwo').value
        let num3 = document.querySelector('#numThree').value
        //check for password
        if (num1 === '3' && num2 === '2' && num3 === '6') {
            return true
        // check for more than 1 digit num
        } else if (num1.length > 1 || num2.length > 1 || num3.length > 1) {
            return `Please key in one digit in each blank`
        } else {
            return `The three digit number is wrong. Please try again.`
        }
    }

}
// play sound effect
function playMusic(id) {
    let sound = document.querySelector(id)
    sound.play()
}

// Drag and Drop functions using drag and drop api
function drop_handler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("application/my-app");

    //apple and bear disappears on drop
    if(ev.target.id === 'bearInteraction' && data === 'apple'){
        changeDisplayStatus('#Standing-bear','none')
        changeDisplayStatus('#apple','none')
        changeDisplayStatus('#bearInteraction','none')
        playMusic('#bearSound')

        // remove pointer events from cave
        changePointerEvent('#Cave','none')

        //add pointer events to gate
        changePointerEvent('#Door','auto')
    }

    // Get the id of the target and add the moved element to slot
    if (ev.target.id !== 'bearInteraction' && ev.target.className === 'slot col-2') {
    ev.target.appendChild(document.getElementById(data));
    }
}

function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    // Only allows bear interaction to appear when dragging item and when bear is there
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
    const bear = document.querySelector('#Standing-bear')

    if (bear.style.display === 'block') {
        changeDisplayStatus('#bearInteraction','block')
    }
}

function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}