import * as THREE from 'three'
import GUI from 'lil-gui'

import Sizes from '../../utils/sizes.js'
import Cursor from '../../utils/cursor.js'
import Resources from '../../utils/Resources.js'
import Time from '../../utils/time.js'
import Camera from './camera.js'
import Renderer from './renderer.js'
import LotusParticles from '../lotusComponents/lotusParticles.js'
import LotusMesh from '../lotusComponents/lotusMesh.js'
import { WebGLRenderTarget } from 'three'

//Final Composition
import LoadingScreen from './loading.js'
import PostScene from './postScene.js'


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

        this.scenes = []
        this.renderables = []

        
          
        

        this.scene = new THREE.Scene() //Sample scene that I started out with. I need to go back and comment this out of everything it's included in, and then comment this out (and eventually delete after next commit)
        

        this.camera = new Camera()
        this.renderer = new Renderer()
        this.cursor = new Cursor()

        this.postScene = new PostScene()
        this.loadingScreen = new LoadingScreen()
        this.resources = new Resources(sources)
        this.currentScene = 0; //Tell us which scene to load... for now?

        this.resources.on('ready', this.startup.bind(this))
        this.sizes.on('resize', this.onResize.bind(this))

        // this.time.on('tick', this.renderScene.bind(this)) //Moved to the startup() function
    }

    startup() { //This method pretty much starts anything up which depends on the resources being defined.
        /**
         * On 'ready'
         * 
         * 1. Create Scenes
         * 2. Set up Gui
         * 3. Start the scene here so that the render doesn't try to access properties of each object before it's defined
         */
        
        this.lotusParticles = new LotusParticles()
        this.setupGUI()

        // console.log(this.scenes[this.currentScene])
        /**
         * Finally, render
         */
        this.time.on('tick', this.renderScene.bind(this))


    }


    onResize() {
        //Need to resize the renderTargets as well
        this.scenes.forEach(
            (obj, index) => {
                obj.target.setSize(this.sizes.width, this.sizes.height)
            }
        )

    }



    setupGUI () {
        this.gui = new GUI({ width: 340 })
        
        this.gui.add(this.lotusParticles.shaderMaterial.uniforms.uSize, 'value').min(0).max(1).step(0.001).name('uSize')
        this.gui.add(this.lotusParticles.gpgpu.particlesVariable.material.uniforms.uFlowFieldInfluence, 'value').min(0).max(1).step(0.001).name('uFlowfieldInfluence')
        this.gui.add(this.lotusParticles.gpgpu.particlesVariable.material.uniforms.uFlowFieldStrength, 'value').min(0).max(10).step(0.001).name('uFlowfieldStrength')
        this.gui.add(this.lotusParticles.gpgpu.particlesVariable.material.uniforms.uFlowFieldFrequency, 'value').min(0).max(1).step(0.001).name('uFlowfieldFrequency')

        this.gui.destroy()
    }


    renderScene () {

        this.renderer.instance.render(this.scene, this.camera.instance)
    }
}

export default Experience