
const card = document.querySelector(".project-card")
const list = document.querySelector(".project-list")
const cardText = document.querySelector(".card-text")
let cardShow = false
let cardState = true

function showCard(item) {

    if(cardShow){
        card.classList.remove("active")
        list.classList.add("active")
        cardShow = false

    }else{
        card.classList.add("active")
        list.classList.remove("active")
        cardShow = true
        hydrateCard(item)
    }
    
    if(stateCard){
        cardText.classList.remove("disabled")
        cardState = true
    }
}

function hydrateCard(item){
     console.log(item)
    let cardTitle = document.querySelector("#card-title")
    cardTitle.textContent = item.title

    let cardText = document.querySelector("#card-text")
    cardText.textContent = item.text

    let cardImg = document.querySelector("#card-img")
    cardImg.src = item.imgDir

    let cardHref = document.querySelector(".btn-link")
    console.log(item.href)
    // cardHref.href = item.href
}


function stateCard() {
    if(cardState){
        cardText.classList.add("disabled")
        cardState = false
    }else{
        cardText.classList.remove("disabled")
        cardState = true
    }
}

Data.map((item) => {
    let li = document.createElement("li")
    li.textContent = item.title
    li.addEventListener("click", () => showCard(item))
    list.appendChild(li)
})

let li = document.createElement("li")
li.textContent = "More soon..."
list.appendChild(li)
