'use client'

import * as React from 'react'
import { CurveState, CurveType, CurveParameters } from '../types/curves'

type CurveContextType = {
  curveState: CurveState
  setCurveType: (type: CurveType) => void
  setParameters: (params: Partial<CurveParameters>) => void
}

const CurveContext = React.createContext<CurveContextType | undefined>(undefined)

export function CurveProvider({ children }: { children: React.ReactNode }) {
  const [curveState, setCurveState] = React.useState<CurveState>({
    type: 'polynomial',
    parameters: {
      polynomial: {
        degree: 2,
        coefficients: [1, 0, 0], // x²
      },
    },
  })

  const setCurveType = React.useCallback((type: CurveType) => {
    setCurveState((prev) => ({
      type,
      parameters: {},
    }))
  }, [])

  const setParameters = React.useCallback((params: Partial<CurveParameters>) => {
    setCurveState((prev) => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        ...params,
      },
    }))
  }, [])

  const value = React.useMemo(
    () => ({
      curveState,
      setCurveType,
      setParameters,
    }),
    [curveState, setCurveType, setParameters]
  )

  return <CurveContext.Provider value={value}>{children}</CurveContext.Provider>
}

export function useCurve() {
  const context = React.useContext(CurveContext)
  if (context === undefined) {
    throw new Error('useCurve must be used within a CurveProvider')
  }
  return context
} 