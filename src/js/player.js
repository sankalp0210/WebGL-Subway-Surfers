let Player =  class {
    constructor(gl, pos, texture){
        this.pos = pos;
        this.left = 0;
        this.right = 0;
        this.moveX = 2.2;
        this.strideFor = 0.1;
        this.strideHor = 0.2;
        this.gravity = 0.05;
        this.incHeight = 0;
        this.jump = 0;
        this.jetpack = 0;
        this.maxHeight = 0.5;
        this.slowTime = 1;
        this.maxSlowTime = 150;
        this.jetTime = 0;
        this.maxJetTime = 400;
        this.bootTime = 0;
        this.up = 0;
        this.maxBootTime = 400;
        this.obj = [];
        // body
        this.obj.push(new Cube(gl, [pos[0],pos[1],pos[2]],texture, [0.5, 0.5, 0.5]));
        // legs
        this.obj.push(new Cube(gl, [pos[0]-0.15,pos[1]-0.45,pos[2]],texture, [0.2, 0.4, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]+0.15,pos[1]-0.45,pos[2]],texture, [0.2, 0.4, 0.2]));
        // arms
        this.obj.push(new Cube(gl, [pos[0]- 0.35,pos[1],pos[2]],texture, [0.15, 0.4, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]+ 0.35,pos[1],pos[2]],texture, [0.15, 0.4, 0.2]));
        // head
        this.obj.push(new Cube(gl, [pos[0],pos[1]+0.4,pos[2]],texture, [0.3, 0.3, 0.3]));
    };
    move(){
 
        if(this.slowTime > 0)
            this.slowTime += 1;
        if(this.slowTime > this.maxSlowTime){
            this.slowTime = 0;
            this.strideFor = 0.2;
        }

        if(this.jetTime > 0){
            this.jetTime += 1;
            // console.log(this.jetTime);
        }
        if(this.jetTime >= this.maxJetTime){
            this.jetTime = 0;
            this.maxHeight = 0.5;
            this.jump = -1;
            this.jetpack = 0;
        }
        if(this.bootTime > 0)
            this.bootTime += 1;
        if(this.bootTime > this.maxBootTime){
            this.bootTime = 0;
            this.maxHeight = 0.5;
        }

        var xInc = 0, yInc = 0, zInc = 0;
        zInc = -this.strideFor;
        if(this.left == 1)
            xInc = -this.strideHor;
        if(this.right == 1)
            xInc = this.strideHor;

        if(this.jump){
            this.incHeight += (this.gravity*this.jump);
        }
        // up down movement
        if(this.incHeight >= this.maxHeight){
            this.jump = -1;
            if(this.jetpack==1)
            this.jump = 0;
            this.incHeight = 0;
        }
        if(this.pos[1] < 1.0){
            this.jump = 0;
            this.incHeight = 0;
            yInc = 1.0 - this.pos[1];
        }
        yInc += this.incHeight;
        if(this.up == 1){
            yInc = 2.75 - this.pos[1];
        }
        // increment
        this.pos[0] += xInc;
        this.pos[1] += yInc;
        this.pos[2] += zInc;
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].pos[0]+= xInc;
            this.obj[i].pos[1]+= yInc;
            this.obj[i].pos[2]+= zInc;
        }
        // left right movement
        if(this.pos[0] <= -2.0){
            this.left = -1;
            this.right = 0;
        }
        else if(this.pos[0] >= 2.0){
            this.right = -1;
            this.left = 0;
        }
        else if(this.pos[0] >= -0.2 && this.pos[0] <= 0.0 && this.left == -1){
            this.left = 0;
            this.right = 0;
        }
        else if(this.pos[0] <= 0.2 && this.pos[0] >= 0.0 && this.right == -1){
            this.left = 0;
            this.right = 0;
        }
    }
    bt(val){
        this.pos[1] += val;
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].pos[1] += val;
        }
    }
    bt2(val){
        this.pos[2] += val;
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].pos[2] += val;
        }
    }
    draw(gl, matrix, programInfo){
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].draw(gl, matrix, programInfo);
        }
    }
}
