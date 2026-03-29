<template>
  <div ref="mountRef" class="relative w-full h-full overflow-hidden bg-background" v-bind="$attrs">
    <div v-if="$slots.default" class="relative z-10 w-full h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props {
  darkPalette?: string[]
  lightPalette?: string[]
  pixelSize?: number
  resolution?: number
  mouseForce?: number
  cursorSize?: number
  autoDemo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  darkPalette: () => ['#000000', '#2a0020', '#8c0f60', '#e8227a', '#ff85b3'],
  lightPalette: () => ['#ffffff', '#FD96E5', '#F36AC3', '#FE4396', '#ff85b3'],
  pixelSize: 18,
  resolution: 0.4,
  mouseForce: 8,
  cursorSize: 110,
  autoDemo: true,
})

// ─── Template ref ─────────────────────────────────────────────────────────────
const mountRef = ref<HTMLDivElement | null>(null)

// ─── GLSL shaders ─────────────────────────────────────────────────────────────
const face_vert = /* glsl */ `
attribute vec3 position;
uniform vec2 px;
uniform vec2 boundarySpace;
varying vec2 uv;
precision highp float;
void main(){
  vec3 pos = position;
  vec2 scale = 1.0 - boundarySpace * 2.0;
  pos.xy = pos.xy * scale;
  uv = vec2(0.5) + pos.xy * 0.5;
  gl_Position = vec4(pos, 1.0);
}`

const line_vert = /* glsl */ `
attribute vec3 position;
uniform vec2 px;
precision highp float;
varying vec2 uv;
void main(){
  vec3 pos = position;
  uv = 0.5 + pos.xy * 0.5;
  vec2 n = sign(pos.xy);
  pos.xy = abs(pos.xy) - px * 1.0;
  pos.xy *= n;
  gl_Position = vec4(pos, 1.0);
}`

const mouse_vert = /* glsl */ `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;
void main(){
  vec2 pos = position.xy * scale * 2.0 * px + center;
  vUv = uv;
  gl_Position = vec4(pos, 0.0, 1.0);
}`

const advection_frag = /* glsl */ `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform bool isBFECC;
uniform vec2 fboSize;
uniform vec2 px;
varying vec2 uv;
void main(){
  vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
  if(isBFECC == false){
    vec2 vel = texture2D(velocity, uv).xy;
    vec2 uv2 = uv - vel * dt * ratio;
    vec2 newVel = texture2D(velocity, uv2).xy;
    gl_FragColor = vec4(newVel, 0.0, 0.0);
  } else {
    vec2 spot_new = uv;
    vec2 vel_old = texture2D(velocity, uv).xy;
    vec2 spot_old = spot_new - vel_old * dt * ratio;
    vec2 vel_new1 = texture2D(velocity, spot_old).xy;
    vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
    vec2 error = spot_new2 - spot_new;
    vec2 spot_new3 = spot_new - error / 2.0;
    vec2 vel_2 = texture2D(velocity, spot_new3).xy;
    vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
    vec2 newVel2 = texture2D(velocity, spot_old2).xy;
    gl_FragColor = vec4(newVel2, 0.0, 0.0);
  }
}`

const color_frag = /* glsl */ `
precision highp float;
uniform sampler2D velocity;
uniform sampler2D palette;
uniform sampler2D uBayer;
uniform vec4 bgColor;
uniform float uTime;
uniform vec2 uRes;
uniform float uPixelSize;
varying vec2 uv;
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
void main(){
  vec2 pixGrid = uRes / uPixelSize;
  vec2 pixUV   = (floor(uv * pixGrid) + 0.5) / pixGrid;
  vec2 vel  = texture2D(velocity, pixUV).xy;
  float len = clamp(length(vel) * 2.2, 0.0, 1.0);
  vec2 bayerUV = (mod(floor(gl_FragCoord.xy), 4.0) + 0.5) / 4.0;
  float dither  = texture2D(uBayer, bayerUV).r - 0.5;
  float noiseVal = noise(uv * 6.0 + uTime * 0.15) * 0.06 - 0.03;
  float t = clamp(len + dither * 0.12 + noiseVal, 0.0, 1.0);
  vec3 fluidColor = texture2D(palette, vec2(t, 0.5)).rgb;
  vec3 col        = mix(bgColor.rgb, fluidColor, t);
  float grain = hash(gl_FragCoord.xy + vec2(uTime * 137.0, uTime * 91.0));
  col += (grain - 0.5) * 0.085;
  float alpha = mix(bgColor.a, 1.0, t);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), alpha);
}`

