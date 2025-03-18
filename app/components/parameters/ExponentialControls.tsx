import * as React from 'react'
import { ExponentialParameters } from '../../types/curves'
import { ParameterSlider } from './ParameterSlider'
import { ParameterTooltip } from './ParameterTooltip'

interface ExponentialControlsProps {
  parameters: ExponentialParameters
  onParameterChange: (parameters: ExponentialParameters) => void
}

const parameterDescriptions = {
  base: 'The constant being raised to the power. Values > 1 grow rapidly, 0 < values < 1 decay.',
  coefficient: 'Vertical scaling factor that stretches or compresses the curve.',
  verticalShift: 'Vertical translation of the entire curve.'
} as const

export function ExponentialControls({ parameters, onParameterChange }: ExponentialControlsProps) {
  const { base, coefficient, verticalShift } = parameters

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <ParameterTooltip
          label="Base"
          description={parameterDescriptions.base}
        />
        <select
          value={base}
          onChange={(e) => {
            onParameterChange({
              ...parameters,
              base: parseFloat(e.target.value),
            })
          }}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value={Math.E}>e</option>
          <option value={2}>2</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="space-y-2">
        <ParameterTooltip
          label="Coefficient"
          description={parameterDescriptions.coefficient}
        />
        <ParameterSlider
          label="Coefficient"
          value={coefficient}
          min={-5}
          max={5}
          step={0.1}
          onChange={(value) => {
            onParameterChange({
              ...parameters,
              coefficient: value,
            })
          }}
        />
      </div>
      <div className="space-y-2">
        <ParameterTooltip
          label="Vertical Shift"
          description={parameterDescriptions.verticalShift}
        />
        <ParameterSlider
          label="Vertical Shift"
          value={verticalShift}
          min={-5}
          max={5}
          step={0.1}
          onChange={(value) => {
            onParameterChange({
              ...parameters,
              verticalShift: value,
            })
          }}
        />
      </div>
    </div>
  )
} 