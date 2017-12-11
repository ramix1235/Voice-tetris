let HelperGame = class HelperGame {
    constructor() {
        this.activeBlock = null;
        this.nextBlock = null;
        this.score = null;
        this.speed = 1;
        this.start = false;
        this.finish = false;
        this.maxHeight = 22.7;
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
            this.activeBlock.moveUp(25);
            this.nextBlock = this.addBlock();
            this.nextBlock.moveUp(22);
            this.nextBlock.moveLeft(15);
        }
        if (!isIntersects(this.activeBlock.THREE, blockMeshes) || isIntersects(this.activeBlock.THREE, invisibleMeshes)) {
            this.activeBlock.THREE.position.y -= 0.2 * this.speed;
        } else {
            if (this.activeBlock.THREE.position.y >= this.maxHeight) {
                this.start = false;
                return;
            }
            this.updateScore();
            this.activeBlock = this.nextBlock;
            this.activeBlock.THREE.position.x = 0;
            this.activeBlock.THREE.position.z = 0;
            this.activeBlock.moveUp(3);
            this.nextBlock = this.addBlock();
            this.nextBlock.moveUp(22);
            this.nextBlock.moveLeft(15);
        }
    }

    updateScore() {
        const period = 5;
        const maxSpeed = 3;
        let oldText = scene.children.find((item) => { return item.name === 'score' });
        let newText = ++this.score;
        if (oldText) {
            THREERemove(oldText);
        }
        create3DText(newText, 'score', { x: -12.5, y: 1, z: 20.8 });
        if (this.speed < maxSpeed && !(newText % period)) this.speed += 0.2;
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