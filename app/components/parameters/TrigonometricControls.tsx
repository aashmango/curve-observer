import * as React from 'react'
import { TrigonometricParameters } from '../../types/curves'
import { ParameterSlider } from './ParameterSlider'
import { ParameterTooltip } from './ParameterTooltip'

interface TrigonometricControlsProps {
  parameters: TrigonometricParameters
  onParameterChange: (parameters: TrigonometricParameters) => void
}

const parameterDescriptions = {
  amplitude: 'The height of the wave from the midline to peak.',
  frequency: 'The number of complete cycles per 2π units.',
  phase: 'Horizontal shift of the wave. Positive values shift left, negative right.'
} as const

export function TrigonometricControls({ parameters, onParameterChange }: TrigonometricControlsProps) {
  const { amplitude, frequency, phase } = parameters

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <ParameterTooltip
          label="Amplitude"
          description={parameterDescriptions.amplitude}
        />
        <ParameterSlider
          label="Amplitude"
          value={amplitude}
          min={0.1}
          max={5}
          step={0.1}
          onChange={(value) => {
            onParameterChange({
              ...parameters,
              amplitude: value,
            })
          }}
        />
      </div>
      <div className="space-y-2">
        <ParameterTooltip
          label="Frequency"
          description={parameterDescriptions.frequency}
        />
        <ParameterSlider
          label="Frequency"
          value={frequency}
          min={0.1}
          max={5}
          step={0.1}
          onChange={(value) => {
            onParameterChange({
              ...parameters,
              frequency: value,
            })
          }}
        />
      </div>
      <div className="space-y-2">
        <ParameterTooltip
          label="Phase"
          description={parameterDescriptions.phase}
        />
        <ParameterSlider
          label="Phase"
          value={phase}
          min={-Math.PI}
          max={Math.PI}
          step={0.1}
          onChange={(value) => {
            onParameterChange({
              ...parameters,
              phase: value,
            })
          }}
        />
      </div>
    </div>
  )
} 