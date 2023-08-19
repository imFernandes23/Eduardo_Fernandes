
//ctx.clearRect(0, 0, canvasName.width, canvasName.height)

class nameBodys{
    constructor(data, starts){
        // this.sx = window.innerWidth * x;
        // this.sy = window.innerHeight * y;

        this.sx = 0;
        this.sy = 0;

        let marginR = window.innerWidth / 150;

        if(marginR > 6){
            this.margin = 6;
        }else{
            this.margin = marginR
        }

        this.data = data;
        this.starts = starts;
        this.page = 0;
        this.number = 1922

        this.radius = this.margin/3
        this.vectorOfPos = [];
        this.vectorOfBodys = [];

    }

    defineCirclesPositions(page){
        this.page = page;
        this.vectorOfPos = []
            
        this.sx = window.innerWidth * this.starts[page].x;
        this.sy = window.innerHeight * this.starts[page].y;

        let points = []

        for(let line in this.data[page].nameData){
            for(let col in this.data[page].nameData[line]){
                points.push({
                    x: this.data[page].nameData[line][col].x * this.margin + this.sx,
                    y: this.data[page].nameData[line][col].y * this.margin + this.sy,
                    s: Math.random() * 20 + 5,
                })
            }
        }
        let count = Math.floor(this.number/points.length);
        let val = this.number % points.length
        let result = []

        for(let i = 0; i < count; i++){
            let arr = [...result,...points]
            result = arr
        }

        for(let i = 0; i < val; i++){
            result.push(points[i])
        }

        this.vectorOfPos = result



    }

    createBodys(){

        for(let c in this.vectorOfPos){
            this.vectorOfBodys.push(
                Bodies.circle(
                    // this.vectorOfPos[c].x,
                    // this.vectorOfPos[c].y, 
                    0,
                    0,
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

                if( dist > r ){
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

        this.defineCirclesPositions(this.page)

        for(let i in this.vectorOfBodys){
            let r = this.vectorOfBodys[i].circleRadius;
            let r2 = this.margin / 3
            let newRadius = r2 / r
            Body.scale(this.vectorOfBodys[i], newRadius, newRadius)
        }


    }
}
