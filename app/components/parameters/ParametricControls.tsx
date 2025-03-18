import * as React from 'react'
import { ParametricParameters } from '../../types/curves'
import { ParameterSlider } from './ParameterSlider'

interface ParametricControlsProps {
  parameters: ParametricParameters
  onParameterChange: (parameters: ParametricParameters) => void
}

export function ParametricControls({ parameters, onParameterChange }: ParametricControlsProps) {
  const { tMin, tMax, xFunction, yFunction, xScale, yScale } = parameters

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">t Min</label>
          <input
            type="number"
            value={tMin}
            onChange={(e) => {
              onParameterChange({
                ...parameters,
                tMin: parseFloat(e.target.value),
              })
            }}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">t Max</label>
          <input
            type="number"
            value={tMax}
            onChange={(e) => {
              onParameterChange({
                ...parameters,
                tMax: parseFloat(e.target.value),
              })
            }}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">X Function</label>
        <select
          value={xFunction}
          onChange={(e) => {
            onParameterChange({
              ...parameters,
              xFunction: e.target.value as any,
            })
          }}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="cos">cos(t)</option>
          <option value="sin">sin(t)</option>
          <option value="t">t</option>
          <option value="t^2">t²</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Y Function</label>
        <select
          value={yFunction}
          onChange={(e) => {
            onParameterChange({
              ...parameters,
              yFunction: e.target.value as any,
            })
          }}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="cos">cos(t)</option>
          <option value="sin">sin(t)</option>
          <option value="t">t</option>
          <option value="t^2">t²</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ParameterSlider
          label="X Scale"
          value={xScale}
          min={0.1}
          max={5}
          step={0.1}
          onChange={(value) => {
            onParameterChange({
              ...parameters,
              xScale: value,
            })
          }}
        />
        <ParameterSlider
          label="Y Scale"
          value={yScale}
          min={0.1}
          max={5}
          step={0.1}
          onChange={(value) => {
            onParameterChange({
              ...parameters,
              yScale: value,
            })
          }}
        />
      </div>
    </div>
  )
} 