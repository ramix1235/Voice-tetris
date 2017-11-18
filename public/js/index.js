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
  camera.position.set(0, 50, 120);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xF5F5F5);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  let cube = createBlock(41, 1, 1, 0xFFCC00);
  cube.position.z = 27;
  cube.position.x = -8.7;
  cube.rotation.y = 28 * Math.PI / 180;
  cube.rotation.z = 0.6 * Math.PI / 180;
  activeObj = cube;
  // activeObj = createBox({ x:30, y:30, z:30 }, { x:0, y:0, z:0 }, { x:1, y:1, z:1 }, { x:0, y:0, z:0 });
  // create3DText('Vice Tetrice', { x:-5, y:0, z:65 });

  // animateME({
  //   duration: 2000,
  //   timing: function(timeFraction) {
  //     // return timeFraction;
  //     return 1 - Math.sin(Math.acos(timeFraction));
  //   },
  //   draw: function(progress) {
  //     activeObj.rotation.x = progress * 1.57;
  //   }
  // });

  // camera.position.x = Math.sin(0.7) * 200;
  // camera.position.z = Math.cos(0.7) * 200;

  // loadFBXModel('../../public/models/Model', 'model', { x:0, y:0, z:0 }, { x:1, y:1, z:1 });
  loadOBJModel('../../public/models/Island', 'island', { x:0, y:-36.6, z:0 }, { x:50, y:50, z:50 }, { x:0, y:5.2, z:0 });
  addLights();
  addOrbitControls();
  addEventListeners();
};

function createBlock(width, height, depth, color) {
  const shift = 1.02;
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
    const boxMaterial = new THREE.MeshPhongMaterial({color: color});
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true;
    box.receiveShadow = true;
    box.position.set(coords.x || 0, coords.y || 0, coords.z || 0);

    const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 12);
    const cylinderMaterial = new THREE.MeshPhongMaterial({color: color});
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
  }
};

function animateME(options) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
      var timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;
      var progress = options.timing(timeFraction)
      options.draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
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

function addStats() {
	devModules.stats = new Stats();
  container.appendChild(devModules.stats.domElement);
  devModules.stats.domElement.style.position = 'absolute';
};

function create3DText(text, pos, sc, rot) {
  const loader = new THREE.FontLoader();
  loader.load('../../public/fonts/KenPixel_Regular.json', (font) => {
    const textGeometry = new THREE.TextGeometry(text, {
      font: font,
      size: 2.5,
      height: 0.3
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xA2231D, specular: 0xFFFFFF });
    let text3D = new THREE.Mesh(textGeometry, textMaterial);
    if (pos) {
      text3D.position.set(pos.x, pos.y, pos.z);
    }
    if (sc) {
      text3D.scale.set(sc.x, sc.y, sc.z);
    }
    if(rot) {
      text3D.rotation.set(rot.x, rot.y, rot.z);
    }
    text3D.castShadow = true;
    text3D.receiveShadow = true;
    scene.add(text3D);
  });
};

function createBox(size, pos, sc, rot) {
  const boxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xFFCC00, specular: 0xFFFFFF });
  boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.castShadow = true;
  boxMesh.receiveShadow = true;
  if (pos) {
    boxMesh.position.set(pos.x, pos.y, pos.z);
  }
  if (sc) {
    boxMesh.scale.set(sc.x, sc.y, sc.z);
  }
  if(rot) {
    boxMesh.rotation.set(rot.x, rot.y, rot.z);
  }
  scene.add(boxMesh);
  return boxMesh;
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
    if(rot) {
      object.rotation.set(rot.x, rot.y, rot.z);
    }
    scene.add(object);
  }, onProgress, onError)
};

function loadOBJModel(path, name, pos, sc, rot) {
  const mtlLoader = new THREE.MTLLoader(manager);
  const objLoader = new THREE.OBJLoader(manager);
  mtlLoader.load(`${path}.mtl`, function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(`${path}.obj`, function(obj) {
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
          if(rot) {
            obj.rotation.set(rot.x, rot.y, rot.z);
          }
          obj.name = name;
          scene.add(obj);
        }, onProgress, onError);
  });

};