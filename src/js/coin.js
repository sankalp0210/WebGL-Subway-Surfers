let Coin =  class {
    constructor(gl, pos, texture, dimensions){
        const n = 50;
        const deg = 2*3.1415926/n;
        var o = 0.0, o1 = 0.0;
        var r1 = dimensions[0] /2;
        var r2 = dimensions[1] /2;
        const h  = dimensions[2] /2;
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.positions = [4*9*n+100];
        var x1 = r1, y1 = 0.0, z1 = h/2, z2 = -h/2;
        for(var i=0;i<n;i++){
            o = deg*(i+1);
            this.positions[9*i + 0] = 0;
            this.positions[9*i + 1] = 0;
            this.positions[9*i + 2] = z1;
            this.positions[9*i + 3] = x1;
            this.positions[9*i + 4] = y1;
            this.positions[9*i + 5] = z1;
            this.positions[9*i + 6] = x1 = (r1*Math.cos(o));
            this.positions[9*i + 7] = y1 = (r1*Math.sin(o));
            this.positions[9*i + 8] = z1;
        }
        x1 = r2; y1 = 0.0;
        for(var i=n;i<2*n;i++){
            o = deg*(i+1);
            this.positions[9*i + 0] = 0;
            this.positions[9*i + 1] = 0;
            this.positions[9*i + 2] = z2;
            this.positions[9*i + 3] = x1;
            this.positions[9*i + 4] = y1;
            this.positions[9*i + 5] = z2;
            this.positions[9*i + 6] = x1 = (r2*Math.cos(o));
            this.positions[9*i + 7] = y1 = (r2*Math.sin(o));
            this.positions[9*i + 8] = z2;
        }
        x1 = r1; y1 =0;
        for(var i=2*n;i<3*n;i++){
            o = deg*(i+1);
            o1 = deg*(i);
            this.positions[9*i + 0] = (r2*Math.cos(o1));
            this.positions[9*i + 1] = (r2*Math.sin(o1));
            this.positions[9*i + 2] = z2;
            this.positions[9*i + 3] = x1;
            this.positions[9*i + 4] = y1;
            this.positions[9*i + 5] = z1;
            this.positions[9*i + 6] = x1 = (r1*Math.cos(o));
            this.positions[9*i + 7] = y1 = (r1*Math.sin(o));
            this.positions[9*i + 8] = z1;
        }
        x1 = r2*Math.cos(deg*3*n); y1 = 0;
        for(var i=3*n;i<4*n;i++){
            o = deg*(i+1);
            o1 = deg*(i+1);
            this.positions[9*i + 0] = (r1*Math.cos(o1));
            this.positions[9*i + 1] = (r1*Math.sin(o1));
            this.positions[9*i + 2] = z1;
            this.positions[9*i + 3] = x1;
            this.positions[9*i + 4] = y1;
            this.positions[9*i + 5] = z2;
            this.positions[9*i + 6] = x1 = (r2*Math.cos(o));
            this.positions[9*i + 7] = y1 = (r2*Math.sin(o));
            this.positions[9*i + 8] = z2;
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        this.vertexNormals = [4*9*n+100];
        for(var i=0;i<n;i++){
            this.vertexNormals[9*i + 0] = 0.0;
            this.vertexNormals[9*i + 1] = 0.0;
            this.vertexNormals[9*i + 2] = 1.0;
            this.vertexNormals[9*i + 3] = 0.0;
            this.vertexNormals[9*i + 4] = 0.0;
            this.vertexNormals[9*i + 5] = 1.0;
            this.vertexNormals[9*i + 6] = 0.0;
            this.vertexNormals[9*i + 7] = 0.0;
            this.vertexNormals[9*i + 8] = 1.0;
        }
        for(var i=n;i<2*n;i++){
            this.vertexNormals[9*i + 0] = 0.0;
            this.vertexNormals[9*i + 1] = 0.0;
            this.vertexNormals[9*i + 2] = -1.0;
            this.vertexNormals[9*i + 3] = 0.0;
            this.vertexNormals[9*i + 4] = 0.0;
            this.vertexNormals[9*i + 5] = -1.0;
            this.vertexNormals[9*i + 6] = 0.0;
            this.vertexNormals[9*i + 7] = 0.0;
            this.vertexNormals[9*i + 8] = -1.0;
        }

        for(var i=2*n;i<3*n;i++){
            this.vertexNormals[9*i + 0] = 0.0;
            this.vertexNormals[9*i + 1] = 0.0;
            this.vertexNormals[9*i + 2] = -1.0;
            this.vertexNormals[9*i + 3] = 0.0;
            this.vertexNormals[9*i + 4] = 0.0;
            this.vertexNormals[9*i + 5] = -1.0;
            this.vertexNormals[9*i + 6] = 0.0;
            this.vertexNormals[9*i + 7] = 0.0;
            this.vertexNormals[9*i + 8] = -1.0;
        }
        for(var i=3*n;i<4*n;i++){
            this.vertexNormals[9*i + 0] = 0.0;
            this.vertexNormals[9*i + 1] = 0.0;
            this.vertexNormals[9*i + 2] = -1.0;
            this.vertexNormals[9*i + 3] = 0.0;
            this.vertexNormals[9*i + 4] = 0.0;
            this.vertexNormals[9*i + 5] = -1.0;
            this.vertexNormals[9*i + 6] = 0.0;
            this.vertexNormals[9*i + 7] = 0.0;
            this.vertexNormals[9*i + 8] = -1.0;
        }
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals), gl.STATIC_DRAW);

        this.textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        this.textureCoordinates = [4*6*n+100];
        var r = 0.5;
        for(var i=0;i<n;i++){
            o = deg*(i);
            o1 = deg*(i+1);
            this.textureCoordinates[6*i + 0] = 0.5;
            this.textureCoordinates[6*i + 1] = 0.5;
            this.textureCoordinates[6*i + 2] = 0.5 + r*Math.cos(o);
            this.textureCoordinates[6*i + 3] = 0.5 + r*Math.sin(o);
            this.textureCoordinates[6*i + 4] = 0.5 + r*Math.cos(o1);
            this.textureCoordinates[6*i + 5] = 0.5 + r*Math.sin(o1);
        }
        for(var i=n;i<2*n;i++){
            o = deg*(i);
            o1 = deg*(i+1);
            this.textureCoordinates[6*i + 0] = 0.5;
            this.textureCoordinates[6*i + 1] = 0.5;
            this.textureCoordinates[6*i + 2] = 0.5 + r*Math.cos(o);
            this.textureCoordinates[6*i + 3] = 0.5 + r*Math.sin(o);
            this.textureCoordinates[6*i + 4] = 0.5 + r*Math.cos(o1);
            this.textureCoordinates[6*i + 5] = 0.5 + r*Math.sin(o1);
        }
        for(var i=2*n;i<4*n;i++){
            this.textureCoordinates[6*i + 0] = 0.2;
            this.textureCoordinates[6*i + 1] = 0.2;
            this.textureCoordinates[6*i + 2] = 0.2;
            this.textureCoordinates[6*i + 3] = 0.2;
            this.textureCoordinates[6*i + 4] = 0.2;
            this.textureCoordinates[6*i + 5] = 0.2;
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), gl.STATIC_DRAW);
        
        this.buffer = {
            position: this.positionBuffer,
            normal:this.normalBuffer,
            textureCoord: this.textureBuffer,
        }

        this.pos = pos;
        this.rotation = 0;
        this.texture = texture;
    }

    draw(gl, projectionMatrix, programInfo, deltaTime){
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
                    [0, 1, 0]);
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

        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
            gl.vertexAttribPointer(programInfo.attribLocations.vertexNormal,
                numComponents, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
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

        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        gl.useProgram(programInfo.program);

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.normalMatrix,
            false,
            normalMatrix);
        {
          const vertexCount = 36;
          const type = gl.UNSIGNED_SHORT;
          const offset = 0;
        //   gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
            gl.drawArrays(gl.TRIANGLES, 0, this.positions.length / 3);
        }
        this.rotation += 2*deltaTime;

    }
}