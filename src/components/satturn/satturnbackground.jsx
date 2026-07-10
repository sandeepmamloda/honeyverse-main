"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SaturnBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ---------- SETUP ----------
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isLowPower =
      isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    const QUALITY = {
      planetCount: isLowPower ? 34000 : 100000,
      ringCount: isLowPower ? 40000 : 120000,
      haloCount: isLowPower ? 900 : 2200,
      pixelRatioCap: isLowPower ? 1.5 : 2,
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFBE3EC);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 10.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, QUALITY.pixelRatioCap));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ---------- PALETTE ----------
    const palette = [
      new THREE.Color("#fff1e3"),
      new THREE.Color("#ffdcc4"),
      new THREE.Color("#ffc2c9"),
      new THREE.Color("#ff9eb0"),
      new THREE.Color("#f5778f"),
      new THREE.Color("#dd6080"),
      new THREE.Color("#b8506f"),
    ];
    function paletteAt(t) {
      t = Math.min(1, Math.max(0, t));
      const idx = t * (palette.length - 1);
      const i0 = Math.floor(idx),
        i1 = Math.min(palette.length - 1, i0 + 1);
      return palette[i0].clone().lerp(palette[i1], idx - i0);
    }

    // ---------- TEXTURES ----------
    function makeGlowTexture() {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0.0, "rgba(255,255,255,1)");
      grad.addColorStop(0.18, "rgba(255,255,255,1)");
      grad.addColorStop(0.45, "rgba(255,255,255,0.92)");
      grad.addColorStop(0.75, "rgba(255,255,255,0.55)");
      grad.addColorStop(1.0, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    }
    function makeBloomTexture() {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0.0, "rgba(255,255,255,0.9)");
      grad.addColorStop(0.25, "rgba(255,255,255,0.45)");
      grad.addColorStop(0.55, "rgba(255,255,255,0.16)");
      grad.addColorStop(1.0, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    }
    const glowTex = makeGlowTexture();
    const bloomTex = makeBloomTexture();

    const lightDir = new THREE.Vector3(0.6, 0.45, 0.66).normalize();

    // ---------- SHADERS ----------
    const planetVertexShader = `
      attribute float size;
      attribute vec3 color;
      attribute vec3 normalDir;
      attribute float twinkle;
      attribute float detail;
      varying vec3 vColor;
      varying vec3 vNormalDir;
      varying vec3 vViewPos;
      varying vec3 vWorldPos;
      varying float vDetail;
      varying float vTwinkle;
      uniform float uTime;
      void main() {
        vColor = color;
        vNormalDir = normalize(normalMatrix * normalDir);
        vDetail = detail;
        vTwinkle = twinkle;
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPos = mvPosition.xyz;
        float shimmer = 0.9 + 0.1 * sin(uTime * 1.6 + twinkle * 6.2831);
        gl_PointSize = size * shimmer * (340.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const planetFragmentShader = `
      uniform sampler2D pointTexture;
      uniform vec3 uLightDir;
      uniform vec3 uLightDirWorld;
      uniform vec3 uViewDir;
      uniform float uRingInner;
      uniform float uRingOuter;
      varying vec3 vColor;
      varying vec3 vNormalDir;
      varying vec3 vViewPos;
      varying vec3 vWorldPos;
      varying float vDetail;
      varying float vTwinkle;
      void main() {
        float spriteAlpha = texture2D(pointTexture, gl_PointCoord).a;
        if (spriteAlpha < 0.06) discard;
        vec3 N = normalize(vNormalDir);
        vec3 L = normalize(uLightDir);
        vec3 V = normalize(-vViewPos);
        float diffuse = max(dot(N, L), 0.0);
        float wrapped = diffuse * 0.82 + 0.18;
        vec3 H = normalize(L + V);
        float specAngle = max(dot(N, H), 0.0);
        float specular = pow(specAngle, 18.0) * 0.95;
        float fresnel = pow(1.0 - max(dot(N, V), 0.0), 1.8);
        vec3 Lw = normalize(uLightDirWorld);
        float ringShadow = 0.0;
        if (abs(Lw.y) > 0.001) {
          float tParam = -vWorldPos.y / Lw.y;
          if (tParam > 0.0) {
            vec3 hit = vWorldPos + Lw * tParam;
            float r = length(hit.xz);
            if (r > uRingInner && r < uRingOuter) {
              float edgeFade = smoothstep(uRingInner, uRingInner + 0.15, r)
                              * (1.0 - smoothstep(uRingOuter - 0.15, uRingOuter, r));
              ringShadow = edgeFade * 0.72;
            }
          }
        }
        vec3 shadowTone = vec3(0.62, 0.24, 0.38);
        float litAmount = clamp(wrapped + vDetail * 0.06, 0.0, 1.0);
        litAmount *= (1.0 - ringShadow);
        vec3 base = mix(shadowTone, vColor, litAmount);
        vec3 finalColor = base + specular * (1.0 - ringShadow) * vec3(1.0, 0.96, 0.88) * 1.3
                                + fresnel * vec3(1.0, 0.72, 0.6) * 0.55;
        float shimmerAlpha = 0.82 + 0.18 * sin(vTwinkle * 6.2831);
        float alpha = spriteAlpha * mix(0.55, 1.0, wrapped) * shimmerAlpha;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const planetMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: glowTex },
        uTime: { value: 0 },
        uLightDir: { value: new THREE.Vector3() },
        uLightDirWorld: { value: lightDir.clone() },
        uViewDir: { value: new THREE.Vector3(0, 0, 1) },
        uRingInner: { value: 2.55 },
        uRingOuter: { value: 4.75 },
      },
      vertexShader: planetVertexShader,
      fragmentShader: planetFragmentShader,
      transparent: true,
      depthWrite: true,
      depthTest: true,
      blending: THREE.NormalBlending,
    });

    function fbm(x, y, z) {
      let v = 0,
        amp = 0.5,
        freq = 1.0;
      for (let o = 0; o < 4; o++) {
        v +=
          amp *
          Math.sin(x * freq * 3.1 + Math.cos(y * freq * 2.3)) *
          Math.cos(z * freq * 2.7 + Math.sin(x * freq * 1.7));
        freq *= 2.05;
        amp *= 0.55;
      }
      return v;
    }

    function buildPlanet() {
      const count = QUALITY.planetCount;
      const radius = 2;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const normalDirs = new Float32Array(count * 3);
      const twinkles = new Float32Array(count);
      const details = new Float32Array(count);
      const golden = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = golden * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        const jitter = 0.01;
        const nx = x + (Math.random() - 0.5) * jitter;
        const ny = y + (Math.random() - 0.5) * jitter;
        const nz = z + (Math.random() - 0.5) * jitter;
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
        const fx = nx / len,
          fy = ny / len,
          fz = nz / len;

        positions[i * 3] = fx * radius;
        positions[i * 3 + 1] = fy * radius;
        positions[i * 3 + 2] = fz * radius;

        normalDirs[i * 3] = fx;
        normalDirs[i * 3 + 1] = fy;
        normalDirs[i * 3 + 2] = fz;

        const latNorm = (fy + 1) / 2;
        const flow = fbm(fx * 2.2, fy * 6.0, fz * 2.2) * 0.09;
        const microTurb = Math.sin(theta * 9.0 + fy * 55.0) * 0.025;
        const bandT = Math.min(1, Math.max(0, latNorm + flow + microTurb));
        const c = paletteAt(bandT);

        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        details[i] = fbm(fx * 8.0, fy * 8.0, fz * 8.0) * 0.5 + (Math.random() - 0.5) * 0.15;
        sizes[i] = 0.05 + Math.random() * 0.04;
        twinkles[i] = Math.random();
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geom.setAttribute("normalDir", new THREE.BufferAttribute(normalDirs, 3));
      geom.setAttribute("twinkle", new THREE.BufferAttribute(twinkles, 1));
      geom.setAttribute("detail", new THREE.BufferAttribute(details, 1));

      return new THREE.Points(geom, planetMaterial);
    }
    const saturn = buildPlanet();

    const planetBloomVertexShader = `
      attribute float size;
      attribute vec3 color;
      attribute vec3 normalDir;
      attribute float twinkle;
      varying vec3 vColor;
      varying vec3 vNormalDir;
      varying vec3 vViewPos;
      uniform float uTime;
      void main() {
        vColor = color;
        vNormalDir = normalize(normalMatrix * normalDir);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPos = mvPosition.xyz;
        float shimmer = 0.9 + 0.1 * sin(uTime * 1.6 + twinkle * 6.2831);
        gl_PointSize = size * shimmer * (340.0 / -mvPosition.z) * 2.3;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const planetBloomFragmentShader = `
      uniform sampler2D pointTexture;
      uniform vec3 uLightDir;
      varying vec3 vColor;
      varying vec3 vNormalDir;
      varying vec3 vViewPos;
      void main() {
        float spriteAlpha = texture2D(pointTexture, gl_PointCoord).a;
        if (spriteAlpha < 0.03) discard;
        vec3 N = normalize(vNormalDir);
        vec3 L = normalize(uLightDir);
        float diffuse = max(dot(N, L), 0.0);
        float glowAmount = pow(diffuse, 1.4);
        vec3 glowColor = mix(vColor, vec3(1.0, 0.94, 0.85), 0.5);
        float alpha = spriteAlpha * glowAmount * 0.16;
        gl_FragColor = vec4(glowColor, alpha);
      }
    `;
    const planetBloomMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: bloomTex },
        uTime: { value: 0 },
        uLightDir: { value: new THREE.Vector3() },
      },
      vertexShader: planetBloomVertexShader,
      fragmentShader: planetBloomFragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    });
    const saturnBloom = new THREE.Points(saturn.geometry, planetBloomMaterial);

    const ringVertexShader = `
      attribute float size;
      attribute vec3 color;
      attribute float shade;
      attribute float twinkle;
      varying vec3 vColor;
      varying float vShade;
      varying float vTwinkle;
      uniform float uTime;
      void main() {
        vColor = color;
        vShade = shade;
        vTwinkle = twinkle;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float shimmer = 0.88 + 0.12 * sin(uTime * 1.8 + twinkle * 6.2831);
        gl_PointSize = size * shimmer * (320.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const ringFragmentShader = `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      varying float vShade;
      varying float vTwinkle;
      void main() {
        float alpha = texture2D(pointTexture, gl_PointCoord).a;
        if (alpha < 0.06) discard;
        vec3 shadowTone = vec3(0.7, 0.35, 0.45);
        vec3 lit = mix(shadowTone, vColor, 0.4 + 0.6 * vShade);
        lit += vShade * vec3(0.08, 0.05, 0.04);
        float shimmer = 0.85 + 0.15 * sin(vTwinkle * 6.2831);
        gl_FragColor = vec4(lit, alpha * (0.65 + 0.45 * vShade) * shimmer);
      }
    `;
    const ringMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: glowTex },
        uTime: { value: 0 },
      },
      vertexShader: ringVertexShader,
      fragmentShader: ringFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const RING_INNER = 2.55,
      RING_OUTER = 4.75;

    function buildRings() {
      const count = QUALITY.ringCount;
      const innerR = RING_INNER,
        outerR = RING_OUTER;

      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const shades = new Float32Array(count);
      const twinkles = new Float32Array(count);

      let written = 0,
        attempts = 0;
      const maxAttempts = count * 8;

      while (written < count && attempts < maxAttempts) {
        attempts++;
        const t = Math.random();
        const radius = innerR + t * (outerR - innerR);

        let density = 0.62 + 0.38 * Math.sin(t * 34.0);
        density *= 0.55 + 0.45 * Math.sin(t * 11.0 + 0.6);

        const gap1 = Math.exp(-Math.pow((t - 0.42) * 70, 2)) * 0.92;
        const gap2 = Math.exp(-Math.pow((t - 0.74) * 95, 2)) * 0.75;
        const gap3 = Math.exp(-Math.pow((t - 0.15) * 110, 2)) * 0.45;
        density -= gap1 + gap2 + gap3;

        const edgeFade = Math.min(1, t * 18) * Math.min(1, (1 - t) * 11);
        density *= edgeFade;
        density = Math.max(0, Math.min(1, density));
        if (Math.random() > density) continue;

        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 0.035;

        positions[written * 3] = x;
        positions[written * 3 + 1] = y;
        positions[written * 3 + 2] = z;

        const c = paletteAt(0.1 + t * 0.55);
        colors[written * 3] = c.r;
        colors[written * 3 + 1] = c.g;
        colors[written * 3 + 2] = c.b;

        const facing = (x * lightDir.x + z * lightDir.z) / radius;
        let s = 0.5 + facing * 0.5;
        shades[written] = Math.max(0.15, Math.min(1, s));

        sizes[written] = 0.03 + Math.random() * 0.026;
        twinkles[written] = Math.random();
        written++;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions.subarray(0, written * 3), 3));
      geom.setAttribute("color", new THREE.BufferAttribute(colors.subarray(0, written * 3), 3));
      geom.setAttribute("size", new THREE.BufferAttribute(sizes.subarray(0, written), 1));
      geom.setAttribute("shade", new THREE.BufferAttribute(shades.subarray(0, written), 1));
      geom.setAttribute("twinkle", new THREE.BufferAttribute(twinkles.subarray(0, written), 1));

      return new THREE.Points(geom, ringMaterial);
    }
    const rings = buildRings();
    rings.rotation.x = Math.PI / 2 - 0.42;

    const ringBloomVertexShader = `
      attribute float size;
      attribute vec3 color;
      attribute float shade;
      attribute float twinkle;
      varying vec3 vColor;
      varying float vShade;
      uniform float uTime;
      void main() {
        vColor = color;
        vShade = shade;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float shimmer = 0.88 + 0.12 * sin(uTime * 1.8 + twinkle * 6.2831);
        gl_PointSize = size * shimmer * (320.0 / -mvPosition.z) * 2.1;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const ringBloomFragmentShader = `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      varying float vShade;
      void main() {
        float alpha = texture2D(pointTexture, gl_PointCoord).a;
        if (alpha < 0.03) discard;
        vec3 glowColor = mix(vColor, vec3(1.0, 0.92, 0.82), 0.45);
        float glowAmount = pow(vShade, 1.6);
        gl_FragColor = vec4(glowColor, alpha * glowAmount * 0.14);
      }
    `;
    const ringBloomMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: bloomTex },
        uTime: { value: 0 },
      },
      vertexShader: ringBloomVertexShader,
      fragmentShader: ringBloomFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ringsBloom = new THREE.Points(rings.geometry, ringBloomMaterial);

    const system = new THREE.Group();
    system.add(saturn, saturnBloom, rings, ringsBloom);
    system.rotation.z = 0.45;
    scene.add(system);

    function buildHalo() {
      const count = QUALITY.haloCount;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 2.0 + Math.random() * 0.12;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const facing = (x * lightDir.x + y * lightDir.y + z * lightDir.z) / r;
        const c = paletteAt(0.3 + Math.max(0, facing) * 0.4);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        sizes[i] = 0.03 + Math.random() * 0.035;
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.PointsMaterial({
        size: 0.05,
        map: bloomTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(geom, mat);
    }
    const halo = buildHalo();
    system.add(halo);

    // ---------- SCROLL / MOUSE ----------
    let scrollProgress = 0;
    let smoothScroll = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    function readScrollProgress() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const raw = window.scrollY / maxScroll;
      scrollVelocity = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      return Math.min(1, Math.max(0, raw));
    }
    const handleScroll = () => {
      scrollProgress = readScrollProgress();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let mouseX = 0,
      mouseY = 0;
    let smoothMouseX = 0,
      smoothMouseY = 0;
    const supportsHover = window.matchMedia("(hover: hover)").matches;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (supportsHover) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // ---------- ENTRANCE ----------
    const ENTRANCE_DURATION = 1.4;
    let entranceStart = null;
    system.scale.setScalar(0.001);

    function easeOutBack(x) {
      const c1 = 1.4,
        c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    let isPageVisible = true;
    const handleVisibility = () => {
      isPageVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const BASE_PLANET_SPIN = 0.18;
    const BASE_RING_SPIN = 0.055;
    const BASE_HALO_SPIN = 0.18;

    const CAMERA_DOLLY = 2.4;
    const SYSTEM_SCALE_BOOST = 0.35;

    const systemInverseQuat = new THREE.Quaternion();
    const worldLightDir = lightDir.clone();

    function updateLightUniforms() {
      const viewLightDir = lightDir.clone().transformDirection(camera.matrixWorldInverse);
      planetMaterial.uniforms.uLightDir.value.copy(viewLightDir);

      systemInverseQuat.copy(system.quaternion).invert();
      const localLightDir = worldLightDir.clone().applyQuaternion(systemInverseQuat);
      planetMaterial.uniforms.uLightDirWorld.value.copy(localLightDir);
    }

    const clock = new THREE.Clock();
    const baseCameraZ = camera.position.z;
    const baseRingTiltX = rings.rotation.x;
    const baseSystemRotZ = system.rotation.z;

    let rafId;

    function animate() {
      rafId = requestAnimationFrame(animate);
      if (!isPageVisible) return;

      const delta = Math.min(0.05, clock.getDelta());
      const t = clock.getElapsedTime();

      if (entranceStart === null) entranceStart = t;
      const entranceT = Math.min(1, (t - entranceStart) / ENTRANCE_DURATION);
      const entranceScale = entranceT < 1 ? easeOutBack(entranceT) : 1;

      smoothScroll += (scrollProgress - smoothScroll) * Math.min(1, delta * 4);
      smoothMouseX += (mouseX - smoothMouseX) * Math.min(1, delta * 3);
      smoothMouseY += (mouseY - smoothMouseY) * Math.min(1, delta * 3);

      const scrollScale = 1 + smoothScroll * SYSTEM_SCALE_BOOST;
      system.scale.setScalar(Math.max(0.001, entranceScale * scrollScale));

      const scrollKick = Math.min(0.4, Math.abs(scrollVelocity) * 0.01);
      scrollVelocity *= 0.85;

      planetMaterial.uniforms.uTime.value = t;
      ringMaterial.uniforms.uTime.value = t;
      planetBloomMaterial.uniforms.uTime.value = t;
      ringBloomMaterial.uniforms.uTime.value = t;

      saturn.rotation.y += (BASE_PLANET_SPIN + scrollKick) * delta;
      rings.rotation.z += (BASE_RING_SPIN + scrollKick * 0.3) * delta;
      halo.rotation.y += (BASE_HALO_SPIN + scrollKick) * delta;

      camera.position.z = baseCameraZ - smoothScroll * CAMERA_DOLLY;
      rings.rotation.x = baseRingTiltX - smoothScroll * 0.18;

      system.rotation.x = smoothScroll * 0.12 + smoothMouseY * 0.14;
      system.rotation.z = baseSystemRotZ + smoothMouseX * 0.08;

      camera.position.x = Math.sin(t * 0.12) * 0.8 + smoothMouseX * 0.5;
      camera.position.y = 1.6 + Math.sin(t * 0.08) * 0.2 - smoothMouseY * 0.3;
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();

      saturnBloom.rotation.y = saturn.rotation.y;
      ringsBloom.rotation.z = rings.rotation.z;
      ringsBloom.rotation.x = rings.rotation.x;

      updateLightUniforms();
      planetBloomMaterial.uniforms.uLightDir.value.copy(planetMaterial.uniforms.uLightDir.value);

      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(animate);

    // ---------- RESIZE ----------
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // ---------- CLEANUP ----------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (supportsHover) window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);

      saturn.geometry.dispose();
      rings.geometry.dispose();
      halo.geometry.dispose();
      planetMaterial.dispose();
      planetBloomMaterial.dispose();
      ringMaterial.dispose();
      ringBloomMaterial.dispose();
      halo.material.dispose();
      glowTex.dispose();
      bloomTex.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}