function createWall(count, color, increment, callback) {
    for (let i = count, k = 0; i > 1; i -= increment, k++) {
        let wall = new Block(i, 1, 1, new THREE.Color(color), true).create();
        callback(wall, k);
        blockMeshes.push(wall.THREE);
    }
};

function createBorder(count, color, callback) {
    let border = new Block(count, 1, 1, new THREE.Color(color), true).create();
    callback(border);
    blockMeshes.push(border.THREE);
};

function createDiagonalLine(count, color, direction, callback) {
    for (let i = 0; i < count; i++) {
        let block = new Block(1, 1, 1, new THREE.Color(color), true).create();
        switch (direction) {
            case DIRECTION.left: block.moveLeft(i); break;
            case DIRECTION.right: block.moveRight(i);
        }
        block.moveTop(i);
        callback(block);
        blockMeshes.push(block.THREE);
    }
};

function createLimitationLine() {
    createBorder(19, 0xB50202, (border) => {
        border.moveLeft(9);
        border.moveBottom(10);
        border.moveUp(21);
    });
    createBorder(21, 0xB50202, (border) => {
        border.moveLeft(10);
        border.moveBottom(10);
        border.moveUp(21);
        border.THREE.rotation.y = 90 * Math.PI / 180;
    });
    createBorder(19, 0xB50202, (border) => {
        border.moveLeft(9);
        border.moveTop(10);
        border.moveUp(21);
    });
    createBorder(21, 0xB50202, (border) => {
        border.moveRight(10);
        border.moveBottom(10);
        border.moveUp(21);
        border.THREE.rotation.y = 90 * Math.PI / 180;
    });
    let blocksBridge = new Block(15, 1, 5, new THREE.Color(0xA5A5A5), true).create();
    blocksBridge.moveLeft(25);
    blocksBridge.moveTop(2);
    blocksBridge.moveUp(21);
};

function createFloor() {
    let blocksFloor = new Block(41, 1, 41, new THREE.Color(0xA5A5A5), true).create();
    blocksFloor.THREE.position.x = -41 / 2;
    blocksFloor.THREE.position.x += 0.1;
    blocksFloor.THREE.position.z = -41 / 2;
    blocksFloor.THREE.position.z += 0.1;
    blocksFloor.THREE.position.y = -0.5;
    blockMeshes.push(blocksFloor.THREE);

    createWall(40, 0xA5A5A5, 4, (wall, k) => {
        wall.moveRight(19);
        wall.moveTop(20);
        wall.moveUp(k);
        wall.THREE.rotation.y = Math.PI;
    });
    createWall(30, 0xA5A5A5, 4, (wall, k) => {
        wall.moveRight(20);
        wall.moveTop(20);
        wall.moveUp(k);
        wall.THREE.rotation.y = -90 * Math.PI / 180;
    });
    createBorder(41, 0xA5A5A5, (border) => {
        border.moveLeft(20);
        border.moveBottom(20);
    });
    createBorder(39, 0xA5A5A5, (border) => {
        border.moveLeft(20);
        border.moveBottom(19);
        border.THREE.rotation.y = 90 * Math.PI / 180;
    });
    createBorder(10, 0xA5A5A5, (border) => {
        border.moveRight(20);
        border.moveBottom(10);
        border.THREE.rotation.y = -90 * Math.PI / 180;
    });
};

