
//ctx.clearRect(0, 0, canvasName.width, canvasName.height)

class nameBodys{
    constructor(data, starts){
        // this.sx = window.innerWidth * x;
        // this.sy = window.innerHeight * y;

        this.sx = 0;
        this.sy = 0;

        let marginR = window.innerWidth / 150;

        if(marginR > 6){
            this.margin = 8;
        }else{
            this.margin = marginR
        }

        this.data = data;
        this.starts = starts;
        this.page = 0;
        this.number = this.data[0].value
        this.radius = this.margin/2.4
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
                    s: Math.random() * 5,
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
                    this.vectorOfPos[c].x,
                    this.vectorOfPos[c].y, 
                    // 0,
                    // 0,
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

        for( let i = 0; i < this.vectorOfBodys.length; i++){
            let distX = this.vectorOfPos[i].x - x;
            let distY = this.vectorOfPos[i].y - y;
            let dist = Math.sqrt(distX*distX + distY*distY)

            if(dist > r ){
                let dx = this.vectorOfPos[i].x - this.vectorOfBodys[i].position.x;
                let dy = this.vectorOfPos[i].y - this.vectorOfBodys[i].position.y;
                let px = this.vectorOfBodys[i].position.x;
                let py = this.vectorOfBodys[i].position.y;
                Body.setPosition(this.vectorOfBodys[i],{
                    x: px += dx/(20 + this.vectorOfPos[i].s) ,
                    y: py += dy/(20 + this.vectorOfPos[i].s)
                },true)
                
            }
        }

   

    }

    handleResize(x,y){
        this.sx = window.innerWidth * x;
        this.sy = window.innerHeight * y;

        let marginR = window.innerWidth / 150;

        if(marginR > 8){
            this.margin = 8;
        }else{
            this.margin = marginR
        }

        this.defineCirclesPositions(this.page)

        for(let i in this.vectorOfBodys){
            let r = this.vectorOfBodys[i].circleRadius;
            let r2 = this.margin / 2.4
            let newRadius = r2 / r
            Body.scale(this.vectorOfBodys[i], newRadius, newRadius)
        }


    }
}
