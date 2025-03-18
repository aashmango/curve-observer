export type CurveType = 'polynomial' | 'bezier' | 'parametric' | 'trigonometric' | 'exponential' | 'spline' | 'conic' | 'special'

export interface Point {
  x: number
  y: number
}

export interface PolynomialParameters {
  degree: number
  coefficients: number[]
}

export interface BezierParameters {
  degree: number
  controlPoints: Point[]
}

export interface ParametricParameters {
  tMin: number
  tMax: number
  xFunction: 'cos' | 'sin' | 't' | 't^2'
  yFunction: 'cos' | 'sin' | 't' | 't^2'
  xScale: number
  yScale: number
}

export interface TrigonometricParameters {
  amplitude: number
  frequency: number
  phase: number
}

export interface ExponentialParameters {
  base: number
  coefficient: number
  verticalShift: number
}

export type CurveParameters = {
  polynomial?: PolynomialParameters
  bezier?: BezierParameters
  parametric?: ParametricParameters
  trigonometric?: TrigonometricParameters
  exponential?: ExponentialParameters
}

export type CurveState = {
  type: CurveType
  parameters: Partial<CurveParameters>
}

export type CurveApplication = {
  name: string
  description: string
}

export type CurveInfo = {
  name: string
  description: string
  details: string
  applications: CurveApplication[]
  history?: string
  formula: string
  wikiLink: string
} 