let player =  class {
    constructor(gl, pos){
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        this.positions = [
            // Front face
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            // back face
            -1.0, -1.0,  -1.0,
            1.0, -1.0,  -1.0,
            1.0,  1.0,  -1.0,
            -1.0,  1.0,  -1.0,
            //right face
            1.0, -1.0,  1.0,
            1.0, -1.0,  -1.0,
            1.0,  1.0,  1.0,
            1.0,  1.0,  -1.0,
            // left face
            -1.0, -1.0,  1.0,
            -1.0, -1.0,  -1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0,  -1.0,
            // top face
            -1.0,  1.0,  1.0,
            -1.0,  1.0,  -1.0,
            1.0,  1.0,  1.0,
            1.0,  1.0,  -1.0,
            //bottom face
            -1.0, -1.0,  1.0,
            -1.0, -1.0,  -1.0,
            1.0, -1.0,  1.0,
            1.0, -1.0,  -1.0
        ];
        this.pos = pos;
        this.rotation = 0;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        this.faceColors = [
            [1.0,  0.0,  1.0,  1.0],
            [0.0,  1.0,  0.0,  1.0],
            [0.5,  0.0,  1.0,  1.0],
            [0.9,  0.3,  0.0,  1.0],
            [0.0,  0.4,  0.0,  1.0],
            [0.0,  0.9,  1.0,  1.0]
        ];

        this.colors = [];
        
        for (var j = 0; j < this.faceColors.length; ++j) {
            const c = this.faceColors[j];
            this.colors = this.colors.concat(c, c, c, c);
        }

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
        
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        this.indices = [
            0,  1,  2,      0,  2,  3,
            4,  5,  6,      4,  6,  7,
            8,  9,  10,     9, 10,  11,
            12, 13, 14,    13, 14,  15,
            16, 17, 18,    17, 18,  19,
            20, 21, 22,    21, 22,  23
        ];

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            color: this.colorBuffer,
            indices: this.indexBuffer,
        }
    }

    draw(gl, projectionMatrix, programInfo, deltaTime){

        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix,     // destination matrix
                       modelViewMatrix,     // matrix to translate
                       this.pos);  // amount to translate
      
        mat4.rotate(modelViewMatrix, 
                    modelViewMatrix, 
                    this.rotation, 
                    [1, 1, 1]);
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }
      
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.color);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
        }
      
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);
      
        gl.useProgram(programInfo.program);

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
      
        {
          const vertexCount = 36;
          const type = gl.UNSIGNED_SHORT;
          const offset = 0;
          gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

        this.rotation += deltaTime;
    }
}