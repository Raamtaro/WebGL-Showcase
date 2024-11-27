import * as THREE from 'three'
import Experience from './experience.js'  
import { OrbitControls } from 'three/examples/jsm/Addons.js'  

class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.canvas = this.experience.canvas

        
        this.cameraGroup = new THREE.Group()

        this.frustumSize = 1
        this.aspect = 1

        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width/ this.sizes.height, .1, 1000)
        this.config()

        this.setControls()
        this.time.on('tick', this.update.bind(this))
        this.sizes.on('resize', this.cameraResizeUpdate.bind(this))
    }


    config () {
        this.sizes.on('resize', this.cameraResizeUpdate.bind(this))
        this.scene.add(this.cameraGroup)
        this.instance.position.set(0, 0, 6)
        this.instance.lookAt(0, 0, 0)
        this.cameraGroup.add(this.instance)
    }

    cameraResizeUpdate () {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    setControls () {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    update() {
        this.controls.update()
    }


}

export default Camera