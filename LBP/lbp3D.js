import * as THREE from './libs/three.module.js'

let camera, scene, renderer
let moveFoward = false, moveBackwards = false, moveLeft = false, moveRight = false
let jump = {
                up: false,
                down: false,
                intensityToggle: false,
                intensity: 0,
                max: 0
            }
let mousePos = { x: 0, y: 0, game: { x: 0, y: 0, z: -4 } }
let sackPos
let layer = {
                one: { x: 0, y: 1.25, z: -2.7 },
                two: { x: 0, y: 1.25, z: -3 },
                three: { x: 0, y: 1.25, z: -3.3 }
            }

let angle = 0

let admin = { activated: false, clicking: false, event: ''}

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {

    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene()

    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 1.73
    camera.position.z = -4
    camera.lookAt(scene.position); //point the camera to the center of the scene


    // create a render and set the size
    renderer = new THREE.WebGLRenderer({ antialias: false }) // aliasing (jagged edges when rendering)
    renderer.setSize(window.innerWidth, window.innerHeight)
    // configure renderer clear color
    renderer.setClearColor("#72bde0")

    // add the output of the renderer to an HTML element (this case, the body)
    document.body.appendChild(renderer.domElement)
    
    /** house */
    sackboy()

    /** ground */
    groundFunction()

    /** lights */
    lights()

    /*****************************
     * ANIMATE 
     * ***************************/
    // set the animation function
    renderer.setAnimationLoop(render);
}

function groundFunction() {
    /** GROUND */
    let groundColor = new THREE.MeshLambertMaterial({ color: '#9b7f47' })
    let groundSize = { x:5, y:5, z:1 }
    let geoGround = new THREE.BoxGeometry(groundSize.x,groundSize.y,groundSize.z)
    let ground = new THREE.Mesh(geoGround, groundColor)
    ground.position.y = -groundSize.y/2 + 1.25
    ground.position.x = 0
    ground.position.z = -4 + groundSize.z
    scene.add(ground)

    let axes = new THREE.AxesHelper(4)
    ground.add(axes)
}

function lights() {
    let light = new THREE.AmbientLight(0xFFFFFF, 0.5)
    scene.add(light)
    
    let light2 = new THREE.PointLight(0xFFFFFF, 0.9)
    light2.position.set(2,5,2)
    scene.add(light2)
}

