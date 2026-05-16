import { useEffect, useRef } from 'preact/hooks'
import * as THREE from 'three'

/* =========================================================
   Cosmic scene — distinct destinations per route, camera
   physically flies between them through a deep starfield.
   ========================================================= */

/* shared frag for soft-disc point sprites */
const softPointFrag = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a = pow(a, 1.7);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`

/* ---------------- distant starfield (twinkle + warp) ---------------- */
function buildStarfield(count) {
  const pos = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  // Distribute stars in a huge volume so flying through space gives parallax depth
  for (let i = 0; i < count; i++) {
    pos[i*3+0] = (Math.random() - 0.5) * 900
    pos[i*3+1] = (Math.random() - 0.5) * 700
    pos[i*3+2] = (Math.random() - 0.5) * 900
    seeds[i] = Math.random()
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 }, uWarp: { value: 0 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uWarp;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float tw = 0.5 + 0.5 * sin(uTime * (0.5 + aSeed * 2.0) + aSeed * 31.4);
        vAlpha = mix(0.18, 0.85, tw) * (1.0 + uWarp * 1.4);
        // slight color variety: warm white -> cool white -> faint blue
        float t = aSeed;
        vec3 c = mix(vec3(1.0,0.92,0.82), vec3(0.85,0.92,1.0), smoothstep(0.4,1.0,t));
        vColor = mix(c, vec3(1.0), uWarp);
        float base = 0.55 + aSeed * 1.4;
        float warpScale = 1.0 + uWarp * (3.5 + aSeed * 3.0);
        gl_PointSize = base * warpScale * uPixelRatio * (80.0 / -mv.z);
      }
    `,
    fragmentShader: softPointFrag
  })
  return new THREE.Points(geo, mat)
}

/* Background color washes were previously Sprite billboards; they're
   now a CSS radial-gradient on .hero-canvas — no JS bytes, no draw cost. */

