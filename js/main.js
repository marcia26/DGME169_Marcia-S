//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
 import * as THREE from 'three';


import { Gradient } from './Gradient.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 


// Initialize global variables
let scene, camera, renderer, object; 
let mixer; //  The Animation Mixer
let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Target the hero section for Three.js injection
const heroContainer = document.querySelector("#home"); 

// Initialize the background gradient canvas
const gradient = new Gradient()
gradient.initGradient('#gradient-canvas' );
// Define the path of 3D model
const MODEL_PATH = 'assets/ufo.glb'; 

// Use a clock to track time elapsed between frames (needed for the mixer)
const clock = new THREE.Clock(); 

function init() {
    // 1. Scene Setup
    scene = new THREE.Scene();
    
    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(
        30, 
        heroContainer.clientWidth / heroContainer.clientHeight, 
        0.1, 
        1000 
    );
    camera.position.z = 5; 

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true}); 
    renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    heroContainer.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);
    
    // 5. Load the GLB Model
    loadModel();
    
    // 6. Event Listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);
    
    // Start the animation loop
    animate();
}

function loadModel() {
    const loader = new GLTFLoader();
    
    loader.load(
        MODEL_PATH,
        // On Load Callback
        function (gltf) {
            object = gltf.scene; 
            
            // --- ADJUST THESE IF MODEL IS TOO BIG/SMALL/OFF-CENTER ---
            object.scale.set(0.1, 0.1, 0.1); 
            object.position.y = -0.5; 
            object.position.z = 1;

            scene.add(object);
            
            // ----------------------------------------------------
            // CHECK ANIMATION SETUP- DOES NOT WORK// ----------------------------------------------------
            if (gltf.animations && gltf.animations.length) {
                // 1. Create a mixer for the object
                mixer = new THREE.AnimationMixer(object); 

                // 2. Grab the first animation clip and start it
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
                console.log('Animation found and started.');
            }
            // ----------------------------------------------------
            
            console.log('3D model loaded successfully!');
        },
        undefined,
        // On Error Callback
        function (error) {
            console.error('An error occurred while loading the GLB model:', error);
            // Fallback: Add a basic sphere if model fails to load
            const geometry = new THREE.SphereGeometry(1.5, 32, 32);
            const material = new THREE.MeshPhongMaterial({ color: 0x8800ff, shininess: 100 }); 
            object = new THREE.Mesh(geometry, material);
            scene.add(object);
        }
    );
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
}

function onWindowResize() {
    const width = heroContainer.clientWidth;
    const height = heroContainer.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate); 
    
    const delta = clock.getDelta(); // Get the time since the last frame

<<<<<<< Updated upstream
    //  Update the mixer with the time delta
=======
    // 👇 CRITICAL: Update the mixer with the time delta
>>>>>>> Stashed changes
    if (mixer) {
        mixer.update(delta); 
    }
    
    if (object) {
        // Continuous Rotation (Optional: you may want to remove this if the GLB animation handles movement)
        object.rotation.y += 0.005;

        // Mouse Interaction
        object.rotation.x += (mouseY * 0.5 - object.rotation.x) * 0.05;
        object.rotation.y += (mouseX * 0.5 - object.rotation.y) * 0.05;
    }

    renderer.render(scene, camera);
}

// Ensure the Three.js scene initializes 
if (heroContainer) {
    init();
}



<<<<<<< Updated upstream
   
=======
    document.addEventListener('DOMContentLoaded', () => {
        const videoContainer = document.querySelector('.video-container');
        const video = document.querySelector('.final-render-video');
        const playButton = document.querySelector('.play-button');

        if (video && playButton && videoContainer) {
            
           // 1. Play when the custom button is clicked
            playButton.addEventListener('click', () => {
                
                // SET VOLUME  (0.0 is mute, 1.0 is max volume) 👇
                video.volume = 0.2; // Sets volume to 20%
                video.play();
                videoContainer.classList.add('playing');
                // Optional: Show controls once playing
                video.controls = true; 
            });

            // 2. Hide the button when the video starts playing (in case of autoplay)
            video.addEventListener('play', () => {
                videoContainer.classList.add('playing');
            });
            
            // 3. Show the button again if the video ends or is paused
            video.addEventListener('pause', () => {
                videoContainer.classList.remove('playing');
                video.controls = false; 
            });
            
            video.addEventListener('ended', () => {
                videoContainer.classList.remove('playing');
                video.controls = false;
            });
        }
    });

>>>>>>> Stashed changes
