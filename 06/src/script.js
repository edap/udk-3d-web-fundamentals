import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gltfLoader = new GLTFLoader()
//2
let mixer = null
gltfLoader.load(
    '/models/Fox/Fox.gltf',
    (gltf) =>
    {
        console.log('success')
        // have a look at how many things there are into the
        // gltf object. Do we need everything? do we need another scene?
        // you can add the scene that comes with the gltf, or, you can pick from the
        // gltf object the things that you like
        // 1) Exercise, open the console and try to think were the Fox may be.
        console.log(gltf)

        // scene.add(gltf.scene.children[0]) ??
        // scene.add(gltf.scene.children[1]) ??
        // Solution, it looks like the scene it contains a group

        // it looks really big, uncomment and scale it
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        scene.add(gltf.scene)

        // 2) Animations. If you inspect the file again, you notice that it contains
        // animations. Each animation is like a music casette, you can't play all the animation together
        // you need a mixer to mix the music casette. The mixer in this case
        // is called: THREE.AnimationMixer. Each object should have its own mixer
        // if you  are going to add multiple animated object to your scene
        // you need multiple mixer
        mixer = new THREE.AnimationMixer(gltf.scene)
        // now, look into gltf.animations. It looks like an array and it looks
        // there is more than one animation
        
        //let's play the first animation
        const action = mixer.clipAction(gltf.animations[0])

        // 3) Play the animation! but nothing happens, why?
        // go to the thik function
        action.play()

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
// No light no fun
const dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add(dirLight)


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
    // 4 you have to update the mixer! Uncomment the following lines
    // if(mixer)
    // {
    //     mixer.update(clock.getDelta())
    // }
    // 5 try to play around with the other animations


    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
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