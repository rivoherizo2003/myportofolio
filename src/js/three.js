import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
let scene, camera, renderer, stars, geometry;

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  // Particles (Stars)
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.7 });
  const starVertices = [];
  for (let i = 0; i < 1500; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);
  }
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3),
  );
  stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Floating Central Geometry
  const centralGeom = new THREE.IcosahedronGeometry(10, 1);
  const centralMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    wireframe: true,
    transparent: true,
    opacity: 0.1,
  });
  geometry = new THREE.Mesh(centralGeom, centralMat);
  scene.add(geometry);

  camera.position.z = 50;
}

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  geometry.rotation.x += 0.002;
  geometry.rotation.y += 0.002;
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- GSAP ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
  // Hero animations
  gsap.from("h1", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  gsap.from("p", { opacity: 0, y: 30, duration: 1, delay: 0.8 });
  gsap.from(".profile-image-container", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 0.3,
    ease: "back.out(1.7)",
  });

  // Scroll reveals
  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
      opacity: 0,
      x: -50,
      duration: 1,
    });
  });

  // Parallax on 3D geometry based on mouse
  window.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    gsap.to(geometry.rotation, {
      x: y * 1,
      y: x * 1,
      duration: 2,
    });
  });
}

window.onload = () => {
  initThree();
  animate();
  initAnimations();
};