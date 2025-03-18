'use client'

import * as React from 'react'
import CurveCanvas from './components/CurveCanvas'
import CurveSelector from './components/CurveSelector'
import ParameterPanel from './components/ParameterPanel'
import FunctionDisplay from './components/FunctionDisplay'
import { CurveParameters, CurveType } from './types/curves'

export default function Home() {
  const [curveType, setCurveType] = React.useState<CurveType>('polynomial')
  const [parameters, setParameters] = React.useState<CurveParameters>({
    polynomial: {
      degree: 2,
      coefficients: [1, 0, 0],
    },
    bezier: {
      degree: 2,
      controlPoints: [
        { x: -5, y: -5 },
        { x: 0, y: 5 },
        { x: 5, y: -5 },
      ],
    },
    parametric: {
      tMin: 0,
      tMax: 2 * Math.PI,
      xFunction: 'cos',
      yFunction: 'sin',
      xScale: 1,
      yScale: 1,
    },
    trigonometric: {
      amplitude: 1,
      frequency: 1,
      phase: 0,
    },
    exponential: {
      base: Math.E,
      coefficient: 1,
      verticalShift: 0,
    },
  })

  const handleParameterChange = (newParams: Partial<CurveParameters>) => {
    setParameters((prev) => {
      const updated = { ...prev }
      if (newParams.polynomial) {
        const currentCoeffs = prev.polynomial?.coefficients || []
        const newDegree = newParams.polynomial.degree ?? prev.polynomial?.degree ?? 2
        const newCoeffs = newParams.polynomial.coefficients ?? currentCoeffs
        
        // If degree is increasing, add zeros
        while (newCoeffs.length <= newDegree) {
          newCoeffs.push(0)
        }
        
        // If degree is decreasing, truncate
        if (newCoeffs.length > newDegree + 1) {
          newCoeffs.length = newDegree + 1
        }
        
        updated.polynomial = {
          ...prev.polynomial,
          ...newParams.polynomial,
          coefficients: newCoeffs,
        }
      }
      if (newParams.bezier) {
        updated.bezier = newParams.bezier
      }
      if (newParams.parametric) {
        updated.parametric = newParams.parametric
      }
      if (newParams.trigonometric) {
        updated.trigonometric = newParams.trigonometric
      }
      if (newParams.exponential) {
        updated.exponential = newParams.exponential
      }
      return updated
    })
  }

  return (
    <main className="flex h-screen">
      <div className="w-[400px] border-r bg-muted/10 p-6">
        <CurveSelector
          selectedCurve={curveType}
          onCurveSelect={setCurveType}
        />
        <div className="mt-6 space-y-6">
          <FunctionDisplay
            curveType={curveType}
            parameters={parameters}
          />
          <ParameterPanel
            curveType={curveType}
            parameters={parameters}
            onParameterChange={handleParameterChange}
          />
        </div>
      </div>
      <div className="flex-1 p-6">
        <CurveCanvas
          curveType={curveType}
          parameters={parameters}
          onParameterChange={handleParameterChange}
        />
      </div>
    </main>
  )
} 