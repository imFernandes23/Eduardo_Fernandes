
let buttonEmail = document.querySelector("#email").addEventListener("click", function(){
    let text = "eduardosage2302@gmail.com"
    navigator.clipboard.writeText(text)
    let button = document.querySelector("#email")
    button.classList.add('active')
    setTimeout(function(){
        button.classList.remove('active')
    },2500)  
})    


let btnContact = document.querySelector("#btn-contact").addEventListener("click", function(){
    let text = "eduardosage2302@gmail.com"
    navigator.clipboard.writeText(text)
    let button = document.querySelector("#btn-contact")
    button.classList.add('active')
    setTimeout(function(){
        button.classList.remove('active')
    },2500)  
})    

let worldsMain = [
    {
        world: "a Dev. Frontend"
    },
    {
        world: "a Python Programmer"
    },
    {
        world: "an Engineer"
    },
    {
        world: "an UX/UI Designer"
    }
]

let arrayOfWords = []

worldsMain.forEach((item) => {
    let word = item.world.split('')
    arrayOfWords.push(word)
})

let mainText = document.querySelector(".variable-text")

let addText = true
let indexWord = 0
let delay = 0
let next
let running = true


function animeText(){

        if(addText){
            arrayOfWords[indexWord].forEach((item) => {
                setTimeout(() => {addLetter(item)}, delay)
                delay += 110
            })
    
            addText = !addText
        }else{
            arrayOfWords[indexWord].forEach((item) => {
                setTimeout(() => {removeLetter()}, delay)
                delay += 110
            })
            addText = !addText
            arrayOfWords[indexWord+1]?next=indexWord+1:next=0
            indexWord = next
        }
    
        setTimeout(() => animeText(), 2000)

}

function addLetter(letter){
    mainText.innerHTML += letter
}

function removeLetter(){
    let newString = mainText.innerHTML
    mainText.innerHTML = newString.slice(0,-1)
}

setTimeout(() => animeText(), 3000)