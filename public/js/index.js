init();
animate();

function init() {
  if (!Detector.webgl) {
    alert('Your graphics card does not seem to support WebGL.');
    return;
  }
  addStats();
  scene = new THREE.Scene();
  scene.fog=new THREE.FogExp2( 0xffffff, 0.005 );

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.set(0, 50, 120);
  camera.position.x = Math.sin(-0.7) * 120;
  camera.position.z = Math.cos(-0.7) * 120;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xF5F5F5);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const axis = new THREE.AxisHelper(75);
  scene.add(axis);

  addEnvironment();
  addEventListeners();
};

function animate() {
  requestAnimationFrame(animate);
  render();
  updateDevModules();
};

function render() {
  renderer.render(scene, camera);
  // activeObj = scene.children.find((item) => {return item.name == 'cube'});
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

function addStats() {
  devModules.stats = new Stats();
  container.appendChild(devModules.stats.domElement);
  devModules.stats.domElement.style.position = 'absolute';
};

// function createBox(size, pos, sc, rot) {
//   const boxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
//   const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xFFCC00, specular: 0xFFFFFF });
//   boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
//   boxMesh.castShadow = true;
//   boxMesh.receiveShadow = true;
//   if (pos) {
//     boxMesh.position.set(pos.x, pos.y, pos.z);
//   }
//   if (sc) {
//     boxMesh.scale.set(sc.x, sc.y, sc.z);
//   }
//   if (rot) {
//     boxMesh.rotation.set(rot.x, rot.y, rot.z);
//   }
//   scene.add(boxMesh);
//   return boxMesh;
// };
// EXAMPLE
// activeObj = createBox({ x:30, y:30, z:30 }, { x:0, y:0, z:0 }, { x:1, y:1, z:1 }, { x:0, y:0, z:0 });