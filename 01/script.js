// Scene
const scene = new THREE.Scene()
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Camera
// Sizes
const sizes = {
    width: 800,
    height: 800
}

//Or
// const sizes = {
//     width: 400,
//     height: 300
// }
// if you want a 4:3 aspect ratio. Intro to aspect ratio

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Append the render to the canvas
const canvas = document.querySelector('canvas.animation')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()
     // Update objects
    //  mesh.position.x = Math.cos(elapsedTime)
    //  mesh.position.y = Math.sin(elapsedTime)

     // Update camera?
    //  camera.position.x = Math.sin(elapsedTime)
    //  camera.lookAt(mesh.position)

    // Render the scene
    renderer.render(scene, camera)

    // Call tick for every frame!
    window.requestAnimationFrame(tick)
 }
 
 // this is where we start the loop!
 tick()


// Notes for the teacher
// - illustrates some javascript in the console. Explain the debugger.
// - explain what you need to make a 3d world (the theater example)
// - explain waves, sin and console, the unit circle

// EXERCISES:
// change speed and movements
// check the doc, add new materials, shapes and color.
// Take an abstract painting that you like. Try to make your own interpretations using threejs