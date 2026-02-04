// 1. Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl'),
    antialias: true,
    alpha: true // Transparent background
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 3);
scene.add(directionalLight);

// 3. Load 3D Food Model (Placeholder: TorusKnot)
// In a real project, use GLTFLoader to load 'burger.glb'
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.4 });
const foodModel = new THREE.Mesh(geometry, material);
scene.add(foodModel);

// 4. Scroll Animations (GSAP)
gsap.registerPlugin(ScrollTrigger);

// Timeline 1: Movement from Section 1 to 2
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".two",
        start: "top bottom",
        end: "top top",
        scrub: 1, // Smoothly links animation to scroll distance
    }
});

tl.to(foodModel.position, { x: -2, y: 0, z: -1 }) // Move to side
  .to(foodModel.rotation, { y: Math.PI, z: 2 }, 0); // Rotate

// Timeline 2: Movement from Section 2 to 3
const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".three",
        start: "top bottom",
        end: "top top",
        scrub: 1,
    }
});

tl2.to(foodModel.scale, { x: 2, y: 2, z: 2 }) // Zoom in
   .to(foodModel.position, { x: 0, y: 0 }, 0);

// 5. Render Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();
    
    // Auto-rotation for "life"
    foodModel.rotation.y += 0.01;
    
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});