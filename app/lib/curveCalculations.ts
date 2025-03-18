import { Point } from '../types/curves'

export function evaluatePolynomial(x: number, coefficients: number[]): number {
  return coefficients.reduce((sum, coeff, i) => {
    return sum + coeff * Math.pow(x, coefficients.length - 1 - i)
  }, 0)
}

export function evaluateBezier(t: number, points: Point[]): Point {
  if (points.length === 1) return points[0]
  const newPoints: Point[] = []
  for (let i = 0; i < points.length - 1; i++) {
    newPoints.push({
      x: (1 - t) * points[i].x + t * points[i + 1].x,
      y: (1 - t) * points[i].y + t * points[i + 1].y,
    })
  }
  return evaluateBezier(t, newPoints)
}

export function getIntermediatePoints(t: number, points: Point[]): Point[][] {
  if (points.length <= 1) return [points]
  
  const result: Point[][] = [points]
  let currentPoints = points
  
  while (currentPoints.length > 1) {
    const newPoints: Point[] = []
    for (let i = 0; i < currentPoints.length - 1; i++) {
      newPoints.push({
        x: (1 - t) * currentPoints[i].x + t * currentPoints[i + 1].x,
        y: (1 - t) * currentPoints[i].y + t * currentPoints[i + 1].y,
      })
    }
    result.push(newPoints)
    currentPoints = newPoints
  }
  
  return result
}

export function distanceToLineSegment(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
  const A = x - x1
  const B = y - y1
  const C = x2 - x1
  const D = y2 - y1

  const dot = A * C + B * D
  const lenSq = C * C + D * D
  let param = -1

  if (lenSq !== 0) {
    param = dot / lenSq
  }

  let xx, yy

  if (param < 0) {
    xx = x1
    yy = y1
  } else if (param > 1) {
    xx = x2
    yy = y2
  } else {
    xx = x1 + param * C
    yy = y1 + param * D
  }

  const dx = x - xx
  const dy = y - yy

  return Math.sqrt(dx * dx + dy * dy)
}

export function evaluateParametricFunction(t: number, fn: string, scale: number = 1): number {
  switch (fn) {
    case 'cos':
      return Math.cos(t) * scale
    case 'sin':
      return Math.sin(t) * scale
    case 't':
      return t * scale
    case 't^2':
      return t * t * scale
    default:
      return 0
  }
} 