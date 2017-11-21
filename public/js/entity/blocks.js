const Block = class Block extends BaseClass {
    constructor(width, height, depth, color, shift) {
        super();
        this.name = 'block';
        this.color = color;
        this.shift = shift || 1.02;
        this.size = {
            x: width,
            y: height,
            z: depth
        };
        // this.unitSize = {
        //     rectangle: {
        //         z: 1,
        //         y: 1,
        //         z: 1
        //     },
        //     cylinder: {
        //         z: 0.2,
        //         y: 0.2,
        //         z: 0.2
        //     }
        // }
    }

    create() {
        const block = new THREE.Group();
        for (let k = 0; k < this.size.z; k++) {
            for (let i = 0; i < this.size.x; i++) {
                block.add(createUnit(this.color, { x: i * this.shift, y: false, z: k * this.shift }));
                for (let j = 1; j < this.size.y; j++) {
                    block.add(createUnit(this.color, { x: i * this.shift, y: j * this.shift, z: k * this.shift }));
                }
            }
        }
        block.position.y = 0.5;
        this.setTHREE(block);
        scene.add(block);
        return this;

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
    }
};