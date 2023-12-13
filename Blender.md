## Interface

Prefeferences: Emulate numpad, addons -> enable node wrangler and pie menus


## Some shortcuts

F3 => Search

G => grab
S => scale
R => rotate

in combination with x,y and z key.

CTRL A, apply all transformation

Change perspective
1
3
7
0


CTRL+TAB Contextual pie menus (you need to abilitate the addon)

TAB => go from object mode to edit mode and viceversa

## Workspaces

Layout -> standard viewport. In object mode you move/rotate/scale the object, in edit mode you chjange the mesh
Shading -> where you tweak the material


## How to position the camera


## Animations

Add a mesh, give it a reasonable number of polygons
Add Armature, go into transparent mode. Edit the bones using the shortcut 'e' and 'g'.
Make the mesh a child of the Armature. Choose "automatic weights".
Now go into the animation tab and into pose mode, try to move a bone, the mesh should follow its movement.

Let's animate the bone. Decide what you want to move, go to the frame 0 in the timeline, select the bones that you want to animate (trick, if you want, enable IK in the top right corner, under "pose options"), then press 'i' to enter a keyframe. Move forward in in the timeline, move the bone and press i again.

If you want, you can scale the the frame.

In the dopesheet, rename the animation. Export to .gltf, be sure that you export also the animation data.
Check that if work in three.js. If it worked, try to add a new animation. Go back to blender, go into the animation tab, choose dopesheet view and then choose Action Editor. Create a new action and give it another name.

To change your animation curves, go to "graph editor", press `t`, choose linear.