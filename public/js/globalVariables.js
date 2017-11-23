const canvas = document.getElementsByTagName('canvas')[0];
const container = document.getElementById('workspace');
const manager = new THREE.LoadingManager();
const mouse = new THREE.Vector2();
let raycaster;
let camera;
let renderer;
let devModules = {
  controls: false,
  stats: false
};
let speechComand = '';
let activeObj = null;
let composer;
let abstractIsland;
let blockMeshes = [];


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

function isIntersects(obj, arrMeshes) {
  // FROM BoundingBox
  let intersect = false;
  obj.updateMatrixWorld();
  obj.children.forEach(objMesh => {
    let objBox3 = new THREE.Box3().setFromObject(objMesh);
    // helperBB = new THREE.BoxHelper(objMesh, 0xff0000);
    // scene.add(helperBB);
    arrMeshes.forEach(arrMesh => {
      if (obj === arrMesh.parent) return;
      let itemBox3 = new THREE.Box3().setFromObject(arrMesh);
      if (objBox3.intersectsBox(itemBox3)) {
        intersect = true;
      }
    });
  });
  return intersect;

  // FROM Raycaster
  // let originPoint = obj.position.clone();
  // for (let vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++) {
  //   let localVertex = obj.geometry.vertices[vertexIndex].clone();
  //   let globalVertex = localVertex.applyMatrix4(obj.matrix);
  //   let directionVector = globalVertex.sub(obj.position);
  //   let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
  //   let collisionResults = ray.intersectObjects(arrMeshes);
  //   if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
  //     return true;
  //   }
  // }
};

// function initModelsObj() {
//   if (abstractIsland) return;
//   let obj = scene.children.find((item) => { return item.name == 'abstract-island' });
//   if (!obj) return;
//   abstractIsland = obj;
// }

// function copyAbstractIsland() {
//   let countOfAbstractIsland = 10;
//   let max = 100;
//   let min = 20;
//   for (let i = 0; i < countOfIsland; i++) {
//     let pos = {
//       x: Math.floor(Math.random() * (max - min + 1) + min),
//       y: Math.floor(Math.random() * (max - min + 1) + min),
//       z: Math.floor(Math.random() * (max - min + 1) + min)
//     }
//     let copyObj = abstractIsland.clone();
//     copyObj.position.set(pos.x, pos.y, pos.z);
//     // copyObj.scale.set();
//     // copyObj.rotation.set();
//     scene.add(copyObj);
//   }
// };

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