'use client'

import * as React from 'react'
import katex from 'katex'
import { CurveParameters, CurveType } from '../types/curves'

interface FunctionDisplayProps {
  curveType: CurveType
  parameters: CurveParameters
}

export default function FunctionDisplay({ curveType, parameters }: FunctionDisplayProps) {
  const [latex, setLatex] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!containerRef.current) return

    let formula = ''
    switch (curveType) {
      case 'polynomial': {
        if (!parameters.polynomial) return
        const { coefficients } = parameters.polynomial
        const terms = coefficients.map((coeff, i) => {
          if (coeff === 0) return ''
          const sign = coeff >= 0 ? '+' : '-'
          const absCoeff = Math.abs(coeff)
          const coeffStr = absCoeff === 1 ? '' : absCoeff.toString()
          const power = i === 0 ? '' : `x${i === 1 ? '' : `^${i}`}`
          return `${sign}${coeffStr}${power}`
        })
        formula = terms.join('').replace(/^\+/, '')
        break
      }
      case 'trigonometric': {
        if (!parameters.trigonometric) return
        const { amplitude, frequency, phase } = parameters.trigonometric
        const freqStr = frequency === 1 ? '' : frequency.toString()
        const phaseStr = phase === 0 ? '' : ` + ${phase}`
        formula = `${amplitude}\\sin(${freqStr}x${phaseStr})`
        break
      }
      case 'exponential': {
        if (!parameters.exponential) return
        const { base, coefficient, verticalShift } = parameters.exponential
        const coeffStr = coefficient === 1 ? '' : coefficient.toString()
        const shiftStr = verticalShift === 0 ? '' : ` + ${verticalShift}`
        formula = `${coeffStr}${base === Math.E ? 'e' : base.toString()}^x${shiftStr}`
        break
      }
      case 'parametric': {
        if (!parameters.parametric) return
        const { xFunction, yFunction, xScale, yScale } = parameters.parametric
        const xScaleStr = xScale === 1 ? '' : xScale.toString()
        const yScaleStr = yScale === 1 ? '' : yScale.toString()
        formula = `\\begin{cases} x = ${xScaleStr}\\${xFunction}(t) \\\\ y = ${yScaleStr}\\${yFunction}(t) \\end{cases}`
        break
      }
      case 'bezier': {
        if (!parameters.bezier) return
        const { controlPoints } = parameters.bezier
        formula = `\\text{Bézier curve with ${controlPoints.length} control points}`
        break
      }
    }

    try {
      katex.render(formula, containerRef.current, {
        displayMode: true,
        throwOnError: false,
      })
      setLatex(formula)
    } catch (error) {
      console.error('Error rendering LaTeX:', error)
    }
  }, [curveType, parameters])

  return (
    <div className="rounded-lg border bg-background p-4">
      <h3 className="mb-2 text-sm font-medium">Function</h3>
      <div ref={containerRef} className="text-center" />
    </div>
  )
} 