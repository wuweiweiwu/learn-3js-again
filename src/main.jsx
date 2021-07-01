import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

/** 
  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  const scene = new THREE.Scene();

  // Object
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // Sizes
  const sizes = {
    width: 800,
    height: 600,
  };

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  scene.add(camera);

  renderer.render(scene, camera);
 */

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} /> // new THREE.BoxGeometry(1, 1, 1);
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const sizes = {
  width: 800,
  height: 600,
};

ReactDOM.render(
  <Canvas color="#deadbeef" gl={{ clearColor: "black", autoClear: false }}>
    <ambientLight />
    {/* // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
      // camera.position.z = 3; */}
    <PerspectiveCamera args={[75, sizes.width / sizes.height]} position-z={3} />
    <Box />
  </Canvas>,
  document.getElementById("root")
);

/**
 *     <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <group position={[0, 0, -10]}>
        {positions.map(({ id, position }) => (
          <Icosahedron key={id} position={position} args={[1, 1]}>
            <meshBasicMaterial attach="material" color="white" wireframe />
          </Icosahedron>
        ))}
      </group>
      <OrbitControls />
    </Canvas>
 */
