let Cube =  class {
    constructor(gl, pos, texture, dimensions){
        const b = dimensions[0] /2;
        const h = dimensions[1] /2;
        const l = dimensions[2] /2;
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.positions = [
            // Front face
            -b, -h, l,
             b, -h, l,
             b,  h, l,
            -b,  h, l,
            // back face
            -b, -h,  -l,
             b, -h,  -l,
             b,  h,  -l,
            -b,  h,  -l,
            //right face
             b, -h,  l,
             b, -h, -l,
             b,  h,  l,
             b,  h, -l,
            // left face
            -b, -h,  l,
            -b, -h, -l,
            -b,  h,  l,
            -b,  h, -l,
            // top face
            -b,  h,  l,
            -b,  h, -l,
             b,  h,  l,
             b,  h, -l,
            //bottom face
            -b, -h,  l,
            -b, -h, -l,
             b, -h,  l,
             b, -h, -l
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        
        this.textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        this.textureCoordinates = [
            // Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), gl.STATIC_DRAW);
        
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
            textureCoord: this.textureBuffer,
            indices: this.indexBuffer,
        }

        this.pos = pos;
        this.rotation = 0;
        this.texture = texture;
    }

    draw(gl, projectionMatrix, programInfo){
        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix,     // destination matrix
                       modelViewMatrix,     // matrix to translate
                       this.pos);  // amount to translate
      
        mat4.rotate(modelViewMatrix, 
                    modelViewMatrix, 
                    this.rotation, 
                    [1, 0, 0]);
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
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
            gl.vertexAttribPointer(programInfo.attribLocations.textureCoord,
                numComponents, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
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

    }
}