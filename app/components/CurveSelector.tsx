'use client'

import * as React from 'react'
import { CurveType } from '../types/curves'

interface CurveSelectorProps {
  selectedCurve: CurveType
  onCurveSelect: (curve: CurveType) => void
}

const curveTypes: { type: CurveType; label: string }[] = [
  { type: 'polynomial', label: 'Polynomial' },
  { type: 'bezier', label: 'Bézier' },
  { type: 'parametric', label: 'Parametric' },
  { type: 'trigonometric', label: 'Trigonometric' },
  { type: 'exponential', label: 'Exponential' },
]

export default function CurveSelector({ selectedCurve, onCurveSelect }: CurveSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Curve Type</label>
      <div className="grid grid-cols-2 gap-2">
        {curveTypes.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onCurveSelect(type)}
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              selectedCurve === type
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
} 