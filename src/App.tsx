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
    const test = new SceneInit(canvasId);
    test.animate();

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

    const cameraLookAt = new THREE.Mesh(
      new THREE.SphereGeometry(0),
      new THREE.LineBasicMaterial()
    );
    cameraLookAt.position.x = -5;
    cameraLookAt.position.y = 2;

    earthGroup.add(earth, earthClouds);
    earthGroup.rotation.y = 4.2;
    earthGroup.rotation.z = -0.8;

    test.getScene().add(earthGroup);

    test.addStars(256);

    const animate = () => {
      window.requestAnimationFrame(animate);

      const delta = test.getClock().getDelta();

      raycaster.setFromCamera(mouse, test.cameraDev);

      test.camera.lookAt(cameraLookAt.position);

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
