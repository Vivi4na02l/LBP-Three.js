let delayThreeSeconds = 3000


/*****************************
* LBP INTRO FADE OUT "ANIMATION"
* ***************************/
let loop = 0, opacity = 1

setTimeout(function() {
    decreaseLbpIntroOpacity()
}, delayThreeSeconds)

function decreaseLbpIntroOpacity() {
    
    loop += 1
 
    setTimeout(function() {
        decreaseLbpIntroOpacity2(loop)
    }, 30)
}

function decreaseLbpIntroOpacity2(loop) {
    opacity -= loop/100
    
    if (loop % 2 == 0)
        document.querySelector('#divLbpIntro').style.opacity = opacity

    if (loop != 50)
        decreaseLbpIntroOpacity()

    if (loop >= 50)
        document.querySelector('#divLbpIntro').style.visibility = 'hidden'
}


/*****************************
* BUTTONS "DEV TOOLS"
* ***************************/
document.querySelector('#btnAdminDeactivated').addEventListener('click', event => {
    document.querySelector('#btnAdminDeactivated').style.visibility = 'hidden'
    document.querySelector('#btnAdminActivated').style.visibility = 'visible'
})

document.querySelector('#btnAdminActivated').addEventListener('click', event => {
    document.querySelector('#btnAdminActivated').style.visibility = 'hidden'
    document.querySelector('#btnAdminDeactivated').style.visibility = 'visible'
})



/*****************************
* DIV INFO "ANIMATION"
* ***************************/
document.querySelector('#btnInfo').addEventListener('click', event => {
    if (document.querySelector('#divInfo').parentNode.style.visibility == 'hidden' || document.querySelector('#divInfo').style.bottom >= window.innerHeight-10+'px') {
        divInfoAnimation(window.innerHeight, true)

        document.querySelector('#divInfo').parentNode.style.visibility = 'visible'
    } else {
        divInfoAnimation(window.innerHeight/2, false)
    }
    
    function divInfoAnimation(pos, appearing) {
        if (appearing) {
            pos -= 10   
        } else {
            pos += 10
        }
     
        setTimeout(function() {
            divInfoAnimation2(pos, appearing)
        }, 30)
    }
    
    function divInfoAnimation2(pos, appearing) {
        if (appearing) {
            if (pos >= window.innerHeight/2+5) {
                document.querySelector('#btnInfo').disabled = true
                document.querySelector('#divInfo').style.bottom = pos +'px'
                divInfoAnimation(pos, appearing)
            } else {
                document.querySelector('#btnInfo').disabled = false
            }
        } else {
            if (pos <= window.innerHeight) {
                document.querySelector('#btnInfo').disabled = true
                document.querySelector('#divInfo').style.bottom = pos +'px'
                divInfoAnimation(pos, appearing)
            } else {
                document.querySelector('#btnInfo').disabled = false
            }
        }
    }
})