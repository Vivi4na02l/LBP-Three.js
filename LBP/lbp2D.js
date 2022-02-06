let delayIntro = 3000, loop = 0, opacity = 1

setTimeout(function() {
    decreaseLbpIntroOpacity()
}, delayIntro)

function decreaseLbpIntroOpacity() {
    
    loop += 1

    let delayLbpIntro = 30; // 3 seconds
 
    setTimeout(function() {
        decreaseLbpIntroOpacity2(loop)
    }, delayLbpIntro)
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



document.querySelector('#btnAdminDeactivated').addEventListener('click', event => {
    document.querySelector('#btnAdminDeactivated').style.visibility = 'hidden'
    document.querySelector('#btnAdminActivated').style.visibility = 'visible'
})

document.querySelector('#btnAdminActivated').addEventListener('click', event => {
    document.querySelector('#btnAdminActivated').style.visibility = 'hidden'
    document.querySelector('#btnAdminDeactivated').style.visibility = 'visible'
})