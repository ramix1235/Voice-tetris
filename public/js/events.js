function addEventListeners() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('speeching', speeching, false);
    window.addEventListener('keydown', keydownEvent, false);
};

function keydownEvent(event) {
    switch (event.which) {
        case 65: activeObj.moveLeft(); break;
        case 68: activeObj.moveRight(); break;
        case 83: activeObj.moveBottom(); break;
        case 87: activeObj.moveTop();
    }
};