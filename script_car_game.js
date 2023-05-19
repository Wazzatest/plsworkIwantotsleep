"use strict"

//display

const lines=document.querySelectorAll(".big_lines")
const lines_r=document.querySelectorAll('.lines_r')
const lines_l=document.querySelectorAll('.lines_l')

for (let k =0;k<lines_r.length;k++) {
    const element = lines_r[k]
    element.style.top=`${k*20-20}px`
}

for (let k =0;k<lines_l.length;k++) {
    const element = lines_l[k]
    element.style.top=`${k*20-20}px`;
}

for (let k=0;k<lines.length;k++) {
    const element = lines[k]
    element.style.top=`${k*85-85}px`;
}

function animation_big_lines(currentTime) {
    for(let k=0;k<lines.length; k++) {
        const line = lines[k]
        let y = parseInt(line.style.top)
        y+=1
        if (y===930) {
            y=-85
        }
        line.style.top=`${y}px`
    }
    if (s===1) {
        requestAnimationFrame(animation_big_lines)
    }
}

function animation_lines_r(currentTime) {
    for(let k=0;k<lines_r.length; k++) {
        const line = lines_r[k]
        let y = parseInt(line.style.top)
        y+=1
        if (y===840) {
            y=-20
        }
        line.style.top=`${y}px`
    }
    if (s===1) {
        requestAnimationFrame(animation_lines_r)
    }
}

function animation_lines_l(currentTime) {
    for(let k=0;k<lines_l.length; k++) {
        const line = lines_l[k]
        let y = parseInt(line.style.top)
        y+=1
        if (y===840) {
            y=-20
        }
        line.style.top=`${y}px`
    }
    if (s===1) {
        requestAnimationFrame(animation_lines_l)
    }
}

//game 

//player controls

const player = document.querySelector('.player')
let w = window.innerWidth
player.style.left=`${15.6*w/100}px`
player.style.top=`${45*w/100}px`

document.addEventListener('keydown',ActionKeyDownPlayer)

let p_player=0
let t = 0

function PlayerMovementanimationRight(currentTime) {
    if (s===1) {
        if (t<10) {
            t+=1
            p_player+=1
            player.style.left=`${p_player}px`
            requestAnimationFrame(PlayerMovementanimationRight)
        }
        else {
            t = 0 
            return
        }
    }
}

function PlayerMovementanimationLeft(currentTime) {
    if (s===1) {
        if (t<10) {
            t+=1
            p_player-=1
            player.style.left=`${p_player}px`
            requestAnimationFrame(PlayerMovementanimationLeft)
        }
        else {
            t = 0 
            return
        }
    }
}

function ActionKeyDownPlayer(event) {
    if (s===1) {
        if (event.keyCode===39) {
            p_player=parseInt(player.style.left)
            if(p_player<479) {
                requestAnimationFrame(PlayerMovementanimationRight)
            }
        }
        if (event.keyCode===37) {
            p_player = parseInt(player.style.left)
            if (p_player>-20) {
                requestAnimationFrame(PlayerMovementanimationLeft)
            }
        }
    }
}

//player lose

const game_over_screen = document.querySelector('.GameOverScreen')
const lose_score = document.querySelector('.lose_score')
const lose_high_score = document.querySelector('.lose_high_score')

function game_lose(currentTime) {
    let x = parseInt(player.style.left) + 12.5
    let y = parseInt(player.style.top) + 12.5
    let x_ennemi = 0
    let y_ennemi = 0
    for (let k=0;k<ennemis.length;k++) {
        const ennemi = ennemis[k]
        x_ennemi = parseInt(ennemi.style.left)
        y_ennemi = parseInt(ennemi.style.top)
        if (x>x_ennemi-38.75 && x < x_ennemi + 64) {
            if (y>y_ennemi-102.5 && y<y_ennemi+127.5) {
                s = 0
                game_over_screen.style.display="inline-block"
                score_display.style.display='none'
                score_value.style.display ='none'
                lose_score.textContent=`${score}`
                scores.push(score)
                high_score = Max(scores)
                lose_high_score.textContent=`${high_score}`
            }
        }
    }
    if (s===1) {
        requestAnimationFrame(game_lose)
    }

}

//game over screen

const yes_button = document.querySelector('.yes_button')
const no_button = document.querySelector('.no_button')

yes_button.addEventListener('click',ClickOnYes)

function ClickOnYes(event) {
    game_over_screen.style.display='none'
    score = 0
    startbutton.style.display='inline-block'
    instruction.style.display='block'
    circle1.style.display='block'
    circle2.style.display='block'
    arrow_keys.style.display='inline-block'
    player.style.left=`${15.6*w/100}px`
    GenerateEnnemis_2()
    ms_ennemi=3
    c = 1
}

const go_to_home_page = document.querySelector('.go_to_home_page')

no_button.addEventListener('click',ClickOnNo) 

