
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
        this.namePos();
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
                background: "white",
                wireframes: false,
                showAngleIndicator: false
            }
        });
        Render.run(this.render);

        // create runner
        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);
    }

    mouseEvents(){
        this.mouse.element.removeEventListener("mousewheel", this.mouse.mousewheel);
        this.mouse.element.removeEventListener("DOMMouseScroll", this.mouse.mousewheel);
        Body.setPosition(this.cursor, Vector.create(this.mouse.position.x, this.mouse.position.y))
    }

    addObjects(){
    //mouse space
        this.cursor = Bodies.circle(100, 100,50,{
        isStatic: true,
        stiffness: 1,
        restitution: 1,
        collisionFilter: {
            //mask: mouseCategory,
            category: mouseCategory
        },
        })

        this.mouse = Mouse.create(this.render.canvas)
        World.add(this.engine.world, this.cursor)

        //name title
        this.nameCircles = []
        for(let c in this.nameData){
            this.nameCircles.push(
                Bodies.circle(
                    this.nameData[c].x,
                    this.nameData[c].y, 
                    1.2,{
                        density: 0.005,
                        restitution: 0,
                        render:{
                            fillStyle: 'black'
                        },collisionFilter: {
                            category: mouseCategory,
                        }
                    }     
                )
            )
        }

        World.add(this.engine.world, this.nameCircles)
        
    }

    namePos(){
        this.nameData = [];
        for(let line in nameData){

            for(let col in nameData[line]){

                this.nameData.push({
                    x: nameData[line][col].x * 4,
                    y: nameData[line][col].y * 4,
                })

            }
            
        }
    }

    nameEfect(){
        for(let i in this.nameCircles){
            let dx = this.nameData[i].x - this.cursor.position.x
            let dy = this.nameData[i].y - this.cursor.position.y
            let dist = Math.sqrt(dx*dx + dy*dy) 
            
            dx = this.nameData[i].x - this.nameCircles[i].position.x;
            dy = this.nameData[i].y - this.nameCircles[i].position.y;

            let posX = this.nameCircles[i].position.x
            let posY = this.nameCircles[i].position.y


            let dist2 = Math.sqrt(dx*dx + dy*dy)
            if( dist > this.cursor.circleRadius){
                Body.setPosition(this.nameCircles[i],{
                    x: posX += dx/10,
                    y: posY += dy/10
                })
            }
            
        }
    }

    

    initPaper(){

    }



    handleResize(){
        this.render.canvas.width = this.width;
        this.render.canvas.height = this.height;
    }

    renderLoop(){
        this.time += 0.05;
        this.mouseEvents()
        this.nameEfect();
        window.requestAnimationFrame(this.renderLoop.bind(this))
    }
}

let animation = new Sketch();

window.addEventListener('resize', function(){
    animation.width = window.innerWidth;
    animation.height = window.innerHeight;
    animation.handleResize()
})

animation.render.canvas.removeEventListener('contextmenu')

console.log(animation.cursor)

