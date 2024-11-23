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

        this.scene = new THREE.Scene() //Sample scene that I started out with. I need to go back and comment this out of everything it's included in, and then comment this out (and eventually delete after next commit)
        
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.cursor = new Cursor()

        this.loadingScreen = new LoadingScreen()
        this.resources = new Resources(sources)
        

        this.resources.on('ready', this.startup.bind(this))
    }

    startup() { //This method pretty much starts anything up which depends on the resources being defined.

        this.lotusParticles = new LotusParticles()
        this.Output = new Output()
        // this.setupGUI()

        this.time.on('tick', this.renderScene.bind(this))
    }


    renderScene () {
        this.renderer.instance.setRenderTarget(null)
        this.renderer.instance.render(this.scene, this.camera.instance)
    }
}

export default Experience