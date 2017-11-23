function addEventListeners() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('speeching', speeching, false);
    window.addEventListener('keydown', onKeydown, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
};

function onKeydown(event) {
    let originPoint = activeObj.THREE.position.clone();
    switch (event.which) {
        case 65: activeObj.moveLeft(); break;
        case 68: activeObj.moveRight(); break;
        case 83: activeObj.moveBottom(); break;
        case 87: activeObj.moveTop();
    }
    if (isIntersects(activeObj.THREE, blockMeshes)) {
        activeObj.THREE.position.set(originPoint.x, originPoint.y, originPoint.z);
    }
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
    let originPoint = activeObj.THREE.rotation.clone();
    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([activeObj.THREE], true);
    if (intersects.length > 0) {
        devModules.controls.enableRotate = false;
        devModules.controls.enablePan = false;
        switch (event.which) {
            case 1: activeObj.rotateLeft(); break;
            case 3: activeObj.rotateRight(); break;
        }
    }
    if (isIntersects(activeObj.THREE, blockMeshes)) {
        activeObj.THREE.rotation.set(originPoint.x, originPoint.y, originPoint.z);
    }
};
