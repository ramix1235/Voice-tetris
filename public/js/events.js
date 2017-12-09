function addEventListeners() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('speeching', speeching, false);
    window.addEventListener('keydown', onKeydown, false);
    window.addEventListener('keyup', onKeyup, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
};

function onKeydown(event) {
    window.removeEventListener('keydown', onKeydown, false);
    let originPoint = helperGame.activeBlock.THREE.position.clone();
    switch (event.which) {
        case 65: helperGame.activeBlock.moveLeft(); break;
        case 68: helperGame.activeBlock.moveRight(); break;
        case 83: helperGame.activeBlock.moveBottom(); break;
        case 87: helperGame.activeBlock.moveTop();
    }
    if (isIntersects(helperGame.activeBlock.THREE, blockMeshes)) {
        helperGame.activeBlock.intersected = true;
        helperGame.activeBlock.THREE.position.set(originPoint.x, originPoint.y, originPoint.z);
    } else {
        helperGame.activeBlock.intersected = false;
    }
    if (isIntersects(helperGame.activeBlock.THREE, invisibleMeshes)) {
        helperGame.activeBlock.THREE.position.set(originPoint.x, originPoint.y, originPoint.z); 
    }
};

function onKeyup(event) {
    window.addEventListener('keydown', onKeydown, false);
};

function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

function onMouseUp(event) {
    devModules.controls.enableRotate = true;
    devModules.controls.enablePan = true;
};

function onMouseDown(event) {
    let originPoint = helperGame.activeBlock.THREE.rotation.clone();
    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([helperGame.activeBlock.THREE], true);
    if (intersects.length > 0) {
        devModules.controls.enableRotate = false;
        devModules.controls.enablePan = false;
        switch (event.which) {
            case 1: helperGame.activeBlock.rotateLeft(); break;
            case 3: helperGame.activeBlock.rotateRight(); break;
        }
    }
    if (isIntersects(helperGame.activeBlock.THREE, blockMeshes) || isIntersects(helperGame.activeBlock.THREE, invisibleMeshes)) {
        helperGame.activeBlock.THREE.rotation.set(originPoint.x, originPoint.y, originPoint.z);
    }
};
