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
    let originPoint;
    if (helperGame.activeBlock) {
        originPoint = helperGame.activeBlock.THREE.position.clone();
    } else {
        return;
    }
    switch (event.which) {
        case 37:
        case 65: helperGame.activeBlock.moveLeft(); break;
        case 39:
        case 68: helperGame.activeBlock.moveRight(); break;
        case 40:
        case 83: helperGame.activeBlock.moveBottom(); break;
        case 38:
        case 87: helperGame.activeBlock.moveTop();
    }
    if (isIntersects(helperGame.activeBlock.THREE, blockMeshes)) {
        helperGame.activeBlock.THREE.position.set(originPoint.x, originPoint.y, originPoint.z);
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
    // devModules.controls.enablePan = true;
};

function onMouseDown(event) {
    let originPoint;
    if (helperGame.activeBlock) {
        originPoint = helperGame.activeBlock.THREE.position.clone();
    } else {
        return;
    }
    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([helperGame.activeBlock.THREE], true);
    if (intersects.length > 0) {
        devModules.controls.enableRotate = false;
        // devModules.controls.enablePan = false;
        switch (event.which) {
            case 1: helperGame.activeBlock.rotateLeft(); break;
            case 3: helperGame.activeBlock.rotateRight(); break;
        }
    }
    if (isIntersects(helperGame.activeBlock.THREE, blockMeshes) || isIntersects(helperGame.activeBlock.THREE, invisibleMeshes)) {
        helperGame.activeBlock.THREE.rotation.set(originPoint.x, originPoint.y, originPoint.z);
    }
};

function onClickStartGame() {
    helperGame.start = true;
    // devModules.controls.enableZoom = true;
    devModules.controls.autoRotate = false;
    document.getElementById('btn_start').style.top = '92%';
    document.getElementById('statistics').style.display = 'none';
    setTimeout(() => {
        document.getElementById('btn_voice').style.display = 'inline-block';
        document.getElementById('btn_start').style.display = 'none';
        document.getElementById('speech').style.display = 'inline-block';
        document.getElementById('btn_start').getElementsByTagName('span')[0].innerHTML = 'START VOICE ';
    }, 1000);
};
