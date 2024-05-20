const asideElement = document.getElementById('aside')
const asideTogglerButton = document.getElementById('aside-toggler')

function showAside(){
    asideElement.classList.toggle('hidden')
}

asideTogglerButton.addEventListener('click', showAside)