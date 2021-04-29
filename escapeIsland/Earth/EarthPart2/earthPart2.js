window.onload = () => {
    let cave = document.querySelector('#Cave')

    

    function showBear() {
        let bear = document.querySelector('#Standing-bear')
        bear.style.display = 'block'
    }
    cave.addEventListener('click', showBear)
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