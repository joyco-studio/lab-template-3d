import { Box, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const Scene = () => {
  return (
    <Box position={[0, 0.5, 0]}>
      <meshNormalMaterial />
    </Box>
  )
}

function App() {
  return (
    <Canvas
      camera={{
        position: [5, 5, 5],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
    >
      <OrbitControls />
      <gridHelper args={[10, 10]} />
      <Scene />
    </Canvas>
  )
}

export default App
