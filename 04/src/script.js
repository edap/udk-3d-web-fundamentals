import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 1 Different types of textures used to make a material.
// 2 Use the loading manager.
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
const colorTexture = textureLoader.load('/brick.jpg')
// Try to comment this line. The image is more gray. Why?
// Because the image it has been encoded using sRGB color space, but threejs is not aware of it.
// use colorSpace = THREE.SRGBColorSpace only for images that contains the albedo. roughness or metallic textures do not need to be forced to sRGB
colorTexture.colorSpace = THREE.SRGBColorSpace


// 3 Texture Repetition. 
// Make the texture smaller
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// // The texture is smaller, but is not repeating! Why? because we did not tell threejs to repeat it.
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// // Try another type of wrap
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping


// You can offset the texture
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5


// // or rotate it
// colorTexture.rotation = Math.PI * 0.25

// rotation happens on the 0,0 uv coordinate point. If you want to change the pivot point of the rotation
// you have to specify it
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// MipMaps
// what they are and why are they useful. Threejs is generating them for us
// https://en.wikipedia.org/wiki/Mipmap
// And why your texture size should always be a power of 2.


// Exercise. Look for textures assets online, create objects with different textures



const scene = new THREE.Scene()



const geometry = new THREE.BoxGeometry(1, 1, 1)
// 4 use the texture
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
// 5 you can combine it with a color!
// material.color = new THREE.Color('#ffff00')
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