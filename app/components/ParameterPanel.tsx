'use client'

import * as React from 'react'
import { CurveParameters, CurveType } from '../types/curves'
import { PolynomialControls } from './parameters/PolynomialControls'
import { BezierControls } from './parameters/BezierControls'
import { ParametricControls } from './parameters/ParametricControls'
import { TrigonometricControls } from './parameters/TrigonometricControls'
import { ExponentialControls } from './parameters/ExponentialControls'

interface ParameterPanelProps {
  curveType: CurveType
  parameters: CurveParameters
  onParameterChange: (parameters: Partial<CurveParameters>) => void
}

const parameterDescriptions = {
  polynomial: {
    degree: 'The highest power of x in the polynomial. Higher degrees allow for more complex curves.',
    coefficients: 'Multipliers for each term. The coefficient of x^n determines the behavior as x approaches infinity.'
  },
  trigonometric: {
    amplitude: 'The height of the wave from the midline to peak.',
    frequency: 'The number of complete cycles per 2π units.',
    phase: 'Horizontal shift of the wave. Positive values shift left, negative right.'
  },
  exponential: {
    base: 'The constant being raised to the power. Values > 1 grow rapidly, 0 < values < 1 decay.',
    coefficient: 'Vertical scaling factor that stretches or compresses the curve.',
    verticalShift: 'Vertical translation of the entire curve.'
  }
} as const

export default function ParameterPanel({ curveType, parameters, onParameterChange }: ParameterPanelProps) {
  const renderControls = () => {
    switch (curveType) {
      case 'polynomial':
        return parameters.polynomial ? (
          <PolynomialControls
            parameters={parameters.polynomial}
            onParameterChange={(newParams) => onParameterChange({ polynomial: newParams })}
          />
        ) : null
      case 'bezier':
        return parameters.bezier ? (
          <BezierControls
            parameters={parameters.bezier}
            onParameterChange={(newParams) => onParameterChange({ bezier: newParams })}
          />
        ) : null
      case 'parametric':
        return parameters.parametric ? (
          <ParametricControls
            parameters={parameters.parametric}
            onParameterChange={(newParams) => onParameterChange({ parametric: newParams })}
          />
        ) : null
      case 'trigonometric':
        return parameters.trigonometric ? (
          <TrigonometricControls
            parameters={parameters.trigonometric}
            onParameterChange={(newParams) => onParameterChange({ trigonometric: newParams })}
          />
        ) : null
      case 'exponential':
        return parameters.exponential ? (
          <ExponentialControls
            parameters={parameters.exponential}
            onParameterChange={(newParams) => onParameterChange({ exponential: newParams })}
          />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Parameters</h2>
      {renderControls()}
    </div>
  )
} 