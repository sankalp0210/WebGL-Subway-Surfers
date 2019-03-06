var pl;
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
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    pl = new player(gl, [0.0, 0.0, 0.0]);
    var then = 0;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;
        drawScene(gl, programInfo, deltaTime);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function drawScene(gl, programInfo, deltaTime) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
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
    mat4.translate(viewMatrix, viewMatrix, [pl.pos[0], pl.pos[1], pl.pos[2] + 10]);
    var cameraPosition = [
        viewMatrix[12],
        viewMatrix[13],
        viewMatrix[14],
    ];
    var up = [0, 1, 0];
    mat4.lookAt(viewMatrix, cameraPosition, pl.pos, up);

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
    pl.draw(gl, viewProjectionMatrix, programInfo, deltaTime);

}
