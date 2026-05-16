import * as THREE from 'three'

export default function buildPulsar() {
  const group = new THREE.Group()
  const coreGeo = new THREE.SphereGeometry(0.6, 32, 32)
  const coreMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: /* glsl */ `
      precision highp float;
      varying vec3 vN; varying vec3 vV;
      uniform float uTime;
      void main() {
        float ndv = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);
        float core = pow(ndv, 0.5);
        float pulse = 0.7 + 0.3 * sin(uTime * 4.0);
        vec3 col = mix(vec3(0.6,0.85,1.0), vec3(1.0), core) * pulse * 2.0;
        gl_FragColor = vec4(col, 1.0);
      }
    `
  })
  group.add(new THREE.Mesh(coreGeo, coreMat))

  const beamGeo = new THREE.ConeGeometry(2.5, 18, 32, 1, true)
  beamGeo.translate(0, 9, 0)
  const beamMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `
      precision highp float;
      varying vec3 vP;
      uniform float uTime;
      void main(){
        float t = clamp(vP.y / 18.0, 0.0, 1.0);
        float radial = 1.0 - smoothstep(0.0, 1.0, length(vec2(vP.x, vP.z)) / (mix(0.3, 2.5, t) + 0.001));
        float fade = (1.0 - t) * 0.7;
        float p = 0.7 + 0.3 * sin(uTime * 4.0);
        gl_FragColor = vec4(vec3(0.7,0.9,1.0) * radial * fade * p, radial * fade);
      }
    `
  })
  const beamA = new THREE.Mesh(beamGeo, beamMat)
  const beamB = new THREE.Mesh(beamGeo, beamMat)
  beamB.rotation.x = Math.PI
  group.add(beamA); group.add(beamB)
  return {
    object: group,
    update: (dt, t) => {
      coreMat.uniforms.uTime.value = t
      beamMat.uniforms.uTime.value = t
      group.rotation.z += dt * 1.2
      group.rotation.y += dt * 0.6
    }
  }
}
