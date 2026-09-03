"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/* ============================================================
   BACKGROUND
   (Upgraded: richer pink/magenta sunset-sky with layered glow,
   soft nebula clouds, warm horizon light and gentle grain.)
============================================================ */

function createSkyBackgroundTexture() {
  const canvas = document.createElement("canvas");

  canvas.width = 1024;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;

  /* --------------------------------------------------------
     BASE SKY GRADIENT
     Deep magenta-violet top -> hot pink middle -> warm rose
     horizon glow at the bottom. Much more saturated/attractive
     than the old pale pastel version.
  -------------------------------------------------------- */
  const gradient = ctx.createLinearGradient(0, 0, 0, h);

  gradient.addColorStop(0, "#070313");   // deep plum/violet (top of sky)
  gradient.addColorStop(0.18, "#18082b");
  gradient.addColorStop(0.36, "#3b0d55");
  gradient.addColorStop(0.55, "#82145f");
  gradient.addColorStop(0.72, "#d62a78"); // vivid hot pink band
  gradient.addColorStop(0.86, "#f35b9b");
  gradient.addColorStop(1, "#ffb0cf");   // soft glowing rose horizon

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  /* --------------------------------------------------------
     SOFT NEBULA CLOUDS
     Larger, more colorful, more layered than before for a
     dreamy "cosmic sunset" feel.
  -------------------------------------------------------- */
  const nebulae = [
    { x: 0.2, y: 0.22, r: 0.5, color: "rgba(255,255,255,0.28)" },
    { x: 0.8, y: 0.15, r: 0.42, color: "rgba(255,120,190,0.35)" },
    { x: 0.55, y: 0.4, r: 0.55, color: "rgba(255,80,170,0.30)" },
    { x: 0.32, y: 0.62, r: 0.48, color: "rgba(255,190,220,0.25)" },
    { x: 0.72, y: 0.58, r: 0.4, color: "rgba(200,50,140,0.28)" },
    { x: 0.5, y: 0.85, r: 0.55, color: "rgba(255,150,190,0.30)" },
  ];

  nebulae.forEach((n) => {
    const g = ctx.createRadialGradient(
      w * n.x,
      h * n.y,
      0,
      w * n.x,
      h * n.y,
      w * n.r
    );

    g.addColorStop(0, n.color);
    g.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  /* --------------------------------------------------------
     WARM HORIZON GLOW
     A brighter, wider "sun-kissed" glow near the bottom to
     give the scene a strong focal point.
  -------------------------------------------------------- */
  const glow = ctx.createRadialGradient(
    w / 2,
    h * 0.96,
    0,
    w / 2,
    h * 0.96,
    w * 0.95
  );

  glow.addColorStop(0, "rgba(255,235,245,0.75)");
  glow.addColorStop(0.35, "rgba(255,160,205,0.45)");
  glow.addColorStop(0.7, "rgba(255,100,175,0.22)");
  glow.addColorStop(1, "rgba(255,100,175,0)");

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  /* A secondary, cooler accent glow up top-right for contrast */
  const topGlow = ctx.createRadialGradient(
    w * 0.82,
    h * 0.08,
    0,
    w * 0.82,
    h * 0.08,
    w * 0.4
  );

  topGlow.addColorStop(0, "rgba(255,255,255,0.35)");
  topGlow.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, w, h);

  /* --------------------------------------------------------
     FINE GRAIN / SPARKLE DUST
  -------------------------------------------------------- */
  for (let i = 0; i < 3000; i++) {
    const gx = Math.random() * w;
    const gy = Math.random() * h;

    const r = Math.random() * 1.1 + 0.2;

    const isLight = Math.random() > 0.5;

    ctx.fillStyle = isLight
      ? `rgba(255,255,255,${(Math.random() * 0.06).toFixed(3)})`
      : `rgba(120,20,70,${(Math.random() * 0.06).toFixed(3)})`;

    ctx.beginPath();
    ctx.arc(gx, gy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /* --------------------------------------------------------
     VIGNETTE
     Slightly stronger, warmer edges to focus attention on
     the center of the scene.
  -------------------------------------------------------- */
  const vignette = ctx.createRadialGradient(
    w / 2,
    h / 2,
    w * 0.22,
    w / 2,
    h / 2,
    w * 0.78
  );

  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(50,5,35,0.32)");

  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  const texture = new THREE.CanvasTexture(canvas);

  if (THREE.SRGBColorSpace) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  return texture;
}

/* ============================================================
   PARTICLES
============================================================ */

function createTwinkleField(
  count,
  radius,
  color,
  minSize,
  maxSize
) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const r = radius * (0.6 + Math.random() * 0.4);

    const theta = Math.random() * Math.PI * 2;

    const phi = Math.acos(
      THREE.MathUtils.randFloatSpread(2)
    );

    positions[i * 3] =
      r *
      Math.sin(phi) *
      Math.cos(theta);

    positions[i * 3 + 1] =
      Math.abs(r * Math.cos(phi)) * 0.6 + 10;

    positions[i * 3 + 2] =
      r *
      Math.sin(phi) *
      Math.sin(theta);

    sizes[i] = THREE.MathUtils.lerp(
      minSize,
      maxSize,
      Math.random()
    );

    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  geometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(sizes, 1)
  );

  geometry.setAttribute(
    "aPhase",
    new THREE.BufferAttribute(phases, 1)
  );

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: {
        value: 0,
      },
      uColor: {
        value: color,
      },
    },

    vertexShader: `
      attribute float aSize;
      attribute float aPhase;

      uniform float uTime;

      varying float vTwinkle;

      void main() {

        vTwinkle =
          0.5 +
          0.5 *
          sin(
            uTime * 1.6 +
            aPhase
          );

        vec4 mvPosition =
          modelViewMatrix *
          vec4(position, 1.0);

        gl_PointSize =
          aSize *
          (300.0 / -mvPosition.z);

        gl_Position =
          projectionMatrix *
          mvPosition;
      }
    `,

    fragmentShader: `
      uniform vec3 uColor;

      varying float vTwinkle;

      void main() {

        float d =
          length(
            gl_PointCoord -
            vec2(0.5)
          );

        float alpha =
          smoothstep(
            0.5,
            0.0,
            d
          ) *
          (
            0.35 +
            0.65 *
            vTwinkle
          );

        gl_FragColor =
          vec4(
            uColor,
            alpha
          );
      }
    `,

    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(
    geometry,
    material
  );
}

