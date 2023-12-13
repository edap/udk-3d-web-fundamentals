## Fundamentals of 3D animation for the web


The goal of the course is to give students the tools to create a video-game, an open space or a 3D animation that runs in the browser, can be self-hosted without the need of a social media platform, and can be shared with a link. Each student will develop its own game/animation, with the only constrain to create a link to the game/animation of another classmate.

We will only use open source tools such as Three.js and Blender. 

The course is aimed at beginners, some familiarity with variables, loops and arrays is recommended but not mandatory.


![example](cover.jpg)
*Image from the three.js website*




### 01

- Examples of 3D in the browser
- The theater example
- Offline rendering VS realtime rendering. The Monitor and the HZ
- How is the course structured
- How is the code structured


### 02

- Add light. Add more lights.
- Intro to exadecimal colors.
- Intro to transformation.
- Move things with sin(time) and cos(time) and the property `position`. Unit Circle, wave, amplitude and frequence.
- Check the [documentation](https://threejs.org/docs/#api/en/core/Object3D) for `scale`, `rotation`, apply the cos(time) or sine(time) to those two properties.
- Intro to matrices order multiplication.
- Exercise in class. Take inspiration from one the abstract art of the beginning of the '900 and try to make a 3D composition.
- Exercise in class. Use the function `camera.lookAt(mesh.position)` to have the camera always following an object.
- Install [node.js LTS](https://nodejs.org/en/). Close your terminal (called Command Prompt on Windows) and open it again. Write in the terminal the command 'node -v'. You can open a small window with a terminal directly into Visual Studio Code by pressing 'CTRL + J'(Win) or 'CMD + J' (Mac). Download the folder `02`. `cd` into that folder, run `npm install`.


### 03
- Moving things around. Animations that are not bounded to the frame rate. Why is that important?
- Getting mouse events.
- Exercise:Can you map the position of your mouse in the screen from -1 to +1 ?
- Exercise: Which other event can you log? (https://www.w3schools.com/jsref/met_document_addeventlistener.asp)

```
let time = Date.now()

const tick = () =>
{
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // Update objects
    mesh.position.y += 0.05 * deltaTime
}
```

- Intro to the scene Graph.
- Exercise. Use `Group` to move/scale/rotate groups objects.
- Exercise. Use `Group` to create something that resembles the solar system, with planets rotating around the scene.


```
const group = new THREE.Group()
group.scale.x = 3
group.rotation.x = 0.8
scene.add(group)
```

### 04

Fullscreen (app 02-b), pack your website and publish it to neocities.org

### 05

OrbitControls (03). 

Intro to GIT

Load a texture

Load HDR


### 06

Round of presentation

Intro to PBR

Matcap materials

Intro to Blender

### 07

Vincent intro to UV mapping

Export to .gltf file format.

Intro to bones and armature.

Intro to keyframe animation.

Intro to the animation workspace.

Intro to loop animations.

create a small animation. 

Export again to .gltf format

Load a GLTF Model. Make your own or download it from [here](https://github.com/KhronosGroup/glTF-Sample-Models) 



Mesh optimizer. Use draco or [this](https://github.com/zeux/meshoptimizer#gltfpack)
Exercise: Works with one of these 2 optimizer, reach the point where too much compression creates issues with your mesh.

### 08

What is light backing
[How to bake lights in Blender](https://twitter.com/arturitu/status/966257367871606784)


## Documentation

- [threejs docs](https://threejs.org/manual/#en/fundamentals)
- [making a game in threejs](https://threejs.org/manual/#en/game)
- [Class Notes](https://write.udk-berlin.de/p/Fundamentals_of_3D_animation_for_the_web)

#### Working with the terminal.

Windows, Mac and Linux have a terminal. On Mac and Linux, look for "terminal" in your applications. On Windows look for PowerShell, avoid the Command Prompt.

The navigation commands that you need to move around in your directories using the terminal are:

- `pwd`. It means "print working directory" and it simply print on screen the path on which you are at the moment.
- `ls`. It means "list", it lists all the files and directory in the folder where you currently are.
- `cd`, followed by the name of the folder you want to open. It means "change directory", and it is the equivalent of double clicking on a folder.
- `cd ..`. It means move back of one level




#### NPM
 - `npm install`. Install all the dependencies listed in `package.json`
 - `npm run dev`. Run a server
 - `npm run build`. Pack all our sources into static


#### Performance Tips

[Discover Three.js](https://discoverthreejs.com/tips-and-tricks/)
[Mr. Doob's list]()