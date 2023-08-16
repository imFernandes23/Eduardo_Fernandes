const element = document.querySelector("#front-k")

        document.addEventListener('mousemove', (e) => {
            let x = e.clientX;
            let y = e.clientY;
            console.log(x,y)
            element.style.visibility = "visible"
            element.style.clipPath = `circle(15% at ${x}px ${y}px)`
        })