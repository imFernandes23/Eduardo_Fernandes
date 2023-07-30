const canvasName = document.getElementById('name-bg');
const ctx = canvasName.getContext('2d');

ctx.fillStyle = 'white'
ctx.font = '25px bauhau93 ' ;
ctx.fillText("Hello, I'm", 0, 20)
ctx.font = 'bauhau93 25px';
ctx.fillText('Eduardo', 5 ,40)
ctx.strokeStyle = 'white'
ctx.strokeRect(0,0, 122, 42)
const textCoordinates = ctx.getImageData(0,0, 106, 40);

var nameData = []

for( let y = 0, y2 = textCoordinates.height; y < y2; y++){
    
    let nameDataLine = []

    for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
        if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
                let pos = {
                x: x,
                y: y,
            }
            nameDataLine.push(pos)
        }
    }
    nameData.push(nameDataLine)

}

ctx.clearRect(0, 0, canvasName.width, canvasName.height)

class nameBodys{
    constructor( x, y){
        this.sx = window.innerWidth * x;
        this.sy = window.innerHeight * y;

        let marginR = window.innerWidth / 150;

        if(marginR > 6){
            this.margin = 6;
        }else{
            this.margin = marginR
        }

        this.radius = this.margin/3
        this.vectorOfPos = [];
        this.vectorOfBodys = [];
        this.createBodys()

    }

    defineCirclesPositions(){
        let points = [];

        for(let line in nameData){
            for(let col in nameData[line]){

                points.push({
                    x: nameData[line][col].x * this.margin + this.sx,
                    y: nameData[line][col].y * this.margin + this.sy,
                    s: Math.random() * 15 + 10
                })
            }
        }

        return points

    }

    createBodys(){
        this.vectorOfPos = this.defineCirclesPositions()

        for(let c in this.vectorOfPos){
            this.vectorOfBodys.push(
                Bodies.circle(
                    this.vectorOfPos[c].x,
                    this.vectorOfPos[c].y, 
                    this.radius,{
                        density: 0.8,
                        friction: 0,
                        restitution: 0.8,
                        render:{
                            fillStyle: 'white'
                        },collisionFilter: {
                            // group: -1,
                            mask: nameCategory
                        }
                    }     
                )
            )
            
        }
    }

    nameEffect(x , y , r){
        for(let i in this.vectorOfBodys){
 


            let dx = this.vectorOfPos[i].x - x
            let dy = this.vectorOfPos[i].y - y
            let dist = Math.sqrt(dx*dx + dy*dy) 
            
            dx = this.vectorOfPos[i].x - this.vectorOfBodys[i].position.x;
            dy = this.vectorOfPos[i].y - this.vectorOfBodys[i].position.y;

            let posX = this.vectorOfBodys[i].position.x
            let posY = this.vectorOfBodys[i].position.y

            let dist2 = Math.sqrt(dx*dx + dy*dy)

            if( dist > r *2 ){
                Body.setPosition(this.vectorOfBodys[i],{
                    x: posX += dx/this.vectorOfPos[i].s,
                    y: posY += dy/this.vectorOfPos[i].s
                })
            } 
        }
    }

    handleResize(x,y){
        this.sx = window.innerWidth * x;
        this.sy = window.innerHeight * y;

        let marginR = window.innerWidth / 150;

        if(marginR > 6){
            this.margin = 6;
        }else{
            this.margin = marginR
        }

        this.vectorOfPos = this.defineCirclesPositions()

        for(let i in this.vectorOfBodys){
            let r = this.vectorOfBodys[i].circleRadius;
            let r2 = this.margin / 3
            let newRadius = r2 / r
            Body.scale(this.vectorOfBodys[i], newRadius, newRadius)
        }


    }
}
