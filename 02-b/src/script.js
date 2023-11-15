import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// 1, check style,css too
// so that the canvas can fit the viewport
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.animation')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    mesh.position.x = Math.cos(elapsedTime)
    mesh.position.y = Math.sin(elapsedTime)

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()



window.addEventListener('resize', () =>
{
    //2
    // Resize the canvas!
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // 3
    // but keep the camera ratio and update the renderer
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    // device ratio pixel. if you are on a device with a pixel ratio greater than
    // 1 (for example, you are on a mac with a retina screen), you are going to see
    // blurry edges. This is because your pixel ratio is greater than 1.
    // this line is going to pick a pixel ratio between your device and max 2
    // Having a device pixel ratio bigger than 2 is smth that you can't really see
    // but that it has a cost on your rendering
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})