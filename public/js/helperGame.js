let HelperGame = class HelperGame {
    constructor() {
        this.activeBlock = null;
        this.nextBlock = null;
        this.score = null;
        this.speed = 1;
        this.start = false;
        this.time = {
            start: null,
            current: null
        };
    }

    init() {
        this.timer();
        if (!this.activeBlock) {
            this.activeBlock = this.addBlock();
            this.activeBlock.THREE.position.x = 0;
            this.activeBlock.THREE.position.z = 0;
            this.activeBlock.moveUp(50);
            this.nextBlock = this.addBlock();
            this.nextBlock.moveUp(22);
            this.nextBlock.moveLeft(15);
        }
        if (!isIntersects(this.activeBlock.THREE, blockMeshes) || isIntersects(this.activeBlock.THREE, invisibleMeshes)) {
            this.activeBlock.THREE.position.y -= 0.2;
        } else {
            this.updateScore();
            this.activeBlock = this.nextBlock;
            this.activeBlock.THREE.position.x = 0;
            this.activeBlock.THREE.position.z = 0;
            this.activeBlock.moveUp(50);
            this.nextBlock = this.addBlock();
            this.nextBlock.moveUp(22);
            this.nextBlock.moveLeft(15);
        }
    }

    finish() {

    }

    updateScore() {
        let oldText = scene.children.find((item) => { return item.name === 'score' });
        if (oldText) {
            THREERemove(oldText);
        }
        create3DText(++this.score, 'score', { x: -12.5, y: 1, z: 20.8 });
    }

    timer() {
        let newTime = new Date();
        let oldText = scene.children.find((item) => { return item.name === 'timer' });
        if (!this.time.start) this.time.start = new Date();
        if (Math.round((this.time.current - this.time.start) / 1000) === Math.round((newTime - this.time.start) / 1000)) return;
        if (oldText) {
            THREERemove(oldText);
        }
        this.time.current = newTime;
        create3DText(`${Math.round((this.time.current - this.time.start) / 1000)}`, 'timer', { x: -12.5, y: -0.35, z: 20.8 });
    }

    addBlock() {
        const min = 0;
        const max = 4;
        let block;
        switch (Math.floor(Math.random() * (max - min + 1) + min)) {
            case 0: block = createYellowBlock(); break;
            case 1: block = createOrangeBlock(); break;
            case 2: block = createGreenBlock(); break;
            case 3: block = createBlueBlock(); break;
            case 4: block = createRedBlock();
        }
        return block;
    }

    changeSpeed() {

    }
}