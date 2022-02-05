import * as THREE from './libs/three.module.js';
let camera, scene, renderer;
let cube;
// once everything is loaded, we run our Three.js stuff


window.onload = function init() {
    // create an empty scene, that will hold all our elements (objects, cameras and lights)
    scene = new THREE.Scene();
    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); // perspective camera
    camera.position.x = camera.position.y = 2; // place the camera using world coordinates
    camera.position.z = 5;
    camera.lookAt(scene.position); //point the camera to the center of the scene
    // create a renderer: if no Canvas parameter is passed, a new canvas element will be created
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // set output canvas and viewport size
    renderer.setClearColor("#000000"); // configure clear color (background color)
    // add the output of the renderer to an HTML element (adds a Canvas element to the body)
    document.body.appendChild(renderer.domElement);

        // create an object 3D - a cube
    let geometry = new THREE.BoxGeometry(2, 2, 2);
    let material = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh(geometry, material);
    // add the cube to the scene (its default position is (0,0,0)
    scene.add(cube);
    // set the animation function: if `null` is passed it will stop any already ongoing animation
    renderer.setAnimationLoop(render);

    // AXES HELPER
    let axes = new THREE.AxesHelper(3)
    scene.add(axes)
    let axesCube = new THREE.AxesHelper(2)
    cube.add(axesCube)
}

function render() {
    // rotate the cube around its axes
    cube.rotation.y += 0.05;
    cube.rotation.z += 0.05;
    renderer.render(scene, camera);
};