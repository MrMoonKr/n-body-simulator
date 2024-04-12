// create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setSize(400, 400);
document.body.appendChild( renderer.domElement );

// create camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.01;
const far = 2000;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.z = -250;

// create scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xffffff);

// enable mouse controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// create light
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight( color, intensity );
    //const light = new THREE.AmbientLight(color, intensity);
    //  light.position.set(-1, 2, 4);
    scene.add( light );
}

var cameraRotSpeed = 0.1;


/**
 * document key down message handler
 * @param {KeyboardEvent} event 
 */
function onDocumentKeyDown( event ) {
    var keyCode = event.which;
    if ( keyCode == 65 ) { // Left arrow key
        camera.rotation.y += cameraRotSpeed;
    } else if ( keyCode == 87 ) { // Up arrow key
        camera.rotation.x -= cameraRotSpeed;
    } else if ( keyCode == 68 ) { // Right arrow key
        camera.rotation.y -= cameraRotSpeed;
    } else if ( keyCode == 83 ) { // Down arrow key
        camera.rotation.x += cameraRotSpeed;
    }
}

document.addEventListener( "keydown", onDocumentKeyDown, false );
