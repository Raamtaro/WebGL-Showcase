import * as THREE from 'three'
import Experience from '../experience/experience.js'

import Simulation from './Simulation.js'

//Shaders
import face_vert from './shaders/vertex/face.glsl'
import color_vert from './shaders/fragment/color.glsl'

/**
 * Credit to: mnmxmx -- https://github.com/mnmxmx/fluid-three/tree/master
 * Refactoring this to work with my setup.
 */

class Output {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene //The output gets rendered to the final scene,
        // this.time = this.experience.time
        this.init()
    }

    init() {

        

        this.simulation = new Simulation() //This class contains the calculation for all of our FBO textures based on the Navier-Stokes Equation

        //The final render will be put into this.output

        this.output = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            new THREE.RawShaderMaterial(
                {
                    uniforms:{
                        velocity: {
                            value: this.simulation.fbos.vel_0.texture
                        },
                        boundarySpace: {
                            value: new THREE.Vector2()
                        }                        
                    },
                    vertexShader: face_vert,
                    fragmentShader: color_vert
                }
            )
        )
        // this.output.visible = false
        this.scene.add(this.output)

    }
}

export default Output