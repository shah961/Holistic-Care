/**
 * HOLISTIC CARE PHARMACY - ANIMATIONS & THREE.JS (animations.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    initGSAPAnimations();
    initThreeJSBackground();
  }
});

/**
 * GSAP Scroll Reveals & Micro-interactions
 */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  // Header logo subtle entrance
  gsap.from('.logo', {
    duration: 0.8,
    opacity: 0,
    y: -10,
    ease: 'power2.out'
  });

  // Hero content animation
  if (document.querySelector('.hero-title')) {
    gsap.from('.hero-title', {
      duration: 0.9,
      opacity: 0,
      y: 20,
      delay: 0.2,
      ease: 'power2.out'
    });

    gsap.from('.hero-description', {
      duration: 0.9,
      opacity: 0,
      y: 20,
      delay: 0.4,
      ease: 'power2.out'
    });

    gsap.from('.hero-cta-group', {
      duration: 0.9,
      opacity: 0,
      y: 20,
      delay: 0.6,
      ease: 'power2.out'
    });
  }

  // ScrollTrigger reveals if library loaded
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.service-card, .product-category-card, .feature-box').forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out'
      });
    });
  }
}

/**
 * Lightweight Three.js Hero Canvas Scene
 * Abstract floating medical/pharmaceutical particles
 */
function initThreeJSBackground() {
  const container = document.getElementById('heroCanvasContainer');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Minimal particles (Low Poly / Minimal overhead)
  const particleCount = 25;
  const geometry = new THREE.IcosahedronGeometry(0.12, 0);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00A896,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });

  const group = new THREE.Group();

  for (let i = 0; i < particleCount; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 8;
    mesh.position.y = (Math.random() - 0.5) * 6;
    mesh.position.z = (Math.random() - 0.5) * 4;
    group.add(mesh);
  }

  scene.add(group);

  let animationFrameId;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    group.rotation.x += 0.0015;
    group.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  animate();

  // Resize handling
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
