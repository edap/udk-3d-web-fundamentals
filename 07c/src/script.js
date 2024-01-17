import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// In this sketch we are going to see how to detect if the mouse is over an object
// using raycasting. Raycasting does not work good with animated objects, or objects that contain a skeletal animation.
// the most robust solution is to create a bounding box for the gltf object that we want to select.
// A bounding box around our object.
// Do you remember the lesson about THREE.js group? Let's create a group with the fox and the bounding box.
// as a child

// I want to distinguis between the click on the fox and the click on the yellow cube.

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let selected_object;
const fox_group =  new THREE.Group();

const gltfLoader = new GLTFLoader()

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
        fox_group.add(gltf.scene);
        
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
bb_mesh.visible = false;
fox_group.add(bb_mesh);

scene.add(fox_group);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const canvas =  document.querySelector('canvas.animation')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
const clock = new THREE.Clock()

const tick = () =>
{
    fox_group.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 3;
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children, true );
    if(intersects.length > 0) {
        selected_object = getNameIntersectedObject(intersects[0].object);
    }else{
        selected_object = null;
    }
    //console.log(selected_object);

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

const getNameIntersectedObject = (obj) => {
    //console.log(obj.userData.objectName);

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
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

} );