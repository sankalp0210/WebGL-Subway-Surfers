var pl;
var track = [];
var wall = [];
var texture;
var cyl;
main();
 
function main() {
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    const sh = new shader();
    const shaderProgram = sh.initShaderProgram(gl);
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
          uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        },
    };

    textureTrack = loadTexture(gl, 'assets/track2.jpeg');
    textureWall = loadTexture(gl, 'assets/wall3.jpg');
    texturePlayer = loadTexture(gl, 'assets/img.png');
    textureCoin = loadTexture(gl, 'assets/coin.png');
    pl = new Cube(gl, [0.0, 1.0, 0.0],texturePlayer, [0.5, 0.5, 0.5]);
    cyl = new Cylinder(gl, [0.0, 2.0, 0.0],textureCoin, [0.2, 0.2, 0.05]);
    track.push(new Track(gl, [-3.0, 0.0, 10.0], textureTrack));
    track.push(new Track(gl, [  0.0, 0.0, 10.0], textureTrack));
    track.push(new Track(gl, [ 3.0, 0.0, 10.0], textureTrack));
    wall.push(new Wall(gl, [-4.5, 2.5, 10.0], textureWall));
    wall.push(new Wall(gl, [ 4.5, 2.5, 10.0], textureWall));
    var then = 0;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
        Mousetrap.bind('up', function() { console.log('bt'); pl.pos[2] -= 0.1;})
        Mousetrap.bind('down', function() { console.log('bt'); pl.pos[2] += 0.1;})
        drawScene(gl, programInfo, deltaTime);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function drawScene(gl, programInfo, deltaTime) {
    gl.clearColor(13/256.0, 20/256.0, 23/256.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 500.0;
    const projectionMatrix = mat4.create();
    var viewMatrix = mat4.create();
    var viewProjectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    mat4.translate(viewMatrix, viewMatrix, [0, pl.pos[1] + 1, pl.pos[2] + 10]);
    var cameraPosition = [
        viewMatrix[12],
        viewMatrix[13],
        viewMatrix[14],
    ];
    var up = [0, 1, 0];
    mat4.lookAt(viewMatrix, cameraPosition, pl.pos, up);

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

    cyl.draw(gl, viewProjectionMatrix, programInfo, deltaTime);
    // pl.draw(gl, viewProjectionMatrix, programInfo, deltaTime);
    for(var i=0;i<track.length;i++)
        track[i].draw(gl, viewProjectionMatrix, programInfo);
    for(var i=0;i<wall.length;i++)
        wall[i].draw(gl, viewProjectionMatrix, programInfo);

}

function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);
  
    const image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image);

        if (!(image.width && (image.width-1)) && !(image.height && (image.height-1))) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    };
    image.src = url;
    return texture;
}
