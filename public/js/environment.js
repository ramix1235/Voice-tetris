function addEnvironment() {
    loadModels();
    addBlocksScene();
    addLights();
    addShaders();
    addOrbitControls();
};

function addShaders () {
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
  
    const shaderVignette = THREE.VignetteShader;
    const effectVignette = new THREE.ShaderPass(shaderVignette);
    // larger values = darker closer to center
    // darkness < 1  => lighter edges
    effectVignette.uniforms["offset"].value = 0.8;
    effectVignette.uniforms["darkness"].value = 2;
    effectVignette.renderToScreen = true;
    composer.addPass(effectVignette);
};

function addLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 3);

    const spotLight = new THREE.SpotLight(0x696969);
    spotLight.position.set(150, 100, 100);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    const spotLight2 = new THREE.SpotLight(0x696969);
    spotLight2.position.set(150, -100, 100);
    spotLight2.castShadow = true;
    spotLight2.shadow.mapSize.width = 1024;
    spotLight2.shadow.mapSize.height = 1024;

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0x000000);
    // const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 0x000000);
    scene.add(ambientLight, spotLight, spotLight2/*, spotLightHelper, spotLightHelper2*/);
};

function addOrbitControls() {
    devModules.controls = new THREE.OrbitControls(camera, renderer.domElement);
    // devModules.controls.enablePan = false;
    // devModules.controls.enableZoom = false;
    // devModules.controls.autoRotate = true;
    // devModules.controls.maxPolarAngle = 90 * Math.PI / 180;
    // devModules.controls.maxDisnatce = 10;
    // devModules.controls.minDistance = 5;
};