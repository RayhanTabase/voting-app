
document.addEventListener('DOMContentLoaded', function() {

    let vote_buttons = document.querySelectorAll(".candidate")
    vote_buttons.forEach(element=>{
        element.addEventListener('click', () => pop_up());
    })

});


function pop_up(){
    /////// shows pop up for already voted//////


    let pop_up = document.querySelector("#message-voted")
    pop_up.style.display = "block"
    let close_btn = pop_up.querySelector(".close_btn")
    let body = document.querySelector(".container-index")
    console.log(body)
    body.style.opacity="0.5"
    body.style.pointerEvents = "none"

    close_btn.addEventListener('click', ()=>{
        pop_up.style.display = "none"
        body.style.opacity="1"
        body.style.pointerEvents = "all"
    })
}