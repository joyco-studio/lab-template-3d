"use client"

import { Box, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

function SceneContent() {
  return (
    <Box position={[0, 0.5, 0]}>
      <meshNormalMaterial />
    </Box>
  )
}

export function Scene() {
  return (
    <div id="webgl" className="fixed inset-0 h-dvh w-full">
      <Canvas
        camera={{
          position: [5, 5, 5],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        style={{ background: "#1f2020" }}
      >
        <OrbitControls />
        <gridHelper args={[10, 10]} />
        <SceneContent />
      </Canvas>
    </div>
  )
}
