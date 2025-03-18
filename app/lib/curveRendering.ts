import { CurveParameters, CurveType, Point, PolynomialParameters } from '../types/curves'
import { evaluatePolynomial, evaluateBezier, evaluateParametricFunction } from './curveCalculations'
import { transformX, transformY, setupCanvas, getCanvasContext } from './canvasUtils'

interface RenderConfig {
  padding: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  dimensions: { width: number; height: number }
}

export function drawGrid(ctx: CanvasRenderingContext2D, config: RenderConfig) {
  const { padding, xMin, xMax, yMin, yMax, dimensions } = config
  const { width, height } = dimensions

  // Save the current context state
  ctx.save()

  // Set up the grid style
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1

  // Draw vertical grid lines
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    const px = transformX(x, dimensions, config)
    ctx.beginPath()
    ctx.moveTo(px, padding)
    ctx.lineTo(px, height - padding)
    ctx.stroke()

    // Draw x-axis labels
    ctx.fillStyle = '#6b7280'
    ctx.textAlign = 'center'
    ctx.fillText(x.toString(), px, height - padding + 20)
  }

  // Draw horizontal grid lines
  for (let y = Math.ceil(yMin); y <= yMax; y++) {
    const py = transformY(y, dimensions, config)
    ctx.beginPath()
    ctx.moveTo(padding, py)
    ctx.lineTo(width - padding, py)
    ctx.stroke()

    // Draw y-axis labels
    ctx.fillStyle = '#6b7280'
    ctx.textAlign = 'right'
    ctx.fillText(y.toString(), padding - 10, py)
  }

  // Draw axes
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 2

  // X-axis
  const yAxis = transformY(0, dimensions, config)
  ctx.beginPath()
  ctx.moveTo(padding, yAxis)
  ctx.lineTo(width - padding, yAxis)
  ctx.stroke()

  // Y-axis
  const xAxis = transformX(0, dimensions, config)
  ctx.beginPath()
  ctx.moveTo(xAxis, padding)
  ctx.lineTo(xAxis, height - padding)
  ctx.stroke()

  // Restore the context state
  ctx.restore()
}

export function drawCurve(
  ctx: CanvasRenderingContext2D,
  curveType: CurveType,
  parameters: Partial<CurveParameters>,
  config: RenderConfig
) {
  const { padding, xMin, xMax, yMin, yMax, dimensions } = config
  const { width, height } = dimensions

  // Save the current context state
  ctx.save()

  // Draw offset curves for polynomial
  if (curveType === 'polynomial' && parameters.polynomial) {
    drawOffsetPolynomialCurves(ctx, parameters.polynomial, config);
  }

  // Set up the curve style
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 2
  ctx.beginPath()

  switch (curveType) {
    case 'polynomial': {
      if (!parameters.polynomial) return
      const { coefficients } = parameters.polynomial
      let first = true
      for (let x = xMin; x <= xMax; x += 0.01) {
        const y = evaluatePolynomial(x, coefficients)
        const px = transformX(x, dimensions, config)
        const py = transformY(y, dimensions, config)
        if (first) {
          ctx.moveTo(px, py)
          first = false
        } else {
          ctx.lineTo(px, py)
        }
      }
      break
    }

    case 'bezier': {
      if (!parameters.bezier) return
      const { controlPoints } = parameters.bezier
      let first = true
      for (let t = 0; t <= 1; t += 0.01) {
        const point = evaluateBezier(t, controlPoints)
        const px = transformX(point.x, dimensions, config)
        const py = transformY(point.y, dimensions, config)
        if (first) {
          ctx.moveTo(px, py)
          first = false
        } else {
          ctx.lineTo(px, py)
        }
      }
      break
    }

    case 'parametric': {
      if (!parameters.parametric) return
      const { tMin, tMax, xFunction, yFunction, xScale, yScale } = parameters.parametric
      let first = true
      for (let t = tMin; t <= tMax; t += 0.01) {
        const x = evaluateParametricFunction(t, xFunction, xScale)
        const y = evaluateParametricFunction(t, yFunction, yScale)
        const px = transformX(x, dimensions, config)
        const py = transformY(y, dimensions, config)
        if (first) {
          ctx.moveTo(px, py)
          first = false
        } else {
          ctx.lineTo(px, py)
        }
      }
      break
    }

    case 'trigonometric': {
      if (!parameters.trigonometric) return
      const { amplitude, frequency, phase } = parameters.trigonometric
      let first = true
      for (let x = xMin; x <= xMax; x += 0.01) {
        const y = amplitude * Math.sin(frequency * x + phase)
        const px = transformX(x, dimensions, config)
        const py = transformY(y, dimensions, config)
        if (first) {
          ctx.moveTo(px, py)
          first = false
        } else {
          ctx.lineTo(px, py)
        }
      }
      break
    }

    case 'exponential': {
      if (!parameters.exponential) return
      const { base, coefficient, verticalShift } = parameters.exponential
      let first = true
      for (let x = xMin; x <= xMax; x += 0.01) {
        const y = coefficient * Math.pow(base, x) + verticalShift
        const px = transformX(x, dimensions, config)
        const py = transformY(y, dimensions, config)
        if (first) {
          ctx.moveTo(px, py)
          first = false
        } else {
          ctx.lineTo(px, py)
        }
      }
      break
    }
  }

  ctx.stroke()

  // Restore the context state
  ctx.restore()
}

export function drawControlPoints(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  config: RenderConfig
) {
  // Save the current context state
  ctx.save()

  // Draw control points
  ctx.fillStyle = '#3b82f6'
  ctx.strokeStyle = '#2563eb'
  ctx.lineWidth = 2

  points.forEach((point) => {
    const px = transformX(point.x, config.dimensions, config)
    const py = transformY(point.y, config.dimensions, config)
    ctx.beginPath()
    ctx.arc(px, py, 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  })

  // Draw control lines
  ctx.strokeStyle = '#93c5fd'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(
    transformX(points[0].x, config.dimensions, config),
    transformY(points[0].y, config.dimensions, config)
  )
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(
      transformX(points[i].x, config.dimensions, config),
      transformY(points[i].y, config.dimensions, config)
    )
  }
  ctx.stroke()

  // Restore the context state
  ctx.restore()
}

export function drawOffsetPolynomialCurves(
  ctx: CanvasRenderingContext2D,
  params: PolynomialParameters,
  config: RenderConfig
) {
  const { padding, xMin, xMax, dimensions } = config;
  const { coefficients, offsetStep = 0.5, offsetCount = 20 } = params;
  
  // Save the current context state
  ctx.save();
  
  // Set up the offset curve style
  ctx.lineWidth = 1;
  
  // Draw curves both above and below the main curve
  for (let i = -offsetCount; i <= offsetCount; i++) {
    if (i === 0) continue; // Skip the main curve as it will be drawn separately
    
    // Calculate color based on distance from main curve
    const opacity = Math.max(0.05, 1 - Math.abs(i) / offsetCount);
    ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
    
    const offset = i * offsetStep;
    ctx.beginPath();
    
    let first = true;
    for (let x = xMin; x <= xMax; x += 0.01) {
      const y = evaluatePolynomial(x, coefficients) + offset;
      const px = transformX(x, dimensions, config);
      const py = transformY(y, dimensions, config);
      
      if (first) {
        ctx.moveTo(px, py);
        first = false;
      } else {
        ctx.lineTo(px, py);
      }
    }
    
    ctx.stroke();
  }
  
  // Restore the context state
  ctx.restore();
} 