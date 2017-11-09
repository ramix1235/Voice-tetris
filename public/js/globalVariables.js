const canvas = document.getElementsByTagName('canvas')[0];
const container = document.getElementById('workspace');
const loader = new THREE.FontLoader();
let camera;
let renderer;
let devModules = {
	controls: false,
	stats: false
};
let speechComand = '';
let activeObj = null;
