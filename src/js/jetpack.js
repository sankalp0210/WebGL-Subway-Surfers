let Jetpack =  class {
    constructor(gl, pos, texture1, texture2){
        this.pos = pos;
        this.obj = [];
        this.obj.push(new Cube(gl, [pos[0],pos[1]+0.05,pos[2]], texture2, [0.30, 0.1, 0.15]));
        this.obj.push(new Cube(gl, [pos[0]-0.15,pos[1],pos[2]], texture1, [0.15, 0.3, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]+0.15,pos[1],pos[2]], texture1, [0.15, 0.3, 0.2]));
        this.obj.push(new Cube(gl, [pos[0]-0.15,pos[1]+0.2,pos[2]], texture2, [0.1, 0.1, 0.1]));
        this.obj.push(new Cube(gl, [pos[0]+0.15,pos[1]+0.2,pos[2]], texture2, [0.1, 0.1, 0.1]));
    };
    move(val){
        if(this.pos[2] > val){
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
