const container = document.getElementById('workspace');
const manager = new THREE.LoadingManager();
const mouse = new THREE.Vector2();
const DIRECTION = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom'
}
let raycaster;
let camera;
let renderer;
let devModules = {
  controls: false,
  stats: false
};
let speechComand = '';
let helperGame = new HelperGame();
let composer;
let blockMeshes = [];
let invisibleMeshes = [];


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

function THREERemove(obj) {
  if (!obj) return;
  obj.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.material.map) {
        child.material.map.dispose();
        child.material.map = undefined;
      }

      child.material.dispose();
      child.material = undefined;

      child.geometry.dispose();
      child.geometry = undefined;
    }
  });
  scene.remove(obj);
};