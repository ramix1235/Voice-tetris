function addBlocksScene() {
    let blocksBackground = createBlock(41, 40, 1, 0xA5A5A5);
    blocksBackground.position.x = -41 / 2;
    blocksBackground.position.z = -20;
    // blocksBackground.position.y = 0.5;
    // blocksBackground.rotation.z = 0.6 * Math.PI / 180;

    // blocksBackground.position.z = -8;
    // blocksBackground.position.y = 0.2;
    // blocksBackground.rotation.y = 28 * Math.PI / 180;

    let blocksBasement = createBlock(41, 1, 1, 0xA5A5A5);
    blocksBasement.position.x = -41 / 2;
    blocksBasement.position.z = 20;
    // blocksBasement.position.y = 0.5;
    // blocksBasement.rotation.z = 0.6 * Math.PI / 180;

    // blocksBasement.position.z = 27;
    // blocksBasement.position.x = -8.7;
    // blocksBasement.rotation.y = 28 * Math.PI / 180;

    activeObj = createYellowBlock();
    activeObj.position.x = -10;
    // activeObj.rotation.y = 28 * Math.PI / 180;
    // activeObj.rotation.z = 0.6 * Math.PI / 180;
    activeObj = createPurpleBlock();
    activeObj.position.x = 10;
    // activeObj.rotation.y = 28 * Math.PI / 180;
    // activeObj.rotation.z = 0.6 * Math.PI / 180;
    activeObj = createTealBlock();
    activeObj.position.y = 10;
    // activeObj.rotation.y = 28 * Math.PI / 180;
    // activeObj.rotation.z = 0.6 * Math.PI / 180;
    activeObj = createRedBlock();
    activeObj.position.z = 10;
    // activeObj.rotation.y = 28 * Math.PI / 180;
    // activeObj.rotation.z = 0.6 * Math.PI / 180;
    activeObj = createBlueBlock();
    // activeObj.rotation.y = 28 * Math.PI / 180;
    // activeObj.rotation.z = 0.6 * Math.PI / 180;
}

function createYellowBlock() {
    return createBlock(2, 1, 2, 0xD8D80E);
};

function createPurpleBlock() {
    let figure = createBlock(3, 1, 2, 0x7802AD);
    figure.children.splice(5, 1);
    figure.children.splice(3, 1);
    return figure;
};

function createTealBlock() {
    return createBlock(4, 1, 1, 0x1EBFAF);
};

function createRedBlock() {
    let figure = createBlock(3, 1, 2, 0xB50202);
    figure.children.splice(2, 2);
    return figure;
};

function createBlueBlock() {
    let figure = createBlock(3, 1, 2, 0x1617AD);
    figure.children.splice(3, 2);
    return figure;
};

function createBlock(width, height, depth, color, shift = 1.02) {
    const block = new THREE.Group();
    for (let k = 0; k < depth; k++) {
        for (let i = 0; i < width; i++) {
            block.add(createUnit(color, { x: i * shift, y: false, z: k * shift }));
            for (let j = 1; j < height; j++) {
                block.add(createUnit(color, { x: i * shift, y: j * shift, z: k * shift }));
            }
        }
    }
    scene.add(block);
    return block;

    function createUnit(color, coords) {
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boxMaterial = new THREE.MeshPhongMaterial({ color: color });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.castShadow = true;
        box.receiveShadow = true;
        box.position.set(coords.x || 0, coords.y || 0, coords.z || 0);

        const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 12);
        const cylinderMaterial = new THREE.MeshPhongMaterial({ color: color });
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        cylinder.position.set(coords.x || 0, coords.y || 0, coords.z || 0);
        cylinder.position.y += 0.6;

        // For merge
        box.updateMatrix();
        cylinder.updateMatrix();
        const singleGeometry = new THREE.Geometry();
        singleGeometry.merge(box.geometry, box.matrix);
        singleGeometry.merge(cylinder.geometry, cylinder.matrix);
        return new THREE.Mesh(singleGeometry, boxMaterial);
        // return new THREE.Group().add(box, cylinder);
    };
};