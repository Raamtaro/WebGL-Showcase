import * as THREE from 'three'
import EventEmitter from './eventEmitter.js'
import Experience from '../sceneComponents/experience/experience.js'

class Cursor extends EventEmitter {
    constructor() {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes

        this.cameraGroup = this.experience.camera.cameraGroup
        this.deltaTime = this.experience.time.delta / 1000

        //Normalized device coordinates for Raycaster stuff -1 to 1
        this.ndcMouse = new THREE.Vector2()
        this.ndcFollowMouse = new THREE.Vector2()
        this.ndcPreviousMouse = new THREE.Vector2()
        this.ndcDiff = new THREE.Vector2()

        this.ease = 0.06

        this.velocity = 0
        this.targetVelocity = 0

        window.addEventListener('mousemove', this.handleMouse.bind(this))
        this.experience.time.on('tick', this.handleTick.bind(this)) 
    }

    handleMouse(event) {
        this.ndcMouse.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.ndcMouse.y = -(event.clientY / this.sizes.height) * 2 + 1;

        // console.log(this.ndcMouse)
    }

    handleTick () {
        this.calculateSpeed()
    }

    calculateSpeed() {
        this.velocity = Math.sqrt( (this.ndcPreviousMouse.x - this.ndcMouse.x)**2 + (this.ndcPreviousMouse.y - this.ndcMouse.y)**2)
        this.targetVelocity -= this.ease * (this.targetVelocity - this.velocity)

        this.ndcDiff.subVectors(this.ndcMouse, this.ndcPreviousMouse);
        this.ndcPreviousMouse.copy(this.ndcMouse);

        if (this.ndcDiff.lengthSq() === 0) {
            this.ndcDiff.set(0, 0);
        }
    }
}

export default Cursor