const divergence_frag = /* glsl */ `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform vec2 px;
varying vec2 uv;
void main(){
  float x0 = texture2D(velocity, uv - vec2(px.x, 0.0)).x;
  float x1 = texture2D(velocity, uv + vec2(px.x, 0.0)).x;
  float y0 = texture2D(velocity, uv - vec2(0.0, px.y)).y;
  float y1 = texture2D(velocity, uv + vec2(0.0, px.y)).y;
  float divergence = (x1 - x0 + y1 - y0) / 2.0;
  gl_FragColor = vec4(divergence / dt);
}`

const externalForce_frag = /* glsl */ `
precision highp float;
uniform vec2 force;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;
void main(){
  vec2 circle = (vUv - 0.5) * 2.0;
  float d = 1.0 - min(length(circle), 1.0);
  d *= d;
  gl_FragColor = vec4(force * d, 0.0, 1.0);
}`

const poisson_frag = /* glsl */ `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D divergence;
uniform vec2 px;
varying vec2 uv;
void main(){
  float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
  float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
  float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
  float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
  float div = texture2D(divergence, uv).r;
  float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
  gl_FragColor = vec4(newP);
}`

const pressure_frag = /* glsl */ `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D velocity;
uniform vec2 px;
uniform float dt;
varying vec2 uv;
void main(){
  float p0 = texture2D(pressure, uv + vec2(px.x, 0.0)).r;
  float p1 = texture2D(pressure, uv - vec2(px.x, 0.0)).r;
  float p2 = texture2D(pressure, uv + vec2(0.0, px.y)).r;
  float p3 = texture2D(pressure, uv - vec2(0.0, px.y)).r;
  vec2 v      = texture2D(velocity, uv).xy;
  vec2 gradP  = vec2(p0 - p1, p2 - p3) * 0.5;
  v = v - gradP * dt;
  gl_FragColor = vec4(v, 0.0, 1.0);
}`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const viscous_frag = /* glsl */ `
precision highp float;
uniform sampler2D velocity;
uniform sampler2D velocity_new;
uniform float v;
uniform vec2 px;
uniform float dt;
varying vec2 uv;
void main(){
  vec2 old  = texture2D(velocity, uv).xy;
  vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
  vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
  vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
  vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
  vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
  newv /= 4.0 * (1.0 + v * dt);
  gl_FragColor = vec4(newv, 0.0, 0.0);
}`

// ─── Helpers ──────────────────────────────────────────────────────────────────
type Uniforms = Record<string, { value: unknown }>

function writePaletteData(data: Uint8Array, stops: string[]) {
  const arr = stops.length === 1 ? [stops[0], stops[0]] : stops
  for (let i = 0; i < arr.length; i++) {
    const c = new THREE.Color(arr[i])
    data[i * 4] = Math.round(c.r * 255)
    data[i * 4 + 1] = Math.round(c.g * 255)
    data[i * 4 + 2] = Math.round(c.b * 255)
    data[i * 4 + 3] = 255
  }
}

function makePaletteTexture(stops: string[]): THREE.DataTexture {
  const arr = stops.length === 1 ? [stops[0] as string, stops[0] as string] : stops
  const data = new Uint8Array(arr.length * 4)
  writePaletteData(data, arr)
  const tex = new THREE.DataTexture(data, arr.length, 1, THREE.RGBAFormat)
  tex.magFilter = THREE.LinearFilter
  tex.minFilter = THREE.LinearFilter
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  tex.generateMipmaps = false
  tex.needsUpdate = true
  return tex
}

