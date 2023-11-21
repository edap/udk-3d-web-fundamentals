import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
    console.log('loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const matcapTexture = textureLoader.load('/matcap.png')
// What is a matcap texture? Why are they so widely used? what are the disadvantages?
// Did you notice that you have volumes event without a light?
matcapTexture.colorSpace = THREE.SRGBColorSpace



// Exercise. Create your matcap texture here https://www.kchapelier.com/matcap-studio/
// This is another huge collection of matcap textures https://github.com/nidorx/matcaps
// Use it with your objects


const scene = new THREE.Scene()



const geometry = new THREE.TorusKnotGeometry( 3, 1, 64, 64 )
// 4 use the texture
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture
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