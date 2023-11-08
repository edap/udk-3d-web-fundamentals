// Scene
const scene = new THREE.Scene()
// Object
//const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry = new THREE.TorusKnotGeometry( 3, 1, 64, 16 )
const material = new THREE.MeshStandardMaterial({color: 0x00ff00})
const mesh = new THREE.Mesh(geometry, material)

const geometryb = new THREE.TorusKnotGeometry( 3, 1, 64, 16 )
const materialb = new THREE.MeshStandardMaterial({color: 0xf7f900})
const meshb = new THREE.Mesh(geometryb, materialb)
meshb.position.set(-10,0,0);
mesh.position.set(10,0,0);

const group = new THREE.Group();
group.add(mesh);
group.add(meshb);
scene.add(group)


const geometryc = new THREE.TorusKnotGeometry( 3, 1, 64, 16 )
const materialc = new THREE.MeshStandardMaterial({color: 0xff0000})
const meshc = new THREE.Mesh(geometryc, materialc)

const geometryd = new THREE.TorusKnotGeometry( 3, 1, 64, 16 )
const materiald = new THREE.MeshStandardMaterial({color: 0x0000ff})
const meshd = new THREE.Mesh(geometryd, materiald)
meshc.position.set(-10,3,0);
meshd.position.set(10,3,0);

const group2 = new THREE.Group();
group2.add(meshc);
group2.add(meshd);
group.add(group2)

//Camera
// Sizes
const sizes = {
    width: 800,
    height: 800
}


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 18
scene.add(camera)

//Light
const color = 0xFFFFFF;
const intensity = 0.2;
const light = new THREE.AmbientLight(color, intensity);
//scene.add(light);

const pointLight = new THREE.PointLight(color, 10, 1000);
pointLight.position.set(-4,4, 4);
scene.add(pointLight)

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

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
    group.position.x = Math.cos(elapsedTime)
    group.position.y = Math.sin(elapsedTime)

     // Update camera?
    //  camera.position.x = Math.sin(elapsedTime)
    //  camera.lookAt(mesh.position)

    // Render the scene
    renderer.render(scene, camera)

    // Call tick for every frame!
    window.requestAnimationFrame(tick)
 }
 
 tick()


// Notes for the teacher
// Create another object. move it
// Create a group