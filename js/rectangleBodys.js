class rectangleBodys{
    constructor(x, y, size, angle, n, color, min){
        this.cx = window.innerWidth * x;
        this.minSize = min;
        this.cy = window.innerHeight * y;
        if(window.innerWidth * size < this.minSize){
            this.size = this.minSize;
        }else{
            this.size = window.innerWidth * size;
        }
        
        this.angle = Math.PI * angle;
        this.number = n;
        this.width = this.size * Math.cos(this.angle) + this.size * Math.sin(this.angle);
        this.height = this.size * Math.sin(this.angle) + this.size * Math.cos(this.angle);
        this.color = color;
        this.vectorOfPosi = [];
        this.vectorOfBodys = [];
        this.createBodys()
    }

    defineCirclesPos(){
        let points = [];
        let number = this.number;
        let margin = this.size * 0.05;
        let cirQuart = this.size * 0.9 / number;
        this.circleRadius = (cirQuart * 0.85) / 2;
        this.miniRadius =  (cirQuart * 0.2) / 2
        let angleDegraus = (this.angle) * (180/ Math.PI)


        for(let i = 0; i < number; i++){
            for(let j = 0 ; j < number; j++){
                points.push({
                    x: (cirQuart * i) + (this.cx - this.size / 2 + margin + cirQuart/2),
                    y: (cirQuart * j) + (this.cy - this.size / 2 + margin + cirQuart/2)
                })
            }
        }
        
        let pointsRotate = [];

        for(let ele in points){
            pointsRotate.push({
                x: ((points[ele].x - this.cx) * Math.cos(this.angle) - (points[ele].y - this.cy) * Math.sin(this.angle)) + this.cx,
                y: ((points[ele].x - this.cx) * Math.sin(this.angle) + (points[ele].y - this.cy) * Math.cos(this.angle)) + this.cy
            })
        }

        return pointsRotate

    }

    createBodys(){
        this.vectorOfPosi = this.defineCirclesPos()

        this.vectorOfBodys.push(
            Bodies.rectangle(this.cx,this.cy,this.size, this.size, {
                isStatic: true,
                chamfer: true,
                angle: this.angle,
                render:{
                    fillStyle: this.color
                }
            })
        )

        for(let i in this.vectorOfPosi){
            this.vectorOfBodys.push(
                Bodies.circle(
                    this.vectorOfPosi[i].x,
                    this.vectorOfPosi[i].y,
                    this.circleRadius,{
                        isStatic: true,
                        render: {
                            fillStyle: "white"
                        }
                    }
                )
            )
            
        }
    }

    handleResize(x, y, size){
        this.cx = window.innerWidth * x;
        this.cy = window.innerHeight * y;
        if(window.innerWidth * size < this.minSize){
            this.size = this.minSize
        }else{
            this.size = window.innerWidth * size;
        }
        

        let prevWidth = this.width;
        let prevHeight = this.height;
        this.width = this.size * Math.cos(this.angle) + this.size * Math.sin(this.angle);
        this.height = this.size * Math.sin(this.angle) + this.size * Math.cos(this.angle);

        let newW = this.width / prevWidth;
        let newH = this.height / prevHeight;

        let prevCircleR = this.circleRadius

        this.vectorOfPosi = this.defineCirclesPos();

        let newR = this.circleRadius / prevCircleR

        Body.setPosition(this.vectorOfBodys[0],{
            x: this.cx,
            y: this.cy
        })
        Body.scale(this.vectorOfBodys[0], newW, newH)

        for( let i = 1; i < (this.number ** 2 + 1); i++){
            Body.setPosition(this.vectorOfBodys[i],{
                x: this.vectorOfPosi[i -1].x,
                y: this.vectorOfPosi[i -1].y
            })

            Body.scale(this.vectorOfBodys[i], newR, newR)
        }

    }


    rectangleEffect(x,y){
        for(let i = 1; i < (this.number ** 2 + 1); i++){
            let dx = x - this.vectorOfBodys[i].position.x;
            let dy = y - this.vectorOfBodys[i].position.y;

            let dist = Math.sqrt(dx * dx + dy * dy);

            if(dist < this.size/3 && this.vectorOfBodys[i].circleRadius > this.miniRadius){
                let r = this.vectorOfBodys[i].circleRadius;
                let r2 = r - 0.5;
                let newRadius = r2 / r;
                Body.scale(this.vectorOfBodys[i], newRadius, newRadius)
            } 

            if(dist > this.size/3 && this.vectorOfBodys[i].circleRadius < this.circleRadius){
                let r = this.vectorOfBodys[i].circleRadius;
                let r2 = r + 0.5;
                let newRadius = r2 / r;
                Body.scale(this.vectorOfBodys[i], newRadius, newRadius)
            } 
        }
    }

}