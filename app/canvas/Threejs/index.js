
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

export default class {
    constructor() {
        this.threejsCanvas = document.querySelector('.threejs__canvas__container')
        this.width = this.threejsCanvas.offsetWidth
        this.height = this.threejsCanvas.offsetHeight

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 100 )
        this.camera.position.set(0,5,5)
        this.camera.lookAt(0,0,0)

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        // this.renderer.setClearAlpha(0)
        this.renderer.setSize( this.width, this.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.threejsCanvas.appendChild(this.renderer.domElement)

        this.geometry = new THREE.BoxGeometry( 1, 1, 1 )
        this.material = new THREE.MeshBasicMaterial( {color: 0x00ffff} )
        this.cube = new THREE.Mesh( this.geometry, this.material )
        this.cube.position.set(2,2,2)

        this.scene.add(this.cube)
        console.log(this.scene)

        const axesHelper = new THREE.AxesHelper( 5 )
        this.scene.add( axesHelper )


        this.controls = new OrbitControls( this.camera, this.renderer.domElement )
        this.controls.enableDamping=true
    }

    update() {
        // console.log('three update')
	    this.renderer.render( this.scene, this.camera)
        this.controls.update()
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
    }



    /**
     * Destroy.
     */
     destroy() {
        this.destroyThreejs(this.scene)
    }

    destroyThreejs(obj) {
        while (obj.children.length > 0) {
            this.destroyThreejs(obj.children[0]);
            obj.remove(obj.children[0]);
        }
        if (obj.geometry) obj.geometry.dispose();

        if (obj.material) {
            //in case of map, bumpMap, normalMap, envMap ...
            Object.keys(obj.material).forEach(prop => {
                if (!obj.material[prop])
                    return;
                if (obj.material[prop] !== null && typeof obj.material[prop].dispose === 'function')
                    obj.material[prop].dispose();
            })
            obj.material.dispose();
        }
    }
}