let Dog =  class {
    constructor(gl, pos, textureHair, textureBody, textureArms, textureLegs){
        this.pos = pos;
        this.obj = [];
        // body
        this.obj.push(new Cube(gl, [pos[0],pos[1],pos[2]],textureBody, [0.3, 0.3, 0.5]));
        // legs
        this.obj.push(new Cube(gl, [pos[0]-0.1,pos[1]-0.25,pos[2]+0.2],textureLegs, [0.1, 0.2, 0.1]));
        this.obj.push(new Cube(gl, [pos[0]+0.1,pos[1]-0.25,pos[2]+0.2],textureLegs, [0.1, 0.2, 0.1]));
        // arms
        this.obj.push(new Cube(gl, [pos[0]- 0.1,pos[1]-0.25,pos[2]-0.25],textureArms, [0.1, 0.2, 0.1]));
        this.obj.push(new Cube(gl, [pos[0]+ 0.1,pos[1]-0.25,pos[2]-0.25],textureArms, [0.1, 0.2, 0.1]));
        // head
        this.obj.push(new Cube(gl, [pos[0],pos[1],pos[2]-0.4],textureHair, [0.2, 0.2, 0.2]));
    };
    move(){
        // this.obj[1].rotation -= 0.1*this.factor;
        // this.obj[2].rotation += 0.1*this.factor;
        // this.obj[3].rotation += 0.1*this.factor;
        // this.obj[4].rotation -= 0.1*this.factor;
        // if(this.obj[1].rotation > 1.0)
        //     this.factor = -1;
        // if(this.obj[1].rotation < -1.0)
        //     this.factor = 1;
    }
    bt(val){
        this.pos[0] += val;
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].pos[0] += val;
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
