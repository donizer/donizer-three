import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "./lib/SceneInit";

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
      earthNormalMap
    );
    const earthCloudTexture = new THREE.TextureLoader().load(earthCloudsImg);
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(6, 128, 128),
      new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: earthNormalMapTexture,
      })
    );
    const earthClouds = new THREE.Mesh(
      new THREE.SphereGeometry(6.05, 64, 64),
      new THREE.MeshStandardMaterial({
        map: earthCloudTexture,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      })
    );

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.35, 64, 64),
      new THREE.MeshNormalMaterial()
    );
    torus.position.z = 7;
    torus.position.x = 2;
    torus.position.y = 2;

    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(1, 3, 64, 64),
      new THREE.MeshNormalMaterial()
    );
    cone.position.z = 7;
    cone.position.x = -3;
    cone.position.y = -1;
    cone.rotation.z = 45;
    cone.rotation.y = 30;

    const dodecahedron = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.MeshNormalMaterial()
    );

    dodecahedron.position.z = 7;
    dodecahedron.position.x = 1.5;
    dodecahedron.position.y = -0.5;

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial()
    );

    box.position.z = 8;
    box.position.x = -1;
    box.position.y = 1;

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(8, 3, 64, 64),
      new THREE.MeshNormalMaterial()
    );
    torus2.position.z = 16;
    torus2.position.x = -8;
    torus2.position.y = -12;

    const cone2 = new THREE.Mesh(
      new THREE.ConeGeometry(20, 60, 64, 64),
      new THREE.MeshNormalMaterial()
    );
    cone2.position.z = 42;
    cone2.position.x = 64;
    cone2.position.y = 35;
    cone2.rotation.z = 43;
    cone2.rotation.y = 30;

    const box2 = new THREE.Mesh(
      new THREE.BoxGeometry(128, 128, 128),
      new THREE.MeshNormalMaterial()
    );

    box2.position.z = 86;
    box2.position.x = 256;
    box2.position.y = -86;
    box2.rotation.x = 0.5;
    box2.rotation.z = 0.5;

    const decor = [torus, cone, dodecahedron, box, torus2, cone2, box2];

    earthGroup.add(earth, earthClouds);
    earthGroup.rotation.y = 4.2;
    earthGroup.rotation.z = -0.8;

    sceneObject.getScene().add(earthGroup, ...decor);

    sceneObject.addStars(512, 1500);

    const roatateArray = (arr: THREE.Mesh[]) => {
      for (const element of arr) {
        element.rotation.x += 0.0008;
        element.rotation.z += 0.0005;
        element.rotation.y += 0.0002;
      }
    };

    const animate = () => {
      window.requestAnimationFrame(animate);

      roatateArray(decor);

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
