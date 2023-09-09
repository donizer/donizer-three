import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import gsap from "gsap";

export default class SceneInit {
  private scene: THREE.Scene;
  cameraDev: THREE.PerspectiveCamera;
  camera: THREE.PerspectiveCamera;
  cameraLookPoint: THREE.Mesh;
  private touchYPrevious: number | null;
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
    this.touchYPrevious = null;

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

    this.cameraLookPoint = new THREE.Mesh(
      new THREE.SphereGeometry(0),
      new THREE.LineBasicMaterial()
    );
    this.cameraLookPoint.position.x = -5;
    this.cameraLookPoint.position.y = 2;

    // NOTE: Additional components.
    this.clock = new THREE.Clock();
    this.delta = 0;
    this.stats = new Stats();
    this.controls = new OrbitControls(this.cameraDev, this.renderer.domElement);
    // this.controls.zoomSpeed = 0;

    // NOTE: Lighting is basically required.
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.06);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    this.cameraDev.position.z = 20;
    this.cameraDev.position.x = 20;

    this.camera.position.z = 10;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

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
    // document.body.appendChild(this.stats.dom); //todo

    window.addEventListener("resize", () => this.onWindowResize(), false);
    window.addEventListener("wheel", (event) => {
      const deltaZ = event.deltaY * (this.camera.position.z / 1000);
      // if (false)
      if (deltaZ > 0) {
        gsap.to(this.camera.position, {
          z: 86,
          duration: 2,
          ease: "power2.in",
        });
        gsap.to(this.cameraLookPoint.position, {
          x: 65,
          z: 6.5,
          duration: 2,
          ease: "power2.in",
        });
      } else {
        gsap.to(this.camera.position, {
          z: 10,
          duration: 2,
          ease: "power2.out",
        });
        gsap.to(this.cameraLookPoint.position, {
          x: -5,
          z: 0,
          duration: 2,
          ease: "power2.out",
        });
      }
    });
    window.addEventListener("touchmove", (event) => {
      if (this.touchYPrevious) {
        const delta = this.touchYPrevious - event.touches[0].clientY;
        const deltaZ = delta * (this.camera.position.z / 100);
        if (deltaZ > 0) {
          gsap.to(this.camera.position, {
            z: 18,
            duration: 1.5,
            ease: "power2.in",
          });
          gsap.to(this.cameraLookPoint.position, {
            x: 0,
            z: 6.5,
            duration: 1.5,
            ease: "power2.in",
          });
        } else {
          gsap.to(this.camera.position, {
            z: 12,
            duration: 1.5,
            ease: "power2.out",
          });
          gsap.to(this.cameraLookPoint.position, {
            x: -2,
            z: 0,
            duration: 1.5,
            ease: "power2.out",
          });
        }
      }

      this.touchYPrevious = event.touches[0].clientY;
    });
    window.addEventListener("touchend", () => {
      this.touchYPrevious = null;
    });
  }

  addStars(this: SceneInit, count = 1, spread = 512) {
    const geometry = new THREE.SphereGeometry(0.75, 4, 4);
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

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    requestAnimationFrame(this.animate.bind(this));

    this.camera.lookAt(this.cameraLookPoint.position);
    this.render(this.camera); // todo Camera here
    this.stats.update();
    this.controls.update();
  }

  render(camera = this.cameraDev, scene = this.scene) {
    this.renderer.render(scene, camera);
  }

  onWindowResize() {
    this.cameraDev.aspect = window.outerWidth / window.outerHeight;
    this.cameraDev.updateProjectionMatrix();
    this.camera.aspect = window.outerWidth / window.outerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer?.setSize(window.outerWidth, window.outerHeight);
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
