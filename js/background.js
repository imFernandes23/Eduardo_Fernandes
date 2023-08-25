


let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World  = Matter.World,
    Body   = Matter.Body,
    Vector = Matter.Vector,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

var wallsCategory = 0x0001,
    nameCategory = 0x0002,
    cenarioCategory = 0x0004,
    mouseCategory = 0x0008;

var scrollPage = document.getElementById("scroll-page")
var mainPage = document.getElementById("main-page")
var pages = document.querySelectorAll(".page")

var numberOfPages = 4
var scrollValue = 0;
var mouseLocal = {
    x: 0,
    y: 0
}
var color1 = '#885DD7'
var color2 = '#1a1a1a'

var atualPage = 0

class Sketch{
    constructor(dataName){
        this.time = 0;
        this.data = dataName;
        if(window.innerWidth < 481){ //is mobile screen?
            this.mobile = true
        }else{
            this.mobile =  false
        }
        this.ref = {
            mobile: this.mobile
        }
        this.arrayOfTitles =  [
            {x: 0.075, y: 0.3},
            {x: 0.070, y: 1.7},
            {x: 0.5, y: 2.8},
            {x: 0.03, y: 3.0},
        ]
        this.physics();
        this.initPaper();
        this.addObjects();
        this.renderLoop();
    }

    physics(){
        this.engine = Engine.create({
            // enableSleeping: true
        }),
        this.world = this.engine.world;
        
        // remove universal gravity
        this.engine.gravity.x = 0;
        this.engine.gravity.y = 0
        
        

        // create renderer
        this.render = Render.create({
            element: document.querySelector('#matter-background'),
            engine: this.engine,    
            options: {
                width: window.innerWidth,
                height: window.innerHeight * numberOfPages,
                showVelocity: false,
                background: "transparent",
                wireframes: false,
                showAngleIndicator: false,
            }
        });
        Render.run(this.render);

        // create runner
        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);

    }

    mouseMove(x,y,scroll){
        Body.setPosition(this.cursor, {
            x: x,
            y: y + scroll
        })
    }

    addObjects(){
    //mouse space
        this.cursor = Bodies.circle(-50, -50,70,{
        isStatic: true,
        friction: 0.0001,
        stiffness: 1,
        restitution: 1,
        collisionFilter: {
            //mask: mouseCategory,
            category: nameCategory | cenarioCategory
        },render:{
            fillStyle: 'transparent'
        }
        })

        this.mouse = Mouse.create(this.render.canvas)
        World.add(this.engine.world, this.cursor)

        //fluid Circles

        this.circleCenario1 = new fluidBodys(0.9,0.05,0.25,40, color1, color1)
        World.add(this.engine.world, this.circleCenario1.vectorOfCircles)
        World.add(this.engine.world, this.circleCenario1.vectorOfAnchors)
        World.add(this.engine.world, this.circleCenario1.vectorOfLinks)

        
        this.circleCenario2 = new fluidBodys(0.5,0.1,0.1,25, color1, color1)
        World.add(this.engine.world, this.circleCenario2.vectorOfCircles)
        World.add(this.engine.world, this.circleCenario2.vectorOfAnchors)
        World.add(this.engine.world, this.circleCenario2.vectorOfLinks)

        this.circleCenario3 = new fluidBodys(0.1,0.1,0.05,10, color1, color1)
        World.add(this.engine.world, this.circleCenario3.vectorOfCircles)
        World.add(this.engine.world, this.circleCenario3.vectorOfAnchors)
        World.add(this.engine.world, this.circleCenario3.vectorOfLinks)

        this.circleCenario4 = new fluidBodys(0.9,3.2,0.2,40, color1, color1)
        World.add(this.engine.world, this.circleCenario4.vectorOfCircles)
        World.add(this.engine.world, this.circleCenario4.vectorOfAnchors)
        World.add(this.engine.world, this.circleCenario4.vectorOfLinks)

        //rectagle bodys

        this.rectangleCenario1 = new rectangleBodys(0.2,1,0.4,0.12,10,color1,450)
        World.add(this.engine.world, this.rectangleCenario1.vectorOfBodys)

        this.rectangleCenario2 = new rectangleBodys(0.85,2,0.2,0.25,5,color1,250)
        World.add(this.engine.world, this.rectangleCenario2.vectorOfBodys)

        this.rectangleCenario3 = new rectangleBodys(0.2,4,0.4,0.12,10,color1,450)
        World.add(this.engine.world, this.rectangleCenario3.vectorOfBodys)

        if(!this.mobile){
            this.addTitle()
        }


    }

    addTitle(){
        if(this.nameTitle){
            World.add(this.engine.world, this.nameTitle.vectorOfBodys)
            
        }else{
            this.nameTitle = new nameBodys(this.data, this.arrayOfTitles)
            this.nameTitle.defineCirclesPositions(0);
            this.nameTitle.createBodys()
            World.add(this.engine.world, this.nameTitle.vectorOfBodys)
        }

        
    }

    removeeTitle(){
        if(this.nameTitle.vectorOfBodys){
            for(let i = 0; i < this.nameTitle.vectorOfBodys.length; i++){
                World.remove(this.engine.world, this.nameTitle.vectorOfBodys[i])
            }
        }
    }

    initPaper(){
        this.paperCanvas = document.getElementById('paper-background')
        this.project = new paper.Project(this.paperCanvas)
    }



    handleResize(){
        if(window.innerWidth < 481){ //is mobile screen?
            this.mobile = true
            if(this.ref.mobile !== this.mobile){
                this.removeeTitle()
                this.ref.mobile = true
            }

        }else{
            this.mobile =  false
            if(this.ref.mobile !== this.mobile){
                this.addTitle()
                this.ref.mobile = false
            }
            
        }
        this.render.canvas.width = window.innerWidth;
        this.render.canvas.height = window.innerHeight * numberOfPages;
        this.paperCanvas.width = window.innerWidth;
        this.paperCanvas.height = window.innerHeight * numberOfPages;
        this.project.view.viewSize = new paper.Size(window.innerWidth,window.innerHeight * numberOfPages)
        this.circleCenario1.handleResize(0.9,0.05,0.25)
        this.circleCenario2.handleResize(0.5,0.1,0.1,)
        this.circleCenario3.handleResize(0.1,0.1,0.05,)
        this.circleCenario4.handleResize(0.9,3.2,0.2)
        this.rectangleCenario1.handleResize(0.2,1,0.4)
        this.rectangleCenario2.handleResize(0.85,2,0.2,)
        this.rectangleCenario3.handleResize(0.2,4,0.4)
        if(!this.mobile){
            this.nameTitle.handleResize()
        }
        
        
    }

    renderLoop(){
        this.time += 0.2;
        this.project.addLayer(this.circleCenario1.drawBodys())
        this.project.addLayer(this.circleCenario2.drawBodys())
        this.project.addLayer(this.circleCenario3.drawBodys())
        this.project.addLayer(this.circleCenario4.drawBodys())
        this.rectangleCenario1.rectangleEffect(this.cursor.position.x, this.cursor.position.y)
        this.rectangleCenario2.rectangleEffect(this.cursor.position.x, this.cursor.position.y)
        this.rectangleCenario3.rectangleEffect(this.cursor.position.x, this.cursor.position.y)
        if(!this.mobile){
            this.nameTitle.nameEffect(this.cursor.position.x, this.cursor.position.y,this.cursor.circleRadius)
        }
        window.requestAnimationFrame(this.renderLoop.bind(this))
        
    }
}

