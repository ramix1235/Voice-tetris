function loadModels() {
    loadOBJModel('../../public/models/Island', 'island', { x: 0, y: -36.4, z: 0 }, { x: 50, y: 50, z: 50 }, { x: 0, y: 0, z: 0 });
    // loadFBXModel('../../public/models/Model', 'model', { x:0, y:0, z:0 }, { x:1, y:1, z:1 });
};

function loadFBXModel(path, name, pos, sc, rot) {
    const loaderFBX = new THREE.FBXLoader(manager);
    loaderFBX.load(`${path}.fbx`, function (object) {
        object.traverse(function (child) {
            child.castShadow = true;
            child.receiveShadow = true;
        });
        object.castShadow = true;
        object.receiveShadow = true;
        object.name = name;
        if (pos) {
            object.position.set(pos.x, pos.y, pos.z);
        }
        if (sc) {
            object.scale.set(sc.x, sc.y, sc.z);
        }
        if (rot) {
            object.rotation.set(rot.x, rot.y, rot.z);
        }
        scene.add(object);
    }, onProgress, onError)
};

function loadOBJModel(path, name, pos, sc, rot) {
    const mtlLoader = new THREE.MTLLoader(manager);
    const objLoader = new THREE.OBJLoader(manager);
    mtlLoader.load(`${path}.mtl`, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(`${path}.obj`, function (obj) {
            obj.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;
                // if (child instanceof THREE.Mesh) {
                // child.material = material;
                // child.material.map = texture;
                // }
            });
            obj.castShadow = true;
            obj.receiveShadow = true;
            if (pos) {
                obj.position.set(pos.x, pos.y, pos.z);
            }
            if (sc) {
                obj.scale.set(sc.x, sc.y, sc.z);
            }
            if (rot) {
                obj.rotation.set(rot.x, rot.y, rot.z);
            }
            obj.name = name;
            scene.add(obj);
        }, onProgress, onError);
    });

};