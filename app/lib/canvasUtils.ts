interface Dimensions {
  width: number
  height: number
}

interface TransformConfig {
  padding: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

export function transformX(x: number, dimensions: Dimensions, config: TransformConfig): number {
  return ((x - config.xMin) / (config.xMax - config.xMin)) * (dimensions.width - 2 * config.padding) + config.padding
}

export function transformY(y: number, dimensions: Dimensions, config: TransformConfig): number {
  return dimensions.height - (((y - config.yMin) / (config.yMax - config.yMin)) * (dimensions.height - 2 * config.padding) + config.padding)
}

export function inverseTransformX(px: number, dimensions: Dimensions, config: TransformConfig): number {
  return ((px - config.padding) / (dimensions.width - 2 * config.padding)) * (config.xMax - config.xMin) + config.xMin
}

export function inverseTransformY(py: number, dimensions: Dimensions, config: TransformConfig): number {
  return config.yMax - ((py - config.padding) / (dimensions.height - 2 * config.padding)) * (config.yMax - config.yMin)
}

export function setupCanvas(canvas: HTMLCanvasElement): void {
  const { width, height } = canvas.getBoundingClientRect()
  const scale = window.devicePixelRatio
  canvas.width = width * scale
  canvas.height = height * scale
}

export function getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const scale = window.devicePixelRatio
  ctx.scale(scale, scale)
  return ctx
} 