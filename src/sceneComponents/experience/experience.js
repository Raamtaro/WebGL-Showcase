import * as THREE from 'three'

import Sizes from '../../utils/sizes.js'
import Cursor from '../../utils/cursor.js'

import Resources from '../../utils/Resources.js'
import Time from '../../utils/time.js'
import Camera from './camera.js'
import Renderer from './renderer.js'

//Particles
import LotusParticles from '../lotusComponents/lotusParticles.js'

//Fluids
import Output from '../fluidSim/Output.js'

//Final Composition
import LoadingScreen from './loading.js'



let instance = null

class Experience {

    constructor(sources, canvas) {

        if(instance)
            {
                return instance
            }
        instance = this

        window.experience = this
        this.canvas = canvas

        this.sizes = new Sizes()
        this.time = new Time()

        this.scene = new THREE.Scene() 
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.cursor = new Cursor()

        

        // this.loadingScreen = new LoadingScreen()
        this.output = new Output()
        this.resources = new Resources(sources)
        this.resources.on('ready', this.startup.bind(this))
    }

    startup() { 

        // this.lotusParticles = new LotusParticles()
        // this.output = new Output()
        

        this.time.on('tick', this.update.bind(this))
    }


    renderScene () {
        this.renderer.instance.setRenderTarget(null)
        this.renderer.instance.render(this.scene, this.camera.instance)
    }

    update() {
        this.cursor.calculateSpeed()
        this.output.update()
        this.renderScene()
    }
}

export default Experience