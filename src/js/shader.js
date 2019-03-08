let shader = class{
	constructor(){
 
		// Vertex shader program
		this.vsSource = `
    		attribute vec4 aVertexPosition;
			attribute vec2 aTextureCoord;

			uniform mat4 uModelViewMatrix;
			uniform mat4 uProjectionMatrix;

			varying highp vec2 vTextureCoord;

			void main(void) {
			gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			vTextureCoord = aTextureCoord;
			}
		`;

    	// Fragment shader program
		this.fsSource = `
			varying highp vec2 vTextureCoord;

			uniform sampler2D uSampler;

			void main(void) {
			gl_FragColor = texture2D(uSampler, vTextureCoord);
			}
		`;
	}

	initShaderProgram(gl) {
		const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, this.vsSource);
		const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, this.fsSource);

		// Create the shader program
		const shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);
		
		// If creating the shader program failed, alert
		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
			return null;
		}
		return shaderProgram;
	}

	// creates a shader of the given type, uploads the source and compiles it
	loadShader(gl, type, source) {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		
		// Compile the shader program
		gl.compileShader(shader);
		
		// See if it compiled successfully
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}
		return shader;
	}

}