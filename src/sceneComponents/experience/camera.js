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
        this.instance = new THREE.OrthographicCamera(
            this.frustumSize * this.aspect / -2,
            this.frustumSize * this.aspect / 2,
            this.frustumSize / 2,
            this.frustumSize / -2,
            -1000,
            1000
        )

        this.sizes.on('resize', this.cameraResizeUpdate.bind(this))
    }




    cameraResizeUpdate () {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }


}

export default Camera