class fluidBodys{
    constructor(x, y, r, n, color, border){
        this.cx = window.innerWidth * x;
        this.cy = window.innerHeight * y;
        this.radius = window.innerWidth * r;
        this.numberOfPoints = n;
        this.vectorOfPosi = [];
        this.vectorOfCircles = [];
        this.vectorOfAnchors = [];
        this.vectorOfLinks = [];
        this.createCircles()
        this.color = color;
        this.border = border;
        this.fluidBody = new paper.Path();
        
    }

    defineFluidPos(){
        let points = []
        let number = this.numberOfPoints
        for(let i = 0; i < number; i++){
            let theta = i * Math.PI/number*2
            let x = this.cx + this.radius * Math.cos(theta);
            let y = this.cy + this.radius * Math.sin(theta);
            points.push({
                x: x,
                y: y,
            })
        }

        return points
    }

    createCircles(){
        this.vectorOfPosi = this.defineFluidPos()   
        for(let c in this.vectorOfPosi){
            this.vectorOfCircles.push(
                Bodies.circle(
                    this.vectorOfPosi[c].x,
                    this.vectorOfPosi[c].y,
                    5,{
                        desity: 0.05,
                        restitution: 0.1,
                        render:{
                            fillStyle: 'transparent'
                        },collisionFilter:{
                            mask: cenarioCategory,
                            category: cenarioCategory,
                            group: -1
                        }
                    }
                )
                
            )
            this.vectorOfAnchors.push(
                Bodies.circle(
                    this.vectorOfPosi[c].x,
                    this.vectorOfPosi[c].y,
                    2,{
                        desity: 0,
                        restitution: 0.1,
                        isStatic: true,
                        render:{
                            fillStyle: 'transparent'
                        },collisionFilter:{
                            group: -1
                        }
                    }
                )
                
            )
        }

        for(let i = 0; i < this.numberOfPoints; i++){
            let next = this.vectorOfCircles[i+1]?this.vectorOfCircles[i+1]:this.vectorOfCircles[0];
            this.vectorOfLinks.push(
                Constraint.create({
                    bodyA: this.vectorOfCircles[i],
                    bodyB: next,
                    stiffness: 1,
                    render: {
                        visible: false,
                    }
                })
            )
        }
        for(let i = 0; i < this.numberOfPoints; i++){
            this.vectorOfLinks.push(
                Constraint.create({
                    bodyA: this.vectorOfAnchors[i],
                    bodyB: this.vectorOfCircles[i],
                    stiffness: 0.05,
                    render: {
                        visible: false,
                    }
                })
            )
        }
    }

    handleResize(x, y, r){
        this.cx = window.innerWidth * x ;
        this.cy = window.innerHeight * y ;
        this.radius = window.innerWidth * r;
        this.vectorOfPosi = this.defineFluidPos()
        let distance = (360/this.numberOfPoints) * this.radius * Math.PI/180

        for(let i  in this.vectorOfCircles){
            Body.setPosition(this.vectorOfCircles[i],{
                x: this.vectorOfPosi[i].x,
                y: this.vectorOfPosi[i].y,
            })
            Body.setPosition(this.vectorOfAnchors[i],{
                x: this.vectorOfPosi[i].x,
                y: this.vectorOfPosi[i].y,
            })
            this.vectorOfLinks[i].length = distance;
        }

    }

    drawBodys(){
        this.fluidBody.removeSegments()
        this.fluidBody.moveTo(
            this.vectorOfCircles[0].position.x,
            this.vectorOfCircles[0].position.y
        )


        for(let i = 1; i < this.numberOfPoints; i++){
            this.fluidBody.lineTo(
                this.vectorOfCircles[i].position.x,
                this.vectorOfCircles[i].position.y
            )
        }

        this.fluidBody.closePath();

        this.fluidBody.strokeColor = this.border;
        this.fluidBody.strokeWidth = 2;
        this.fluidBody.fillColor = this.color

        this.fluidBody.smooth();

        return this.fluidBody

    }

}
