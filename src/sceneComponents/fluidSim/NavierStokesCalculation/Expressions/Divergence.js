import ShaderPass from "../ShaderPass.js"

import face_vert from '../../shaders/vertex/face.glsl'
import divergence_frag from '../../shaders/fragment/divergence.glsl'    

class Divergence extends ShaderPass {
    constructor(simProps){
        super({
            material: {
                vertexShader: face_vert,
                fragmentShader: divergence_frag,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace
                    },
                    velocity: {
                        value: simProps.src.texture
                    },
                    px: {
                        value: simProps.cellScale
                    },
                    dt: {
                        value: simProps.dt
                    }
                }
            },
            output: simProps.dst,
            renderer: simProps.renderer
        })

        this.init();
    }

    update({ vel }){
        this.uniforms.velocity.value = vel.texture;
        // console.log(vel.texture.uuid)
        super.update();
    }   
}

export default Divergence