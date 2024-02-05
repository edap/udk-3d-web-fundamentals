import * as THREE from 'three'
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {Player} from '/player.js'

// In this sketch, besides the posssibility  to detect if the mouse is over an object,
// we are using the player class to move our object with the ASWD keys or with the arrows

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let selected_object;

const gltfLoader = new GLTFLoader()
const player = new Player();

let mixer = null
gltfLoader.load(
    '/models/Fox/Fox.gltf',
    (gltf) =>
    {   
        console.log(gltf.scene.userData);
        // userData is a place where to save your information.
        // like a tag, or the name of the object
        gltf.scene.userData.objectName = 'the_fox';
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        player.add(gltf.scene);
        
    },
    (progress) =>
    {
        console.log('progress')
        console.log(progress)
    },
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)

const scene = new THREE.Scene()

const grid = new THREE.GridHelper(100, 10);
scene.add(grid);

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)
mesh.userData.objectName = 'the_cube';
mesh.position.x = 3;
scene.add(mesh)

const bb_geometry = new THREE.BoxGeometry(0.5,2,3.2);
const bb_material = new THREE.MeshBasicMaterial({wireframe:true, color: 0xff0000});
const bb_mesh = new THREE.Mesh(bb_geometry, bb_material)
bb_mesh.userData.objectName = 'bb_fox';
bb_mesh.position.y = 1;
//bb_mesh.visible = false;
player.add(bb_mesh);

scene.add(player);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(95, sizes.width / sizes.height)
player.attachCamera(camera,new Vector3(0,1.5,-2.5))


const canvas =  document.querySelector('canvas.animation')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

//const controls = new OrbitControls(camera,canvas)
//controls.enableDamping = true

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
const clock = new THREE.Clock()

const tick = () =>
{
	raycaster.setFromCamera( pointer, camera );

	const intersects = raycaster.intersectObjects( scene.children, true );
    if(intersects.length > 0) {
        selected_object = getNameIntersectedObject(intersects[0].object);
    }else{
        selected_object = null;
    }

    player.update()
    //controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

const getNameIntersectedObject = (obj) => {
    console.log(obj.userData.objectName);
    if(obj.userData.objectName !== null && obj.userData.objectName !== undefined){
        return obj.userData.objectName;
    }

    else if (obj.parent != null) {
        return getNameIntersectedObject(obj.parent)
    }

    else return null;
 }

tick()


window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener( 'pointermove', ( event ) => {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

} );