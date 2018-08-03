window.addEventListener('resize', onWindowResize, false);

var scene, camera, renderer, geometry, material, cube,circle, windowHalfX;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;

//Basic setup------------------------------------------------------

var axesHelper = new THREE.AxesHelper(5);

//Create a scene in order to display something from three.js
scene = new THREE.Scene();
//scene.background = new THREE.Color(0xffffff);
//Red is X, Y is Green, Blue is Z
scene.add(axesHelper);
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0,10,10);
scene.add(spotLight);
//Camera to be able to view things in the scene
//Perspective camera allows you to set a field of view, aspect ratio and the view distance for objects in relation to the camera
//Array camera can be used to render a scene with a set of cameras
//Orthographic camera can be used to make sure an objects size remains constant regardless of the distance from camera
camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);

//The renderer serves as the canvas for three.js
//setSize allows you to choose how big you want to render the app
//You can also render the app at a bigger size but lower resolution by adding a third attribute set to false
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

//Append the renderer to the body 
document.body.appendChild(renderer.domElement);

//This will add a basic cube to the scene
//Box Geometry creates a basic cube with a Width, Height, Depth, and optional number of additional segments added to each side.
geometry = new THREE.BoxGeometry(1,1,1);
//We need something to color the cube, so we need to add a material
material = new THREE.MeshNormalMaterial();
var lambert = new THREE.MeshLambertMaterial({color: new THREE.Color(0x24ce28),emissive: 0xc50fcb,emissiveIntensity: .5,});
//After creating the geometry and the material, we need to add them to a mesh.
cube = new THREE.Mesh(geometry,lambert);
//Add the cube to the scene
//scene.add(cube);
//By default, everything is added to the coordinates (0,0,0), so the camera is overlapping with the cube we just made. In order to fix this:
camera.position.z = 10;
camera.position.y = 1;
//Even after all of this, we still don't have anything showing. That's because we need to create a render loop that will draw the scene every time the screen is refreshed.

//We can make shapes other than cubes
//First argument is the radius of the sphere, second the number of horizontal segments, then vertical
var sphereGeometry = new THREE.SphereGeometry();
circle = new THREE.Mesh(sphereGeometry, material);
circle.position.y += 2;
scene.add(circle);

//Then we can make a cylinder
//Arguments are top radius, bottom, height, and number of segments around the circumference
var cylinderGeometry = new THREE.CylinderGeometry();
var cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.position.x += 3;
scene.add(cylinder);

//Finally, a cone
var coneGeometry = new THREE.ConeGeometry();
var cone = new THREE.Mesh(coneGeometry,material);
cone.position.x -= 3;
//scene.add(cone);

//Random function to change geometry for cube;
function mutateCube(){
    for(var i = 0; i<geometry.vertices.length; i++){
        if(i % 2 == 0){
            geometry.vertices[i].x +=  Math.random()*5;
            geometry.vertices[i].y +=  Math.random()*5;
        }
        
    }
}

//Wireframe Geometry is used as a helper to render an object as a wireframe
var wireGeo = new THREE.WireframeGeometry(geometry);
//Material for wireframe style geometries
var lineMat = new THREE.LineBasicMaterial({linewidth:2});
//A series of lines drawn between pairs of vertices
var wireframe = new THREE.LineSegments(wireGeo,lineMat);
//scene.add(wireframe);

//Now lets find out about groups
var group = new THREE.Group();
group.add(cube);
group.add(wireframe);

var group2 = new THREE.Group();
group2.add(group);
group2.add(cone);

scene.add(group2);

//Function to help with window resizing so you don't have to refresh after changing the size
function onWindowResize(){

    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//This will pause animation whenever the user navigates to a different browser tab
//By itself, the cube will just appear as a box, so you need to change the rotation or position in order to see something change
function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;

    circle.rotation.x += 0.02;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;

    cone.rotation.x += 0.01;

    group2.rotation.y += 0.01;

    wireframe.rotation.x += 0.01;


    renderer.render(scene,camera);
}
//mutateCube();
animate();
