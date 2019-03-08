let Wall =  class {
    constructor(gl, pos, texture){
        this.obj = [];
        for (var i=0;i<50;i++){
            this.obj.push(new wlCube(gl, [pos[0],pos[1],pos[2]-i*5],texture, [0.0, 5.0, 5.0]));
        }
    };
    draw(gl, matrix, programInfo){
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].draw(gl, matrix, programInfo);
        }
    }
}