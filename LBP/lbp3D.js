import * as THREE from './libs/three.module.js'

let camera, scene, renderer
let cameraX = 0, cameraY = 2, cameraZ = 8
let moveFoward = false, moveBackwards = false, moveLeft = false, moveRight = false
let mousePos = { x: 0, y: 0 }

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {

    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene()

    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100)
    camera.position.x = 0
    camera.position.y = cameraY
    camera.position.z = cameraZ
    camera.lookAt(scene.position); //point the camera to the center of the scene


    // create a render and set the size
    renderer = new THREE.WebGLRenderer({ antialias: false }) // aliasing (jagged edges when rendering)
    renderer.setSize(window.innerWidth, window.innerHeight)
    // configure renderer clear color
    renderer.setClearColor("#72bde0")

    // add the output of the renderer to an HTML element (this case, the body)
    document.body.appendChild(renderer.domElement)

    document.addEventListener('mousemove', handleMouseMove, false)
    
    /** house */
    house()

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

function house() {
    
}

function groundFunction() {
    /** GROUND */
    let groundColor = new THREE.MeshBasicMaterial({ color: '#000' })
    let groundSize = { x:50, y:40, z:50 }
    let geoGround = new THREE.BoxGeometry(groundSize.x,groundSize.y,groundSize.z)
    let ground = new THREE.Mesh(geoGround, groundColor)
    ground.position.y = -groundSize.y/2
    ground.position.x = 0
    ground.position.z = 0
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

function sackboy(flatCircle, circleSize) {

    let skinColor = new THREE.TextureLoader().load('images/sackboy/skin.png')
    let eyesColor = new THREE.TextureLoader().load('images/sackboy/eyes.png')
    let shoesColor = new THREE.TextureLoader().load('images/sackboy/shoes.png')
    let tieColor = new THREE.TextureLoader().load('images/sackboy/circle.png')
    let dressColor = new THREE.TextureLoader().load('images/sackboy/dress.png')
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 3, 3 );

    // flatShading: true, 
    let skin = new THREE.MeshPhongMaterial({ map: skinColor });
    let eyes = new THREE.MeshPhongMaterial({ map: eyesColor });
    let shoes = new THREE.MeshPhongMaterial({ map: shoesColor });
    let tie = new THREE.MeshPhongMaterial({ map: tieColor });
    let dress = new THREE.MeshPhongMaterial({ map: dressColor });

    // let materialSkin = new THREE.MeshBasicMaterial({ color: 0xa88e64 });
    

    /** OBJ. SIZES */
    headSize = { r:1.2 }
    bodySize = { x:0.7 , y:1 , z:2 }
    legSize = { x:0.3, y:0.35 , z:1.5 }
    let eyeSize = { r:0.21 }
    let armSize = { x:0.2 , y:0.3 , z:0.8 }
    let forearmSize = { x:armSize.y , y:armSize.x , z:armSize.z }

    let handSize = { r:0.2 }

    /** OBJ. CLOTHING SIZES */
    shoesSize = { x:legSize.x+0.15, y:legSize.y+0.2 , z:0.4 }
    let tieMiddleSize = { r:0.12 }
    let ribbonSize = { r:0.15 }
    let ribbonLateralsSize = { r:0.24 }

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
    let geoMiddleTie = new THREE.SphereGeometry(tieMiddleSize.r);
    let geoRibbon = new THREE.SphereGeometry(ribbonSize.r);
    let geoRibbonLaterals = new THREE.SphereGeometry(ribbonLateralsSize.r);
    /** HEAD */
    let head = new THREE.Mesh(geoHead, skin);
    head.position.set(0 , bodySize.z/2+headSize.r , 0)

    /** EYES */
    let eyeR = new THREE.Mesh(geoEye, eyes);
    eyeR.position.set(headSize.r/2-eyeSize.r/2 , 0 , headSize.r)
    let eyeL = new THREE.Mesh(geoEye, eyes);
    eyeL.position.set(-(headSize.r/2-eyeSize.r/2) , 0 , headSize.r)

    /** BODY */
    body = new THREE.Mesh(geoBody, dress);
    
    /** SHOULDER(PIVOT) */
    shoulderR = new THREE.Object3D();
    shoulderR.position.set(bodySize.x/2 + armSize.x, bodySize.z/2 , 0)
    shoulderR.rotation.z = 0.27
    shoulderL = new THREE.Object3D();
    shoulderL.position.set(-bodySize.x/2 - armSize.x, bodySize.z/2 , 0)
    shoulderL.rotation.z = -0.27

    /** ARMS */
    let armR = new THREE.Mesh(geoArm, dress);
    armR.position.y = -armSize.z/2
    let armL = new THREE.Mesh(geoArm, dress);
    armL.position.y = -armSize.z/2

    /** ELBOW(PIVOT) */
    elbowR = new THREE.Object3D();
    elbowR.position.y = -armSize.z/2
    elbowL = new THREE.Object3D();
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
    let shoeR = new THREE.Mesh(geoShoe, shoes)
    shoeR.position.y = -legSize.z/2
    let shoeL = new THREE.Mesh(geoShoe, shoes)
    shoeL.position.y = -legSize.z/2

    /** TIE */
    let tieLength = new THREE.Mesh(geoMiddleTie, tie);
    tieLength.position.x = bodySize.x/2 - tieMiddleSize.r - 0.2
    tieLength.position.y = bodySize.y/2 + tieMiddleSize.r + 0.11
    tieLength.position.z = bodySize.y/2 + tieMiddleSize.r + 0.2

    let tieLength2 = new THREE.Mesh(geoMiddleTie, tie);
    tieLength2.position.x = bodySize.x/2 - tieMiddleSize.r - 0.2
    tieLength2.position.y = bodySize.y/2 + tieMiddleSize.r - 0.30
    tieLength2.position.z = bodySize.y/2 + tieMiddleSize.r + 0.2

    let tieLength3 = new THREE.Mesh(geoMiddleTie, tie);
    tieLength3.position.x = bodySize.x/2 - tieMiddleSize.r - 0.2
    tieLength3.position.y = bodySize.y/2 + tieMiddleSize.r - 0.68
    tieLength3.position.z = bodySize.y/2 + tieMiddleSize.r + 0.2

    /** RIBBON */
    let ribbon = new THREE.Mesh(geoRibbon, dress);
    ribbon.position.y = headSize.r - headSize.r/4
    ribbon.position.z = headSize.r - headSize.r/4.5
    
    let ribbonLateralRight = new THREE.Mesh(geoRibbonLaterals, dress);
    ribbonLateralRight.position.y = headSize.r - headSize.r/4
    ribbonLateralRight.position.z = headSize.r - headSize.r/4.5
    ribbonLateralRight.position.x = ribbonLateralsSize.r

    let ribbonLateralLeft = new THREE.Mesh(geoRibbonLaterals, dress);
    ribbonLateralLeft.position.y = headSize.r - headSize.r/4
    ribbonLateralLeft.position.z = headSize.r - headSize.r/4.5
    ribbonLateralLeft.position.x = -ribbonLateralsSize.r

    /** ADDING TO SCENES */
    flatCircle.add(body);
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
    legR.add(shoeR);
    legL.add(shoeL);
    body.add(tieLength);
    body.add(tieLength2);
    body.add(tieLength3);
    head.add(ribbon);
    head.add(ribbonLateralRight);
    head.add(ribbonLateralLeft);

    /* POSIÇÃO NO CÍRCULO */
    body.rotation.x = Math.PI/2
    body.rotation.y = Math.PI
    body.position.z = bodySize.y + legSize.z + shoesSize.z
    body.position.y = -(-circleSize.r + circleSize.r/10)

}

