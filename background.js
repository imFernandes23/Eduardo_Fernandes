const matter_background = document.querySelector("#matter-background")
var thiccness = 60

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: matter_background,
    engine: engine,
    options: {
        width: matter_background.clientWidth,
        height: matter_background.clientHeight,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false
    }
});

// create two boxes and a ground

let downWall = Bodies.rectangle(
    matter_background.clientWidth / 2,
    matter_background.clientHeight + thiccness / 2,
    20000,
    thiccness, 
    { 
        isStatic: true,
        render: {visible: false}
     });

let upWall = Bodies.rectangle(
    matter_background.clientWidth / 2,
    - thiccness / 2,
    20000,
    thiccness, 
    { 
        isStatic: true,
        render: {visible: false}
     });

let rightWall = Bodies.rectangle(
    matter_background.clientWidth + thiccness / 2,
    matter_background.clientHeight / 2,
    thiccness,
    matter_background.clientHeight * 5,
    { 
        isStatic: true,
        render: {visible: false}
     }
)

let leftWall = Bodies.rectangle(
    - thiccness / 2,
    matter_background.clientHeight / 2,
    thiccness,
    matter_background.clientHeight * 5,
    { 
        isStatic: true,
        render: {visible: false}
     }
)

for(let i = 0; i < 100; i++){
    let circle = Bodies.circle(i, 10,
        Math.random() * 40 + 5
        , {
        friction: 0.3,
        frictionAir: 0.00001,
        restitution: 0.8,
    })
    Composite.add(engine.world, circle);
}

// add all of the bodies to the world
Composite.add(engine.world, [downWall, rightWall, leftWall, upWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint:{
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
})

mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

Composite.add(engine.world, mouseConstraint)

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function handleResize(matter_background){
    render.canvas.width = matter_background.clientWidth;
    render.canvas.height = matter_background.clientHeight;

    // reposition world

    Matter.Body.setPosition(
        downWall,
        Matter.Vector.create(
            matter_background.clientWidth / 2,
            matter_background.clientHeight + thiccness / 2,
            )
    )

    Matter.Body.setPosition(
        upWall,
        Matter.Vector.create(
            matter_background.clientWidth / 2,
            - thiccness / 2,
            )
    )

    Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
            matter_background.clientWidth + thiccness / 2,
            matter_background.clientHeight / 2,
            )
    )

    Matter.Body.setPosition(
        leftWall,
        Matter.Vector.create(
            - thiccness / 2,
            matter_background.clientHeight / 2,
            )
    )
}

window.addEventListener("resize", () => handleResize(matter_background))