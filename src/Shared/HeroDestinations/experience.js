import * as THREE from 'three'

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

export default function buildMiniGalaxy(pixelRatio) {
  const count = 8000
  const pos = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const radii = new Float32Array(count)
  const angles = new Float32Array(count)
  const ARMS = 2, TWIST = 2.6
  for (let i = 0; i < count; i++) {
    const r = 0.5 + Math.pow(Math.random(), 0.6) * 6
    const arm = (i % ARMS) * Math.PI
    const a = arm + r * TWIST / 4 + (Math.random() - 0.5) * 0.6
    angles[i] = a; radii[i] = r; seeds[i] = Math.random()
    pos[i*3+0] = Math.cos(a) * r
    pos[i*3+1] = (Math.random()-0.5) * (0.5 / (1 + r*0.2))
    pos[i*3+2] = Math.sin(a) * r
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  geo.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1))
  geo.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1))
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float aSeed; attribute float aRadius; attribute float aAngle;
      uniform float uTime; uniform float uPixelRatio;
      varying vec3 vColor; varying float vAlpha;
      void main() {
        float omega = 0.5 / (0.4 + aRadius * 0.2);
        float a = aAngle + uTime * omega;
        vec3 p = vec3(cos(a) * aRadius, position.y, sin(a) * aRadius);
        float t = clamp(aRadius / 6.0, 0.0, 1.0);
        vec3 cIn = vec3(1.0,0.85,0.55);
        vec3 cMd = vec3(0.9,0.5,0.85);
        vec3 cOt = vec3(0.5,0.6,1.0);
        vec3 col = mix(cIn, cMd, smoothstep(0.0,0.55,t));
        col = mix(col, cOt, smoothstep(0.45,1.0,t));
        vColor = col;
        vAlpha = mix(1.0, 0.5, t);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (0.9 + aSeed * 1.3) * uPixelRatio * (40.0 / -mv.z);
      }
    `,
    fragmentShader: softPointFrag
  })
  const pts = new THREE.Points(geo, mat)
  pts.rotation.x = -0.55
  return {
    object: pts,
    update: (_dt, t) => { mat.uniforms.uTime.value = t }
  }
}
