import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


let run;
let survey;
const gltfLoader = new GLTFLoader()


let mixer = null
gltfLoader.load(
    '/models/Fox/Fox.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        scene.add(gltf.scene)

        mixer = new THREE.AnimationMixer(gltf.scene)
        run = mixer.clipAction(gltf.animations[2])


        // try to uncomment this. What happens?
        //survey.clampWhenFinished = true;

        // From the three.js documentation https://threejs.org/docs/index.html?q=an#api/en/animation/AnimationAction
        // .clampWhenFinished : Boolean

        // If clampWhenFinished is set to true the animation will automatically be paused on its last frame.
        
        // If clampWhenFinished is set to false,the property "enabled" of the animation will automatically be switched to false when the last loop of the action has finished, so that this action has no further impact.
        
        // Default is false.
        
        // Note: clampWhenFinished has no impact if the action is interrupted (it has only an effect if its last loop has really finished).         
        survey.clampWhenFinished = true;

        // by default threejs animations run in loop!
        // disable the loop
        run.setLoop( THREE.LoopOnce );

        // We do not call play as soon as it loads,
        // we call the method "play()" only when the mouse is clicked
        //run.play()

        survey = mixer.clipAction(gltf.animations[0])
        survey.setLoop( THREE.LoopOnce );
        //survey.play()
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

//const dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
//scene.add(dirLight)

// For the sake of clarity, I will use an ambient light, we lose the shadows
// but we can clearly see the animation.
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
    if(mixer)
    {
        mixer.update(clock.getDelta())
    }

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

// we add an event listener to our browser window
// if the mouse is clicked, we play the animation
window.addEventListener('mousedown', () =>
{
    console.log("clicked")
    if ( survey !== null ) {
        survey.stop();
        survey.play();
    }
})