function ClickOnNo(event) {
    game_over_screen.style.display='none'
    go_to_home_page.style.display='inline-block'
}

const no_home_button = document.querySelector('.no_home_button')

no_home_button.addEventListener('click',ClickOnNoHome)

function ClickOnNoHome(event) {
    game_over_screen.style.display='inline-block'
    go_to_home_page.style.display='none'
}

//ennemis

const ennemis = document.querySelectorAll('.ennemi')
const ennemis_x_y = []
let ms_ennemi = 3

GenerateEnnemis()

function GenerateEnnemis() {
    for (let k=0;k<ennemis.length;k++) {
        let x = 0
        let y = 0
        if (k===0) {
            x = Math.random()*515 -30
            y = Math.random()*400
        }
        let i = 0
        while (i<k) {
            if (i===0) {
                x = Math.random()*515 -30
                y = Math.random()*400
            }
            let x_other = ennemis_x_y[i][0]
            let y_other = ennemis_x_y[i][1]
            if (x < x_other-64 || x > x_other + 64) {
                i+=1 
            }
            else if (y < y_other-128 || y > y_other + 128) {
                i+=1
            }
            else {
                i = 0
            }
        }
        ennemis_x_y.push([x,y])
        const element = ennemis[k]
        element.style.left=`${x}px`
        element.style.top=`${y}px`
    }
}

function GenerateEnnemis_2() {
    for (let k=0;k<ennemis.length;k++) {
        let x = 0
        let y = 0
        if (k===0) {
            x = Math.random()*515 -30
            y = Math.random()*400
        }
        let x_other = 0
        let y_other = 0
        let i = 0
        while (i<k) {
            if (i===0) {
                x = Math.random()*515 -30
                y = Math.random()*400
            }
            if (i===k) {
                i+=1
                continue
            }
            x_other = ennemis_x_y[i][0]
            y_other = ennemis_x_y[i][1]
            if (y < y_other-128 || y > y_other + 128) {
                i+=1 
            }
            else if (x < x_other-100 || x > x_other + 100) {
                i+=1
            }
            else {
                i = 0
            }
        }
        ennemis_x_y[k]=[x,y]
        const element = ennemis[k]
        element.style.left=`${x}px`
        element.style.top=`${y}px`
    }
}

function animation_ennemis(currentTime) {
    for(let k=0;k<ennemis.length; k++) {
        const ennemi = ennemis[k]
        let y = parseInt(ennemi.style.top)
        y+=ms_ennemi
        if (y>=930) {
            y = Math.random()*(-128)-200
            let i = 0
            let x = 0
            let x_other = 0
            let y_other = 0
            while (i<ennemis.length) {
                if (i===0) {
                    x = Math.random()*515 -30
                }
                if (i===k) {
                    i+=1
                    continue
                }
                x_other = ennemis_x_y[i][0]
                y_other = ennemis_x_y[i][1]
                if (y < y_other-128) {
                    i+=1 
                }
                else if (x < x_other-100 || x > x_other + 100) {
                    i+=1
                }
                else {
                    i = 0
                }
            }
            ennemi.style.left=`${x}px`
            ennemis_x_y[k][0]=x
        }
        ennemis_x_y[k][1]= y
        ennemi.style.top=`${y}px`
    }
    if (s===1) {
        requestAnimationFrame(animation_ennemis)
    }
}

//score 

const score_display = document.querySelector('.score')
const score_value = document.querySelector('.num_score')
const scores = []

let score = 0
let high_score = 0
let c = 1

function increment_score(currentTime) {
    score+=1
    if (score===c*250) {
        c+=1
        ms_ennemi+=1
    }
    score_value.textContent = `${score}`
    if (s===1) {
        requestAnimationFrame(increment_score)
    }
}

//start game 

const startbutton = document.querySelector('.start')
const instruction = document.querySelector('.instruction')
const circle1 =document.querySelector('.circle1')
const circle2 =document.querySelector('.circle2')
const arrow_keys=document.querySelector('.arrow_keys')

startbutton.addEventListener('click',StartClick)
let s = 0

function StartClick(event) {
    requestAnimationFrame(animation_big_lines)
    requestAnimationFrame(animation_ennemis)
    requestAnimationFrame(animation_lines_r)
    requestAnimationFrame(animation_lines_l)
    requestAnimationFrame(game_lose)
    requestAnimationFrame(increment_score)
    s=1
    startbutton.style.display='none'
    instruction.style.display='none'
    circle1.style.display='none'
    circle2.style.display='none'
    arrow_keys.style.display='none'
    score_display.style.display='inline-block'
    score_value.style.display ='inline-block'
}

//functions 

function Max(l) {
    let m = l[0]
    let k = 1 
    while (k<l.length) {
        if (l[k]>m) {
            m = l[k]
        }
        k+=1
    }
    return m
}