function sackboy() {

    sackPos = new THREE.Object3D()
    sackPos.position.set(layer.two.x , layer.two.y , layer.two.z)
    sackPos.rotation.y = -Math.PI

    let axes = new THREE.AxesHelper(4)
    sackPos.add(axes)

    scene.add(sackPos)


    let skinColor = new THREE.TextureLoader().load('files/textures/skin.jpg')
    let eyesColor = new THREE.TextureLoader().load('images/sackboy/eyes.png')
    // let shoesColor = new THREE.TextureLoader().load('images/sackboy/shoes.png')
    let dressColor = new THREE.TextureLoader().load('images/sackboy/dress.png')
    skinColor.wrapS = THREE.RepeatWrapping;
    skinColor.wrapT = THREE.RepeatWrapping;
    skinColor.repeat.set(3,1)

    // flatShading: true, 
    let skin = new THREE.MeshPhongMaterial({ map: skinColor });
    let eyes = new THREE.MeshPhongMaterial({ map: eyesColor });
    // let shoes = new THREE.MeshPhongMaterial({ map: shoesColor });
    let dress = new THREE.MeshPhongMaterial({ map: dressColor });

    // let materialSkin = new THREE.MeshBasicMaterial({ color: 0xa88e64 });
    

    /** OBJ. SIZES */
    let headSize = { r:1.2*0.05 }
    let bodySize = { x:0.7*0.05 , y:1*0.05 , z:2*0.05 }
    let legSize = { x:0.3*0.05, y:0.35*0.05 , z:1.5*0.05 } // let legSize = { x:0.75, y:0.625 , z:0.325 }
    let eyeSize = { r:0.21*0.05 }
    let armSize = { x:0.2*0.05 , y:0.3*0.05 , z:0.8*0.05 }
    let forearmSize = { x:armSize.y , y:armSize.x , z:armSize.z }

    let handSize = { r:0.2*0.05 }

    /** OBJ. CLOTHING SIZES */
    let shoesSize = { x:(legSize.x+0.15)*0.05 , y:(legSize.y+0.2)*0.05 , z:0.4*0.05 }
    // let ribbonSize = { r:0.15 }
    // let ribbonLateralsSize = { r:0.24 }

    /** GEOMETRY */
    let geoHead = new THREE.SphereGeometry(headSize.r);
    let geoEye = new THREE.SphereGeometry(eyeSize.r);
    let geoBody = new THREE.CylinderGeometry(bodySize.x, bodySize.y, bodySize.z);
    let geoArm = new THREE.CylinderGeometry(armSize.x, armSize.y, armSize.z);
    let geoForearm = new THREE.CylinderGeometry(forearmSize.x, forearmSize.y, forearmSize.z);
    let geoLeg = new THREE.CylinderGeometry(legSize.x, legSize.y, legSize.z);

    let geoHand = new THREE.SphereGeometry(handSize.r);
    /** GEOMETRY CLOTHING */
    let geoShoe = new THREE.CylinderGeometry(shoesSize.x, shoesSize.y, shoesSize.z);
    // let geoRibbon = new THREE.SphereGeometry(ribbonSize.r);
    // let geoRibbonLaterals = new THREE.SphereGeometry(ribbonLateralsSize.r);
    /** HEAD */
    let head = new THREE.Mesh(geoHead, skin);
    head.position.set(0 , bodySize.z/2+headSize.r , 0)

    /** EYES */
    let eyeR = new THREE.Mesh(geoEye, eyes);
    eyeR.position.set(headSize.r/2-eyeSize.r/2 , 0 , headSize.r)
    let eyeL = new THREE.Mesh(geoEye, eyes);
    eyeL.position.set(-(headSize.r/2-eyeSize.r/2) , 0 , headSize.r)

    /** BODY */
    let body = new THREE.Mesh(geoBody, dress);
    
    /** SHOULDER(PIVOT) */
    let shoulderR = new THREE.Object3D();
    shoulderR.position.set(bodySize.x/2 + armSize.x, bodySize.z/2 , 0)
    shoulderR.rotation.z = 0.27
    let shoulderL = new THREE.Object3D();
    shoulderL.position.set(-bodySize.x/2 - armSize.x, bodySize.z/2 , 0)
    shoulderL.rotation.z = -0.27

    /** ARMS */
    let armR = new THREE.Mesh(geoArm, dress);
    armR.position.y = -armSize.z/2
    let armL = new THREE.Mesh(geoArm, dress);
    armL.position.y = -armSize.z/2

    /** ELBOW(PIVOT) */
    let elbowR = new THREE.Object3D();
    elbowR.position.y = -armSize.z/2
    let elbowL = new THREE.Object3D();
    elbowL.position.y = -armSize.z/2

    /** FOREARMS */
    let forearmR = new THREE.Mesh(geoForearm, skin);
    forearmR.position.y = -armSize.z/2
    let forearmL = new THREE.Mesh(geoForearm, skin);
    forearmL.position.y = -armSize.z/2

    /** HANDS */
    let handR = new THREE.Mesh(geoHand, skin);
    handR.position.y = -forearmSize.z/2 - handSize.r/2
    let handL = new THREE.Mesh(geoHand, skin);
    handL.position.y = -forearmSize.z/2 - handSize.r/2
    

    /** LEGS */
    let legR = new THREE.Mesh(geoLeg, skin);
    legR.position.x = bodySize.y/3
    legR.position.y = -bodySize.z/2 - legSize.z/2
    let legL = new THREE.Mesh(geoLeg, skin);
    legL.position.x = -bodySize.y/3
    legL.position.y = -bodySize.z/2 - legSize.z/2 

    /* CLOTHING */
    /** SHOES */
    // let shoeR = new THREE.Mesh(geoShoe, shoes)
    // shoeR.position.y = -legSize.z/2
    // let shoeL = new THREE.Mesh(geoShoe, shoes)
    // shoeL.position.y = -legSize.z/2

    /** RIBBON */
    // let ribbon = new THREE.Mesh(geoRibbon, dress);
    // ribbon.position.y = headSize.r - headSize.r/4
    // ribbon.position.z = headSize.r - headSize.r/4.5
    
    // let ribbonLateralRight = new THREE.Mesh(geoRibbonLaterals, dress);
    // ribbonLateralRight.position.y = headSize.r - headSize.r/4
    // ribbonLateralRight.position.z = headSize.r - headSize.r/4.5
    // ribbonLateralRight.position.x = ribbonLateralsSize.r

    // let ribbonLateralLeft = new THREE.Mesh(geoRibbonLaterals, dress);
    // ribbonLateralLeft.position.y = headSize.r - headSize.r/4
    // ribbonLateralLeft.position.z = headSize.r - headSize.r/4.5
    // ribbonLateralLeft.position.x = -ribbonLateralsSize.r

    /** ADDING TO SCENES */
    sackPos.add(body);
    body.add(head);
    head.add(eyeR);
    head.add(eyeL);
    body.add(shoulderR);
    shoulderR.add(armR);
    armR.add(elbowR);
    elbowR.add(forearmR);
    forearmR.add(handR);
    body.add(shoulderL);
    shoulderL.add(armL);
    armL.add(elbowL);
    elbowL.add(forearmL);
    forearmL.add(handL);
    body.add(legR);
    body.add(legL);

    /** ADDING CLOTHING TO SCENES */
    // legR.add(shoeR);
    // legL.add(shoeL);
    // head.add(ribbon);
    // head.add(ribbonLateralRight);
    // head.add(ribbonLateralLeft);

    /* POSITION IN "sackPos" */
    body.position.y = bodySize.y + legSize.z // + shoesSize.z

}

