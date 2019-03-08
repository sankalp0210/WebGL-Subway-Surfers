let Track =  class {
    constructor(gl, pos, texture){
        this.obj = [];
        for (var i=0;i<150;i++){
            this.obj.push(new trCube(gl, [pos[0],pos[1],pos[2]-i*2],texture, [3.0, 0.0, 2.0]));
        }
    };
    draw(gl, matrix, programInfo){
        for (var i=0;i<this.obj.length;i++){
            this.obj[i].draw(gl, matrix, programInfo);
        }
    }
}
