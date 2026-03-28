'use client';

import { useEffect, useRef } from 'react';

export function BrainCanvas({ completedSteps = 0 }: { completedSteps?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    let animationId: number;
    let scene: any, camera: any, renderer: any;
    let wireframe: any, core: any, torus1: any, torus2: any;
    let nodes: any[] = [];
    let lines: any[] = [];

    const initThreeJS = async () => {
      // Dynamically import Three.js only on client
      const THREE = await import('three');

      const canvas = canvasRef.current!;
      const width = 380;
      const height = 380;

      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
      camera.position.z = 22;

      renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: true 
      });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);

      // Brain wireframe
      const geometry = new THREE.SphereGeometry(4, 16, 16);
      const wireframeGeo = new THREE.WireframeGeometry(geometry);
      wireframe = new THREE.LineSegments(wireframeGeo);
      (wireframe.material as any).color = new THREE.Color('#7C3AED');
      (wireframe.material as any).opacity = 0.4;
      (wireframe.material as any).transparent = true;
      scene.add(wireframe);

      // Inner glowing core
      const coreGeo = new THREE.SphereGeometry(2.5, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({ 
        color: '#A855F7', 
        opacity: 0.2, 
        transparent: true 
      });
      core = new THREE.Mesh(coreGeo, coreMat);
      scene.add(core);

      // Orbiting nodes (40 nodes using fibonacci sphere)
      const nodePositions: any[] = [];
      const phi = Math.PI * (Math.sqrt(5) - 1);
      for (let i = 0; i < 40; i++) {
        const y = 1 - (i / 39) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        const orbitR = 7;
        nodePositions.push(new THREE.Vector3(x * orbitR, y * orbitR, z * orbitR));
      }

      nodePositions.forEach((pos, i) => {
        const nodeMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 8, 8),
          new THREE.MeshBasicMaterial({ 
            color: i < completedSteps * 8 ? '#A855F7' : '#6D28D9',
            opacity: i < completedSteps * 8 ? 1.0 : 0.4,
            transparent: true 
          })
        );
        nodeMesh.position.copy(pos);
        (nodeMesh as any).originalPos = pos.clone();
        (nodeMesh as any).orbitSpeed = 0.0005 + Math.random() * 0.0005;
        (nodeMesh as any).orbitOffset = Math.random() * Math.PI * 2;
        scene.add(nodeMesh);
        nodes.push(nodeMesh);
      });

      // Connect nearest nodes with lines
      for (let i = 0; i < nodes.length; i++) {
        let nearest = 0;
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          if (nearest < 3) {
            const dist = nodes[i].position.distanceTo(nodes[j].position);
            if (dist < 6) {
              const points = [nodes[i].position, nodes[j].position];
              const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
              const lineMat = new THREE.LineBasicMaterial({ 
                color: '#4C1D95', 
                opacity: 0.2,
                transparent: true 
              });
              const line = new THREE.Line(lineGeo, lineMat);
              scene.add(line);
              lines.push({ line, from: i, to: j });
              nearest++;
            }
          }
        }
      }

      // Outer torus ring
      const torusGeo1 = new THREE.TorusGeometry(10, 0.06, 4, 80);
      const torusMat1 = new THREE.MeshBasicMaterial({ 
        color: '#7C3AED', 
        opacity: 0.15, 
        transparent: true 
      });
      torus1 = new THREE.Mesh(torusGeo1, torusMat1);
      torus1.rotation.x = 0.4;
      scene.add(torus1);

      const torusGeo2 = new THREE.TorusGeometry(11, 0.04, 4, 80);
      const torusMat2 = new THREE.MeshBasicMaterial({ 
        color: '#A855F7', 
        opacity: 0.1, 
        transparent: true 
      });
      torus2 = new THREE.Mesh(torusGeo2, torusMat2);
      torus2.rotation.x = 0.4;
      scene.add(torus2);

      // Animation loop
      function animate() {
        animationId = requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Rotate and pulse brain
        const scale = Math.sin(time * 0.8) * 0.08 + 1.0;
        wireframe.rotation.y += 0.008;
        wireframe.rotation.x += 0.003;
        wireframe.scale.set(scale, scale, scale);
        core.rotation.copy(wireframe.rotation);
        core.scale.copy(wireframe.scale);

        // Rotate torus rings
        torus1.rotation.y += 0.003;
        torus2.rotation.y -= 0.002;

        // Orbit nodes
        nodes.forEach((node: any, i: number) => {
          const speed = node.orbitSpeed;
          const offset = node.orbitOffset;
          const orbitTime = time * speed + offset;
          const orbitR = 7;
          node.position.x = Math.sin(orbitTime) * orbitR * Math.abs(node.originalPos.x / orbitR);
          node.position.z = Math.cos(orbitTime) * orbitR * Math.abs(node.originalPos.z / orbitR);
        });

        // Update lines
        lines.forEach(({ line, from, to }: any) => {
          const points = [nodes[from].position, nodes[to].position];
          line.geometry.setFromPoints(points);
        });

        // Camera subtle rotation
        camera.position.x = Math.sin(time * 0.05) * 0.5;
        camera.position.y = Math.cos(time * 0.07) * 0.3;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
      animate();
    };

    initThreeJS();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
    };
  }, [completedSteps]);

  return (
    <div ref={containerRef} className="relative w-[380px] h-[380px] mx-auto">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
