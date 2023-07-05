
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
        this.margin = 3;
        this.marginR = 0
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
                showAngleIndicator: false,
                devicePixelRatio:2,
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
            category: nameCategory
        },render:{
            fillStyle: 'transparent'
        }
        })

        this.circle = Bodies.circle(100, 100,50,{
            stiffness: 1,
            restitution: 1,
            collisionFilter: {
                //mask: mouseCategory,
                category: cenarioCategory
            }
            })

        
            World.add(this.engine.world, this.circle)
        this.mouse = Mouse.create(this.render.canvas)
        World.add(this.engine.world, this.cursor)

        //name title
        this.nameCircles = []
        for(let c in this.nameData){
            this.nameCircles.push(
                Bodies.circle(
                    this.nameData[c].x,
                    this.nameData[c].y, 
                    1.3,{
                        density: 0.005,
                        restitution: 0,
                        render:{
                            fillStyle: 'black'
                        },collisionFilter: {
                            group: -1,
                            mask: nameCategory
                        }
                    }     
                )
            )
            
        }

        World.add(this.engine.world, this.nameCircles)
        
    }

    namePos(){
        // relative position
        let startW = this.width * 0.1;
        let startH = this.height * 0.25;
        
        this.marginR = this.width / 150
        if(this.marginR > 5){
            this.margin = 5
        }else{
            this.margin = this.marginR
        }


        this.nameData = [];
        for(let line in nameData){

            for(let col in nameData[line]){

                this.nameData.push({
                    x: nameData[line][col].x * this.margin + startW,
                    y: nameData[line][col].y * this.margin + startH,
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
    animation.namePos()
})


console.log(animation.cursor)

