const matter_background = document.querySelector("#matter-background")
var thiccness = 60
let w = matter_background.clientWidth;
let h = matter_background.clientHeight;
let r 
if( w > h){
    r = h / 3
}else{
    r = w / 3    
}


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Mouse  = Matter.Mouse,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();


// create a renderer
var render = Render.create({
    element: matter_background,
    engine: engine,
    options: {
        width: w,
        height: h,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false
    }
});

// create two boxes and a ground////////////////////////////

let downWall = Bodies.rectangle(w / 2,h + thiccness / 2 , 20000 , thiccness , 
    { 
        isStatic: true,
        render: {visible: false}
     });

let upWall = Bodies.rectangle(w / 2,- thiccness / 2, 20000, thiccness , 
    { 
        isStatic: true,
        render: {visible: false}
     });

let rightWall = Bodies.rectangle(w + thiccness / 2 , h / 2 , thiccness , h * 5 ,
    { 
        isStatic: true,
        render: {visible: false}
     }
)

let leftWall = Bodies.rectangle(- thiccness / 2 , h / 2 , thiccness , h * 5 ,
    { 
        isStatic: true,
        render: {visible: false}
     }
)



// for(let i = 0; i < 100; i++){
//     let circle = Bodies.circle(i, 10,
//         Math.random() * 40 + 5
//         , {
//         friction: 0.3,
//         frictionAir: 0.00001,
//         restitution: 0.8,
//     })
//     Composite.add(engine.world, circle);
// }

// add all of the bodies to the world
Composite.add(engine.world, [downWall]);


//mouse Space/////////////////////////////////////////////////



let mouseCircle = Bodies.circle(100, 100, 60,{
    isStatic: true,
    stiffness: 1,
    restitution: 1,
})
let mouse = Mouse.create(render.canvas)

Events.on(engine, 'afterUpdate', function(){
    if(!mouse.position.x){
        return;
    }
    Matter.Body.setPosition(mouseCircle,
        Matter.Vector.create(mouse.position.x, mouse.position.y))
})

// let mouseConstraint = Matter.MouseConstraint.create(engine, {
//     mouse: mouse,
//     constraint:{
//         stiffness: 0.2,
//         render: {
    
//             visible: false
//         }
//     }
// })

mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

Composite.add(engine.world, mouseCircle)

// Circles////////////////////////////////////////////////////////

let bckCircle1 = Bodies.circle(w * 0.9, h * 0.1, r, {
    friction: 0.3,
    frictionAir: 0.00001,
})

let anchor1 = Constraint.create({
    pointA: {x: w * 0.9, y: h * 0.1},
    bodyB: bckCircle1,
    stiffness: 0.01,
    damping: 0.5,
})
Composite.add(engine.world, [bckCircle1, anchor1])



// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function handleResize(matter_background){
    w = matter_background.clientWidth;
    h = matter_background.clientHeight;
    render.canvas.width = w;
    render.canvas.height = h;

    // reposition world
    // reposition Walls
    Matter.Body.setPosition(
        downWall,
        Matter.Vector.create(w / 2, h + thiccness / 2,)
    )

    Matter.Body.setPosition(
        upWall,
        Matter.Vector.create(w / 2,- thiccness / 2,)
    )

    Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(w + thiccness / 2, h / 2,)
    )

    Matter.Body.setPosition(
        leftWall,
        Matter.Vector.create(- thiccness / 2,h / 2,)
    )
}

window.addEventListener("resize", () => handleResize(matter_background))