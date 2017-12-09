function create3DText(text, name, pos, sc, rot) {
    const loader = new THREE.FontLoader();
    loader.load('../../public/fonts/KenPixel_Regular.json', (font) => {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 1,
            height: 0.3
        });
        const textMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xA2231D), specular: new THREE.Color(0xFFFFFF) });
        let text3D = new THREE.Mesh(textGeometry, textMaterial);
        if (pos) {
            text3D.position.set(pos.x, pos.y, pos.z);
        }
        if (sc) {
            text3D.scale.set(sc.x, sc.y, sc.z);
        }
        if (rot) {
            text3D.rotation.set(rot.x, rot.y, rot.z);
        }
        text3D.castShadow = true;
        text3D.receiveShadow = true;
        text3D.name = name;
        scene.add(text3D);
    });
};