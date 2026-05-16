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

export default function buildWormhole(pixelRatio) {
  const count = 2500
  const pos = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const angles = new Float32Array(count)
  const depths = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    angles[i] = Math.random() * Math.PI * 2
    depths[i] = Math.random()
    seeds[i] = Math.random()
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  geo.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1))
  geo.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1))
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      attribute float aSeed; attribute float aAngle; attribute float aDepth;
      uniform float uTime; uniform float uPixelRatio;
      varying vec3 vColor; varying float vAlpha;
      void main() {
        float flow = fract(aDepth + uTime * 0.08);
        float z = mix(4.0, -16.0, flow);
        float r = mix(7.0, 0.6, flow);
        float a = aAngle + flow * 3.5 + uTime * 0.06;
        vec3 p = vec3(cos(a) * r, sin(a) * r * 0.7, z);
        vec3 cN = vec3(1.0, 0.75, 0.45);
        vec3 cM = vec3(0.85, 0.4, 1.0);
        vec3 cF = vec3(0.45, 0.35, 1.0);
        vec3 col = mix(cN, cM, smoothstep(0.0, 0.6, flow));
        col = mix(col, cF, smoothstep(0.55, 1.0, flow));
        vColor = col;
        float fade = smoothstep(0.0, 0.08, flow) * (1.0 - smoothstep(0.9, 1.0, flow));
        vAlpha = fade * 0.6;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.0 + aSeed * 1.6) * uPixelRatio * (30.0 / -mv.z);
      }
    `,
    fragmentShader: softPointFrag
  })
  return {
    object: new THREE.Points(geo, mat),
    update: (_dt, t) => { mat.uniforms.uTime.value = t }
  }
}
