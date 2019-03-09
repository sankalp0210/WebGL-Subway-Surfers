let Boot =  class {
    constructor(gl, pos, texture1, texture2){
        this.pos = pos;
        this.obj = [];
        this.obj.push(new Cube(gl, [pos[0],pos[1]-0.20,pos[2]], texture2, [0.40, 0.1, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]-0.10,pos[1],pos[2]], texture1, [0.20, 0.3, 0.2]));
    };
    move(val){
        if(this.pos[2] > val){
            this.pos[2] -= 100;
            for (var i=0;i<this.obj.length;i++){
                this.obj[i].pos[2] -= 100;
            }
        }
    }
    draw(gl, matrix, programInfo){
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].draw(gl, matrix, programInfo);
        }
    }
}
