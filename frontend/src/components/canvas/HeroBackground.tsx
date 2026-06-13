import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ color, position, scale, speed, distort, radius }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Sphere args={[radius, 64, 64]} ref={meshRef} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed * 2}
        roughness={0.1}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent={true}
        opacity={0.85}
      />
    </Sphere>
  );
}

export default function HeroBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(135deg,#0D2240 0%,#1a3a5c 35%,#0D2240 70%,#0a1b33 100%)' }}>
      {/* Subtle Grain Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} />

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ambientLight intensity={1.5} color="#0D2240" />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#1A3A5C" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#E8541A" />

        <AnimatedSphere color="#1A3A5C" position={[4, 1, -2]} scale={1} speed={0.4} distort={0.4} radius={2.2} />
        <AnimatedSphere color="#E8541A" position={[-4, -2, -4]} scale={1.2} speed={0.25} distort={0.3} radius={2.8} />
        <AnimatedSphere color="#D4A843" position={[0, 4, -6]} scale={0.8} speed={0.35} distort={0.5} radius={3.5} />
      </Canvas>
    </div>
  );
}
