import React, { useEffect, useRef, useState } from "react";
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import BlurText from "../BlurText/BlurText";
import "./CodeverseCanvas.css";

interface Speed {
  x: number;
  y: number;
  z: number;
}

interface CodeverseCanvasProps {
  // Desktop Props
  ballSize?: number;
  logoSize?: number;
  particleCount?: number;
  ringCount?: number;
  ringGap?: number;
  rotationSpeed?: Speed;
  // Tablet Props
  tabletBallSize?: number;
  tabletLogoSize?: number;
  tabletParticleCount?: number;
  tabletRingCount?: number;
  tabletRingGap?: number;
  tabletRotationSpeed?: Speed;
  // Mobile Props
  mobileBallSize?: number;
  mobileLogoSize?: number;
  mobileParticleCount?: number;
  mobileRingCount?: number;
  mobileRingGap?: number;
  mobileRotationSpeed?: Speed;
}

const CodeverseCanvas: React.FC<CodeverseCanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Responsive settings state
  const [settings, setSettings] = useState({
    ballSize: props.ballSize || 7,
    logoSize: props.logoSize || 3,
    particleCount: props.particleCount || 200,
    ringCount: props.ringCount || 3,
    ringGap: props.ringGap || 1,
    rotationSpeed: props.rotationSpeed || { x: 0.02, y: 0.03, z: 0.01 },
  });

  // Screen size check logic
  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      if (width <= 450) {
        // Mobile
        setSettings({
          ballSize: props.mobileBallSize || 3.5,
          logoSize: props.mobileLogoSize || 1.5,
          particleCount: props.mobileParticleCount || 100,
          ringCount: props.mobileRingCount || 3,
          ringGap: props.mobileRingGap || 0.7,
          rotationSpeed: props.mobileRotationSpeed || {
            x: 0.02,
            y: 0.03,
            z: 0.01,
          },
        });
      } else if (width <= 850) {
        // Tablet
        setSettings({
          ballSize: props.tabletBallSize || 5,
          logoSize: props.tabletLogoSize || 2.2,
          particleCount: props.tabletParticleCount || 150,
          ringCount: props.tabletRingCount || 3,
          ringGap: props.tabletRingGap || 0.9,
          rotationSpeed: props.tabletRotationSpeed || {
            x: 0.02,
            y: 0.03,
            z: 0.01,
          },
        });
      } else {
        // Desktop
        setSettings({
          ballSize: props.ballSize || 7,
          logoSize: props.logoSize || 3,
          particleCount: props.particleCount || 200,
          ringCount: props.ringCount || 3,
          ringGap: props.ringGap || 1,
          rotationSpeed: props.rotationSpeed || { x: 0.02, y: 0.03, z: 0.01 },
        });
      }
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, [props]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    const camera = new BABYLON.ArcRotateCamera(
      "cam",
      Math.PI / 2,
      Math.PI / 2.3,
      15,
      BABYLON.Vector3.Zero(),
      scene,
    );
    camera.attachControl(canvasRef.current, true);
    camera.inputs.remove(camera.inputs.attached.mousewheel);

    new BABYLON.HemisphericLight(
      "h",
      new BABYLON.Vector3(0, 1, 0),
      scene,
    ).intensity = 0.35;
    new BABYLON.PointLight(
      "p",
      new BABYLON.Vector3(6, 8, -6),
      scene,
    ).intensity = 3;

    const glow = new BABYLON.GlowLayer("glow", scene, { blurKernelSize: 50 });
    glow.intensity = 0.6;

    // SHADERS
    BABYLON.Effect.ShadersStore["ballVertexShader"] = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 normal;
      uniform mat4 worldViewProjection;
      uniform mat4 world;
      varying vec3 vNormal;
      varying vec3 vPos;
      void main(){
        vec4 wp = world * vec4(position, 1.0);
        vPos = wp.xyz;
        vNormal = normalize(mat3(world) * normal);
        gl_Position = worldViewProjection * vec4(position, 1.0);
      }
    `;

    BABYLON.Effect.ShadersStore["ballFragmentShader"] = `
      precision highp float;
      varying vec3 vNormal;
      varying vec3 vPos;
      uniform vec3 cameraPosition;
      void main(){
        vec3 viewDir = normalize(cameraPosition - vPos);
        float fresnel = pow(1.2 - max(dot(vNormal, viewDir), 0.0), 2.0);
        vec3 inner = vec3(0.023,0.004,0.129);
        vec3 rim = vec3(0.0,0.639,0.518);
        vec3 color = inner + rim * fresnel * 2.0;
        float alpha = 0.55 + fresnel * 0.2;
        gl_FragColor = vec4(color, alpha);
      }
    `;

    // BALL
    const ball = BABYLON.MeshBuilder.CreateSphere(
      "ball",
      { diameter: settings.ballSize, segments: 128 },
      scene,
    );
    const ballMat = new BABYLON.ShaderMaterial(
      "ballMat",
      scene,
      { vertex: "ball", fragment: "ball" },
      {
        attributes: ["position", "normal"],
        uniforms: ["worldViewProjection", "world", "cameraPosition"],
        needAlphaBlending: true,
      },
    );
    ball.material = ballMat;
    ball.renderingGroupId = 1;

    // LOGO
    const logoPlane = BABYLON.MeshBuilder.CreatePlane(
      "logo",
      { size: settings.logoSize },
      scene,
    );
    logoPlane.rotation.y = 3; // Fixed facing
    logoPlane.renderingGroupId = 2;
    const adt = GUI.AdvancedDynamicTexture.CreateForMesh(logoPlane, 512, 512);
    const txt = new GUI.TextBlock();
    txt.text = "</>";
    txt.fontSize = 360;
    txt.color = "#00A384";
    txt.fontWeight = "bold";
    adt.addControl(txt);
    const logoMat = new BABYLON.StandardMaterial("logoMat", scene);
    logoMat.emissiveTexture = adt;
    logoMat.opacityTexture = adt;
    logoMat.disableDepthWrite = true;
    logoPlane.material = logoMat;

    // PARTICLES
    const pcs = new BABYLON.PointsCloudSystem("pcs", 3, scene);
    pcs.addPoints(settings.particleCount, (p: any) => {
      const r = Math.random() * (settings.ballSize / 2);
      const t = Math.random() * Math.PI * 2;
      const u = Math.acos(2 * Math.random() - 1);
      p.position = new BABYLON.Vector3(
        r * Math.sin(u) * Math.cos(t),
        r * Math.sin(u) * Math.sin(t),
        r * Math.cos(u),
      );
      p.color = new BABYLON.Color4(0, 1, 0.8, 1);
    });
    pcs.buildMeshAsync().then(() => {
      if (pcs.mesh) {
        pcs.mesh.renderingGroupId = 1;
        glow.addIncludedOnlyMesh(pcs.mesh);
      }
    });

    // ATOMIC RINGS
    const rings: BABYLON.Mesh[] = [];
    for (let i = 0; i < settings.ringCount; i++) {
      const ring = BABYLON.MeshBuilder.CreateTorus(
        "ring" + i,
        {
          diameter: settings.ballSize + 2 + i * settings.ringGap,
          thickness: 0.15,
          tessellation: 180,
        },
        scene,
      );

      // Atomic Axis Tilt
      if (i === 0) ring.rotation.z = Math.PI / 4;
      if (i === 1) ring.rotation.x = Math.PI / 2.5;
      if (i === 2) ring.rotation.z = -Math.PI / 4;

      const rm = new BABYLON.StandardMaterial("rm" + i, scene);
      rm.emissiveColor = new BABYLON.Color3(0, 0.8, 0.6);
      rm.alpha = 0.8;
      ring.material = rm;
      glow.addIncludedOnlyMesh(ring);
      rings.push(ring);
    }

    // ANIMATION
    scene.onBeforeRenderObservable.add(() => {
      ballMat.setVector3("cameraPosition", camera.position);
      if (pcs.mesh) pcs.mesh.rotation.y += 0.01;
      rings.forEach((r, i) => {
        if (i === 0) r.rotation.y += settings.rotationSpeed.y;
        else if (i === 1) r.rotation.x += settings.rotationSpeed.x;
        else {
          r.rotation.z += settings.rotationSpeed.z;
          r.rotation.y += settings.rotationSpeed.y * 0.5;
        }
      });
    });

    engine.runRenderLoop(() => scene.render());
    const handleResize = () => engine.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      engine.dispose();
    };
  }, [settings]);

  return (
    <div className="codeverse-canvas">
      <canvas ref={canvasRef} className="render-canvas" />
      <BlurText
        text="CODEVERSE STUDIOUS"
        animateBy="letters"
        direction="bottom"
        delay={120}
        className="codeverse-canvas-heading"
      />
    </div>
  );
};

export default CodeverseCanvas;