function cacto() {
    //Futuro
    //let geometry = new THREE.CylinderGeometry(1, 2, 1);

    // GEOMETRIA
    let geometry = new THREE.CylinderGeometry(0.40, 0.40, 1);
    let geoTrunk = new THREE.CylinderGeometry(1,1,4)
    let geoTopTrunk = new THREE.SphereGeometry(1)
    let geoVase = new THREE.CylinderGeometry(1, 1.5,1)
    let geoEye = new THREE.SphereGeometry(0.3)
    let geoBlackEye = new THREE.SphereGeometry(0.1)
    let geoMouth = new THREE.SphereGeometry(0.18)
    let geoThongue = new THREE.SphereGeometry(0.08)

    // MATERIAL
    let matVase = new THREE.MeshBasicMaterial({ color:"white" });
    let matTrunk = new THREE.MeshBasicMaterial({ color: "green" });
    let matTopTrunk = new THREE.MeshBasicMaterial({ color: "green" });
    let matBlackEye = new THREE.MeshBasicMaterial({ color: "black" });
    let matThongue = new THREE.MeshBasicMaterial({ color: "red" });

    // const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    // const cylinder = new THREE.Mesh( geometry, material );
    // scene.add( cylinder );

    /* VASE */
    vase = new THREE.Mesh(geoVase, matVase);
    vase.position.x = 0
    vase.position.y = -1.5
    vase.rotation.z = 3.15

    /* TRUNK */
    trunk = new THREE.Mesh(geoTrunk, matTrunk);

    // COLORS TRUNK

    topTrunk = new THREE.Mesh(geoTopTrunk, matTopTrunk); 
    topTrunk.position.x = 0
    topTrunk.position.y = 2.1

    /* Eyes */
    //left
    leftEye = new THREE.Mesh(geoEye, matVase);
    leftEye.position.z = 1
    leftEye.position.x = -0.3
    leftEye.position.y = 1.5

    leftBlackEye = new THREE.Mesh(geoBlackEye, matBlackEye);
    leftBlackEye.position.z = 0.25
    leftBlackEye.position.x = -0.1
    leftBlackEye.position.y = 0.2

    //right
    rightEye = new THREE.Mesh(geoEye, matVase);
    rightEye.position.z = 1
    rightEye.position.x = 0.2
    rightEye.position.y = 1.5

    rightBlackEye = new THREE.Mesh(geoBlackEye, matBlackEye);
    rightBlackEye.position.z = 0.25
    rightBlackEye.position.x = -0.1
    rightBlackEye.position.y = 0.2

    /* Mouth */
    mouth = new THREE.Mesh(geoMouth, matBlackEye);
    mouth.position.z = 1
    mouth.position.x = 0.20
    mouth.position.y = 0.80

    /* Tongue */
    thongue = new THREE.Mesh(geoThongue, matThongue);
    thongue.position.z = 0.14
    thongue.position.x = 0.02
    thongue.position.y = -0.05

    /* SHOULDER */
    shoulderRight = new THREE.Object3D();

    /* ARM */
    let arm = new THREE.Mesh(geometry, matTrunk);
    arm.rotation.z = 1.6
    arm.position.x = 0.4+1
    // show axes for the ARM CS
    let axesArm = new THREE.AxesHelper(2);
    
    /* ELBOW */
    elbow = new THREE.Object3D();
    elbow.position.x = 0
    elbow.position.y = -0.6

    /* FOREARM */
    let forearm = new THREE.Mesh(geometry, matTrunk);
    // forearm.position.x = -2
    forearm.position.y = -0.4
    // forearm.rotation.z = 1.6

    /** Cacto's location on stage */
    let cactoPos = new THREE.Object3D();
    cactoPos.rotation.x = Math.PI/2
    cactoPos.rotation.y = Math.PI + Math.PI/2
    cactoPos.position.z = trunk.scale.y + vase.scale.y
    cactoPos.position.x = -circleSize.r + circleSize.r/10
    
    /*LIGAÇÕES */
    flatCircle.add(cactoPos);
    cactoPos.add(trunk);
    trunk.add(topTrunk);
    trunk.add(mouth);
    mouth.add(thongue);
    // topTrunk.add(cylinder);
    trunk.add(leftEye);
    leftEye.add(leftBlackEye);
    trunk.add(rightEye);
    rightEye.add(rightBlackEye);
    trunk.add(vase);
    trunk.add(shoulderRight);
    shoulderRight.add(arm);// add the ARM to the SHOULDER
    arm.add(elbow); // add the ELBOW to the ARM
    elbow.add(forearm);// add the FOREARM to the ELBOW
}

