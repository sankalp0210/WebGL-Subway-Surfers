let shader = class{
	constructor(){

		// Vertex shader program
		this.vsSource = `
			attribute vec4 aVertexPosition;
			attribute vec3 aVertexNormal;
			attribute vec2 aTextureCoord;

			uniform mat4 uNormalMatrix;
			uniform mat4 uModelViewMatrix;
			uniform mat4 uProjectionMatrix;

			varying highp vec2 vTextureCoord;
			varying highp vec3 vLighting;

			void main(void) {
				gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
				vTextureCoord = aTextureCoord;

				// Apply lighting effect

				highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
				highp vec3 directionalLightColor = vec3(1, 1, 1);
				highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

				highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

				highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
				vLighting = ambientLight + (directionalLightColor * directional);
			}
		`;
    	// Fragment shader program
		this.fsSource = `
			varying highp vec2 vTextureCoord;
			varying highp vec3 vLighting;

			uniform sampler2D uSampler;

			void main(void) {
				highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
				gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
			}
		`;
		this.fsSource1 = `
			varying highp vec2 vTextureCoord;
			varying highp vec3 vLighting;

			uniform sampler2D uSampler;

			void main(void) {
				highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
				gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
				precision highp float;
				vec4 color = texture2D(uSampler, vTextureCoord);
				float gray = dot(color.rgb,vec3(0.299,0.587,0.114));
				gl_FragColor = vec4(vec3(gray),1.0);
			}
		`;
	}

	initShaderProgram(gl, val) {
		const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, this.vsSource);
		
		var fragmentShader= this.loadShader(gl, gl.FRAGMENT_SHADER, this.fsSource);
		if(val == 1)
			fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, this.fsSource1);


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