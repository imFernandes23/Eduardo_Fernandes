class rectangleBodys{
    constructor(x, y, size, angle, n, color){
        this.cx = window.innerWidth * x;
        this.cy = window.innerHeight * y;
        this.size = window.innerWidth * size;
        this.angle = angle;
        this.number = n;
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
        this.circleRadius = (cirQuart * 0.9) / 2;
        this.miniRadius =  (cirQuart * 0.25) / 2



        for(let i = 0; i < number; i++){
            for(let j = 0 ; j < number; j++){
                points.push({
                    x: (this.cx - this.size / 2) + (cirQuart * i) + margin + cirQuart / 2,
                    y: (this.cy - this.size / 2) + (cirQuart * j) + margin + cirQuart / 2
                })
            }
        }

        return points

    }

    createBodys(){
        this.vectorOfPosi = this.defineCirclesPos()

        this.vectorOfBodys.push(
            Bodies.rectangle(this.cx,this.cy,this.size, this.size, {
                isStatic: true,
                chamfer: true,
                angle: Math.PI * this.angle
            })
        )

        for(let i in this.vectorOfPosi){
            this.vectorOfBodys.push(
                Bodies.circle(
                    this.vectorOfPosi[i].x,
                    this.vectorOfPosi[i].y,
                    this.circleRadius,{
                        isStatic: true
                    }
                )
            )
            console.log(this.vectorOfPosi[i])
        }
    }

}