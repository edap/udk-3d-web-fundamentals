import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// We can now try to have two animation, Only one is playing, but we want to
// interpolate between them
// Have a look at this example https://threejs.org/examples/#webgl_animation_skinning_morph
// and how the jump action interpolates smoothly with the walk action.
// click on the < > button at the bottom right corner of the example to see the code.
// All three.js examples come with the code. Get used to inspect it!


// in this global variable we will save our animations
let actions = [];

// in these 2 global variable we declare which is the current action and which is the old one
let activeAction;
let previousAction;



const gltfLoader = new GLTFLoader()

let mixer = null
gltfLoader.load(
    '/models/Fox/Fox.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        scene.add(gltf.scene)
        console.log(gltf.animations)
        mixer = new THREE.AnimationMixer(gltf.scene)

        // we start by playing the active action run
        // but not playing the action survey

        let run = mixer.clipAction(gltf.animations[2])
        run.play();
        actions["run"] = run;

        let survey = mixer.clipAction(gltf.animations[0])
        //survey.setLoop(THREE.LoopOnce);
        actions["survey"] = survey;

        activeAction = actions["run"];
        previousAction = actions["survey"];

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

// we can now interpolate between the 2 actions using the keyboard
window.addEventListener('keydown', (k) =>
{
    console.log(k.key);
    if ( k.key == 's') {
        console.log("s pressed");
        fadeToAction("survey", 0.5);
    }

    if ( k.key == 'r') {
        console.log("s pressed");
        fadeToAction("run", 0.5);
    }

})

// keep in mind that there is always the action that you want to play and
// the action that it was playing. The most difficult part is to keep track
// of which one is which.
const fadeToAction = (name, duration) => {

    previousAction = activeAction;
    activeAction = actions[ name ];

    if ( previousAction !== activeAction ) {
        console.log()
        previousAction.fadeOut( duration );
    }

    activeAction
        .reset()
        .setEffectiveTimeScale( 1 )
        .setEffectiveWeight( 1 )
        .fadeIn( duration )
        .play();

}

