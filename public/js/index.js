init();
animate();

function init() {
  if (!Detector.webgl) {
    alert('Your graphics card does not seem to support WebGL.');
    return;
  }
  addStats();
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xffffff, 0.006);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 400);
  camera.position.set(0, 50, 120);
  camera.position.x = Math.sin(-0.7) * 120;
  camera.position.z = Math.cos(-0.7) * 120;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xF5F5F5);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // const axes = new THREE.AxesHelper(75);
  // scene.add(axes);

  addEnvironment();
  addEventListeners();
  helperGame.start = true;
};

function animate() {
  requestAnimationFrame(animate);
  render();
  updateDevModules();
  if (helperGame.start) {
    helperGame.init();
  }
};

function render() {
  composer.render();
  // renderer.render(scene, camera);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
};

function updateDevModules() {
  for (let module in devModules) {
    if (devModules[module]) {
      devModules[module].update();
    }
  }
};

function addStats() {
  devModules.stats = new Stats();
  container.appendChild(devModules.stats.domElement);
  devModules.stats.domElement.style.position = 'absolute';
};