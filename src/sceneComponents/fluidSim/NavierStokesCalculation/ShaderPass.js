import * as THREE from 'three'


class ShaderPass {
    constructor(props) { 
        this.props = props
        this.uniforms = this.props.material?.uniforms
        
        this.renderer = props.renderer
        console.log(this.renderer) //Reading null
    }

    init() {


        this.scene = new THREE.Scene()
        this.camera = new THREE.Camera()

        if(this.uniforms){
            this.material = new THREE.RawShaderMaterial(this.props.material);
            this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
            this.plane = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.plane);
        }
    }

    update() {
        this.renderer.setRenderTarget(this.props.output)
        this.renderer.render(this.scene, this.camera)
        this.renderer.setRenderTarget(null)
    }
}

export default ShaderPass