/*****************************
* ANIMATION FUNCTION 
* ***************************/
function render() {
    if (admin.activated) {
        if (moveFoward) {
            camera.position.z += 0.01
            console.log(camera.position.z);
        }

        if (moveBackwards) {
            camera.position.z -= 0.01
        }

        // if (moveLeft) {
        //     angle -= 0.1
        //     camera.lookAt(new THREE.Vector3(angle,0,0));
        // }

        // if (moveRight) {
        //     angle += 0.1
        //     camera.lookAt(new THREE.Vector3(angle,0,0));
        // }
    }

    else {
        if (moveRight) {
            camera.position.x -= 0.01
            sackPos.position.x -= 0.01
            sackPos.rotation.y = -Math.PI/2
        }

        if (moveLeft) {
            camera.position.x += 0.01
            sackPos.position.x += 0.01
            sackPos.rotation.y = Math.PI/2
        }
    }

    if (admin.activated && admin.clicking) {
        /** X */
        if (mousePos.x < -0.15 && mousePos.x >= -0.5)
            camera.position.x += 0.005
        if (mousePos.x < -0.5 && mousePos.x >= -0.9)
            camera.position.x += 0.01
        if (mousePos.x < -0.9)
            camera.position.x += 0.03
        

        if (mousePos.x > 0.15 && mousePos.x <= 0.5)
            camera.position.x -= 0.005
        if (mousePos.x > 0.5 && mousePos.x <= 0.9)
            camera.position.x -= 0.01
        if (mousePos.x > 0.9)
            camera.position.x -= 0.03

        /** Y */
        if (mousePos.y < -0.15)
            camera.position.y -= 0.005

        if (mousePos.y > 0.15)
            camera.position.y += 0.005    

        console.log(mousePos.x);
    }

    /* JUMPING ANIMATION */
    /** depending on the timer that the key 'space' is pressed, a respective number will be saved on the variable 'jump.intensity' */
    if (jump.intensityToggle) {
        if (jump.intensity < 0.35) {                                // doesn't allow the jump to be higher than +0.35
            jump.intensity += 0.025
            jump.max = sackPos.position.y + jump.intensity          // depending on the value on 'jump.intensity' and the currently sack position, it calculates the max value allowed for the jump
        } else {
            jump.intensityToggle = false
        }
    } else if (!jump.intensityToggle && jump.intensity != 0) {
        jump.up = true
    }

    /** the value saved in 'jump.max' is now used here in defining where the "jumping up" starts and ends */
    if ( jump.up && !jump.down && sackPos.position.y != jump.max ) {
        sackPos.position.y += 0.01
        if (sackPos.position.y >= jump.max) {
            jump.down = true
        }
    } else if (jump.up && jump.down && sackPos.position.y > 1.25) {
        sackPos.position.y -= 0.01
        jump.intensity = 0
    } else {
        jump.up = false
        jump.down = false
    }


    // render the scene into viewport using the camera
    renderer.render(scene, camera);
}