function createPodium() {
    createWall(9, 0xA5A5A5, 1, (wall, k) => {
        wall.moveTop(k);
        wall.moveLeft(9);
    });
    createWall(9, 0xA5A5A5, 1, (wall, k) => {
        wall.moveBottom(k);
        wall.moveLeft(9);
    });
    createWall(9, 0xA5A5A5, 1, (wall, k) => {
        wall.moveTop(k);
        wall.moveRight(9);
        wall.THREE.rotation.y = Math.PI;
    });
    createWall(9, 0xA5A5A5, 1, (wall, k) => {
        wall.moveBottom(k);
        wall.moveRight(9);
        wall.THREE.rotation.y = Math.PI;
    });
    createWall(7, 0xA5A5A5, 1, (wall, k) => {
        wall.moveTop(k);
        wall.moveBottom(7);
    });
    createWall(7, 0xA5A5A5, 1, (wall, k) => {
        wall.moveTop(k);
        wall.moveBottom(7);
        wall.THREE.rotation.y = Math.PI;
    });
    createWall(7, 0xA5A5A5, 1, (wall, k) => {
        wall.moveBottom(k);
        wall.moveTop(7);
    });
    createWall(7, 0xA5A5A5, 1, (wall, k) => {
        wall.moveBottom(k);
        wall.moveTop(7);
        wall.THREE.rotation.y = Math.PI;
    });

    createBorder(1, 0xA5A5A5, (border) => {
        border.moveLeft(9);
        border.moveTop(8);
    });
    createBorder(1, 0xA5A5A5, (border) => {
        border.moveLeft(9);
        border.moveBottom(8);
    });
    createBorder(1, 0xA5A5A5, (border) => {
        border.moveRight(9);
        border.moveBottom(8);
    });
    createBorder(1, 0xA5A5A5, (border) => {
        border.moveRight(9);
        border.moveTop(8);
    });
    createBorder(1, 0xA5A5A5, (border) => {
        border.moveTop();
    });
    createBorder(1, 0xA5A5A5, (border) => {
        border.moveBottom();
    });
    createBorder(15, 0xA5A5A5, (border) => {
        border.moveLeft(7);
        border.moveTop(8);
    });
    createBorder(15, 0xA5A5A5, (border) => {
        border.moveLeft(7);
        border.moveBottom(8);
    });
    createBorder(17, 0xA5A5A5, (border) => {
        border.moveLeft(8);
        border.moveTop(9);
    });
    createBorder(17, 0xA5A5A5, (border) => {
        border.moveLeft(8);
        border.moveBottom(9);
    });

    createBorder(19, 0xB50202, (border) => {
        border.moveLeft(9);
        border.moveBottom(10);
    });
    createBorder(21, 0xB50202, (border) => {
        border.moveLeft(10);
        border.moveBottom(10);
        border.THREE.rotation.y = 90 * Math.PI / 180;
    });
    createBorder(19, 0xB50202, (border) => {
        border.moveLeft(9);
        border.moveTop(10);
    });
    createBorder(21, 0xB50202, (border) => {
        border.moveRight(10);
        border.moveBottom(10);
        border.THREE.rotation.y = 90 * Math.PI / 180;
    });

    createDiagonalLine(19, 0xB50202, DIRECTION.right, (block) => {
        block.moveLeft(9);
        block.moveBottom(9);
    });
    createDiagonalLine(19, 0xB50202, DIRECTION.left, (block) => {
        block.moveRight(9);
        block.moveBottom(9);
    });
};

function addBlocksScene() {
    createFloor();
    createPodium();
    createLimitationLine();
};

function pushBlockGroupInBlockMeshes(block) {
    block.THREE.children.forEach(item => {
        blockMeshes.push(item);
    });
};

function mergeBlockGroupMeshes(block) {
    let singleGeometry = new THREE.Geometry();
    let singleMaterial = new THREE.MeshPhongMaterial({ color: block.color });

    block.THREE.children.forEach(item => {
        singleGeometry.merge(item.geometry, item.matrix);
    });

    let newMesh = new THREE.Mesh(singleGeometry, singleMaterial);
    newMesh.castShadow = true;
    newMesh.receiveShadow = true;
    newMesh.position.y = 0.5;

    scene.remove(block.THREE);
    scene.add(newMesh);

    block.setTHREE(newMesh);
    block.merged = true;

    return block;
};

function createYellowBlock() {
    let block = new Block(2, 2, 2, new THREE.Color(0xD8D80E)).create();
    pushBlockGroupInBlockMeshes(block);
    return block;
    // return mergeBlockGroupMeshes(block);
};

function createOrangeBlock() {
    let block = new Block(3, 2, 2, new THREE.Color(0xD0820D)).create();
    block.THREE.children.splice(6, 1);
    block.THREE.children.splice(9, 1);
    block.THREE.children.splice(6, 1);
    block.THREE.children.splice(8, 1);
    pushBlockGroupInBlockMeshes(block);
    return block;
    // return mergeBlockGroupMeshes(block);
};

function createGreenBlock() {
    let block = new Block(4, 2, 1, new THREE.Color(0x30AD30)).create();
    pushBlockGroupInBlockMeshes(block);
    return block;
    // return mergeBlockGroupMeshes(block);
};

function createRedBlock() {
    let block = new Block(3, 2, 2, new THREE.Color(0xB50202)).create();
    block.THREE.children.splice(4, 2);
    block.THREE.children.splice(4, 1);
    block.THREE.children.splice(4, 1);
    pushBlockGroupInBlockMeshes(block);
    return block;
    // return mergeBlockGroupMeshes(block);
};

function createBlueBlock() {
    let block = new Block(3, 2, 2, new THREE.Color(0x1617AD)).create();
    block.THREE.children.splice(7, 1);
    block.THREE.children.splice(7, 1);
    block.THREE.children.splice(6, 1);
    block.THREE.children.splice(6, 1);
    pushBlockGroupInBlockMeshes(block);
    return block;
    // return mergeBlockGroupMeshes(block);
};