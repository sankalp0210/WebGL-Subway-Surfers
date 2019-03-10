let Police =  class {
    constructor(gl, pos, textureHair, textureBody, textureArms, textureLegs){
        this.pos = pos;
        this.obj = [];
        // body 
        this.obj.push(new Cube(gl, [pos[0],pos[1],pos[2]], textureBody, [0.7, 0.7, 0.7]));
        // legs
        this.obj.push(new Cube(gl, [pos[0]-0.25,pos[1]-0.55,pos[2]],textureLegs, [0.2, 0.4, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]+0.25,pos[1]-0.55,pos[2]],textureLegs, [0.2, 0.4, 0.2]));
        // arms
        this.obj.push(new Cube(gl, [pos[0]- 0.45,pos[1],pos[2]], textureArms, [0.15, 0.4, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]+ 0.45,pos[1],pos[2]], textureArms, [0.15, 0.4, 0.2]));
        // head
        this.obj.push(new Cube(gl, [pos[0],pos[1]+0.5,pos[2]], textureHair, [0.3, 0.3, 0.3]));
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
