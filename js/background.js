
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

class Sketch{
    constructor(){
        this.time = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.physics();
        this.initPaper();
        this.addObjects();
        this.renderLoop();  
    }

    physics(){
        this.engine = Engine.create(),
        this.world = this.engine.world;
        
        // remove universal gravity
        this.engine.gravity.x = 0;
        this.engine.gravity.y = 0

        // create renderer
        this.render = Render.create({
            element: document.querySelector('#matter-background'),
            engine: this.engine,
            options: {
                width: this.width,
                height: this.height,
                showVelocity: false,
                background: "transparent",
                wireframes: false,
                showAngleIndicator: false,
                PixelRatio: 4,
            }
        });
        Render.run(this.render);

        // create runner
        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);

    }

    mouseEvents(){
        this.mouse.element.removeEventListener("mousewheel", this.mouse.mousewheel, { passive: true });
        this.mouse.element.removeEventListener("DOMMouseScroll", this.mouse.mousewheel,{ passive: true });
        Body.setPosition(this.cursor, Vector.create(this.mouse.position.x, this.mouse.position.y))
    }

    addObjects(){
    //mouse space
        this.cursor = Bodies.circle(-50, -50,50,{
        isStatic: true,
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

        this.circleCenario1 = new fluidBodys(0.9,0,0.25,50, "#6f1dc2")
        World.add(this.engine.world, this.circleCenario1.vectorOfCircles)
        World.add(this.engine.world, this.circleCenario1.vectorOfAnchors)
        World.add(this.engine.world, this.circleCenario1.vectorOfLinks)

        
        this.circleCenario2 = new fluidBodys(0.5,0.1,0.1,30, "#6f1dc2")
        World.add(this.engine.world, this.circleCenario2.vectorOfCircles)
        World.add(this.engine.world, this.circleCenario2.vectorOfAnchors)
        World.add(this.engine.world, this.circleCenario2.vectorOfLinks)

        this.circleCenario3 = new fluidBodys(0.1,0.1,0.05,15, "#6f1dc2")
        World.add(this.engine.world, this.circleCenario3.vectorOfCircles)
        World.add(this.engine.world, this.circleCenario3.vectorOfAnchors)
        World.add(this.engine.world, this.circleCenario3.vectorOfLinks)

        //rectagle bodys

        this.rectangleCenario1 = new rectangleBodys(0.2,1.15,0.5,0.12,15,"#8341c4",450)
        World.add(this.engine.world, this.rectangleCenario1.vectorOfBodys)
        

        

        //name title
        this.nameTitle = new nameBodys(0.075, 0.2)
        World.add(this.engine.world, this.nameTitle.vectorOfBodys)


    }


    initPaper(){
        this.paperCanvas = document.getElementById('paper-background')
        this.project = new paper.Project(this.paperCanvas)
    }



    handleResize(){
        this.width = window.innerWidth;
        this.height = window.innerHeight
        this.render.canvas.width = this.width;
        this.render.canvas.height = this.height;
        this.paperCanvas.width = this.width;
        this.paperCanvas.height = this.height;
        this.project.view.viewSize = new paper.Size(this.width,this.height)
        this.circleCenario1.handleResize(0.9,0.05,0.25)
        this.circleCenario2.handleResize(0.5,0.1,0.1,)
        this.circleCenario3.handleResize(0.1,0.1,0.05,)
        this.rectangleCenario1.handleResize(0.2,1.15,0.5)
        this.nameTitle.handleResize(0.075,0.2)
        
        
    }

    renderLoop(){
        this.time += 0.05;
        this.mouseEvents()
        this.project.addLayer(this.circleCenario1.drawBodys())
        this.project.addLayer(this.circleCenario2.drawBodys())
        this.project.addLayer(this.circleCenario3.drawBodys())
        this.rectangleCenario1.rectangleEffect(this.cursor.position.x, this.cursor.position.y)
        this.nameTitle.nameEffect(this.cursor.position.x, this.cursor.position.y,this.cursor.circleRadius)
        window.requestAnimationFrame(this.renderLoop.bind(this))
    }
}

let animation = new Sketch();

window.addEventListener('resize', function(){
    animation.handleResize()
    animation.namePos()
}, { passive: true })



