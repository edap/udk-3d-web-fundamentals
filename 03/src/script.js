import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = { width: 600,height: 600 }

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.animation')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

window.addEventListener('mousemove', (event) =>
{
    console.log(event.clientX);
    console.log(event.clientY);
    // Exercise. Can you map the position of your mouse in the screen from -1 to +1 ?
    // Which other event can you log? (https://www.w3schools.com/jsref/met_document_addeventlistener.asp)
})