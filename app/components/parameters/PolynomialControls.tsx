import * as React from 'react'
import { PolynomialParameters } from '../../types/curves'
import { ParameterSlider } from './ParameterSlider'

interface PolynomialControlsProps {
  parameters: PolynomialParameters
  onParameterChange: (parameters: PolynomialParameters) => void
}

export function PolynomialControls({ parameters, onParameterChange }: PolynomialControlsProps) {
  const { degree, coefficients } = parameters

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Degree</label>
        <select
          value={degree}
          onChange={(e) => {
            onParameterChange({
              ...parameters,
              degree: parseInt(e.target.value),
            })
          }}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          {[1, 2, 3, 4, 5].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Coefficients</label>
        {coefficients.map((coeff, i) => (
          <ParameterSlider
            key={i}
            label={`x${i === 0 ? '' : `^${i}`}`}
            value={coeff}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value) => {
              const newCoeffs = [...coefficients]
              newCoeffs[i] = value
              onParameterChange({
                ...parameters,
                coefficients: newCoeffs,
              })
            }}
          />
        ))}
      </div>
    </div>
  )
} 