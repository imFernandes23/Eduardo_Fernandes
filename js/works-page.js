
const container = document.querySelector('.container');
let isMouseDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
});

container.addEventListener('mouseup', () => {
    isMouseDown = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mouseleave', () => {
    isMouseDown = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
});

Data.map((item,index) => {
    let isOpen = false

    let card = document.createElement("div")
    card.classList.add('card')

    let title = document.createElement("p")
    title.classList.add('card-title')
    title.innerHTML = item.title

    let text = document.createElement("p")
    text.classList.add('card-text')
    text.innerHTML = item.text

    let btn = document.createElement("a")
    btn.classList.add('card-btn')
    btn.innerHTML = "Visit"
    btn.href = item.href
    btn.target = "_blank"

    let img = document.createElement("div")
    img.classList.add("card-img")
    img.style.backgroundImage = 'url(' + item.imgDir + ')'
    img.addEventListener("click", () => {
        if(isOpen){
            img.classList.remove('active')
            isOpen = !isOpen
        }else{
            img.classList.add('active')
            isOpen = !isOpen
        }
    })

    let btnImg = document.createElement('div')
    btnImg.classList.add("card-img-btn")
    btnImg.innerHTML = "+"
    btnImg.addEventListener("click", () => {
        if(isOpen){
            img.classList.remove('active')
            btnImg.classList.remove('active')
            isOpen = !isOpen
        }else{
            img.classList.add('active')
            btnImg.classList.add('active')
            isOpen = !isOpen
        }
    })


    card.appendChild(title)
    card.appendChild(text)
    card.appendChild(btn)
    card.appendChild(img)
    card.appendChild(btnImg)
    container.appendChild(card)
})

let moreLater = document.createElement("div")
moreLater.classList.add("end-list")
moreLater.innerHTML = "More soon..."

container.appendChild(moreLater)