function makeBayerTexture(): THREE.DataTexture {
  const raw = [0, 136, 34, 170, 204, 68, 238, 102, 51, 187, 17, 153, 255, 119, 221, 85]
  const data = new Uint8Array(16 * 4)
  for (let i = 0; i < 16; i++) {
    data[i * 4] = raw[i] as number
    data[i * 4 + 1] = raw[i] as number
    data[i * 4 + 2] = raw[i] as number
    data[i * 4 + 3] = 255
  }
  const tex = new THREE.DataTexture(data, 4, 4, THREE.RGBAFormat)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.generateMipmaps = false
  tex.needsUpdate = true
  return tex
}

function isDarkMode() {
  return document.documentElement.classList.contains('dark')
}

function getBgColor(dark: boolean) {
  return dark ? new THREE.Vector4(0, 0, 0, 0) : new THREE.Vector4(1, 1, 1, 0)
}

// ─── Classes (identical logic, no React deps) ─────────────────────────────────
class CommonGL {
  width = 1
  height = 1
  pixelRatio = 1
  renderer: THREE.WebGLRenderer | null = null
  clock: THREE.Clock | null = null
  time = 0
  delta = 0
  container: HTMLElement | null = null

  init(container: HTMLElement) {
    this.container = container
    this.pixelRatio = 1
    this.resize()
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    this.renderer.autoClear = false
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(this.pixelRatio)
    this.renderer.setSize(this.width, this.height, false)
    const el = this.renderer.domElement
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.display = 'block'
    this.clock = new THREE.Clock()
    this.clock.start()
  }

  resize() {
    if (!this.container) return
    const r = this.container.getBoundingClientRect()
    this.width = Math.max(1, Math.floor(r.width))
    this.height = Math.max(1, Math.floor(r.height))
    this.renderer?.setSize(this.width, this.height, false)
  }

  update() {
    if (!this.clock) return
    this.delta = this.clock.getDelta()
    this.time += this.delta
  }
}

class MouseGL {
  coords = new THREE.Vector2()
  coords_old = new THREE.Vector2()
  diff = new THREE.Vector2()
  mouseMoved = false
  isInside = false
  isAutoActive = false
  autoIntensity = 2.0
  timer: ReturnType<typeof setTimeout> | null = null
  container: HTMLElement | null = null
  onInteract: (() => void) | null = null

  private _move = this._onMove.bind(this)
  private _leave = () => {
    this.isInside = false
  }
  private _touch = this._onTouch.bind(this)

  init(container: HTMLElement) {
    this.container = container
    window.addEventListener('mousemove', this._move)
    window.addEventListener('touchmove', this._touch, { passive: true })
    window.addEventListener('touchstart', this._touch, { passive: true })
    document.addEventListener('mouseleave', this._leave)
  }

  dispose() {
    window.removeEventListener('mousemove', this._move)
    window.removeEventListener('touchmove', this._touch)
    window.removeEventListener('touchstart', this._touch)
    document.removeEventListener('mouseleave', this._leave)
  }

  private _onMove(e: MouseEvent) {
    if (!this.container) return
    const r = this.container.getBoundingClientRect()
    this.isInside =
      e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
    if (!this.isInside) return
    this.onInteract?.()
    this._set(e.clientX, e.clientY)
  }

  private _onTouch(e: TouchEvent) {
    if (e.touches.length !== 1) return
    const t = e.touches[0]
    if (!t) return
    this.onInteract?.()
    this._set(t.clientX, t.clientY)
  }

  private _set(cx: number, cy: number) {
    if (!this.container) return
    if (this.timer) clearTimeout(this.timer)
    const r = this.container.getBoundingClientRect()
    const nx = (cx - r.left) / r.width
    const ny = (cy - r.top) / r.height
    this.coords.set(nx * 2 - 1, -(ny * 2 - 1))
    this.mouseMoved = true
    this.timer = setTimeout(() => {
      this.mouseMoved = false
    }, 100)
  }

  setNormalized(x: number, y: number) {
    this.coords.set(x, y)
    this.mouseMoved = true
  }

