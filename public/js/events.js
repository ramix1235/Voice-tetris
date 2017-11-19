function addEventListeners() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('speeching', speeching, false);
    window.addEventListener('keydown', keydownEvent, false);
};

function keydownEvent(event) {
    switch (event.which) {
        case 65: activeObj.position.x--; break;
        case 68: activeObj.position.x++; break;
        case 83: activeObj.position.z++; break;
        case 87: activeObj.position.z--;
    }
}