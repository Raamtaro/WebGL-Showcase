import * as THREE from 'three'
import ShaderPass from "../ShaderPass.js"
import Experience from '../../../experience/experience.js'

import mouse_vert from '../../shaders/vertex/mouse.glsl'
import externalForce_frag from '../../shaders/fragment/externalForce.glsl'


class ExternalForce extends ShaderPass {
    constructor(simProps){
        super({
            output: simProps.dst,
            renderer: simProps.renderer
        });

        this.experience = window.experience
        this.cursor = this.experience.cursor

        this.init(simProps);
    }
    
    init(simProps) {
        super.init()
        const mouseG = new THREE.PlaneGeometry(
            1, 1
        )
        const mouseM = new THREE.RawShaderMaterial({
            vertexShader: mouse_vert,
            fragmentShader: externalForce_frag,
            blending: THREE.AdditiveBlending,
            uniforms: {
                px: {
                    value: simProps.cellScale
                },
                force: {
                    value: new THREE.Vector2(0.0, 0.0)
                },
                center: {
                    value: new THREE.Vector2(0.0, 0.0)
                },
                scale: {
                    value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size)
                }
            },
        })

        this.mouse = new THREE.Mesh(mouseG, mouseM);
        this.scene.add(this.mouse);
    }

    update(props) {
        const forceX = this.cursor.ndcDiff.x / 2 * props.mouse_force
        const forceY = this.cursor.ndcDiff.y / 2 * props.mouse_force

        const cursorSizeX = props.cursor_size * props.cellScale.x
        const cursorSizeY = props.cursor_size * props.cellScale.y

        const centerX = Math.min(Math.max(this.cursor.ndcMouse.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2)
        const centerY = Math.min(Math.max(this.cursor.ndcMouse.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2)

        const uniforms = this.mouse.material.uniforms


        uniforms.force.value.set(forceX, forceY)
        uniforms.center.value.set(centerX, centerY)
        uniforms.scale.value.set(props.cursor_size, props.cursor_size)

        super.update()
    }
} 

export default ExternalForce