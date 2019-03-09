let Police =  class {
    constructor(gl, pos, texture){
        this.pos = pos;
        this.obj = [];
        // body
        this.obj.push(new Cube(gl, [pos[0],pos[1],pos[2]],texture, [0.7, 0.7, 0.7]));
        // legs
        this.obj.push(new Cube(gl, [pos[0]-0.25,pos[1]-0.55,pos[2]],texture, [0.2, 0.4, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]+0.25,pos[1]-0.55,pos[2]],texture, [0.2, 0.4, 0.2]));
        // arms
        this.obj.push(new Cube(gl, [pos[0]- 0.45,pos[1],pos[2]],texture, [0.15, 0.4, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]+ 0.45,pos[1],pos[2]],texture, [0.15, 0.4, 0.2]));
        // head
        this.obj.push(new Cube(gl, [pos[0],pos[1]+0.5,pos[2]],texture, [0.3, 0.3, 0.3]));
    };
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
