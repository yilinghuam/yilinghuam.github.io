window.onload = () => {
    let cave = document.querySelector('#Cave')

    // display bear upon clicking cave
    function showBear() {
        const bear = document.querySelector('#Standing-bear')
        bear.style.display = 'block'
        // remove pointer events from door 
        const door = document.querySelector('#Door')
        door.style.pointerEvents = 'none'

        // remove pointer events for cave
        cave.style.pointerEvents = 'none'

        // show clue 1
        const clue1 = document.querySelector('#clue1')
        clue1.style.display = 'block'
    }
    cave.addEventListener('click', showBear)

    let doorPasswordSubmitBtn = document.querySelector('#doorPasswordSubmitBtn')
    doorPasswordSubmitBtn.addEventListener('click',showSuccessMsg)

    function showSuccessMsg(event) {
        event.preventDefault()

        if (checkPassword() === true) {
            const form = document.querySelector('#password')
            form.style.display = 'none'
            const earthSuccessModal = document.querySelector('#earthSuccessModal')
            earthSuccessModal.style.display = 'block'
        }else{
            let invalidMsg = checkPassword()
            console.log(invalidMsg)
            let invalidBlock = document.querySelector('#invalid')
            invalidBlock.innerText = invalidMsg
            invalidBlock.style.display = 'block'
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

// Drag and Drop functions using drag and drop api
function drop_handler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("application/my-app");

    //apple and bear disappears on drop
    if(ev.target.id === 'bearInteraction' && data === 'apple'){
        const bear = document.querySelector('#Standing-bear')
        bear.style.display = 'none'
        const apple = document.querySelector('#apple')
        apple.style.display = 'none'
        const bearInteraction = document.querySelector('#bearInteraction')
        bearInteraction.style.display = 'none'
        // remove pointer events from cave
        const cave = document.querySelector('#Cave')
        cave.style.pointerEvents = 'none'
        //add pointer events to gate
        const door = document.querySelector('#Door')
        door.style.pointerEvents = 'auto'
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
        let bearInteraction = document.querySelector('#bearInteraction')
        bearInteraction.style.display = 'block'
    }
    
   }

function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}