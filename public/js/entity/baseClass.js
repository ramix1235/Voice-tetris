const BaseClass = class BaseClass {
  moveBottom(count = 1) {
    if (count === 0) return;
    for (let i = 0; i < count; i++) {
      this.THREE.position.z += 1.02;
    }
  }

  moveTop(count = 1) {
    if (count === 0) return;
    for (let i = 0; i < count; i++) {
      this.THREE.position.z -= 1.02;
    }
  }

  moveDown(count = 1) {
    if (count === 0) return;
    for (let i = 0; i < count; i++) {
      this.THREE.position.y -= 1.02;
    }
  }

  moveUp(count = 1) {
    if (count === 0) return;
    for (let i = 0; i < count; i++) {
      this.THREE.position.y += 1.02;
    }
  }

  moveLeft(count = 1) {
    if (count === 0) return;
    for (let i = 0; i < count; i++) {
      this.THREE.position.x -= 1.02;
    }
  }

  moveRight(count = 1) {
    if (count === 0) return;
    for (let i = 0; i < count; i++) {
      this.THREE.position.x += 1.02;
    }
  }

  rotateLeft(count = 1) {
    if (count === 0) return;
    for (let i = 0; i < count; i++) {
      this.THREE.rotation.y += 90 * Math.PI / 180;
    }
  }

  rotateRight(count = 1) {
    if (count === 0) return;
    for (let i = 0; i < count; i++) {
      this.THREE.rotation.y -= 90 * Math.PI / 180;
    }
  }

  setTHREE(obj) {
    this.THREE = obj;
  }
};