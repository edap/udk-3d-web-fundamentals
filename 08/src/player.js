import {Vector3, Group} from 'three'

const ROTATION_SPEED = 0.01
const SPEED = 0.1

export class Player extends Group {
    constructor() {
        super()
        this.velocity = 0.0
        this.angularVelocity = 0.0
        this.smooth = false;

        this.addListeners();
    }

    update() {
        if (this.velocity !== 0.0) {
           this.translateZ(this.velocity)
        }
        if (this.angularVelocity !== 0.0) {
            this.rotateY(this.angularVelocity)
        }

        if (this.smooth) {
            this.velocity = this.smootToZero(this.velocity, 0.9)
            this.angularVelocity = this.smootToZero(this.angularVelocity, 0.9)
        }
    }

    addListeners() {
        window.addEventListener('keydown', (e) => {
            this.onKeyDown(e)
        })
        window.addEventListener('keyup', (e) => {
            this.onKeyUp(e)
        })
        window.addEventListener('onmousepressed', (e) => {
            this.onMousePressed(e)
        })
    }

    onMousePressed(e) {
        //do something here!
    }

    onKeyUp(k) {
        this.smooth = true;
    }

    onKeyDown(k) {
        if(k.key == "d" || k.keyCode == 39){
            this.smooth = false;
            this.angularVelocity = -ROTATION_SPEED
        }
        else if(k.key === "a" || k.keyCode == 37){
            this.smooth = false;
            this.angularVelocity = ROTATION_SPEED
        }

        else if(k.key === "w" || k.keyCode == 38){
            this.smooth = false;
            this.velocity = SPEED
        }
        else if(k.key === "s" || k.keyCode == 40){
            this.smooth = false;
            this.velocity = -SPEED
        }
    }

    attachCamera(camera, offset, lookAt) {
        this.add(camera)
        camera.position.add(offset)
        if (lookAt !== undefined){
            camera.lookAt(lookAt)
        } else {
            camera.lookAt(this.position)
        }
        camera.updateProjectionMatrix()
    }

    smootToZero(current, lerpValue) {
        let k = 0.0001
        current *= lerpValue
        if((current <= k && current > 0.0)|| current >= -k && current < 0.0) {
            current = 0
        }
        return current
    }
}