  update() {
    this.diff.subVectors(this.coords, this.coords_old)
    this.coords_old.copy(this.coords)
    if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0)
    if (this.isAutoActive) this.diff.multiplyScalar(this.autoIntensity)
  }
}

class ShaderPass {
  scene: THREE.Scene
  camera: THREE.Camera
  material: THREE.RawShaderMaterial | null = null
  geometry: THREE.BufferGeometry | null = null
  uniforms: Uniforms
  output: THREE.WebGLRenderTarget | null
  renderer: () => THREE.WebGLRenderer | null

  constructor(
    renderer: () => THREE.WebGLRenderer | null,
    vertShader: string,
    fragShader: string,
    uniforms: Uniforms,
    output: THREE.WebGLRenderTarget | null = null,
  ) {
    this.renderer = renderer
    this.uniforms = uniforms
    this.output = output
    this.scene = new THREE.Scene()
    this.camera = new THREE.Camera()
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms,
    })
    this.geometry = new THREE.PlaneGeometry(2, 2)
    this.scene.add(new THREE.Mesh(this.geometry, this.material))
  }

  render(to: THREE.WebGLRenderTarget | null = this.output) {
    const r = this.renderer()
    if (!r) return
    r.setRenderTarget(to)
    r.render(this.scene, this.camera)
    r.setRenderTarget(null)
  }

  dispose() {
    this.material?.dispose()
    this.geometry?.dispose()
  }
}

class AutoDriver {
  enabled: boolean
  speed: number
  resumeDelay: number
  current = new THREE.Vector2()
  target = new THREE.Vector2()
  lastTime = performance.now()
  private _tmp = new THREE.Vector2()
  private _mouse: MouseGL
  private _getLastInteraction: () => number

  constructor(mouse: MouseGL, getLastInteraction: () => number, speed = 0.4, resumeDelay = 1200) {
    this._mouse = mouse
    this._getLastInteraction = getLastInteraction
    this.speed = speed
    this.resumeDelay = resumeDelay
    this.enabled = true
    this._pickTarget()
  }

  private _pickTarget() {
    this.target.set((Math.random() * 2 - 1) * 0.8, (Math.random() * 2 - 1) * 0.8)
  }

  update() {
    if (!this.enabled) return
    const now = performance.now()
    const idleMs = now - this._getLastInteraction()
    if (idleMs < this.resumeDelay) {
      this._mouse.isAutoActive = false
      return
    }
    this._mouse.isAutoActive = true
    const dt = Math.min((now - this.lastTime) / 1000, 0.05)
    this.lastTime = now
    const dir = this._tmp.subVectors(this.target, this.current)
    const dist = dir.length()
    if (dist < 0.02) {
      this._pickTarget()
      return
    }
    dir.normalize()
    this.current.addScaledVector(dir, Math.min(this.speed * dt, dist))
    this._mouse.setNormalized(this.current.x, this.current.y)
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
let cleanup: (() => void) | null = null

onMounted(() => {
  const container = mountRef.value
  if (!container) return

  const gl = new CommonGL()
  gl.init(container)
  container.prepend(gl.renderer!.domElement)

  const mouse = new MouseGL()
  mouse.init(container)
  mouse.autoIntensity = 2.4

  const dark = isDarkMode()
  const palette = makePaletteTexture(dark ? props.darkPalette : props.lightPalette)
  const bayerTex = makeBayerTexture()

  // ── Fluid sim (inline — same as original FluidSim class) ──────────────────
  const resolution = props.resolution
  const fboSize = new THREE.Vector2()
  const cellScale = new THREE.Vector2()

  const w = Math.max(1, Math.round(resolution * gl.width))
  const h = Math.max(1, Math.round(resolution * gl.height))
  cellScale.set(1 / w, 1 / h)
  fboSize.set(w, h)

  const _r = () => gl.renderer

  function makeFBO() {
    return new THREE.WebGLRenderTarget(fboSize.x, fboSize.y, {
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    })
  }

  const fbos: Record<string, THREE.WebGLRenderTarget | null> = {}
  for (const n of ['vel_0', 'vel_1', 'vel_v0', 'vel_v1', 'div', 'p0', 'p1']) fbos[n] = makeFBO()

  const advUniforms: Uniforms = {
    boundarySpace: { value: cellScale },
    px: { value: cellScale },
    fboSize: { value: fboSize },
    velocity: { value: fbos.vel_0!.texture },
    dt: { value: 0.008 },
    isBFECC: { value: false },
  }
  const advPass = new ShaderPass(_r, face_vert, advection_frag, advUniforms, fbos.vel_1)
  const bGeo = new THREE.BufferGeometry()
  bGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(
      new Float32Array([
        -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0,
      ]),
      3,
    ),
  )
  const bLine = new THREE.LineSegments(
    bGeo,
    new THREE.RawShaderMaterial({
      vertexShader: line_vert,
      fragmentShader: advection_frag,
      uniforms: advUniforms,
    }),
  )
  advPass.scene.add(bLine)

  const efScene = new THREE.Scene(),
    efCam = new THREE.Camera()
  const efMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.RawShaderMaterial({
      vertexShader: mouse_vert,
      fragmentShader: externalForce_frag,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        px: { value: cellScale },
        force: { value: new THREE.Vector2() },
        center: { value: new THREE.Vector2() },
        scale: { value: new THREE.Vector2(props.cursorSize, props.cursorSize) },
      },
    }),
  )
  efScene.add(efMesh)