function bonecoNeve() {
    // let geometry1 = new THREE.BoxGeometry(2, 1, 1);
    // let geometry2 = new THREE.BoxGeometry(2,3,2)

    // scales
    let ball1Scale = { r:1.8 }
    let ball2Scale = { r:1.3 }
    let ball3Scale = { r:1 }
    let eyeSize = { r:0.12 }

    // geometry
    let geoBall1 = new THREE.SphereGeometry(ball1Scale.r)
    let geoBall2 = new THREE.SphereGeometry(ball2Scale.r)
    let geoBall3 = new THREE.SphereGeometry(ball3Scale.r)
    let geoCone = new THREE.ConeGeometry(0.2,1,64)
    let geoEye = new THREE.SphereGeometry(eyeSize.r)
    let geoButton = new THREE.CylinderGeometry(0.14,0.14,0.15,64)
    let geoMouth = new THREE.CylinderGeometry(0.06,0.06,0.09,64)

    // material
    let materialBall = new THREE.MeshPhongMaterial({ color: 'white' })
    let materialCone = new THREE.MeshPhongMaterial({ color: 'orange' })
    let materialEye = new THREE.MeshPhongMaterial({ color: 'black' })
    let materialButton = new THREE.MeshPhongMaterial({ color: 'black'})
    let materialMouth = new THREE.MeshPhongMaterial({ color: 'black'})

    // mesh
    ball1 = new THREE.Mesh(geoBall1,materialBall)
    ball2 = new THREE.Mesh(geoBall2,materialBall)
    ball3 = new THREE.Mesh(geoBall3,materialBall)
    nose = new THREE.Mesh(geoCone,materialCone)
    let eyeR = new THREE.Mesh(geoEye, materialEye)
    let eyeL = new THREE.Mesh(geoEye, materialEye)
    let button1 = new THREE.Mesh(geoButton,materialButton)
    let button2 = new THREE.Mesh(geoButton,materialButton)
    let button3 = new THREE.Mesh(geoButton,materialButton)
    let mouth1 = new THREE.Mesh(geoMouth,materialMouth)
    let mouth2 = new THREE.Mesh(geoMouth,materialMouth)
    let mouth3 = new THREE.Mesh(geoMouth,materialMouth)
    let mouth4 = new THREE.Mesh(geoMouth,materialMouth)
    let mouth5 = new THREE.Mesh(geoMouth,materialMouth)
    
    // position
    ball1.position.x = 0
    ball1.position.y = ball1Scale.r/2

    ball3.position.x = 0
    ball3.position.y = ball3Scale.r + ball2Scale.r/2

    ball2.position.x = 0
    ball2.position.y = ball2Scale.r + ball3Scale.r/2

    nose.position.z = ball3Scale.r
    nose.geometry.rotateX( Math.PI / 2 )

    eyeR.position.set(ball3Scale.r/2-eyeSize.r/2 , .2 , ball3Scale.r)
    eyeL.position.set(-(ball3Scale.r/2-eyeSize.r/2) , .2 , ball3Scale.r)
    eyeL.position.z = 0.9
    eyeR.position.z = 0.9

    button1.position.z = ball2Scale.r -0.15
    button2.position.z = ball2Scale.r
    button3.position.z = ball2Scale.r
    button1.position.y = 0.6
    button2.position.y = 0.2
    button3.position.y = -0.2
    button1.geometry.rotateX( Math.PI / 2 )
    button2.geometry.rotateX( Math.PI / 2 )
    button3.geometry.rotateX( Math.PI / 2 )

    mouth1.position.z = ball3Scale.r -0.05
    mouth2.position.z = ball3Scale.r -0.05
    mouth3.position.z = ball3Scale.r -0.05
    mouth4.position.z = ball3Scale.r -0.05
    mouth5.position.z = ball3Scale.r -0.05
    mouth1.position.y = -0.20
    mouth2.position.y = -0.30
    mouth3.position.y = -0.35
    mouth4.position.y = -0.30
    mouth5.position.y = -0.20
    mouth1.position.x = -0.4
    mouth2.position.x = -0.2
    mouth3.position.x = 0
    mouth4.position.x = 0.2
    mouth5.position.x = 0.4
    mouth1.geometry.rotateX(Math.PI / 2)
    mouth2.geometry.rotateX(Math.PI / 2)
    mouth3.geometry.rotateX(Math.PI / 2)
    mouth4.geometry.rotateX(Math.PI / 2)
    mouth5.geometry.rotateX(Math.PI / 2)
    

    // nose.scale.x = 0.3
    // nose.scale.y = 0.5
    /** BonecoNeve's location on stage */
    let bonecoNevePos = new THREE.Object3D()
    bonecoNevePos.rotation.x = Math.PI/2
    bonecoNevePos.rotation.y = Math.PI/2
    bonecoNevePos.position.z = ball1.scale.y/2
    bonecoNevePos.position.x = -(-circleSize.r + circleSize.r/10)

    // connections
    flatCircle.add(bonecoNevePos)
    bonecoNevePos.add(ball1)
    ball1.add(ball2)
    ball2.add(ball3)
    ball3.add(nose)
    ball3.add(eyeR)
    ball3.add(eyeL)

    ball2.add(button1)
    ball2.add(button2)
    ball2.add(button3)

    ball3.add(mouth1)
    ball3.add(mouth2)
    ball3.add(mouth3)
    ball3.add(mouth4)
    ball3.add(mouth5)
}