function createStarTrailField(count = 180, spread = 55) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = THREE.MathUtils.randFloatSpread(spread);
    positions[i * 3 + 1] = 8 + Math.random() * 34;
    positions[i * 3 + 2] = -Math.random() * 260;
    sizes[i] = THREE.MathUtils.lerp(0.5, 1.8, Math.random());
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        float pulse = 0.65 + 0.35 * sin(uTime * 1.4 + aPhase);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * pulse * (340.0 / -mv.z);
        vAlpha = pulse;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.65;
        gl_FragColor = vec4(1.0, 0.78, 0.92, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

/* ============================================================
   COMPONENT
============================================================ */

export default function Fly() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) return;

    /* ========================================================
       SCENE
    ======================================================== */

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setClearColor(
      0x05070d,
      1
    );

    /* ========================================================
       BACKGROUND
    ======================================================== */

    const skyTexture =
      createSkyBackgroundTexture();

    if (skyTexture) {
      scene.background = skyTexture;
    }

    const starField =
      createTwinkleField(
        1400,
        150,
        new THREE.Color(0xffd9ec),
        0.9,
        2.4
      );

    scene.add(starField);

    const dustField =
      createTwinkleField(
        340,
        75,
        new THREE.Color(0xff6fa8),
        1.6,
        3.8
      );

    scene.add(dustField);

    const upperStarField = createTwinkleField(1100, 260, new THREE.Color(0xffffff), 0.45, 1.8);
    upperStarField.position.y = 18;
    scene.add(upperStarField);

    const starTrailField = createStarTrailField(220, 65);
    scene.add(starTrailField);

    /* ========================================================
       LIGHTS
    ======================================================== */

    scene.add(
      new THREE.HemisphereLight(
        0x9fb0ff,
        0x111322,
        1.35
      )
    );

    const rim =
      new THREE.DirectionalLight(
        0xffc18f,
        1.65
      );

    rim.position.set(
      -6,
      8,
      -4
    );

    scene.add(rim);

    const key =
      new THREE.DirectionalLight(
        0xffffff,
        1.15
      );

    key.position.set(
      5,
      10,
      6
    );

    scene.add(key);

    const planeGlow =
      new THREE.PointLight(
        0xffd400,
        2.2,
        16,
        2
      );

    scene.add(planeGlow);

    /* ========================================================
       FLIGHT PATH
    ======================================================== */

    const waypoints = [];

    const TOTAL_WP = 72;

    /*
      Path depth.
      Keeping this value means the complete route
      remains exactly the same.
    */
    const Z_STEP = -5.4;

    for (let i = 0; i < TOTAL_WP; i++) {
      const u =
        i / (TOTAL_WP - 1);

      const z =
        i * Z_STEP;

      const envelope =
        Math.sin(Math.PI * u);

      const x =
        envelope *
        (
          Math.sin(
            u * Math.PI * 3.2 + 0.15
          ) * 7.2 +

          Math.sin(
            u * Math.PI * 1.65 + 0.75
          ) * 2.7 +

          Math.sin(
            u * Math.PI * 0.72
          ) * 1.2
        );

      waypoints.push(
        new THREE.Vector3(
          x,
          0,
          z
        )
      );
    }

    waypoints[0].x = 0;
    waypoints[TOTAL_WP - 1].x = 0;

    const curve =
      new THREE.CatmullRomCurve3(
        waypoints,
        false,
        "centripetal",
        0.5
      );

    curve.arcLengthDivisions = 1400;

    const CURVE_LENGTH =
      curve.getLength();

    /* ========================================================
       FLIGHT LINE
    ======================================================== */

    const TUBULAR_SEGMENTS = 700;
    const RADIAL_SEGMENTS = 8;

    const lineGeo =
      new THREE.TubeGeometry(
        curve,
        TUBULAR_SEGMENTS,
        0.05,
        RADIAL_SEGMENTS,
        false
      );

    const RING_COUNT =
      TUBULAR_SEGMENTS + 1;

    const VERTS_PER_RING =
      RADIAL_SEGMENTS + 1;

    const lineColorArray =
      new Float32Array(
        RING_COUNT *
        VERTS_PER_RING *
        3
      );

    const lineColorAttr =
      new THREE.BufferAttribute(
        lineColorArray,
        3
      );

    lineGeo.setAttribute(
      "color",
      lineColorAttr
    );

    /*
      NOTE: path starts fully invisible.
      It is faded in (opacity 0 -> 1) only
      once the user starts scrolling.
      See `revealAlpha` inside animate().
    */
    const lineCore =
      new THREE.Mesh(
        lineGeo,
        new THREE.MeshBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        })
      );

    lineCore.position.y = -0.55;
    lineCore.visible = false;

    scene.add(lineCore);

    const LINE_COLOR_AHEAD =
      new THREE.Color(0xffd400);

    const LINE_COLOR_PASSED =
      new THREE.Color(0xff2e93);

    function updateLineProgressColor(currentT) {
      const arr =
        lineColorAttr.array;

      const safeT =
        THREE.MathUtils.clamp(
          currentT,
          0,
          1
        );

      for (
        let ring = 0;
        ring < RING_COUNT;
        ring++
      ) {
        const u =
          ring / TUBULAR_SEGMENTS;

        const color =
          u <= safeT
            ? LINE_COLOR_PASSED
            : LINE_COLOR_AHEAD;

        const base =
          ring *
          VERTS_PER_RING *
          3;

        for (
          let k = 0;
          k < VERTS_PER_RING;
          k++
        ) {
          const idx =
            base + k * 3;

          arr[idx] = color.r;
          arr[idx + 1] = color.g;
          arr[idx + 2] = color.b;
        }
      }

      lineColorAttr.needsUpdate = true;
    }

    updateLineProgressColor(0);

    /* ========================================================
       HELICOPTER
    ======================================================== */

    const plane =
      new THREE.Group();

    scene.add(plane);

    const HELICOPTER_MODEL_URL =
      "/images/low_poly_helicopter.glb";

    const HELICOPTER_MODEL_SCALE =
      0.1;

    const HELICOPTER_YAW_OFFSET =
      Math.PI / 2;

    const HELICOPTER_LINE_LIFT =
      -0.4;

    const IDLE_ROTOR_TIME_SCALE =
      0.10;

    const MAX_ROTOR_TIME_SCALE =
      0.72;

    const ROTOR_RESPONSE =
      4.5;

    const gltfLoader =
      new GLTFLoader();

    let jetMixer = null;

    gltfLoader.load(
      HELICOPTER_MODEL_URL,

      (gltf) => {
        const model = gltf.scene;

        model.scale.setScalar(
          HELICOPTER_MODEL_SCALE
        );

        model.updateMatrixWorld(true);

        model.rotation.y =
          HELICOPTER_YAW_OFFSET;

        model.updateMatrixWorld(true);

        const box =
          new THREE.Box3().setFromObject(
            model
          );

        const center =
          box.getCenter(
            new THREE.Vector3()
          );

        model.position.x -=
          center.x;

        model.position.z -=
          center.z;

        model.updateMatrixWorld(true);

        const centeredBox =
          new THREE.Box3().setFromObject(
            model
          );

        model.position.y -=
          centeredBox.min.y;

        model.position.y +=
          HELICOPTER_LINE_LIFT;

        const bakedLights = [];

        model.traverse((child) => {
          if (child.isLight) {
            bakedLights.push(child);
          }
        });

        bakedLights.forEach((light) => {
          if (light.parent) {
            light.parent.remove(light);
          }
        });

        model.traverse((child) => {
          if (
            !child.isMesh ||
            !child.material
          ) {
            return;
          }

          const materials =
            Array.isArray(child.material)
              ? child.material
              : [child.material];

          materials.forEach((material) => {
            if (
              material.roughness !==
              undefined
            ) {
              material.roughness =
                Math.max(
                  material.roughness,
                  0.68
                );
            }

            if (
              material.isGLTFSpecularGlossinessMaterial &&
              material.glossiness !==
                undefined
            ) {
              material.glossiness =
                Math.min(
                  material.glossiness,
                  0.32
                );
            }

            material.needsUpdate = true;
          });
        });

        plane.add(model);

        if (
          gltf.animations &&
          gltf.animations.length
        ) {
          jetMixer =
            new THREE.AnimationMixer(
              model
            );

          gltf.animations.forEach(
            (clip) => {
              jetMixer
                .clipAction(clip)
                .play();
            }
          );

          jetMixer.timeScale =
            IDLE_ROTOR_TIME_SCALE;
        } else {
          let prop = null;

          model.traverse((child) => {
            if (
              !prop &&
              /prop|rotor|blade|fan/i.test(
                child.name
              )
            ) {
              prop = child;
            }
          });

          if (prop) {
            plane.userData.prop = prop;
          }
        }
      },

      undefined,

      (error) => {
        console.error(
          "Low-poly helicopter failed to load:",
          error
        );
      }
    );

    /* ========================================================
       WAYPOINT DATA
    ======================================================== */

    const waypointData = [
      {
        t: 0.09,
        year: "2015",
        eyebrow: "Foundation",
        title: "Inception of the Void",
        desc:
          "Lumière Pictures is established with a singular manifesto: content is disposable. Architecture stands.",
        meta: ["ALT 420ft", "HDG 032°"],
      },

      {
        t: 0.24,
        year: "2017",
        eyebrow: "Expansion",
        title: "Crosswind",
        desc:
          "Each card marks a point along the same curve the plane flies.",
        meta: ["ALT 610ft", "HDG 118°"],
      },

      {
        t: 0.40,
        year: "2019",
        eyebrow: "Reframe",
        title: "Cloud Break",
        desc:
          "This is where the old cloud models used to sit — now a card.",
        meta: ["ALT 780ft", "HDG 205°"],
      },

      {
        t: 0.56,
        year: "2021",
        eyebrow: "Night Run",
        title: "After Dark",
        desc:
          "Cards fade in and out as the camera approaches and passes.",
        meta: ["ALT 690ft", "HDG 291°"],
      },

      {
        t: 0.72,
        year: "2023",
        eyebrow: "Long Haul",
        title: "New Coordinates",
        desc:
          "Swap eyebrow / title / desc / meta with real content freely.",
        meta: ["ALT 540ft", "HDG 344°"],
      },

      {
        t: 0.88,
        year: "2025",
        eyebrow: "Approach",
        title: "The Next Frame",
        desc:
          "Final stretch before the route ends at the last waypoint.",
        meta: ["ALT 310ft", "HDG 060°"],
      },
    ];

    const CARD_THEMES = [
      {
        accent: "#ff2e93",
        corner: "tl",
        ring: "rgba(255,46,147,0.55)",
      },
      {
        accent: "#ffd400",
        corner: "tr",
        ring: "rgba(255,212,0,0.55)",
      },
      {
        accent: "#37e6c1",
        corner: "tl",
        ring: "rgba(55,230,193,0.50)",
      },
      {
        accent: "#ff2e93",
        corner: "tr",
        ring: "rgba(255,46,147,0.55)",
      },
      {
        accent: "#ffd400",
        corner: "tl",
        ring: "rgba(255,212,0,0.55)",
      },
      {
        accent: "#37e6c1",
        corner: "tr",
        ring: "rgba(55,230,193,0.50)",
      },
    ];

    /* ========================================================
       CARD HELPERS
    ======================================================== */

    function roundRectPath(
      ctx,
      x,
      y,
      w,
      h,
      r
    ) {
      ctx.beginPath();

      ctx.moveTo(x + r, y);

      ctx.arcTo(
        x + w,
        y,
        x + w,
        y + h,
        r
      );

      ctx.arcTo(
        x + w,
        y + h,
        x,
        y + h,
        r
      );

      ctx.arcTo(
        x,
        y + h,
        x,
        y,
        r
      );

      ctx.arcTo(
        x,
        y,
        x + w,
        y,
        r
      );

      ctx.closePath();
    }

    function wrapCanvasText(
      ctx,
      text,
      x,
      y,
      maxWidth,
      lineHeight
    ) {
      const words = text.split(" ");

      let line = "";
      let yy = y;

      words.forEach((word, index) => {
        const test =
          line + word + " ";

        if (
          ctx.measureText(test).width >
            maxWidth &&
          index > 0
        ) {
          ctx.fillText(
            line,
            x,
            yy
          );

          line =
            word + " ";

          yy += lineHeight;
        } else {
          line = test;
        }
      });

      ctx.fillText(
        line,
        x,
        yy
      );
    }

    function makeCardTexture(
      data,
      index,
      total
    ) {
      const w = 1400;
      const h = 900;

      const cardCanvas =
        document.createElement(
          "canvas"
        );

      cardCanvas.width = w;
      cardCanvas.height = h;

      const ctx =
        cardCanvas.getContext("2d");

      if (!ctx) return null;

      const YELLOW = "#ffd400";

      const MUTED =
        "rgba(244,241,234,0.62)";

      const theme =
        CARD_THEMES[
          index % CARD_THEMES.length
        ];

      const PAD = 64;

      ctx.clearRect(
        0,
        0,
        w,
        h
      );

      ctx.save();

      roundRectPath(
        ctx,
        PAD * 0.4,
        PAD * 0.4,
        w - PAD * 0.8,
        h - PAD * 0.8,
        28
      );

      const panelGrad =
        ctx.createLinearGradient(
          0,
          0,
          0,
          h
        );

      panelGrad.addColorStop(
        0,
        "rgba(10,8,16,0.58)"
      );

      panelGrad.addColorStop(
        1,
        "rgba(6,5,10,0.72)"
      );

      ctx.fillStyle = panelGrad;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = theme.ring;
      ctx.stroke();

      ctx.restore();

      ctx.save();

      ctx.strokeStyle =
        theme.accent;

      ctx.lineWidth = 5;

      ctx.beginPath();

      if (theme.corner === "tl") {
        ctx.moveTo(
          PAD,
          PAD + 46
        );

        ctx.lineTo(
          PAD,
          PAD
        );

        ctx.lineTo(
          PAD + 46,
          PAD
        );
      } else {
        ctx.moveTo(
          w - PAD - 46,
          PAD
        );

        ctx.lineTo(
          w - PAD,
          PAD
        );

        ctx.lineTo(
          w - PAD,
          PAD + 46
        );
      }

      ctx.stroke();

      ctx.restore();

      ctx.save();

      ctx.textAlign = "right";

      ctx.font =
        '700 24px "JetBrains Mono", monospace';

      ctx.fillStyle =
        "rgba(244,241,234,0.5)";

      const idxLabel =
        String(index + 1).padStart(
          2,
          "0"
        ) +
        " / " +
        String(total).padStart(
          2,
          "0"
        );

      ctx.fillText(
        idxLabel,
        w - PAD,
        PAD + 26
      );

      ctx.textAlign = "left";

      ctx.restore();

      let y = PAD + 108;

      ctx.save();

      ctx.fillStyle =
        theme.accent;

      ctx.beginPath();

      ctx.arc(
        PAD + 7,
        y - 8,
        7,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.font =
        '700 26px "JetBrains Mono", monospace';

      ctx.fillStyle =
        theme.accent;

      ctx.fillText(
        (
          data.eyebrow ||
          ""
        ).toUpperCase(),
        PAD + 26,
        y
      );

      ctx.font =
        '700 26px "JetBrains Mono", monospace';

      ctx.fillStyle =
        "rgba(244,241,234,0.55)";

      const yearText =
        data.year || "";

      const yearWidth =
        ctx.measureText(
          yearText
        ).width;

      ctx.fillText(
        yearText,
        w - PAD - yearWidth,
        y
      );

      ctx.restore();

      y += 66;

      ctx.save();

      ctx.fillStyle = YELLOW;

      ctx.font =
        '900 68px "Archivo Black", sans-serif';

      const maxWidth =
        w - PAD * 2;

      const lineHeight = 74;

      const words =
        (
          data.title ||
          ""
        )
          .toUpperCase()
          .split(" ");

      let line = "";

      words.forEach(
        (word, wordIndex) => {
          const test =
            line +
            word +
            " ";

          if (
            ctx.measureText(
              test
            ).width >
              maxWidth &&
            wordIndex > 0
          ) {
            ctx.fillText(
              line.trim(),
              PAD,
              y
            );

            line =
              word + " ";

            y += lineHeight;
          } else {
            line = test;
          }
        }
      );

      ctx.fillText(
        line.trim(),
        PAD,
        y
      );

      ctx.restore();

      y += 44;

      ctx.save();

      ctx.strokeStyle =
        "rgba(244,241,234,0.18)";

      ctx.lineWidth = 1.5;

      ctx.beginPath();

      ctx.moveTo(
        PAD,
        y
      );

      ctx.lineTo(
        w - PAD,
        y
      );

      ctx.stroke();

      ctx.restore();

      y += 48;

      ctx.save();

      ctx.fillStyle = MUTED;

      ctx.font =
        '500 28px "JetBrains Mono", monospace';

      wrapCanvasText(
        ctx,
        data.desc || "",
        PAD,
        y,
        maxWidth,
        40
      );

      ctx.restore();

      ctx.save();

      ctx.font =
        '700 22px "JetBrains Mono", monospace';

      ctx.fillStyle =
        "rgba(255,212,0,0.85)";

      ctx.fillText(
        (
          data.meta &&
          data.meta[0]
        ) || "",
        PAD,
        h - PAD * 0.8
      );

      const rightText =
        (
          data.meta &&
          data.meta[1]
        ) || "";

      ctx.textAlign = "right";

      ctx.fillText(
        rightText,
        w - PAD,
        h - PAD * 0.8
      );

      ctx.restore();

      const texture =
        new THREE.CanvasTexture(
          cardCanvas
        );

      texture.anisotropy = 8;
      texture.needsUpdate = true;

      return texture;
    }

    /* ========================================================
       CARDS
    ======================================================== */

    const cardGroup =
      new THREE.Group();

    scene.add(cardGroup);

    const cardMeshes = [];

    const WORLD_UP =
      new THREE.Vector3(
        0,
        1,
        0
      );

    function curveDirectionAt(t) {
      const tA =
        Math.max(
          t - 0.015,
          0
        );

      const tB =
        Math.min(
          t + 0.015,
          0.999
        );

      const tanA =
        curve
          .getTangentAt(tA)
          .normalize();

      const tanB =
        curve
          .getTangentAt(tB)
          .normalize();

      return (
        tanB.x -
        tanA.x
      );
    }

    const CARD_SIDE_DISTANCE =
      5.8;

    const CARD_SIDE_ALTERNATE =
      1.1;

    function anchorForWaypoint(
      data,
      index
    ) {
      const p =
        curve.getPointAt(
          data.t
        );

      const tangent =
        curve
          .getTangentAt(
            data.t
          )
          .normalize();

      const right =
        new THREE.Vector3()
          .crossVectors(
            tangent,
            WORLD_UP
          )
          .normalize();

      const bendSide =
        curveDirectionAt(
          data.t
        ) > 0
          ? -1
          : 1;

      const altNudge =
        (
          index % 2 === 0
            ? 1
            : -1
        ) *
        CARD_SIDE_ALTERNATE;

      const lateral =
        bendSide *
          CARD_SIDE_DISTANCE +
        altNudge;

      return p
        .clone()
        .addScaledVector(
          right,
          lateral
        )
        .addScaledVector(
          WORLD_UP,
          0.75
        );
    }

    /*
      ============================================================
      CARD REVEAL WINDOW (proximity-based, per card)
      ============================================================

      Each card now tracks its own fade-in state instead of
      sharing the global `revealAlpha`. As the helicopter's
      path progress `t` approaches a card's own `data.t`,
      that card (and only that card) starts fading in.

      - CARD_FADE_START_T: how far ahead (in curve-progress
        units, 0..1) the fade-in begins before the helicopter
        actually reaches the card's waypoint.
      - Once the helicopter has passed a card's waypoint
        (t >= data.t), that card stays fully visible.
      - CARD_ALPHA_RESPONSE controls how snappy/smooth the
        per-card fade transition feels.
    */
    const CARD_FADE_START_T = 0.075;
    const CARD_ALPHA_RESPONSE = 8.5;

    // Card entrance animation
    const CARD_ENTER_DISTANCE = 1.35;
    const CARD_ENTER_RESPONSE = 7.5;

    function buildCardMeshes() {
      const total =
        waypointData.length;

      waypointData.forEach(
        (data, index) => {
          const texture =
            makeCardTexture(
              data,
              index,
              total
            );

          if (!texture) return;

          const geometry =
            new THREE.PlaneGeometry(
              5.6,
              3.6
            );

          /*
            NOTE: cards start fully invisible
            (opacity 0, visible = false).
            Each card fades in on its own, only
            once the helicopter approaches its
            specific waypoint — see the per-card
            reveal logic inside animate().
          */
          const material =
            new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              depthWrite: false,
              side: THREE.DoubleSide,
              opacity: 0,
            });

          const mesh =
            new THREE.Mesh(
              geometry,
              material
            );

          const anchor =
            anchorForWaypoint(
              data,
              index
            );

          mesh.position.copy(anchor);

          mesh.userData.basePos =
            anchor.clone();

          // Store this card's own waypoint t and
          // a running alpha value used for its
          // independent fade-in.
          mesh.userData.t = data.t;
          mesh.userData.alpha = 0;
          mesh.userData.enter = 0;

          mesh.rotation.set(
            0,
            0,
            0
          );

          mesh.scale.setScalar(1);

          mesh.visible = false;

          cardGroup.add(mesh);

          cardMeshes.push(mesh);
        }
      );
    }

    if (
      document.fonts &&
      document.fonts.ready
    ) {
      document.fonts.ready.then(
        buildCardMeshes
      );
    } else {
      buildCardMeshes();
    }

    /* ========================================================
       SCROLL CONTROL
    ======================================================== */

    let targetT = 0;
    let currentT = 0;

    let flightComplete = false;

    /*
      REVEAL SYSTEM (flight line only):
      The path stays hidden (opacity 0) until
      the user actually scrolls. Once targetT moves
      past REVEAL_THRESHOLD, revealAlpha smoothly
      eases 0 -> 1 and the line fades in.

      Cards no longer use this — see CARD_FADE_START_T
      above for their own independent, proximity-based
      reveal.
    */
    let revealAlpha = 0;

    const REVEAL_THRESHOLD = 0.0005;

    const REVEAL_RESPONSE = 5.5;

    /*
      OLD:
      0.000009

      This was WAY too slow.

      NEW:
      0.00032

      This gives proper movement with normal
      mouse-wheel input.
    */

    const SCROLL_SENSITIVITY =
      0.000055;

    /*
      Prevent one huge mouse-wheel event from
      instantly jumping the helicopter.
    */

    const MAX_WHEEL_DELTA = 120;

    /*
      Extra smoothing for targetT.
    */

    const TARGET_SMOOTHING = 0.18;

    const FLIGHT_COMPLETE_THRESHOLD =
      0.999;

    function releaseFlightLock() {
      if (flightComplete) return;

      flightComplete = true;

      targetT = 1;
      currentT = 1;

      section.classList.add(
        "fly-complete"
      );

      section.classList.remove(
        "fly-active"
      );
    }

    /*
      Normalize wheel delta.

      Different browsers/mice can send
      different delta values.
    */

    function normalizeWheelDelta(event) {
      let delta = event.deltaY;

      if (event.deltaMode === 1) {
        delta *= 16;
      }

      if (event.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      return THREE.MathUtils.clamp(
        delta,
        -MAX_WHEEL_DELTA,
        MAX_WHEEL_DELTA
      );
    }

    function handleWheel(event) {
      if (flightComplete) {
        return;
      }

      /*
        Stop the browser from moving the page
        while helicopter flight is active.
      */

      event.preventDefault();

      const delta =
        normalizeWheelDelta(event);

      /*
        Convert wheel movement into
        normalized flight progress.
      */

      const progress =
        delta *
        SCROLL_SENSITIVITY;

      targetT =
        THREE.MathUtils.clamp(
          targetT + progress,
          0,
          1
        );
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    /* ========================================================
       TOUCH CONTROL
    ======================================================== */

    let touchStartY = null;

    function handleTouchStart(event) {
      if (
        !event.touches ||
        !event.touches.length
      ) {
        return;
      }

      touchStartY =
        event.touches[0].clientY;
    }

    function handleTouchMove(event) {
      if (flightComplete) {
        touchStartY = null;
        return;
      }

      if (
        touchStartY === null ||
        !event.touches ||
        !event.touches.length
      ) {
        return;
      }

      const currentY =
        event.touches[0].clientY;

      const dy =
        THREE.MathUtils.clamp(
          touchStartY - currentY,
          -120,
          120
        );

      touchStartY = currentY;

      targetT =
        THREE.MathUtils.clamp(
          targetT +
            dy *
              SCROLL_SENSITIVITY *
              1.5,
          0,
          1
        );

      event.preventDefault();
    }

    function handleTouchEnd() {
      touchStartY = null;
    }

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: false,
      }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
      {
        passive: true,
      }
    );

    /* ========================================================
       ANIMATION
    ======================================================== */

    const clock =
      new THREE.Clock();

    const planeQuat =
      new THREE.Quaternion();

    const cameraQuat =
      new THREE.Quaternion();

    const cameraPos =
      new THREE.Vector3();

    const cameraLookTarget =
      new THREE.Vector3();

    let previousT = 0;
    let previousPathVelocity = 0;

    let rotorDrive =
      IDLE_ROTOR_TIME_SCALE;

    const CHASE_DISTANCE = 2.8;
    const CHASE_HEIGHT = 1;
    const CAMERA_LOOK_AHEAD = 3.2;

    const CAMERA_ROTATION_RESPONSE = 4.8;

    const tangentPrev =
      new THREE.Vector3();

    const tangentNext =
      new THREE.Vector3();

    const right =
      new THREE.Vector3();

    const flightUp =
      new THREE.Vector3();

    const planeRight =
      new THREE.Vector3();

    const planeUp =
      new THREE.Vector3();

    const basis =
      new THREE.Matrix4();

    const targetPlaneQuat =
      new THREE.Quaternion();

    const pitchQuat =
      new THREE.Quaternion();

    const cameraDirection =
      new THREE.Vector3();

    const cameraRight =
      new THREE.Vector3();

    const cameraUp =
      new THREE.Vector3();

    const desiredCameraMatrix =
      new THREE.Matrix4();

    const desiredCameraQuat =
      new THREE.Quaternion();

    function signedTurnAmount(t) {
      const sample =
        THREE.MathUtils.clamp(
          CHASE_DISTANCE /
            CURVE_LENGTH,
          0.006,
          0.04
        );

      const ta =
        THREE.MathUtils.clamp(
          t - sample,
          0,
          0.999
        );

      const tb =
        THREE.MathUtils.clamp(
          t + sample,
          0,
          0.999
        );

      tangentPrev
        .copy(
          curve.getTangentAt(ta)
        )
        .normalize();

      tangentNext
        .copy(
          curve.getTangentAt(tb)
        )
        .normalize();

      const a =
        Math.atan2(
          tangentPrev.x,
          -tangentPrev.z
        );

      const b =
        Math.atan2(
          tangentNext.x,
          -tangentNext.z
        );

      return Math.atan2(
        Math.sin(b - a),
        Math.cos(b - a)
      );
    }

    let animationFrame;

    function animate() {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      const dt =
        Math.min(
          clock.getDelta(),
          0.05
        );

      /* ======================================================
         TARGET SMOOTHING
      ====================================================== */

      /*
        Instead of directly jumping to targetT,
        smooth it every frame.
      */

      const targetDifference =
        targetT - currentT;

      currentT +=
        targetDifference *
        (
          1 -
          Math.exp(
            -11.5 * dt
          )
        );

      /*
        Snap to final point once sufficiently close.
      */

      if (
        targetT >= 1 &&
        currentT >=
          FLIGHT_COMPLETE_THRESHOLD
      ) {
        currentT = 1;
        targetT = 1;

        releaseFlightLock();
      }

      if (
        targetT <= 0 &&
        currentT <= 0.0001
      ) {
        currentT = 0;
      }

      /* ======================================================
         REVEAL (flight line only — fades in on first scroll)
      ====================================================== */

      const revealTarget =
        targetT > REVEAL_THRESHOLD
          ? 1
          : 0;

      revealAlpha +=
        (
          revealTarget -
          revealAlpha
        ) *
        (
          1 -
          Math.exp(
            -REVEAL_RESPONSE * dt
          )
        );

      const revealVisible =
        revealAlpha > 0.01;

      lineCore.visible =
        revealVisible;

      lineCore.material.opacity =
        revealAlpha;

      /* ======================================================
         PATH VELOCITY
      ====================================================== */

      const pathVelocity =
        (
          currentT -
          previousT
        ) /
        Math.max(
          dt,
          0.001
        );

      const pathAcceleration =
        (
          pathVelocity -
          previousPathVelocity
        ) /
        Math.max(
          dt,
          0.001
        );

      previousPathVelocity +=
        (
          pathVelocity -
          previousPathVelocity
        ) *
        (
          1 -
          Math.exp(
            -6 * dt
          )
        );

      previousT = currentT;

      const speed01 =
        THREE.MathUtils.clamp(
          Math.abs(
            pathVelocity
          ) / 0.035,
          0,
          1
        );

      /* ======================================================
         ROTOR
      ====================================================== */

      const targetRotorDrive =
        THREE.MathUtils.lerp(
          IDLE_ROTOR_TIME_SCALE,
          MAX_ROTOR_TIME_SCALE,
          speed01
        );

      rotorDrive +=
        (
          targetRotorDrive -
          rotorDrive
        ) *
        (
          1 -
          Math.exp(
            -ROTOR_RESPONSE *
              dt
          )
        );

      if (jetMixer) {
        jetMixer.timeScale =
          rotorDrive;
      }

      /* ======================================================
         CURRENT PATH POSITION
      ====================================================== */

      const t =
        THREE.MathUtils.clamp(
          currentT,
          0,
          1
        );

      const pos =
        curve.getPointAt(t);

      const tangent =
        curve
          .getTangentAt(
            Math.min(
              t,
              0.999
            )
          )
          .normalize();

      updateLineProgressColor(t);

      /* ======================================================
         BACKGROUND
      ====================================================== */

      // Normalized distance travelled by the helicopter.
      // Keep this inside the animation scope so every star layer
      // can safely use it without a ReferenceError.
      const starTravel = t * CURVE_LENGTH;

      starField.rotation.y +=
        dt * 0.004;

      dustField.rotation.y -=
        dt * 0.008;

      upperStarField.rotation.y += dt * 0.001;
      upperStarField.material.uniforms.uTime.value += dt * 0.8;
      starTrailField.material.uniforms.uTime.value += dt;

      // Move the star corridor with the flight so fresh stars keep
      // entering from above/front instead of the sky feeling static.
      upperStarField.position.z = -starTravel * 0.32;
      upperStarField.position.y = 16 + Math.sin(t * Math.PI * 1.7) * 2.5;
      starTrailField.position.z = -starTravel * 0.52;

      starField.material.uniforms.uTime.value +=
        dt;

      dustField.material.uniforms.uTime.value +=
        dt;

      /* ======================================================
         HELICOPTER ORIENTATION
      ====================================================== */

      right.crossVectors(
        WORLD_UP,
        tangent
      );

      if (
        right.lengthSq() <
        1e-6
      ) {
        right.set(
          1,
          0,
          0
        );
      } else {
        right.normalize();
      }

      flightUp
        .crossVectors(
          tangent,
          right
        )
        .normalize();

      const turn =
        signedTurnAmount(t);

      const targetBank =
        THREE.MathUtils.clamp(
          -turn * 3.6,
          -1.05,
          1.05
        );

      const headingLookAhead =
        THREE.MathUtils.clamp(
          2.8 /
            CURVE_LENGTH,
          0.004,
          0.035
        );

      const headingT =
        THREE.MathUtils.clamp(
          t +
            headingLookAhead *
              (
                pathVelocity >=
                0
                  ? 1
                  : -1
              ),
          0,
          0.999
        );

      tangentNext
        .copy(
          curve.getTangentAt(
            headingT
          )
        )
        .normalize();

      right.crossVectors(
        WORLD_UP,
        tangentNext
      );

      if (
        right.lengthSq() <
        1e-6
      ) {
        right.set(
          1,
          0,
          0
        );
      } else {
        right.normalize();
      }

      flightUp
        .crossVectors(
          tangentNext,
          right
        )
        .normalize();

      planeRight
        .copy(right)
        .applyAxisAngle(
          tangentNext,
          targetBank
        );

      planeUp
        .copy(flightUp)
        .applyAxisAngle(
          tangentNext,
          targetBank
        );

      basis.makeBasis(
        planeRight,
        planeUp,
        tangentNext
      );

      targetPlaneQuat
        .setFromRotationMatrix(
          basis
        );

      planeQuat.slerp(
        targetPlaneQuat,
        1 -
          Math.exp(
            -(
              8.5 +
              speed01 * 3
            ) *
              dt
          )
      );

      /* ======================================================
         PITCH
      ====================================================== */

      const accelerationPitch =
        THREE.MathUtils.clamp(
          -pathAcceleration *
            0.0025,
          -0.055,
          0.055
        );

      if (
        Math.abs(
          accelerationPitch
        ) > 0.0001
      ) {
        pitchQuat.setFromAxisAngle(
          right,
          accelerationPitch
        );

        planeQuat.multiply(
          pitchQuat
        );
      }

      /* ======================================================
         HELICOPTER POSITION
      ====================================================== */

      plane.position.copy(pos);

      plane.quaternion.copy(
        planeQuat
      );

      if (
        plane.userData.prop
      ) {
        plane.userData.prop.rotation.y +=
          dt *
          rotorDrive *
          18;
      }

      if (jetMixer) {
        jetMixer.update(dt);
      }

      planeGlow.position.copy(pos);

      /* ======================================================
         CHASE CAMERA
      ====================================================== */

      const cameraT =
        t -
        CHASE_DISTANCE /
          CURVE_LENGTH;

      let desiredCamPos;

      if (cameraT < 0) {
        const startPoint =
          curve.getPointAt(0);

        const startTangent =
          curve
            .getTangentAt(0)
            .normalize();

        desiredCamPos =
          startPoint
            .clone()
            .addScaledVector(
              startTangent,
              cameraT *
                CURVE_LENGTH
            );
      } else {
        desiredCamPos =
          curve.getPointAt(
            Math.min(
              cameraT,
              0.999
            )
          );
      }

      desiredCamPos.addScaledVector(
        WORLD_UP,
        CHASE_HEIGHT
      );

      const lookT =
        THREE.MathUtils.clamp(
          cameraT +
            CAMERA_LOOK_AHEAD /
              CURVE_LENGTH,
          0,
          0.999
        );

      cameraLookTarget.copy(
        curve.getPointAt(
          lookT
        )
      );

      cameraLookTarget.addScaledVector(
        WORLD_UP,
        CHASE_HEIGHT *
          0.55
      );

      cameraDirection
        .copy(
          cameraLookTarget
        )
        .sub(
          desiredCamPos
        )
        .normalize();

      cameraRight
        .crossVectors(
          WORLD_UP,
          cameraDirection
        )
        .normalize();

      cameraUp
        .crossVectors(
          cameraDirection,
          cameraRight
        )
        .normalize();

      desiredCameraMatrix.makeBasis(
        cameraRight,
        cameraUp,
        cameraDirection
          .clone()
          .negate()
      );

      desiredCameraQuat
        .setFromRotationMatrix(
          desiredCameraMatrix
        );

      if (
        !camera.userData.initialized
      ) {
        cameraPos.copy(
          desiredCamPos
        );

        cameraQuat.copy(
          desiredCameraQuat
        );

        camera.userData.initialized =
          true;
      } else {
        /*
          Position follows path directly.
          Rotation remains smoothly interpolated.
        */

        /*
          IMPORTANT:
          Keep the camera at the exact chase position.

          The previous cameraPos.lerp() introduced a small
          positional lag while scrolling. That made the camera
          move forward/backward relative to the helicopter.

          Position now follows the calculated chase point
          directly, while rotation remains smoothly interpolated.
        */

        cameraPos.copy(
          desiredCamPos
        );

        cameraQuat.slerp(
          desiredCameraQuat,
          1 -
            Math.exp(
              -CAMERA_ROTATION_RESPONSE *
                dt
            )
        );
      }

      camera.position.copy(
        cameraPos
      );

      camera.quaternion.copy(
        cameraQuat
      );

      camera.up.set(
        0,
        1,
        0
      );

      /* ======================================================
         CARDS — proximity-based, per-card reveal
      ====================================================== */

      cardMeshes.forEach(
        (mesh) => {
          /*
            IMPORTANT: define cardT BEFORE using it.
            The previous version calculated enterTarget
            before cardT was initialized, which caused:
            Cannot access 'cardT' before initialization.
          */
          const cardT =
            mesh.userData.t;

          const fadeStart =
            cardT -
            CARD_FADE_START_T;

          const enterTarget =
            t >= fadeStart
              ? THREE.MathUtils.clamp(
                  (t - fadeStart) /
                    CARD_FADE_START_T,
                  0,
                  1
                )
              : 0;

          mesh.userData.enter +=
            (enterTarget - mesh.userData.enter) *
            (1 - Math.exp(-CARD_ENTER_RESPONSE * dt));

          const enter =
            mesh.userData.enter;

          mesh.position.copy(
            mesh.userData.basePos
          );

          // Card comes from slightly behind the flight path.
          mesh.position.addScaledVector(
            tangent,
            (1 - enter) * -CARD_ENTER_DISTANCE
          );

          // Small upward settle.
          mesh.position.y +=
            (1 - enter) * 0.45;
          // Keep every card perfectly straight.
          mesh.rotation.set(-0.285, 0, 0);

          // Small -> full scale.
          mesh.scale.setScalar(
            THREE.MathUtils.lerp(0.82, 1, enter)
          );

          /*
            Target opacity for THIS card only:
            - 0 while the helicopter is still far
              before this card's waypoint.
            - Ramps 0 -> 1 as t moves through the
              CARD_FADE_START_T window right before
              the card's own t.
            - Stays at 1 once the helicopter has
              reached / passed this card's t.
          */
          let targetAlpha = enter;

          mesh.userData.alpha +=
            (
              targetAlpha -
              mesh.userData.alpha
            ) *
            (
              1 -
              Math.exp(
                -CARD_ALPHA_RESPONSE *
                  dt
              )
            );

          const alpha =
            mesh.userData.alpha;

          mesh.visible =
            alpha > 0.01;

          mesh.material.opacity =
            alpha;

          mesh.material.depthWrite =
            alpha > 0.5;
        }
      );

      renderer.render(
        scene,
        camera
      );
    }

    /* ========================================================
       RESIZE
    ======================================================== */

    function handleResize() {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          2
        )
      );

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    }

    window.addEventListener(
      "resize",
      handleResize
    );

    /* ========================================================
       START
    ======================================================== */

    section.classList.add(
      "fly-active"
    );

    animate();

    /* ========================================================
       CLEANUP
    ======================================================== */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );

      cardMeshes.forEach(
        (mesh) => {
          mesh.geometry.dispose();

          if (
            mesh.material.map
          ) {
            mesh.material.map.dispose();
          }

          mesh.material.dispose();
        }
      );

      scene.traverse(
        (object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }

          if (object.material) {
            const materials =
              Array.isArray(
                object.material
              )
                ? object.material
                : [object.material];

            materials.forEach(
              (material) => {
                if (
                  material.map
                ) {
                  material.map.dispose();
                }

                material.dispose();
              }
            );
          }
        }
      );

      if (
        scene.background &&
        scene.background.dispose
      ) {
        scene.background.dispose();
      }

      renderer.dispose();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .fly-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          height: 100vh;
          overflow: hidden;
          isolation: isolate;
        }

        .fly-section.fly-active {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .fly-section.fly-active
          .fly-canvas {
          position: fixed;
          inset: 0;

          width: 100vw;
          height: 100vh;

          z-index: 10;
          display: block;
        }

        .fly-section.fly-complete {
          height: 100vh;
          overflow: hidden;
        }

        .fly-section.fly-complete
          .fly-canvas {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          z-index: 1;
        }

        .fly-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="fly-section"
        aria-label="Honeyverse flight journey"
      >
        <canvas
          ref={canvasRef}
          className="fly-canvas"
        />
      </section>
    </>
  );
}