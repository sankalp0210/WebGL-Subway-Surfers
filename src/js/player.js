let Player =  class {
    constructor(gl, pos, texture){
        this.pos = pos;
        this.obj = [];
        this.obj.push(new Cube(gl, [pos[0],pos[1],pos[2]],texture, [0.5, 0.5, 0.5]));
    };
    move(val){
        this.pos[0] += val[0];
        this.pos[1] += val[1];
        this.pos[2] += val[2];
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].pos[0]+= val[0];
            this.obj[i].pos[1]+= val[1];
            this.obj[i].pos[2]+= val[2];
        }
    }
    draw(gl, matrix, programInfo){
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].draw(gl, matrix, programInfo);
        }
    }
}
