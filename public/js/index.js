init();
animate();

function init() {
  if (!Detector.webgl) {
    alert('Your graphics card does not seem to support WebGL.');
    return;
  }
  addStats();
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xFFFFFF);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  activeObj = createBox(30, 30, 30, -25, 0, 50);
  create3DText('Vice Tetrice', -5, 0, 65);

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
}

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
}

function addOrbitControls() {
  devModules.controls = new THREE.OrbitControls(camera, renderer.domElement);
  devModules.controls.maxPolarAngle = 90 * Math.PI / 180;
  //devModules.controls.maxDisnatce = 10;
  //devModules.controls.minDistance = 5;
  //devModules.controls.enablePan = false;
  //devModules.controls.noZoom = true;
}

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
}