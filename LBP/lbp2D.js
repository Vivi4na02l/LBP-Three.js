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
}