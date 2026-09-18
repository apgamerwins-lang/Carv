'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { soundEngine } from '@/lib/audio';

export interface CarSpecConfig {
  paintColor: string;
  paintFinish: 'gloss' | 'satin' | 'metallic';
  wheelStyle: 'forged-aerodisc' | 'monoblock-5' | 'gt3-multispoke';
  wheelFinish: string;
  caliperColor: string;
  bodyKit: 'oem' | 'carbon-aero' | 'widebody-gt';
  stance: 'stock' | 'clubsport' | 'slammed-air';
  headlightsOn: boolean;
  exhaustType: 'dual-titanium' | 'quad-carbon' | 'oval-race';
}

interface CarCanvasProps {
  mode?: 'hero' | 'configurator' | 'detailing' | 'garage';
  spec?: CarSpecConfig;
  activeCategory?: string;
  activeHotspotId?: string;
  onHotspotClick?: (id: string) => void;
  interactive?: boolean;
}

export default function CarCanvas({
  mode = 'hero',
  spec = {
    paintColor: '#121212',
    paintFinish: 'metallic',
    wheelStyle: 'monoblock-5',
    wheelFinish: '#A7A7A7',
    caliperColor: '#C9A66B',
    bodyKit: 'carbon-aero',
    stance: 'clubsport',
    headlightsOn: true,
    exhaustType: 'quad-carbon',
  },
  activeCategory,
  activeHotspotId,
  interactive = true,
}: CarCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGLSupported] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  });
  const [isHovered, setIsHovered] = useState(false);

  // References to three objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const wheelsGroupRef = useRef<THREE.Group[]>([]);
  const paintMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const caliperMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const carbonMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const headlightLightsRef = useRef<THREE.SpotLight[]>([]);
  const headlightMeshesRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Camera targets for smooth cinematic lerp
  const targetCamPos = useRef(new THREE.Vector3(4.8, 1.8, 5.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const orbitRotation = useRef({ x: 0.35, y: 0.15 });

  // Update camera target based on current view/category
  useEffect(() => {
    if (!cameraRef.current) return;

    if (mode === 'hero') {
      targetCamPos.current.set(4.6, 1.6, 5.0);
      targetLookAt.current.set(0, 0.45, 0);
    } else if (mode === 'configurator') {
      switch (activeCategory) {
        case 'WHEELS':
          targetCamPos.current.set(2.4, 0.6, 2.6);
          targetLookAt.current.set(1.1, 0.38, 1.35);
          break;
        case 'BODY KIT':
          targetCamPos.current.set(0.2, 0.8, 4.4);
          targetLookAt.current.set(0, 0.3, 1.8);
          break;
        case 'PAINT':
          targetCamPos.current.set(3.8, 2.2, 3.4);
          targetLookAt.current.set(0, 0.5, 0);
          break;
        case 'LIGHTING':
          targetCamPos.current.set(1.2, 0.9, 3.6);
          targetLookAt.current.set(0.5, 0.55, 1.8);
          break;
        case 'EXHAUST':
          targetCamPos.current.set(-0.8, 0.65, -4.2);
          targetLookAt.current.set(0, 0.35, -2.1);
          break;
        case 'BRAKES':
          targetCamPos.current.set(1.9, 0.55, 1.9);
          targetLookAt.current.set(1.15, 0.38, 1.35);
          break;
        case 'STANCE':
          targetCamPos.current.set(4.6, 0.9, 0.5);
          targetLookAt.current.set(0, 0.35, 0);
          break;
        default:
          targetCamPos.current.set(4.4, 1.7, 4.5);
          targetLookAt.current.set(0, 0.45, 0);
      }
    } else if (mode === 'detailing') {
      if (activeHotspotId === 'paint') {
        targetCamPos.current.set(2.8, 1.6, 1.8);
        targetLookAt.current.set(0.3, 0.7, 0.4);
      } else if (activeHotspotId === 'ppf') {
        targetCamPos.current.set(0.4, 1.1, 3.8);
        targetLookAt.current.set(0, 0.5, 1.7);
      } else if (activeHotspotId === 'ceramic') {
        targetCamPos.current.set(-3.2, 1.6, -1.2);
        targetLookAt.current.set(-0.7, 0.65, -0.6);
      } else if (activeHotspotId === 'wheels') {
        targetCamPos.current.set(2.4, 0.6, 2.5);
        targetLookAt.current.set(1.1, 0.35, 1.35);
      } else if (activeHotspotId === 'interior') {
        targetCamPos.current.set(1.5, 1.5, 0.5);
        targetLookAt.current.set(0, 0.7, 0);
      } else if (activeHotspotId === 'engine') {
        targetCamPos.current.set(1.0, 1.8, 2.5);
        targetLookAt.current.set(0, 0.65, 1.3);
      } else {
        targetCamPos.current.set(4.2, 1.8, 4.2);
        targetLookAt.current.set(0, 0.5, 0);
      }
    } else if (mode === 'garage') {
      targetCamPos.current.set(4.6, 1.8, 5.0);
      targetLookAt.current.set(0, 0.6, 0);
    }
  }, [mode, activeCategory, activeHotspotId]);

  // Update materials when spec changes
  useEffect(() => {
    if (!paintMaterialsRef.current.length) return;

    paintMaterialsRef.current.forEach((mat) => {
      mat.color.setStyle(spec.paintColor);
      if (spec.paintFinish === 'satin') {
        mat.roughness = 0.45;
        mat.clearcoat = 0.3;
        mat.clearcoatRoughness = 0.5;
        mat.metalness = 0.6;
      } else if (spec.paintFinish === 'gloss') {
        mat.roughness = 0.12;
        mat.clearcoat = 1.0;
        mat.clearcoatRoughness = 0.04;
        mat.metalness = 0.75;
      } else {
        // Metallic
        mat.roughness = 0.22;
        mat.clearcoat = 0.95;
        mat.clearcoatRoughness = 0.1;
        mat.metalness = 0.88;
      }
      mat.needsUpdate = true;
    });

    caliperMaterialsRef.current.forEach((mat) => {
      mat.color.setStyle(spec.caliperColor);
      mat.needsUpdate = true;
    });

    // Stance suspension adjustment
    if (carGroupRef.current) {
      let stanceY = 0;
      if (spec.stance === 'slammed-air') stanceY = -0.09;
      else if (spec.stance === 'clubsport') stanceY = -0.04;
      carGroupRef.current.position.y = stanceY;
    }

    // Headlight intensity
    headlightLightsRef.current.forEach((light) => {
      light.intensity = spec.headlightsOn ? 18 : 0;
    });
    headlightMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.color.setStyle(spec.headlightsOn ? '#FFFDF5' : '#222222');
      }
    });
  }, [spec]);

  // Build the 3D car and scene
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !webGLSupported) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#080808');
    scene.fog = new THREE.FogExp2('#080808', 0.045);

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    cameraRef.current = camera;
    camera.position.set(4.8, 1.8, 5.2);
    camera.lookAt(0, 0.45, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Overhead showroom soft rectangular light
    const overheadLight = new THREE.DirectionalLight(0xffffff, 2.4);
    overheadLight.position.set(0, 6, 0);
    overheadLight.castShadow = true;
    overheadLight.shadow.mapSize.width = 1024;
    overheadLight.shadow.mapSize.height = 1024;
    overheadLight.shadow.camera.near = 0.5;
    overheadLight.shadow.camera.far = 12;
    overheadLight.shadow.bias = -0.001;
    scene.add(overheadLight);

    // Dramatic side studio rim lights (Champagne Gold / Cool Titanium reflections)
    const rimLight1 = new THREE.DirectionalLight(0xc9a66b, 1.8);
    rimLight1.position.set(-4, 3, 3);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xd4e2ff, 1.4);
    rimLight2.position.set(4, 2, -3);
    scene.add(rimLight2);

    // Front headlight spot beams
    const leftHeadlight = new THREE.SpotLight(0xffffff, 18, 14, Math.PI / 7, 0.4);
    leftHeadlight.position.set(-0.65, 0.55, 1.95);
    leftHeadlight.target.position.set(-0.65, 0, 7);
    scene.add(leftHeadlight);
    scene.add(leftHeadlight.target);

    const rightHeadlight = new THREE.SpotLight(0xffffff, 18, 14, Math.PI / 7, 0.4);
    rightHeadlight.position.set(0.65, 0.55, 1.95);
    rightHeadlight.target.position.set(0.65, 0, 7);
    scene.add(rightHeadlight);
    scene.add(rightHeadlight.target);
    headlightLightsRef.current = [leftHeadlight, rightHeadlight];

    // Floor (Dark reflective garage concrete with subtle grid lines)
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0c,
      roughness: 0.28,
      metalness: 0.65,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle showroom grid rings
    const gridHelper = new THREE.PolarGridHelper(8, 8, 8, 64, 0x333333, 0x181818);
    gridHelper.position.y = 0.002;
    scene.add(gridHelper);

    // Ambient floating dust particles (cinematic hangar atmosphere)
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = Math.random() * 3 + 0.1;
      particlePos[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc9a66b,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // ==========================================
    // VEHICLE CONSTRUCTION (GT Bespoke Coupe)
    // ==========================================
    const carRoot = new THREE.Group();
    carGroupRef.current = carRoot;
    scene.add(carRoot);

    paintMaterialsRef.current = [];
    caliperMaterialsRef.current = [];
    carbonMaterialsRef.current = [];
    wheelsGroupRef.current = [];
    headlightMeshesRef.current = [];

    // Shared Materials
    const paintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(spec.paintColor),
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });
    paintMaterialsRef.current.push(paintMat);

    const carbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x181818,
      roughness: 0.38,
      metalness: 0.45,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    });
    carbonMaterialsRef.current.push(carbonMat);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.82,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1.0,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d4,
      roughness: 0.12,
      metalness: 0.95,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x5a6375, // Blued burnt titanium
      roughness: 0.25,
      metalness: 0.88,
    });

    const caliperMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(spec.caliperColor),
      roughness: 0.2,
      metalness: 0.7,
    });
    caliperMaterialsRef.current.push(caliperMat);

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.85,
      metalness: 0.08,
    });

    // 1. Lower Main Chassis Body
    const lowerBodyGeo = new THREE.BoxGeometry(1.82, 0.42, 4.4);
    // Bevel/soften edges slightly using custom deformation
    const lowerBody = new THREE.Mesh(lowerBodyGeo, paintMat);
    lowerBody.position.set(0, 0.42, 0);
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carRoot.add(lowerBody);

    // 2. Widebody Flared Front Fenders
    const frontFenderGeo = new THREE.BoxGeometry(1.98, 0.38, 1.2);
    const frontFenders = new THREE.Mesh(frontFenderGeo, paintMat);
    frontFenders.position.set(0, 0.42, 1.35);
    frontFenders.castShadow = true;
    carRoot.add(frontFenders);

    // 3. Widebody Flared Rear Quarter Panels
    const rearFenderGeo = new THREE.BoxGeometry(2.04, 0.42, 1.35);
    const rearFenders = new THREE.Mesh(rearFenderGeo, paintMat);
    rearFenders.position.set(0, 0.44, -1.3);
    rearFenders.castShadow = true;
    carRoot.add(rearFenders);

    // 4. Sloped Hood (Engine Bonnet) with Carbon Louvers
    const hoodGeo = new THREE.BoxGeometry(1.7, 0.12, 1.45);
    const hood = new THREE.Mesh(hoodGeo, paintMat);
    hood.position.set(0, 0.62, 1.25);
    hood.rotation.x = 0.08;
    hood.castShadow = true;
    carRoot.add(hood);

    // Hood Carbon Vents
    const ventGeo = new THREE.BoxGeometry(0.35, 0.02, 0.5);
    const ventL = new THREE.Mesh(ventGeo, carbonMat);
    ventL.position.set(-0.45, 0.67, 1.2);
    ventL.rotation.x = 0.08;
    carRoot.add(ventL);

    const ventR = new THREE.Mesh(ventGeo, carbonMat);
    ventR.position.set(0.45, 0.67, 1.2);
    ventR.rotation.x = 0.08;
    carRoot.add(ventR);

    // 5. Sleek Fastback Cabin / Greenhouse (Roof & Pillars)
    const cabinGeo = new THREE.BoxGeometry(1.42, 0.46, 2.1);
    const cabin = new THREE.Mesh(cabinGeo, paintMat);
    cabin.position.set(0, 0.82, -0.2);
    cabin.castShadow = true;
    carRoot.add(cabin);

    // Windows (Windshield, Rear Screen, Side Glass)
    const windshieldGeo = new THREE.BoxGeometry(1.36, 0.42, 0.75);
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 0.78, 0.62);
    windshield.rotation.x = -0.42;
    carRoot.add(windshield);

    const rearGlassGeo = new THREE.BoxGeometry(1.36, 0.38, 0.9);
    const rearGlass = new THREE.Mesh(rearGlassGeo, glassMat);
    rearGlass.position.set(0, 0.76, -0.95);
    rearGlass.rotation.x = 0.42;
    carRoot.add(rearGlass);

    // 6. Front Carbon Aerodynamic Splitter & Canards
    const splitterGeo = new THREE.BoxGeometry(1.94, 0.04, 0.55);
    const splitter = new THREE.Mesh(splitterGeo, carbonMat);
    splitter.position.set(0, 0.22, 2.25);
    splitter.castShadow = true;
    carRoot.add(splitter);

    // Splitter support struts
    const strutGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.18, 8);
    const strutL = new THREE.Mesh(strutGeo, chromeMat);
    strutL.position.set(-0.35, 0.3, 2.3);
    strutL.rotation.x = 0.3;
    carRoot.add(strutL);
    const strutR = new THREE.Mesh(strutGeo, chromeMat);
    strutR.position.set(0.35, 0.3, 2.3);
    strutR.rotation.x = 0.3;
    carRoot.add(strutR);

    // Side Aero Skirts (Carbon)
    const skirtGeo = new THREE.BoxGeometry(0.12, 0.03, 2.3);
    const skirtL = new THREE.Mesh(skirtGeo, carbonMat);
    skirtL.position.set(-0.95, 0.22, 0);
    carRoot.add(skirtL);
    const skirtR = new THREE.Mesh(skirtGeo, carbonMat);
    skirtR.position.set(0.95, 0.22, 0);
    carRoot.add(skirtR);

    // 7. Rear Carbon Diffuser with Aero Fins
    const diffuserGeo = new THREE.BoxGeometry(1.88, 0.14, 0.65);
    const diffuser = new THREE.Mesh(diffuserGeo, carbonMat);
    diffuser.position.set(0, 0.28, -2.15);
    diffuser.rotation.x = -0.15;
    carRoot.add(diffuser);

    // 8. Quad Burnt Titanium Exhaust Tips
    const exhaustGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.24, 16);
    const tipPositions = [-0.55, -0.42, 0.42, 0.55];
    tipPositions.forEach((xPos) => {
      const tip = new THREE.Mesh(exhaustGeo, titaniumMat);
      tip.rotation.x = Math.PI / 2;
      tip.position.set(xPos, 0.28, -2.28);
      carRoot.add(tip);
    });

    // 9. Swan-Neck High-Downforce Carbon Rear Wing
    const wingBladeGeo = new THREE.BoxGeometry(1.82, 0.03, 0.36);
    const wingBlade = new THREE.Mesh(wingBladeGeo, carbonMat);
    wingBlade.position.set(0, 1.15, -1.95);
    wingBlade.castShadow = true;
    carRoot.add(wingBlade);

    // Wing uprights (billet brackets)
    const uprightGeo = new THREE.BoxGeometry(0.03, 0.32, 0.12);
    const uprightL = new THREE.Mesh(uprightGeo, carbonMat);
    uprightL.position.set(-0.48, 1.0, -1.92);
    carRoot.add(uprightL);
    const uprightR = new THREE.Mesh(uprightGeo, carbonMat);
    uprightR.position.set(0.48, 1.0, -1.92);
    carRoot.add(uprightR);

    // Wing endplates
    const endplateGeo = new THREE.BoxGeometry(0.015, 0.18, 0.42);
    const endplateL = new THREE.Mesh(endplateGeo, carbonMat);
    endplateL.position.set(-0.91, 1.15, -1.95);
    carRoot.add(endplateL);
    const endplateR = new THREE.Mesh(endplateGeo, carbonMat);
    endplateR.position.set(0.91, 1.15, -1.95);
    carRoot.add(endplateR);

    // 10. Headlights & Taillights
    const headlightGeo = new THREE.BoxGeometry(0.28, 0.08, 0.12);
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfffdf5 });

    const hlLeft = new THREE.Mesh(headlightGeo, headlightMat);
    hlLeft.position.set(-0.65, 0.54, 2.12);
    carRoot.add(hlLeft);

    const hlRight = new THREE.Mesh(headlightGeo, headlightMat);
    hlRight.position.set(0.65, 0.54, 2.12);
    carRoot.add(hlRight);
    headlightMeshesRef.current = [hlLeft, hlRight];

    // Rear Smoked LED Lightbar
    const tailLightGeo = new THREE.BoxGeometry(1.68, 0.06, 0.08);
    const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xee1122 });
    const tailLight = new THREE.Mesh(tailLightGeo, tailLightMat);
    tailLight.position.set(0, 0.58, -2.18);
    carRoot.add(tailLight);

    // 11. Wheels & Brake Assemblies (4 corners)
    const wheelPositions = [
      { x: -0.92, y: 0.38, z: 1.35, isLeft: true },  // Front Left
      { x: 0.92, y: 0.38, z: 1.35, isLeft: false },  // Front Right
      { x: -0.96, y: 0.38, z: -1.3, isLeft: true },  // Rear Left
      { x: 0.96, y: 0.38, z: -1.3, isLeft: false },  // Rear Right
    ];

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, pos.y, pos.z);

      // Tire (Performance semi-slick compound)
      const tireGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 32);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Wheel Rim Barrel & Face
      const rimGeo = new THREE.CylinderGeometry(0.29, 0.29, 0.285, 24);
      const rimMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(spec.wheelFinish || '#A7A7A7'),
        metalness: 0.94,
        roughness: 0.16,
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      // Spokes (Geometric forged pattern)
      for (let s = 0; s < 5; s++) {
        const spokeGeo = new THREE.BoxGeometry(0.04, 0.25, 0.05);
        const spoke = new THREE.Mesh(spokeGeo, rimMat);
        const angle = (s * Math.PI * 2) / 5;
        spoke.position.set(pos.isLeft ? -0.13 : 0.13, Math.sin(angle) * 0.12, Math.cos(angle) * 0.12);
        spoke.rotation.x = angle;
        wheelGroup.add(spoke);
      }

      // Drilled Carbon-Silicon Carbide Brake Rotor
      const rotorGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 24);
      const rotorMat = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.35,
      });
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.rotation.z = Math.PI / 2;
      rotor.position.x = pos.isLeft ? 0.03 : -0.03;
      wheelGroup.add(rotor);

      // Monobloc 6-Piston Caliper
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.14, 0.18);
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(pos.isLeft ? -0.04 : 0.04, 0.12, 0.08);
      wheelGroup.add(caliper);

      carRoot.add(wheelGroup);
      wheelsGroupRef.current.push(wheelGroup);
    });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera interpolation towards target
      if (camera) {
        // Orbit adjustment from user dragging / mouse parallax
        const effectiveTargetPos = targetCamPos.current.clone();

        if (interactive && isHovered) {
          // Subtle cursor parallax
          mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
          mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;
          effectiveTargetPos.x += mousePos.current.x * 0.7;
          effectiveTargetPos.y += mousePos.current.y * 0.4;
        }

        // Apply orbital rotation
        if (mode === 'configurator' || mode === 'garage') {
          const radius = effectiveTargetPos.distanceTo(targetLookAt.current);
          const orbitX = Math.sin(orbitRotation.current.x) * radius;
          const orbitZ = Math.cos(orbitRotation.current.x) * radius;
          effectiveTargetPos.x = targetLookAt.current.x + orbitX;
          effectiveTargetPos.z = targetLookAt.current.z + orbitZ;
        }

        camera.position.lerp(effectiveTargetPos, 0.05);

        // Smooth lookAt
        currentLookAt.current.lerp(targetLookAt.current, 0.06);
        camera.lookAt(currentLookAt.current);
      }

      // Subtle suspension breath & floating particles
      if (carRoot && mode === 'hero') {
        carRoot.position.y = Math.sin(time * 1.5) * 0.008;
      }

      if (particles) {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += delta * 0.04;
          if (positions[i] > 3.2) positions[i] = 0.1;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
    };
  }, []);

  // Mouse Interaction handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePos.current.targetX = x;
    mousePos.current.targetY = y;

    if (isDragging.current) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      orbitRotation.current.x += deltaX * 0.008;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    soundEngine.playMechanicalClick(420, 0.03);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      orbitRotation.current.x += deltaX * 0.01;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      id="apex-3d-car-viewport"
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDragging.current = false;
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {webGLSupported ? (
        <canvas ref={canvasRef} className="w-full h-full block" />
      ) : (
        /* High-Definition Fallback if WebGL unavailable */
        <div
          className="w-full h-full flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=85)',
          }}
        >
          <div className="bg-black/80 backdrop-blur-md p-6 border border-white/10 text-center max-w-md mx-4">
            <span className="text-[#C9A66B] text-xs uppercase tracking-widest block mb-2 font-mono">
              APEX PERFORMANCE SPEC
            </span>
            <h3 className="text-white text-xl font-bold tracking-tight mb-2">APEX GT BESPOKE COUPE</h3>
            <p className="text-sm text-[#A7A7A7]">
              Hardware-accelerated 3D rendered in fallback showroom mode.
            </p>
          </div>
        </div>
      )}

      {/* Floating 3D Navigation Hint */}
      {interactive && (
        <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#A7A7A7] uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B] animate-pulse" />
          <span>DRAG TO ORBIT 360° • SCROLL TO EXPLORE</span>
        </div>
      )}
    </div>
  );
}
