"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Float,
  ContactShadows,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";

export function Avatar3D() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl h-[65vh] sm:h-[70vh] md:h-[75vh] max-h-[640px]">
        {!loaded && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/60">
            <span className="text-sm text-muted-foreground">
              Loading avatar...
            </span>
          </div>
        )}
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 2.0, 6.8]} fov={40} />
          <ambientLight intensity={0.9} />
          <spotLight
            position={[10, 15, 10]}
            angle={0.25}
            penumbra={1}
            intensity={1.2}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.6} />
          <directionalLight position={[0, 5, 5]} intensity={0.8} />

          <Suspense fallback={null}>
            <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
              <AvatarModel onLoaded={() => setLoaded(true)} />
            </Float>
          </Suspense>
          <ContactShadows
            position={[0, -1.0, 0]}
            opacity={0.4}
            scale={8}
            blur={2.5}
            far={4}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(3 * Math.PI) / 5}
          />
        </Canvas>
      </div>
    </div>
  );
}

type AvatarModelProps = {
  onLoaded?: () => void;
};

function AvatarModel({ onLoaded }: AvatarModelProps) {
  const [currentModel, setCurrentModel] = useState<'walking' | 'wave'>('walking');
  const [isMobile, setIsMobile] = useState(false);

  const walkingData = useGLTF("/models/Walking.glb");
  const waveData = useGLTF("/models/Big_Wave_Hello.glb");

  const data = currentModel === 'walking' ? walkingData : waveData;
  const { scene, animations } = data;
  const { actions } = useAnimations(animations, scene);
  const ref = useRef<THREE.Group>(null);
  const hasNotifiedLoadedRef = useRef(false);

  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const action = Object.values(actions)[0];
      if (action) {
        action.play();
      }
    }
  }, [actions]);

  useEffect(() => {
    if (!hasNotifiedLoadedRef.current && scene) {
      hasNotifiedLoadedRef.current = true;
      onLoaded?.();
    }
  }, [scene, onLoaded]);

  useFrame(() => {
    // Model is now fixed in place
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[currentModel === "wave" ? -0.35 : 0, -1.3, 0]}
      scale={isMobile ? 1.5 : 1.9}
      rotation={[0, 0, 0]}
      onClick={() => {
        setCurrentModel('wave');
        setTimeout(() => setCurrentModel('walking'), 5000);
      }}
    />
  );
}

useGLTF.preload("/models/Walking.glb");
useGLTF.preload("/models/Big_Wave_Hello.glb");

