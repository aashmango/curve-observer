'use client'

import * as React from 'react'
import { CurveParameters, CurveType, Point } from '../types/curves'
import { setupCanvas, getCanvasContext, inverseTransformX, inverseTransformY } from '../lib/canvasUtils'
import { drawGrid, drawCurve, drawControlPoints } from '../lib/curveRendering'
import { distanceToLineSegment } from '../lib/curveCalculations'

interface CurveCanvasProps {
  curveType: CurveType
  parameters: Partial<CurveParameters>
  onParameterChange: (params: Partial<CurveParameters>) => void
}

export default function CurveCanvas({ curveType, parameters, onParameterChange }: CurveCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })
  const [draggingPoint, setDraggingPoint] = React.useState<{ index: number; point: Point } | null>(null)

  const padding = 60
  const xMin = -10
  const xMax = 10
  const yMin = -10
  const yMax = 10

  const config = {
    padding,
    xMin,
    xMax,
    yMin,
    yMax,
    dimensions,
  }

  const updateCanvasDimensions = React.useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const scale = window.devicePixelRatio
      const width = rect.width
      const height = rect.height

      // Set the canvas dimensions to match the display size
      canvasRef.current.width = width
      canvasRef.current.height = height

      // Update the dimensions state with the actual display size
      setDimensions({ width, height })
    }
  }, [])

  React.useEffect(() => {
    updateCanvasDimensions()
    window.addEventListener('resize', updateCanvasDimensions)

    return () => window.removeEventListener('resize', updateCanvasDimensions)
  }, [updateCanvasDimensions])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (curveType !== 'bezier' || !parameters.bezier) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = inverseTransformX(e.clientX - rect.left, dimensions, config)
    const y = inverseTransformY(e.clientY - rect.top, dimensions, config)

    const { controlPoints } = parameters.bezier
    const pointIndex = controlPoints.findIndex((point) => {
      const dx = point.x - x
      const dy = point.y - y
      return Math.sqrt(dx * dx + dy * dy) < 0.5
    })

    if (pointIndex !== -1) {
      setDraggingPoint({ index: pointIndex, point: controlPoints[pointIndex] })
    }
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (curveType !== 'bezier' || !parameters.bezier) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = inverseTransformX(e.clientX - rect.left, dimensions, config)
    const y = inverseTransformY(e.clientY - rect.top, dimensions, config)

    const { controlPoints } = parameters.bezier
    const newPoint = { x, y }

    // Find the closest line segment to insert the new point
    let minDist = Infinity
    let insertIndex = 0

    for (let i = 0; i < controlPoints.length - 1; i++) {
      const p1 = controlPoints[i]
      const p2 = controlPoints[i + 1]
      const dist = distanceToLineSegment(x, y, p1.x, p1.y, p2.x, p2.y)
      if (dist < minDist) {
        minDist = dist
        insertIndex = i + 1
      }
    }

    // If no line segments found, append to the end
    if (controlPoints.length === 0) {
      insertIndex = 0
    }

    const newPoints = [...controlPoints]
    newPoints.splice(insertIndex, 0, newPoint)

    onParameterChange({
      bezier: {
        ...parameters.bezier,
        controlPoints: newPoints,
      },
    })
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (curveType !== 'bezier' || !parameters.bezier) return

    e.preventDefault()

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = inverseTransformX(e.clientX - rect.left, dimensions, config)
    const y = inverseTransformY(e.clientY - rect.top, dimensions, config)

    const { controlPoints } = parameters.bezier
    const pointIndex = controlPoints.findIndex((point) => {
      const dx = point.x - x
      const dy = point.y - y
      return Math.sqrt(dx * dx + dy * dy) < 0.5
    })

    if (pointIndex !== -1 && controlPoints.length > 2) {
      const newPoints = [...controlPoints]
      newPoints.splice(pointIndex, 1)

      onParameterChange({
        bezier: {
          ...parameters.bezier,
          controlPoints: newPoints,
        },
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggingPoint || !parameters.bezier) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = inverseTransformX(e.clientX - rect.left, dimensions, config)
    const y = inverseTransformY(e.clientY - rect.top, dimensions, config)

    const newPoints = [...parameters.bezier.controlPoints]
    newPoints[draggingPoint.index] = { x, y }

    onParameterChange({
      bezier: {
        ...parameters.bezier,
        controlPoints: newPoints,
      },
    })
  }

  const handleMouseUp = () => {
    setDraggingPoint(null)
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Draw grid
    drawGrid(ctx, config)

    // Draw curve
    drawCurve(ctx, curveType, parameters, config)

    // Draw control points for Bézier curves
    if (curveType === 'bezier' && parameters.bezier) {
      drawControlPoints(ctx, parameters.bezier.controlPoints, config)
    }
  }, [curveType, parameters, dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full rounded-lg border bg-background"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    />
  )
} 