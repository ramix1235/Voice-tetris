function addBlocksScene() {
    let blocksFloor = new Block(41, 1, 41, new THREE.Color(0xA5A5A5), true).create();
    blocksFloor.THREE.position.x = -41 / 2;
    blocksFloor.THREE.position.x += 0.1;
    blocksFloor.THREE.position.z = -41 / 2;
    blocksFloor.THREE.position.z += 0.1;
    blocksFloor.THREE.position.y = -0.5;
    for (let i = 40, k = 0; i > 1; i -= 4, k++) {
        let wall = new Block(i, 1, 1, new THREE.Color(0xA5A5A5), true).create();
        wall.moveRight(19);
        wall.moveTop(20);
        wall.moveUp(k);
        wall.THREE.rotation.y = Math.PI;
        blockMeshes.push(wall.THREE);
    }
    for (let i = 30, k = 0; i > 1; i -= 4, k++) {
        let wall = new Block(i, 1, 1, new THREE.Color(0xA5A5A5), true).create();
        wall.moveRight(20);
        wall.moveTop(20);
        wall.moveUp(k);
        wall.THREE.rotation.y = -90 * Math.PI / 180;
        blockMeshes.push(wall.THREE);
    }
    let border1 = new Block(41, 1, 1, new THREE.Color(0xA5A5A5), true).create();
    border1.moveLeft(20);
    border1.moveBottom(20);
    blockMeshes.push(border1.THREE);
    let border2 = new Block(39, 1, 1, new THREE.Color(0xA5A5A5), true).create();
    border2.moveLeft(20);
    border2.moveBottom(19);
    border2.THREE.rotation.y = 90 * Math.PI / 180;
    blockMeshes.push(border2.THREE);
    let border3 = new Block(10, 1, 1, new THREE.Color(0xA5A5A5), true).create();
    border3.moveRight(20);
    border3.moveBottom(10);
    border3.THREE.rotation.y = -90 * Math.PI / 180;
    blockMeshes.push(border3.THREE);

    createYellowBlock().moveBottom(10);
    createOrangeBlock().moveTop(10);
    createGreenBlock().moveLeft(10);
    createBlueBlock().moveRight(10);
    activeObj = createRedBlock();
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