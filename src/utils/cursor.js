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

        this.timer = null

        this.ease = 0.06

        this.velocity = 0
        this.targetVelocity = 0

        window.addEventListener('mousemove', this.handleMouse.bind(this))
        // this.experience.time.on('tick', this.handleTick.bind(this)) 
    }

    handleMouse(event) {
        if(this.timer) clearTimeout(this.timer);
        this.ndcMouse.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.ndcMouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.mouseMoved = true;
        this.timer = setTimeout(() => {
            this.mouseMoved = false;
        }, 100);
        

        // console.log(this.ndcMouse)
    }

    handleTick () {
        this.calculateSpeed()
    }

    calculateSpeed() {
        this.ndcDiff = this.ndcDiff.subVectors(this.ndcPreviousMouse, this.ndcMouse);
        this.ndcPreviousMouse.copy(this.ndcMouse)
        // console.log(this.ndcDiff)
    }
}

export default Cursor