/* ---------------- volumetric nebula (organic particle cloud) ---------------- */
function buildNebulaCloud(count, palette) {
  // shape: two overlapping elongated lobes (pillars-of-creation feel)
  const pos = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const tones = new Float32Array(count) // 0..1 color blend
  const sizes = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    // pick one of two lobes
    const lobe = Math.random() < 0.55 ? 0 : 1
    const cx = lobe === 0 ? -2.2 : 2.0
    const cz = lobe === 0 ? 0.4 : -0.6
    // anisotropic gaussian-ish
    const u = Math.random(); const v = Math.random()
    const g = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
    const g2 = Math.sqrt(-2 * Math.log(u || 0.0001)) * Math.sin(2 * Math.PI * v)
    const x = cx + g * 1.8
    const y = (Math.random() - 0.5) * 7.5 + Math.sin(i * 0.13) * 0.8
    const z = cz + g2 * 1.8
    // wispy filaments — sweep some particles toward the center
    const filament = Math.random() < 0.18
    pos[i * 3 + 0] = filament ? x * 0.4 + (Math.random() - 0.5) * 6 : x
    pos[i * 3 + 1] = filament ? y * 1.1 : y
    pos[i * 3 + 2] = filament ? z * 0.4 + (Math.random() - 0.5) * 4 : z
    seeds[i] = Math.random()
    tones[i] = Math.random()
    // a few bright "protostars" sprinkled in
    sizes[i] = Math.random() < 0.012 ? 4.5 + Math.random() * 3.5 : 0.7 + Math.random() * 1.1
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  geo.setAttribute('aTone', new THREE.BufferAttribute(tones, 1))
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uA: { value: new THREE.Color(palette[0]) },
      uB: { value: new THREE.Color(palette[1]) },
      uC: { value: new THREE.Color(palette[2]) }
    },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float aSeed; attribute float aTone; attribute float aSize;
      uniform float uTime; uniform float uPixelRatio;
      uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
      varying vec3 vColor; varying float vAlpha;
      void main() {
        // slow organic drift
        vec3 p = position;
        float s = aSeed * 6.2831;
        p.x += sin(uTime * 0.12 + s) * 0.25;
        p.y += cos(uTime * 0.09 + s * 1.7) * 0.25;
        p.z += sin(uTime * 0.10 + s * 2.3) * 0.25;

        vec3 col = mix(uA, uB, smoothstep(0.0, 0.6, aTone));
        col = mix(col, uC, smoothstep(0.55, 1.0, aTone));
        // brighter protostars desaturate toward white
        float bright = step(3.0, aSize);
        col = mix(col, vec3(1.0, 0.97, 0.9), bright * 0.55);

        vColor = col;
        vAlpha = bright > 0.5 ? 1.0 : (0.35 + aSeed * 0.4);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPixelRatio * (36.0 / -mv.z);
      }
    `,
    fragmentShader: softPointFrag
  })
  return new THREE.Points(geo, mat)
}


/* =========================================================
   DESTINATIONS — each route is a different place in space.
   Non-home destination builders are dynamic-imported so their
   geometry/shader code stays out of the initial chunk.
   ========================================================= */
const DESTINATIONS = {
  '/':           { world: [0, 0, 0],         viewOffset: [0, 1.8, 9],    focus: [0, 0, 0],  loader: null },
  '/work':       { world: [240, 30, -60],    viewOffset: [3, 1.5, 7],    focus: [0, 0, 0],  loader: null },
  '/skills':     { world: [-220, 80, 140],   viewOffset: [0, 4, 10],     focus: [0, 0, 0],  loader: null },
  '/experience': { world: [80, -50, -260],   viewOffset: [4, 2, 14],     focus: [0, 0, 0],  loader: () => import('./HeroDestinations/experience.js') },
  '/lab':        { world: [-180, -40, 220],  viewOffset: [0, 0.5, 6],    focus: [0, 0, -6], loader: () => import('./HeroDestinations/lab.js') },
  '/goals':      { world: [180, 160, -120],  viewOffset: [-3, 1, 9],     focus: [0, 0, 0],  loader: () => import('./HeroDestinations/goals.js') }
}
const DEFAULT_KEY = '/'

const easeInOut = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2

export default function HeroCanvas({ route = '/' }) {
  const mountRef = useRef(null)
  const apiRef = useRef({ go: () => {} })

  useEffect(() => { apiRef.current.go(route) }, [route])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const pixelRatio = renderer.getPixelRatio()

    /* ---- global ---- */
    const stars = buildStarfield(4000)
    scene.add(stars)
    stars.material.uniforms.uPixelRatio.value = pixelRatio

    /* ---- destinations ---- */
    // Each loaded destination: { object, update(dt, t) }. Home is eager;
    // others are dynamic-imported on first visit so their bytes don't
    // ship in the initial HeroCanvas chunk.
    const loadedDests = {}
    const pendingDests = {}
    let disposed = false

    // HOME — volumetric nebula cloud (organic stellar nursery)
    const homeNebula = buildNebulaCloud(3000, ['#ff7ac6', '#a466ff', '#5a8bff'])
    homeNebula.material.uniforms.uPixelRatio.value = pixelRatio
    homeNebula.position.fromArray(DESTINATIONS['/'].world)
    scene.add(homeNebula)
    loadedDests['/'] = {
      object: homeNebula,
      update: (dt, t) => {
        homeNebula.material.uniforms.uTime.value = t
        homeNebula.rotation.y += dt * 0.015
        homeNebula.rotation.x = Math.sin(t * 0.05) * 0.08
      }
    }

    const ensureDestination = (key) => {
      if (loadedDests[key] || pendingDests[key]) return
      const dest = DESTINATIONS[key]
      if (!dest || !dest.loader) return
      pendingDests[key] = dest.loader().then((mod) => {
        if (disposed) return
        const built = mod.default(pixelRatio)
        built.object.position.fromArray(dest.world)
        scene.add(built.object)
        loadedDests[key] = built
      }).catch(() => {
        delete pendingDests[key]
      })
    }

    /* ---- sizing ---- */
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    /* ---- pointer parallax (subtle, no scene distortion now) ---- */
    const pointer = new THREE.Vector2(0, 0)
    const onPointer = (e) => {
      pointer.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1))
    }

    /* ---- scroll parallax ----
       Scroll nudges the camera off-axis but the look target stays locked
       to the destination, so the central object never leaves frame.
       The starfield parallaxes around it because stars at different
       depths shift by different amounts under the camera move. */
    let scrollTarget = 0      // tanh-capped world-unit offset
    let scrollSmoothed = 0
    const onScroll = () => {
      // 1.0 viewport scrolled ≈ tanh(1) ≈ 0.76 of cap; saturates after ~2 viewports
      const t = window.scrollY / Math.max(1, window.innerHeight)
      scrollTarget = Math.tanh(t * 0.9) * 3.2 // cap = ±3.2 world units
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointer)

    /* ---- helpers ---- */
    const computePose = (key) => {
      const d = DESTINATIONS[key] || DESTINATIONS[DEFAULT_KEY]
      const world = new THREE.Vector3().fromArray(d.world)
      const pos = world.clone().add(new THREE.Vector3().fromArray(d.viewOffset))
      const look = world.clone().add(new THREE.Vector3().fromArray(d.focus))
      return { pos, look }
    }

    /* ---- initial camera at route's pose ---- */
    const initial = computePose(route)
    camera.position.copy(initial.pos)
    const lookCurrent = initial.look.clone()
    const lookFrom = initial.look.clone()
    const lookTo = initial.look.clone()
    const posFrom = camera.position.clone()
    const posTo = camera.position.clone()
    let tween = { active: false, start: 0, duration: 1800 }

    // Kick off the loader for whatever route we mount on.
    ensureDestination(route)

    apiRef.current.go = (path) => {
      ensureDestination(path)
      const target = computePose(path)
      posFrom.copy(camera.position); lookFrom.copy(lookCurrent)
      posTo.copy(target.pos); lookTo.copy(target.look)

      // Project flight vector onto current camera-local axes so the DOM
      // content moves along the same screen-space direction as the camera.
      camera.updateMatrixWorld(true)
      const flight = new THREE.Vector3().subVectors(posTo, posFrom)
      const camRight = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
      const camUp = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)
      let dx = flight.dot(camRight)
      let dy = flight.dot(camUp)
      const n = Math.hypot(dx, dy)
      if (n > 0.001) { dx /= n; dy /= n } else { dx = 0; dy = 0 }
      // DOM Y is inverted vs camera up
      document.documentElement.style.setProperty('--flight-dx', dx.toFixed(3))
      document.documentElement.style.setProperty('--flight-dy', (-dy).toFixed(3))

      tween = { active: true, start: performance.now(), duration: 1800 }
    }

    /* ---- frame loop ---- */
    const clock = new THREE.Clock()
    let warp = 0
    let raf = 0

    const tick = () => {
      const now = performance.now()
      const dt = clock.getDelta()
      const t = clock.elapsedTime

      const timeUni = prefersReduced ? 0 : t

      stars.material.uniforms.uTime.value = timeUni

      const animTime = prefersReduced ? 0 : t
      const animDt = prefersReduced ? 0 : dt
      for (const key in loadedDests) loadedDests[key].update(animDt, animTime)

      // route camera tween
      let warpTarget = 0
      if (tween.active) {
        const elapsed = now - tween.start
        const k = Math.min(1, elapsed / tween.duration)
        const e = easeInOut(k)
        camera.position.lerpVectors(posFrom, posTo, e)
        lookCurrent.lerpVectors(lookFrom, lookTo, e)
        warpTarget = Math.sin(k * Math.PI) * Math.min(1, posFrom.distanceTo(posTo) / 80)
        if (k >= 1) tween.active = false
      } else {
        // settled: pointer + scroll-driven camera offset.
        // Look stays locked to destination so the central object stays centered.
        scrollSmoothed += (scrollTarget - scrollSmoothed) * 0.15
        const px = pointer.x * 0.3
        const py = pointer.y * 0.2 - scrollSmoothed   // dip with scroll, capped
        const pz = scrollSmoothed * 0.35              // slight dolly forward for depth
        camera.position.lerp(new THREE.Vector3(posTo.x + px, posTo.y + py, posTo.z + pz), 0.12)
        lookCurrent.lerp(lookTo, 0.12)
      }
      warp += (warpTarget - warp) * 0.12
      stars.material.uniforms.uWarp.value = warp
      camera.lookAt(lookCurrent)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
          else obj.material.dispose()
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} class="hero-canvas" aria-hidden="true" />
}
