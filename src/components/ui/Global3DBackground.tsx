"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 5000 particles
  const particleCount = 5000;
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color("#00f0ff"), // electric blue
      new THREE.Color("#a855f7"), // neon purple
      new THREE.Color("#00e5ff"), // cyan
      new THREE.Color("#ffffff"), // white star
    ];

    for (let i = 0; i < particleCount; i++) {
      // Random positions in a sphere/galaxy shape
      const radius = 20 + Math.random() * 50;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      // Add slight variance to colors
      color.toArray(colors, i * 3);
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.02;

    // Mouse parallax effect
    // pointer.x goes from -1 to 1
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    
    // Smooth dampening to target position
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Global3DBackground() {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none bg-[var(--color-matte-black)]">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }} dpr={[1, 2]}>
        <fog attach="fog" args={['#050505', 20, 80]} />
        <ParticleField />
      </Canvas>
      {/* A subtle gradient overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-matte-black)]/30 to-[var(--color-matte-black)]/80 pointer-events-none" />
    </div>
  );
}
