function addBlocksScene() {
    let blocksFloor = new Block(41, 1, 41, 0xA5A5A5).create();
    blocksFloor.THREE.position.x = -41 / 2;
    blocksFloor.THREE.position.x += 0.1;
    blocksFloor.THREE.position.z = -41 / 2;
    blocksFloor.THREE.position.z += 0.1;
    blocksFloor.THREE.position.y = -0.5;
    for (let i = 40, k = 0; i > 1; i-=4, k++) {
        let wall = new Block(i, 1, 1, 0xA5A5A5).create();
        wall.moveRight(19);
        wall.moveTop(20);
        wall.moveUp(k);
        wall.THREE.rotation.y = Math.PI;
    }
    for (let i = 30, k = 0; i > 1; i-=4, k++) {
        let wall = new Block(i, 1, 1, 0xA5A5A5).create();
        wall.moveRight(20);
        wall.moveTop(20);
        wall.moveUp(k);
        wall.THREE.rotation.y = -90 * Math.PI / 180;
    }
    let border1 = new Block(41, 1, 1, 0xA5A5A5).create();
    border1.moveLeft(20);
    border1.moveBottom(20);
    let border2 = new Block(39, 1, 1, 0xA5A5A5).create();
    border2.moveLeft(20);
    border2.moveBottom(19);
    border2.THREE.rotation.y = 90 * Math.PI / 180;
    let border3 = new Block(10, 1, 1, 0xA5A5A5).create();
    border3.moveRight(20);
    border3.moveBottom(10);
    border3.THREE.rotation.y = -90 * Math.PI / 180;

    createYellowBlock();
    createPurpleBlock();
    createTealBlock();
    createRedBlock();
    activeObj = createBlueBlock();
};

function createYellowBlock() {
    return new Block(2, 1, 2, 0xD8D80E).create();
};

function createPurpleBlock() {
    let figure = new Block(3, 1, 2, 0x7802AD).create();
    figure.THREE.children.splice(5, 1);
    figure.THREE.children.splice(3, 1);
    return figure;
};

function createTealBlock() {
    return new Block(4, 1, 1, 0x1EBFAF).create();
};

function createRedBlock() {
    let figure = new Block(3, 1, 2, 0xB50202).create();
    figure.THREE.children.splice(2, 2);
    return figure;
};

function createBlueBlock() {
    let figure = new Block(3, 1, 2, 0x1617AD).create();
    figure.THREE.children.splice(3, 2);
    return figure;
};