  const divergencePass = new ShaderPass(
    _r,
    face_vert,
    divergence_frag,
    {
      boundarySpace: { value: cellScale },
      velocity: { value: fbos.vel_1!.texture },
      px: { value: cellScale },
      dt: { value: 0.008 },
    },
    fbos.div,
  )

  const poisPass = new ShaderPass(
    _r,
    face_vert,
    poisson_frag,
    {
      boundarySpace: { value: cellScale },
      pressure: { value: fbos.p0!.texture },
      divergence: { value: fbos.div!.texture },
      px: { value: cellScale },
    },
    fbos.p1,
  )

  const pressurePass = new ShaderPass(
    _r,
    face_vert,
    pressure_frag,
    {
      boundarySpace: { value: cellScale },
      pressure: { value: fbos.p0!.texture },
      velocity: { value: fbos.vel_1!.texture },
      px: { value: cellScale },
      dt: { value: 0.008 },
    },
    fbos.vel_0,
  )

  function simUpdate() {
    const r = gl.renderer
    if (!r) return
    advPass.render()

    const mf = props.mouseForce,
      cs = props.cursorSize
    const cx = cellScale.x,
      cy = cellScale.y
    const clampedX = Math.min(
      Math.max(mouse.coords.x, -1 + cs * cx * 2 + cx * 2),
      1 - cs * cx * 2 - cx * 2,
    )
    const clampedY = Math.min(
      Math.max(mouse.coords.y, -1 + cs * cy * 2 + cy * 2),
      1 - cs * cy * 2 - cy * 2,
    )
    const eu = (efMesh.material as THREE.RawShaderMaterial).uniforms as Record<
      string,
      { value: unknown }
    >
    if (eu.force && eu.center && eu.scale) {
      ;(eu.force.value as THREE.Vector2).set((mouse.diff.x / 2) * mf, (mouse.diff.y / 2) * mf)
      ;(eu.center.value as THREE.Vector2).set(clampedX, clampedY)
      ;(eu.scale.value as THREE.Vector2).set(cs, cs)
    }
    r.setRenderTarget(fbos.vel_1 as THREE.WebGLRenderTarget)
    r.render(efScene, efCam)
    r.setRenderTarget(null)
    const divUniforms = divergencePass.uniforms as Record<string, { value: unknown }>
    if (divUniforms.velocity) {
      divUniforms.velocity.value = fbos.vel_1!.texture
    }
    divergencePass.render()

    let p_in = fbos.p0,
      p_out = fbos.p1
    for (let i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        p_in = fbos.p0
        p_out = fbos.p1
      } else {
        p_in = fbos.p1
        p_out = fbos.p0
      }
      const poisUniforms = poisPass.uniforms as Record<string, { value: unknown }>
      if (poisUniforms.pressure) {
        poisUniforms.pressure.value = p_in!.texture
      }
      poisPass.render(p_out)
    }
    pressurePass.uniforms.pressure!.value = p_out!.texture
    pressurePass.uniforms.velocity!.value = fbos.vel_1!.texture
    pressurePass.render()
  }

  // ── Output pass ───────────────────────────────────────────────────────────
  const outputUniforms: Uniforms = {
    velocity: { value: fbos.vel_0!.texture },
    palette: { value: palette },
    uBayer: { value: bayerTex },
    bgColor: { value: getBgColor(dark) },
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(gl.width, gl.height) },
    uPixelSize: { value: props.pixelSize },
    boundarySpace: { value: new THREE.Vector2() },
    px: { value: new THREE.Vector2() },
  }
  const outputScene = new THREE.Scene(),
    outputCam = new THREE.Camera()
  outputScene.add(
    new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.RawShaderMaterial({
        vertexShader: face_vert,
        fragmentShader: color_frag,
        transparent: true,
        depthWrite: false,
        uniforms: outputUniforms,
      }),
    ),
  )

  // ── Theme observer ────────────────────────────────────────────────────────
  const themeObserver = new MutationObserver(() => {
    const nowDark = isDarkMode()
    const stops = nowDark ? props.darkPalette : props.lightPalette
    writePaletteData(palette.image.data as Uint8Array, stops)
    palette.needsUpdate = true
    const bg = getBgColor(nowDark)
    ;(outputUniforms.bgColor!.value as THREE.Vector4).set(bg.x, bg.y, bg.z, bg.w)
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  // ── Auto driver ───────────────────────────────────────────────────────────
  let lastInteraction = performance.now()
  mouse.onInteract = () => {
    lastInteraction = performance.now()
  }
  const driver = props.autoDemo ? new AutoDriver(mouse, () => lastInteraction, 0.45, 1200) : null

  // ── Resize ────────────────────────────────────────────────────────────────
  const ro = new ResizeObserver(() => {
    gl.resize()
    const nw = Math.max(1, Math.round(resolution * gl.width))
    const nh = Math.max(1, Math.round(resolution * gl.height))
    cellScale.set(1 / nw, 1 / nh)
    fboSize.set(nw, nh)
    for (const k in fbos) fbos[k]!.setSize(fboSize.x, fboSize.y)
    ;(outputUniforms.uRes!.value as THREE.Vector2).set(gl.width, gl.height)
  })
  ro.observe(container)

  // ── Render loop ───────────────────────────────────────────────────────────
  let raf = 0,
    running = true,
    lastFrameTime = 0

  const loop = (timestamp: number) => {
    if (!running) return

    // Throttle to 30fps (33.33ms per frame)
    if (timestamp - lastFrameTime < 33.33) {
      raf = requestAnimationFrame(loop)
      return
    }
    lastFrameTime = timestamp

    driver?.update()
    mouse.update()
    gl.update()
    outputUniforms.uTime!.value = gl.time
    simUpdate()
    const r = gl.renderer
    if (r) {
      r.setRenderTarget(null)
      r.render(outputScene, outputCam)
    }
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  const onVisibility = () => {
    if (document.hidden) {
      running = false
      cancelAnimationFrame(raf)
    } else {
      running = true
      raf = requestAnimationFrame(loop)
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  // ── Cleanup ───────────────────────────────────────────────────────────────
  cleanup = () => {
    running = false
    cancelAnimationFrame(raf)
    ro.disconnect()
    themeObserver.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    mouse.dispose()
    for (const k in fbos) fbos[k]?.dispose()
    advPass.dispose()
    divergencePass.dispose()
    pressurePass.dispose()
    palette.dispose()
    bayerTex.dispose()
    const canvas = gl.renderer?.domElement
    gl.renderer?.dispose()
    if (canvas?.parentNode) canvas.parentNode.removeChild(canvas)
  }
})

onUnmounted(() => {
  cleanup?.()
  cleanup = null
})
</script>
