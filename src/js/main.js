var pl;
var track = [];
var wall = [];
var train = [];
var texture;
var coin = [];
var coins = 0;
var gameOver = 0;
var grayScale = 0;
main();

function main() {
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    const sh = new shader();
    var shaderProgram1 = sh.initShaderProgram(gl,0);
    var shaderProgram2 = sh.initShaderProgram(gl,1);

    var programInfo = {
        program: shaderProgram1,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram1, 'aVertexPosition'),
          vertexNormal: gl.getAttribLocation(shaderProgram1, 'aVertexNormal'),
          textureCoord: gl.getAttribLocation(shaderProgram1, 'aTextureCoord'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram1, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram1, 'uModelViewMatrix'),
          normalMatrix: gl.getUniformLocation(shaderProgram1, 'uNormalMatrix'),
          uSampler: gl.getUniformLocation(shaderProgram1, 'uSampler'),
        },
    };

    textureTrack = loadTexture(gl, 'assets/track2.jpeg');
    textureWall = loadTexture(gl, 'assets/wall3.jpg');
    texturePlayer = loadTexture(gl, 'assets/img.png');
    textureCoin = loadTexture(gl, 'assets/coin.png');
    textureTrain1 = loadTexture(gl, 'assets/train.jpeg');
    textureTrain2 = loadTexture(gl, 'assets/train2.png');
    pl = new Player(gl, [0.0, 1.0, 20.0],texturePlayer);
    coin.push(new Coin(gl, [0.0, 1.2, 0.0],textureCoin, [0.2, 0.2, 0.05]));
    coin.push(new Coin(gl, [0.0, 1.2, 2.0],textureCoin, [0.2, 0.2, 0.05]));
    coin.push(new Coin(gl, [0.0, 1.2, 4.0],textureCoin, [0.2, 0.2, 0.05]));
    track.push(new Track(gl, [-3.0, 0.0, 10.0], textureTrack));
    track.push(new Track(gl, [  0.0, 0.0, 10.0], textureTrack));
    track.push(new Track(gl, [ 3.0, 0.0, 10.0], textureTrack));
    wall.push(new Wall(gl, [-4.5, 2.5, 10.0], textureWall));
    wall.push(new Wall(gl, [ 4.5, 2.5, 10.0], textureWall));
    train.push(new Train(gl, [ 2.5, 1.0, 0.0],textureTrain1, [1.5, 1.5, 8.0]));
    train.push(new Train(gl, [-2.5, 1.0, 0.0],textureTrain2, [1.5, 1.5, 8.0]));
    // train.push(new Train(gl, [ 2.5, 1.0, -10.0],textureTrain2, [1.5, 1.5, 8.0]));
    // train.push(new Train(gl, [-2.5, 1.0, -10.0],textureTrain1, [1.5, 1.5, 8.0]));
    train.push(new Train(gl, [0, 1.0, -10.0],textureTrain1, [1.5, 1.5, 15.0]));
    var then = 0;

    // Draw the scene repeatedly
    function render(now) {
        console.log(pl.pos, track[0].pos);
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
        Mousetrap.bind('left', function() {if(pl.left == 0) {pl.left = 1;pl.right=-1;}})
        Mousetrap.bind('right', function() {if(pl.right == 0) {pl.right = 1;pl.left = -1;}})
        Mousetrap.bind('space', function() {if(pl.jump == 0) pl.jump = 1;})
        Mousetrap.bind('g', function() {
            if(grayScale == 0) {
                grayScale = 1;
                programInfo = {
                    program: shaderProgram2,
                    attribLocations: {
                      vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
                      vertexNormal: gl.getAttribLocation(shaderProgram2, 'aVertexNormal'),
                      textureCoord: gl.getAttribLocation(shaderProgram2, 'aTextureCoord'),
                    },
                    uniformLocations: {
                      projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
                      modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
                      normalMatrix: gl.getUniformLocation(shaderProgram2, 'uNormalMatrix'),
                      uSampler: gl.getUniformLocation(shaderProgram2, 'uSampler'),
                    },
                };
            }
            else{
                grayScale = 0;
                programInfo = {
                    program: shaderProgram1,
                    attribLocations: {
                      vertexPosition: gl.getAttribLocation(shaderProgram1, 'aVertexPosition'),
                      vertexNormal: gl.getAttribLocation(shaderProgram1, 'aVertexNormal'),
                      textureCoord: gl.getAttribLocation(shaderProgram1, 'aTextureCoord'),
                    },
                    uniformLocations: {
                      projectionMatrix: gl.getUniformLocation(shaderProgram1, 'uProjectionMatrix'),
                      modelViewMatrix: gl.getUniformLocation(shaderProgram1, 'uModelViewMatrix'),
                      normalMatrix: gl.getUniformLocation(shaderProgram1, 'uNormalMatrix'),
                      uSampler: gl.getUniformLocation(shaderProgram1, 'uSampler'),
                    },
                };
            }
        })
        if(!gameOver)
            pl.move();
        // console.log(pl.pos);
        checkColission();
        drawScene(gl, programInfo, deltaTime);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function checkColission(){
    for(var i=0;i<train.length;i++){
        if(detectColission(pl.pos, [0.5, 0.5, 0.5], train[i].pos, [1.5, 1.0, 8.0])){
            if(pl.pos[1] > train[i].pos[1] + 0.1){
                pl.jump = 0;
                pl.bt(2.75-pl.pos[1]);
                break;
            }
        }
    }
    for(var i=0;i<coin.length;i++){
        if(detectColission(pl.pos, [0.5, 0.6, 0.5], coin[i].pos, [0.2, 0.2, 0.2])){
            coin[i].pos[2] += 100.0;
            coins+=1;
            console.log(coins);
            break;
        }
    }
}
function detectColission(obj1, dim1, obj2, dim2){
    return (Math.abs(obj1[0] - obj2[0]) * 2 < (dim1[0] + dim2[0])) &&
           (Math.abs(obj1[1] - obj2[1]) * 2 < (dim1[1] + dim2[1])) &&
           (Math.abs(obj1[2] - obj2[2]) * 2 < (dim1[2] + dim2[2])) ;
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
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    var viewMatrix = mat4.create();
    var viewProjectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    mat4.translate(viewMatrix, viewMatrix, [0, pl.pos[1] + 1.5, pl.pos[2] + 5]);
    var cameraPosition = [
        viewMatrix[12],
        viewMatrix[13],
        viewMatrix[14],
    ];
    var up = [0, 1, 0];
    mat4.lookAt(viewMatrix, cameraPosition, [0, pl.pos[1], pl.pos[2]], up);

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
    for(var i=0;i<coin.length;i++)
        coin[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
    for(var i=0;i<wall.length;i++)
        wall[i].draw(gl, viewProjectionMatrix, programInfo);
    // for(var i=0;i<track.length;i++)
    //     track[i].draw(gl, viewProjectionMatrix, programInfo);
    for(var i=0;i<train.length;i++)
        train[i].draw(gl, viewProjectionMatrix, programInfo);
    pl.draw(gl, viewProjectionMatrix, programInfo, deltaTime);
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
