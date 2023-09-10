import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "./lib/SceneInit";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

// import donizerText from "../src/assets/models/donizer3DText.gltf?raw";

import earthImg from "./assets/8k_earth_daymap.jpg";
// import earthNormalMap from "./assets/Solarsystemscope_texture_8k_earth_normal_map.jpg";
import earthNormalMap from "./assets/2k_earth_normal_map.jpg";
// import earthCloudsImg from "./assets/Solarsystemscope_texture_8k_earth_clouds.png";
import earthCloudsImg from "./assets/Solarsystemscope_texture_2k_earth_clouds.png";
// import skyMap from "./assets/eso0932a.jpg";
// import rockCol from "./assets/rocks_ground_02_1k/textures/rocks_ground_02_col_1k.jpg";
// import rockNor from "./assets/rocks_ground_02_1k/textures/rocks_ground_02_nor_gl_1k.jpg";
// import rockRoh from "./assets/rocks_ground_02_1k/textures/rocks_ground_02_rough_1k.jpg";

const canvasId = "myThreeJsCanvas";

function App() {
  useEffect(() => {
    const sceneObject = new SceneInit(canvasId);
    sceneObject.animate();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(1, 1);

    const earthGroup = new THREE.Group();

    const earthTexture = new THREE.TextureLoader().load(earthImg);
    const earthNormalMapTexture = new THREE.TextureLoader().load(
      earthNormalMap,
    );
    const earthCloudTexture = new THREE.TextureLoader().load(earthCloudsImg);
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(6, 128, 128),
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: earthNormalMapTexture,
      }),
    );
    const earthClouds = new THREE.Mesh(
      new THREE.SphereGeometry(6.05, 64, 64),
      new THREE.MeshStandardMaterial({
        map: earthCloudTexture,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      }),
    );

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.35, 64, 64),
      new THREE.MeshNormalMaterial(),
    );
    torus.position.z = 7;
    torus.position.x = 2;
    torus.position.y = 2;

    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.75, 2, 64, 64),
      new THREE.MeshNormalMaterial(),
    );
    cone.position.z = 7;
    cone.position.x = -3;
    cone.position.y = -1;
    cone.rotation.z = 45;
    cone.rotation.y = 30;

    const dodecahedron = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.MeshNormalMaterial(),
    );

    dodecahedron.position.z = 7;
    dodecahedron.position.x = 1.5;
    dodecahedron.position.y = -0.5;

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial(),
    );

    box.position.z = 8;
    box.position.x = -1;
    box.position.y = 1;

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(8, 3, 64, 64),
      new THREE.MeshNormalMaterial(),
    );
    torus2.position.z = 16;
    torus2.position.x = -8;
    torus2.position.y = -12;

    const cone2 = new THREE.Mesh(
      new THREE.ConeGeometry(15, 35, 64, 64),
      new THREE.MeshNormalMaterial(),
    );
    cone2.position.z = 42;
    cone2.position.x = 64;
    cone2.position.y = 35;
    cone2.rotation.z = 43;
    cone2.rotation.y = 30;

    const box2 = new THREE.Mesh(
      new THREE.BoxGeometry(128, 128, 128),
      new THREE.MeshNormalMaterial(),
    );

    box2.position.z = 86;
    box2.position.x = 256;
    box2.position.y = -86;
    box2.rotation.x = 0.5;
    box2.rotation.z = 0.5;

    const dodecahedron2 = new THREE.Mesh(
      new THREE.DodecahedronGeometry(12, 0),
      new THREE.MeshNormalMaterial(),
    );

    dodecahedron2.position.z = 46;
    dodecahedron2.position.x = 21;
    dodecahedron2.position.y = -13.5;

    let chairModel: THREE.Group | null = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("../src/assets/models/chair/chair.gltf", (gltf) => {
      sceneObject.getScene().add(gltf.scene);
      const model = gltf.scene;
      chairModel = model;
      model.scale.set(35, 35, 35);
      model.position.z = 66;
      model.position.x = 67;
      model.position.y = -5;
    });

    type Decor = THREE.Mesh | THREE.Group;

    const decor: Decor[] = [
      torus,
      cone,
      dodecahedron,
      box,
      torus2,
      cone2,
      box2,
      dodecahedron2,
    ];

    earthGroup.add(earth, earthClouds);
    earthGroup.rotation.y = 4.2;
    earthGroup.rotation.z = -0.95;

    sceneObject.getScene().add(earthGroup, ...decor); // earthGroup

    sceneObject.addStars(1024, 3096);

    const random = () => {
      let num = Math.random();
      num *= Math.round(Math.random()) ? 1 : -1;

      return num;
    };
    const randomArrayFactor = (arr: Decor[]) => {
      const result: number[][] = [];
      arr.map(() => {
        result.push([random() / 960, random() / 1000, random() / 1100]);
      });
      return result;
    };

    const randomFactors = randomArrayFactor(decor);
    console.log(randomFactors);

    const roatateArray = (arr: Decor[]) => {
      for (const [i, element] of arr.entries()) {
        element.rotation.x += randomFactors[i][0];
        element.rotation.z += randomFactors[i][1];
        element.rotation.y += randomFactors[i][2];
      }
    };

    const animate = () => {
      window.requestAnimationFrame(animate);

      roatateArray(decor);

      if (chairModel) {
        chairModel.rotation.x += Math.random() / 1820;
        chairModel.rotation.y -= Math.random() / 2000;
        chairModel.rotation.z += Math.random() / 2200;
      }

      const delta = sceneObject.getClock().getDelta();

      raycaster.setFromCamera(mouse, sceneObject.cameraDev);

      earthClouds.rotation.y += 0.0015 * delta;
      earthGroup.rotation.y += 0.005 * delta;
      // earthOrbit.rotation.z += 0.2 * delta;
    };
    animate();
  }, []);

  return (
    <>
      <canvas id={canvasId} />
    </>
  );
}

export default App;
