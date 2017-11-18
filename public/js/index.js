init();
animate();

function init() {
  if (!Detector.webgl) {
    alert('Your graphics card does not seem to support WebGL.');
    return;
  }
  addStats();
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.set(0, 0, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xF5F5F5);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  activeObj = createBox(30, 30, 30, -25, 0, 50);
  create3DText('Vice Tetrice', -5, 0, 65);

  loadFBXModel('../../public/models/base.fbx',1, 1, 1, 55, -180, 0);

  addLights();
  addOrbitControls();
  addEventListeners();
};

function animate() {
  requestAnimationFrame(animate);
  render();
  updateDevModules();
};

function render() {
  renderer.render(scene, camera);
};

function addEventListeners() {
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('speeching', speeching, false);
};

function speeching() {
  let sentence = speechComand.split(' ');
  command = sentence[sentence.length - 1].toLowerCase();
  if (~command.indexOf('l') || ~command.indexOf('л')) {
    activeObj.position.x -= 10;
  } else if (~command.indexOf('r') || ~command.indexOf('п')) {
    activeObj.position.x += 10;
  };
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

function updateDevModules() {
  for (let module in devModules) {
      if (devModules[module]) {
          devModules[module].update();
      }
  }
};

function addLights() {
  const ambientLight = new THREE.AmbientLight(0x404040, 3);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(50, 100, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  const spotLight2 = new THREE.SpotLight(0xffffff);
  spotLight2.position.set(50, -200, 0);
  spotLight2.castShadow = true;
  spotLight2.shadow.mapSize.width = 1024;
  spotLight2.shadow.mapSize.height = 1024;

  const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0x000000);
  const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 0x000000);
  scene.add(ambientLight, spotLight, spotLight2, spotLightHelper, spotLightHelper2);
};

function addOrbitControls() {
  devModules.controls = new THREE.OrbitControls(camera, renderer.domElement);
  devModules.controls.maxPolarAngle = 90 * Math.PI / 180;
  //devModules.controls.maxDisnatce = 10;
  //devModules.controls.minDistance = 5;
  //devModules.controls.enablePan = false;
  //devModules.controls.noZoom = true;
};

function addStats() {
	devModules.stats = new Stats();
  container.appendChild(devModules.stats.domElement);
  devModules.stats.domElement.style.position = 'absolute';
};

function create3DText(text, posX, posY, posZ) {
  loader.load('../../public/fonts/KenPixel_Regular.json', (font) => {
    const textGeometry = new THREE.TextGeometry(text, {
      font: font,
      size: 2.5,
      height: 0.3
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xA2231D, specular: 0xFFFFFF });
    let text3D = new THREE.Mesh(textGeometry, textMaterial);
    text3D.position.set(posX, posY, posZ);
    text3D.castShadow = true;
    text3D.receiveShadow = true;
    scene.add(text3D);
  });
};

function createBox(sizeX, sizeY, sizeZ, posX, posY, posZ) {
  const boxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
  const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xFFCC00, specular: 0xFFFFFF });
  boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.castShadow = true;
  boxMesh.receiveShadow = true;
  boxMesh.position.set(posX, posY, posZ);
  scene.add(boxMesh);
  return boxMesh;
};

function loadFBXModel(path, scaleX, scaleY, scaleZ, posX, posY, posZ) {
  const manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };
  const onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };
  const onError = function (xhr) {
    console.log(xhr);
  };
  const loaderFBX = new THREE.FBXLoader(manager);
  loaderFBX.load('../../public/models/base.fbx', function (object) {
    object.traverse(function (child) {
        child.castShadow = true;
        child.receiveShadow = true;
    });
    object.castShadow = true;
    object.receiveShadow = true;
    object.scale.set(scaleX, scaleY, scaleZ);
    object.position.set(posX, posY, posZ);
    scene.add(object);
  }, onProgress, onError);

// LOAD OBJ MODEL
//   var objLoader = new THREE.OBJLoader();
//   objLoader.setPath('../../public/models/');
//   objLoader.load( 'Floating Base.obj', function ( obj ) {
//     obj.traverse(function (child) {
//       if (child instanceof THREE.Mesh) {
//         // child.material = material;
//         // child.material.map = texture;
//       }
//     });
//     obj.castShadow = true;
//     obj.receiveShadow = true;
//     scene.add(obj);
//   }, onProgress, onError);
};