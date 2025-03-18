import * as React from 'react'
import { BezierParameters, Point } from '../../types/curves'
import { ParameterSlider } from './ParameterSlider'

interface BezierControlsProps {
  parameters: BezierParameters
  onParameterChange: (parameters: BezierParameters) => void
}

export function BezierControls({ parameters, onParameterChange }: BezierControlsProps) {
  const { controlPoints } = parameters

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Control Points</label>
        {controlPoints.map((point, i) => (
          <div key={i} className="space-y-2">
            <div className="text-sm font-medium">Point {i + 1}</div>
            <div className="grid grid-cols-2 gap-4">
              <ParameterSlider
                label="X"
                value={point.x}
                min={-10}
                max={10}
                step={0.1}
                onChange={(value) => {
                  const newPoints = [...controlPoints]
                  newPoints[i] = { ...point, x: value }
                  onParameterChange({
                    ...parameters,
                    controlPoints: newPoints,
                  })
                }}
              />
              <ParameterSlider
                label="Y"
                value={point.y}
                min={-10}
                max={10}
                step={0.1}
                onChange={(value) => {
                  const newPoints = [...controlPoints]
                  newPoints[i] = { ...point, y: value }
                  onParameterChange({
                    ...parameters,
                    controlPoints: newPoints,
                  })
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 