/*****************************
* KEYBOARD EVENTS 
* ***************************/
document.addEventListener("keydown", event => {

    /* actions that occurs when a key is pressed and the 'Dev tools' button is activated */
    if (event.key == 'ArrowUp' && admin.activated) {
        moveFoward = true
    }
    
    if (event.key == 'ArrowDown' && admin.activated) {
        moveBackwards = true
    }


    /* actions that occurs when a key is pressed and the 'Dev tools' button is deactivated, thus the game is playing normally */
    if (event.key == 'ArrowUp' && !admin.activated) {
        if (sackPos.position.z == layer.two.z) {
            sackPos.position.z = layer.one.z
            camera.position.z = -3.8
            mousePos.game.z = -3.8
        }

        if (sackPos.position.z == layer.three.z) {
            sackPos.position.z = layer.two.z
            camera.position.z = -4
            mousePos.game.z = -4
        }
    }
    
    if (event.key == 'ArrowDown' && !admin.activated) {
        if (sackPos.position.z == layer.two.z) {
            sackPos.position.z = layer.three.z
            camera.position.z = -4.2
            mousePos.game.z = -4.2
        }

        if (sackPos.position.z == layer.one.z) {
            sackPos.position.z = layer.two.z
            camera.position.z = -4
            mousePos.game.z = -4
        }
    }

    if (event.key == 'ArrowLeft') {
        moveLeft = true
    }

    if (event.key == 'ArrowRight') {
        moveRight = true
    }

    if (event.key == ' ') {
        jump.intensityToggle = true
    }

})

document.addEventListener("keyup", event => {

    if (event.key == 'ArrowUp') {
        moveFoward = false
    }

    if (event.key == 'ArrowDown') {
        moveBackwards = false
    }

    if (event.key == 'ArrowLeft') {
        moveLeft = false
        sackPos.rotation.y = Math.PI
    }

    if (event.key == 'ArrowRight') {
        moveRight = false
        sackPos.rotation.y = Math.PI
    }

    if (event.key == ' ') {
        jump.intensityToggle = false
    }

})

/*****************************
* MOUSE EVENTS 
* ***************************/
document.addEventListener("mousedown", event => {

    admin.clicking = true

    // convert mouse window coordinates into normalized coordinates: [-1, 1]
    let x = -1 + (event.clientX / window.innerWidth) * 2
    let y = 1 - (event.clientY / window.innerHeight) * 2

    mousePos.x = x
    mousePos.y = y

})

document.addEventListener("mousemove", event => {
    // convert mouse window coordinates into normalized coordinates: [-1, 1]
    let x = -1 + (event.clientX / window.innerWidth) * 2
    let y = 1 - (event.clientY / window.innerHeight) * 2

    mousePos.x = x
    mousePos.y = y

})

document.addEventListener("mouseup", event => { admin.clicking = false })

document.querySelector('#btnAdminDeactivated').addEventListener('click', event => {
    admin.activated = true

    mousePos.game.x = camera.position.x
    mousePos.game.y = camera.position.y
})

document.querySelector('#btnAdminActivated').addEventListener('click', event => {
    admin.activated = false

    camera.position.x = mousePos.game.x
    camera.position.y = mousePos.game.y
    camera.position.z = mousePos.game.z

    // angle = 0
    // camera.lookAt(new THREE.Vector3(0,0,0));
})

