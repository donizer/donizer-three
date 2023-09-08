import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export default class SceneInit {
  private scene: THREE.Scene;
  cameraDev: THREE.PerspectiveCamera;
  camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private fov: number;
  private nearPlane: number;
  private farPlane: number;
  private canvasId: string;
  private clock: THREE.Clock;
  private stats: Stats;
  private controls: OrbitControls;
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;
  private canvas: HTMLElement;
  private delta: number;

  constructor(canvasId: string) {
    // NOTE: Camera params;
    this.fov = 82;
    this.nearPlane = 0.1;
    this.farPlane = 16000;
    this.canvasId = canvasId;

    // NOTE: Core components to initialize Three.js app.
    this.canvas = document.getElementById(this.canvasId)!;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.cameraDev = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );

    // NOTE: Additional components.
    this.clock = new THREE.Clock();
    this.delta = 0;
    this.stats = new Stats();
    this.controls = new OrbitControls(this.cameraDev, this.renderer.domElement);

    // NOTE: Lighting is basically required.
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.06);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    this.cameraDev.position.z = 48;
    this.camera.position.z = 10;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    // document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight.castShadow = true;

    // directional light - parallel sun rays
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);

    this.scene.add(this.directionalLight, this.ambientLight);

    // const directionalLH = new THREE.DirectionalLightHelper(
    //   this.directionalLight
    // );
    // const gridHelper = new THREE.GridHelper(100, 100);
    // const cameraHelper = new THREE.CameraHelper(this.camera);
    // this.scene.add(directionalLH, gridHelper, cameraHelper, this.camera);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  addStars(this: SceneInit, count = 1, spread = 512) {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < count; i++) {
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3)
        .fill(null)
        .map(() => {
          return THREE.MathUtils.randFloatSpread(spread);
        });
      star.position.set(x, y, z);
      this.scene.add(star);
    }
  }

  moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    this.camera.position.z = t * -0.01;
    this.camera.position.x = t * -0.0002;
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    requestAnimationFrame(this.animate.bind(this));

    this.render(this.camera); // todo Camera here
    this.stats.update();
    this.controls.update();
  }

  render(camera = this.cameraDev, scene = this.scene) {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();

    this.renderer.render(scene, camera);
  }

  onWindowResize() {
    this.cameraDev.aspect = window.innerWidth / window.innerHeight;
    this.cameraDev.updateProjectionMatrix();
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }

  getScene() {
    return this.scene;
  }
  getClock() {
    return this.clock;
  }
  getDelta() {
    return this.delta;
  }
  setDelta(number: number) {
    return (this.delta = number);
  }
}