/*****************************
* ANIMATION FUNCTION 
* ***************************/
function render() {
    
    if (moveFoward) {
        camera.position.x  += 0.01
        console.log(camera.position.x);
    }

    if (moveBackwards) {
        camera.position.x  -= 0.01
    }
    
    // if (moveLeft) {
    //     cameraX += 0.01
    // }
    
    // let targetY = mousePos.y * 100;
    // if (targetY >  -23) {
    //     leftEye.position.z = (targetY - leftEye.position.y + 100) * 0.013;
    //     rightEye.position.z = (targetY - rightEye.position.y + 100) * 0.013;
    //     mouth.position.z = (targetY - mouth.position.y + 100) * 0.013;
    // }


    // render the scene into viewport using the camera
    renderer.render(scene, camera);
}

function handleMouseMove(event) {
    // convert mouse window coordinates into normalized coordinates: [-1, 1]
    let x = -1 + (event.clientX / window.innerWidth) * 2
    let y = 1 - (event.clientY / window.innerHeight) * 2
    mousePos = { x: x, y: y }
}

/*****************************
* KEYBOARD EVENTS 
* ***************************/
document.addEventListener("keydown", event => {

    if (event.key == 'w' || event.key == 'ArrowUp') {
        moveFoward = true
    }
    
    if (event.key == 'S' || event.key == 'ArrowDown') {
        moveBackwards = true
    }

    if (event.key == 'A' || event.key == 'ArrowLeft') {
        moveLeft = true
    }

    if (event.key == 'D' || event.key == 'ArrowRight') {
        moveRight = true
    }

})

document.addEventListener("keyup", event => {

    if (event.key == 'w' || event.key == 'ArrowUp') {
        moveFoward = false
    }

    if (event.key == 'S' || event.key == 'ArrowDown') {
        moveBackwards = false
    }

    if (event.key == 'A' || event.key == 'ArrowLeft') {
        moveLeft = false
    }

    if (event.key == 'D' || event.key == 'ArrowRight') {
        moveRight = false
    }
})