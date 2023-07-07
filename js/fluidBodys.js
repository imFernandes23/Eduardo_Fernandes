class fluidBodys{
    constructor(x, y, r, n, engine){
        this.cx = window.innerWidth * x;
        this.cy = window.innerHeight * y;
        this.radius = window.innerWidth * r;
        this.numberOfPoints = n;
        this.vectorOfPosi = [];
        this.vectorOfCircles = [];
        this.vectorOfAnchors = [];
        this.vectorOfLinks = [];
    }

    defineFluidPos(){
        let points = []
        
        for(let i = 0; i < this.numberOfPoints; i++){
            let theta = i * Math.PI/this.numberOfPoints/2
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
        for(let c in this.fluidCirclePos1){
            this.vectorOfCircles.push(
                Bodies.circle(
                    this.vectorOfPosi[c].x,
                    this.vectorOfPosi[c].y,
                    5,{
                        desity: 0.05,
                        restitution: 0.1,
                        render:{
                            fillStyle: 'yellow'
                        },collisionFilter:{
                            mask: cenarioCategory,
                            category: cenarioCategory
                        }
                    }
                )
                
            )
            this.vectorOfAnchors.push(
                Bodies.circle(
                    this.vectorOfPosi[c].x,
                    this.vectorOfPosi[c].y,
                    5,{
                        desity: 0,
                        restitution: 0.1,
                        isStatic: true,
                        render:{
                            fillStyle: 'yellow'
                        },collisionFilter:{
                            group: -1
                        }
                    }
                )
                
            )
        }

        for(let i = 0; i < 40; i++){
            let next = this.vectorOfCircles[i+1]?this.vectorOfCircles[i+1]:this.vectorOfCircles[0];
            this.vectorOfLinks.push(
                Constraint.create({
                    bodyA: this.vectorOfCircles[i],
                    bodyB: next,
                    stiffness: 1, 
                })
            )
            

        }
        for(let i = 0; i < 40; i++){
            this.fluidCirclesLinks1.push(
                Constraint.create({
                    bodyA: this.vectorOfAnchors[i],
                    bodyB: this.vectorOfCircles[i],
                    stiffness: 0.01,
                })
            )
        }
    }

    handleResize(x, y, r){
        this.cx = window.innerWidth * x;
        this.cy = window.innerHeight * y;
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

}