// run in your project npm install lil-gui

import * as THREE from 'three'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// we are going to use a gui
const gui = new GUI()
const scene = new THREE.Scene()

// What is an HDR map?
// Unfortunately we can't use the loading manager
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/meadow.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

// load the texture
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/brick.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace

// Add a couple of lights. Are they essential when using an HDR map?
// try to comment them out
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 3)
pointLight.position.x = 3
pointLight.position.y = 4
pointLight.position.z = 5
scene.add(pointLight)

const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshStandardMaterial({ map: colorTexture })
material.metalness = 0.45
material.roughness = 0.65

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// Exercise:

// use a torus geometry instead of the cube.
// ad more parameters to the gui.
// Make a glass material using the MeshStandardMaterial. Hint: Look for the property ior, thickness and transmission. And play with metalness and roughness
// look in the doc for iridescence, iridescenceIOR and iridescenceThicknessRange

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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

const tick = () =>
{
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