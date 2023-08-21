
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

