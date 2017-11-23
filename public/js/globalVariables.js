const canvas = document.getElementsByTagName('canvas')[0];
const container = document.getElementById('workspace');
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
let camera;
let renderer;
let devModules = {
	controls: false,
	stats: false
};
let speechComand = '';
let activeObj = null;
let composer;