//resizers, scrollers and pointers events

window.addEventListener('load', function() {
    let fullData = titleData()

    let animation = new Sketch(fullData);

    const knowPage = document.querySelector("#front-k")
    
    window.addEventListener('resize', function(){
        animation.handleResize()

        doheight()
    }, { passive: true })
    
    window.addEventListener('mousemove', function(e){

        mouseLocal.x = e.clientX
        mouseLocal.y = e.clientY
        animation.mouseMove(mouseLocal.x, mouseLocal.y, scrollValue)

        if(atualPage === 1){
            knowPage.style.visibility = 'visible'
            knowPage.style.clipPath =  `circle(15% at ${mouseLocal.x}px ${mouseLocal.y}px)`
        }else{
            knowPage.style.visibility = 'hidden'
        }
    
    })
    
    window.addEventListener('touchmove', function(e){
        mouseLocal.x = e.touches[0].clientX
        mouseLocal.y = e.touches[0].clientY
        animation.mouseMove(mouseLocal.x, mouseLocal.y, scrollValue)

        if(atualPage === 1){
            knowPage.style.visibility = 'visible'
            knowPage.style.clipPath =  `circle(15% at ${mouseLocal.x}px ${mouseLocal.y}px)`
        }else{
            knowPage.style.visibility = 'hidden'
        }
    })
    
    scrollPage.addEventListener("scroll", function(e){
        console.log('rodei')
        let rect = mainPage.getBoundingClientRect()
        scrollValue = Math.max(0, -rect.top)
        animation.mouseMove(mouseLocal.x, mouseLocal.y, scrollValue)
        let page = Math.floor(scrollValue / window.innerHeight)
        if(page !== atualPage){
            atualPage = page
            animation.nameTitle.defineCirclesPositions(atualPage)
        }

        if(atualPage === 1){
            knowPage.style.visibility = 'visible'
            knowPage.style.clipPath =  `circle(15% at ${mouseLocal.x}px ${mouseLocal.y}px)`
        }else{
            knowPage.style.visibility = 'hidden'
        }

    })
    
    function defineScroll(){
        let rect = scrollPage.getBoundingClientRect()
        scrollValue = Math.max(0, -rect.top)
    }
});

function doheight(){
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
}

doheight()






