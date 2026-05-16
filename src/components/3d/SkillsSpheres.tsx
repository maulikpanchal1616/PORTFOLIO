"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "React", "Next.js", "Tailwind", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Framer Motion",
  "Node.js", "Django", "Python", "Java", 
  "MySQL", "MongoDB", "SQL",
  "Git", "GitHub", "Linux", "Antigravity", "Framer",
  "APIs", "DBMS", "OOP"
];

function SkillNode({ text, position, scale = 1, fontSize = 0.35 }: { text: string; position: [number, number, number]; scale?: number; fontSize?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const color = useMemo(() => {
    const c = new THREE.Color();
    c.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5); // Cyans to purples
    return c;
  }, []);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <Icosahedron args={[0.9 * scale, 1]} ref={meshRef}>
        <meshStandardMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.3} 
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Icosahedron>
      <Text
        position={[0, 0, 0]}
        fontSize={fontSize}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </Float>
  );
}

export default function SkillsSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  const nodes = useMemo(() => {
    return skills.map((skill, i) => {
      const radius = isMobile ? 4.5 : 6.5;
      const angle = (i / skills.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * (isMobile ? 3 : 4);
      return (
        <SkillNode 
          key={skill} 
          text={skill} 
          position={[x, y, z]} 
          scale={isMobile ? 0.6 : 1}
          fontSize={isMobile ? 0.25 : 0.35}
        />
      );
    });
  }, [isMobile]);

  return (
    <group ref={groupRef}>
      {nodes}
    </group>
  );
}
