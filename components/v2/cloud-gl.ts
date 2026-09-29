/*
 * WebGL helpers shared by the hero point cloud (point-cloud.tsx) and its
 * embers (ember-engine.ts). Both draw with the same camera, so an ember can
 * start exactly where the cloud drew its dot.
 */

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/* ---------- inline matrix helpers (column-major, as uniformMatrix4fv expects) */

export const FOV_Y = (45 * Math.PI) / 180
const NEAR = 0.1
const FAR = 50

/** Same matrix as three's PerspectiveCamera(45, aspect, 0.1, 50). */
export function perspective(out: Float32Array, aspect: number) {
  const f = 1 / Math.tan(FOV_Y / 2)
  out.fill(0)
  out[0] = f / aspect
  out[5] = f
  out[10] = -(FAR + NEAR) / (FAR - NEAR)
  out[11] = -1
  out[14] = (-2 * FAR * NEAR) / (FAR - NEAR)
}

/**
 * View * model for a camera at (0, 0, camZ) looking down -Z and a model
 * rotated by Euler (rx, ry, 0) in three's default XYZ order (R = Rx * Ry),
 * then uniformly scaled by s (cover-fit after a resize, see resize()).
 */
export function modelView(out: Float32Array, rx: number, ry: number, camZ: number, s = 1) {
  const a = Math.cos(rx)
  const b = Math.sin(rx)
  const c = Math.cos(ry)
  const d = Math.sin(ry)
  // column 0
  out[0] = c * s
  out[1] = b * d * s
  out[2] = -a * d * s
  out[3] = 0
  // column 1
  out[4] = 0
  out[5] = a * s
  out[6] = b * s
  out[7] = 0
  // column 2
  out[8] = d * s
  out[9] = -b * c * s
  out[10] = a * c * s
  out[11] = 0
  // column 3: camera translation
  out[12] = 0
  out[13] = 0
  out[14] = -camZ
  out[15] = 1
}

export function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS) && !gl.isContextLost()) {
    gl.deleteShader(sh)
    return null
  }
  return sh
}
