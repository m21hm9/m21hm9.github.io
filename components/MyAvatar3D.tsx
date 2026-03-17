"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
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
            <div
              className="flex flex-col items-center gap-4"
              role="status"
              aria-live="polite"
              aria-label="Loading avatar"
            >
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-muted-foreground/25 border-t-muted-foreground" />
              <div className="text-base font-semibold text-foreground sm:text-lg md:text-xl">
                Loading avatar…
              </div>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute right-2 top-1/2 z-20 -translate-y-1/2 select-none sm:right-4">
          <div className="relative rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-lg animate-pulse">
            Click me
            <span className="absolute left-0 top-1/2 -translate-x-2.5 -translate-y-1/2 h-0 w-0 border-y-[8px] border-y-transparent border-r-[10px] border-r-foreground" />
          </div>
        </div>
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
              <AvatarModel
                onLoaded={() => setLoaded(true)}
              />
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
  const [currentModel, setCurrentModel] = useState<"walking" | "wave" | "dance">(
    "walking",
  );
  const [isMobile, setIsMobile] = useState(false);
  const [playToken, setPlayToken] = useState(0);
  const transitionTimeoutRef = useRef<number | null>(null);

  const walkingData = useGLTF("/models/Walking.glb");
  const waveData = useGLTF("/models/Big_Wave_Hello.glb");
  const danceData = useGLTF("/models/FunnyDancing.glb");

  const data =
    currentModel === "walking"
      ? walkingData
      : currentModel === "wave"
        ? waveData
        : danceData;
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
        action.reset();
        action.play();
      }
    }
  }, [actions, playToken]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current != null) {
        window.clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    if (transitionTimeoutRef.current != null) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    const action = Object.values(actions)[0];
    const durationMs = Math.max(0, (action?.getClip()?.duration ?? 0) * 1000);

    if (currentModel === "wave") {
      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentModel("dance");
      }, durationMs || 5000);
    } else if (currentModel === "dance") {
      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentModel("walking");
      }, durationMs || 5000);
    }
  }, [actions, currentModel, playToken]);

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
      position={[currentModel === "walking" ? 0 : -0.35, -1.3, 0]}
      scale={isMobile ? 1.5 : 1.9}
      rotation={[0, 0, 0]}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (transitionTimeoutRef.current != null) {
          window.clearTimeout(transitionTimeoutRef.current);
          transitionTimeoutRef.current = null;
        }
        setCurrentModel("wave");
        setPlayToken((t) => t + 1);
      }}
    />
  );
}

useGLTF.preload("/models/Walking.glb");
useGLTF.preload("/models/Big_Wave_Hello.glb");
useGLTF.preload("/models/FunnyDancing.glb");

