import * as THREE from 'three'

//2
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()



const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3



scene.add(camera)

// 3 Put canvas in a variable
const canvas =  document.querySelector('canvas.animation')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

// 3
const controls = new OrbitControls(camera,canvas)
// smooth movement
controls.enableDamping = true

// 4 by default the OrbitControls are looking in the center of the screen.
// but you can change them
// controls.target.y = 3
// controls.target.x = 1
// controls.update()

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    mesh.position.x = Math.cos(elapsedTime)
    mesh.position.y = Math.sin(elapsedTime)
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

window.addEventListener('mousemove', (event) =>
{
    // 1 Check the mouse position. Wouldn't be cool to set a camera using the mouse?
    // enter OrbitControl
    console.log(event.clientX);
    console.log(event.clientY);
    // Exercise. Can you map the position of your mouse in the screen from -1 to +1 ?
    // Which other event can you log? (https://www.w3schools.com/jsref/met_document_addeventlistener.asp)
})