'use client'

import * as React from 'react'
import { CurveInfo, CurveType } from '../types/curves'

const curveInfo: Record<CurveType, CurveInfo> = {
  polynomial: {
    name: 'Polynomial Curves',
    description: 'Polynomial curves are fundamental mathematical functions expressed as sums of terms, where each term consists of a coefficient multiplied by a variable raised to a non-negative integer power. They form the basis for approximating more complex functions and are essential in numerical methods.',
    details: `
      Polynomial functions are among the most basic and important curves in mathematics. Their behavior is determined by their degree and coefficients:
      
      • Linear (degree 1): Straight lines, used for linear relationships and basic trend lines
      • Quadratic (degree 2): Parabolas, describing projectile motion and optimization problems
      • Cubic (degree 3): S-shaped curves, useful for smooth interpolation and computer graphics
      • Higher degrees: More complex shapes with multiple turning points
      
      The coefficients determine the specific shape, with the highest-degree term dominating the behavior as x approaches infinity.
    `,
    applications: [
      {
        name: 'Data Fitting',
        description: 'Used in regression analysis to find trends in data, with the degree determining the complexity of the fit.'
      },
      {
        name: 'Computer Graphics',
        description: 'Lower-degree polynomials are used for basic shapes and transitions in animation.'
      },
      {
        name: 'Physics Models',
        description: 'Describe trajectories, potential energy functions, and other physical phenomena.'
      }
    ],
    history: 'The study of polynomials dates back to ancient Babylonian mathematics. Major developments came from algebraists like Cardano, who solved the cubic equation, and Galois, who proved that general polynomials of degree 5 or higher cannot be solved algebraically.',
    formula: 'f(x) = a₍ₙ₎x^n + a₍ₙ₋₁₎x^(n-1) + ... + a₍₁₎x + a₍₀₎',
    wikiLink: 'https://en.wikipedia.org/wiki/Polynomial'
  },
  bezier: {
    name: 'Bézier Curves',
    description: 'Bézier curves are parametric curves defined by control points that provide an intuitive way to create smooth curves. They are the foundation of modern vector graphics and computer-aided design.',
    details: `
      Bézier curves are defined by their degree and control points:
      
      • Linear (degree 1): Simple straight lines between two points
      • Quadratic (degree 2): Smooth curves defined by three points
      • Cubic (degree 3): More flexible curves with four control points
      
      The curve always passes through the first and last control points, with the intermediate points acting as "magnets" that pull the curve toward them. This provides an intuitive way to shape the curve.
    `,
    applications: [
      {
        name: 'Typography',
        description: 'Define the shapes of letters in modern digital fonts, allowing smooth scaling.'
      },
      {
        name: 'CAD/CAM',
        description: 'Used in industrial design for creating smooth surfaces and paths for manufacturing.'
      },
      {
        name: 'Animation',
        description: 'Create smooth motion paths and transitions between keyframes.'
      }
    ],
    history: 'Developed by Pierre Bézier at Renault in the 1960s for car body design. The mathematical foundation was earlier work by Paul de Casteljau at Citroën.',
    formula: 'B(t) = Σᵢ₌₀ⁿ Pᵢ(1-t)^(n-i)t^i C(n,i), t ∈ [0,1]',
    wikiLink: 'https://en.wikipedia.org/wiki/B%C3%A9zier_curve'
  },
  spline: {
    name: 'Spline Curves',
    description: 'Piecewise polynomial functions that maintain smoothness between segments.',
    applications: [
      'Data interpolation',
      '3D modeling',
      'Animation paths',
    ],
    formula: 'Varies by spline type',
  },
  parametric: {
    name: 'Parametric Curves',
    description: 'Parametric curves are defined by separate functions for x and y coordinates in terms of a parameter t. This allows for more complex shapes than simple functions and is particularly useful for describing motion.',
    details: `
      Parametric curves offer several advantages:
      
      • Can represent curves that fail the vertical line test
      • Natural for describing motion and trajectories
      • Allow for easy calculation of tangent vectors
      • Can be extended to 3D space
      
      The parameter t often represents time in physical applications, making these curves natural for animation and physics simulations.
    `,
    applications: [
      {
        name: 'Physics',
        description: 'Model particle motion, orbital paths, and other time-dependent phenomena.'
      },
      {
        name: 'Computer Animation',
        description: 'Define complex motion paths for animated objects and camera movements.'
      },
      {
        name: 'Engineering',
        description: 'Design mechanical linkages and describe the motion of robotic arms.'
      }
    ],
    history: 'Parametric equations were first used systematically by Euler in the 18th century. They became essential in computer graphics with the advent of digital design tools.',
    formula: 'x = f(t), y = g(t), t ∈ [a,b]',
    wikiLink: 'https://en.wikipedia.org/wiki/Parametric_equation'
  },
  conic: {
    name: 'Conic Sections',
    description: 'Curves formed by intersecting a cone with a plane.',
    applications: [
      'Planetary orbits',
      'Optics and mirrors',
      'Architecture',
    ],
    formula: 'ax² + bxy + cy² + dx + ey + f = 0',
  },
  trigonometric: {
    name: 'Trigonometric Curves',
    description: 'Trigonometric curves are based on the periodic functions sine and cosine. They are fundamental in describing oscillatory behavior and wave phenomena.',
    details: `
      Key characteristics of trigonometric functions:
      
      • Periodicity: Repeat at regular intervals
      • Bounded: Values stay within fixed limits
      • Smooth: Continuously differentiable
      • Orthogonal: Sine and cosine are perpendicular in function space
      
      The amplitude, frequency, and phase parameters allow these curves to model a wide range of periodic phenomena.
    `,
    applications: [
      {
        name: 'Signal Processing',
        description: 'Analyze and manipulate audio signals, radio waves, and other periodic data.'
      },
      {
        name: 'Physics',
        description: 'Model wave phenomena, oscillations, and electromagnetic fields.'
      },
      {
        name: 'Engineering',
        description: 'Design filters, analyze vibrations, and process communications signals.'
      }
    ],
    history: 'Trigonometric functions were first studied in ancient astronomy and geography. Their modern understanding developed through the work of Euler and Fourier.',
    formula: 'f(x) = A sin(ωx + φ)',
    wikiLink: 'https://en.wikipedia.org/wiki/Trigonometric_functions'
  },
  exponential: {
    name: 'Exponential Curves',
    description: 'Curves where the rate of change is proportional to the current value.',
    applications: [
      'Population growth',
      'Compound interest',
      'Radioactive decay',
    ],
    formula: 'y = ab^x + c',
  },
  special: {
    name: 'Special Curves',
    description: 'Named curves with unique properties and historical significance.',
    applications: [
      'Mathematical modeling',
      'Artistic design',
      'Engineering problems',
    ],
    formula: 'Varies by curve type',
  },
} as const

type InfoPanelProps = {
  curveType: CurveType
}

export default function InfoPanel({ curveType }: InfoPanelProps) {
  const info = curveInfo[curveType]

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-semibold tracking-tight">{info.name}</h3>
          <a
            href={info.wikiLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Wikipedia ↗
          </a>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{info.description}</p>
      </div>

      <div>
        <h4 className="font-medium">Formula</h4>
        <div className="mt-2 rounded-md bg-muted/50 p-3">
          <code className="curve-formula">{info.formula}</code>
        </div>
      </div>

      <div>
        <h4 className="font-medium">Details</h4>
        <div className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
          {info.details}
        </div>
      </div>

      <div>
        <h4 className="font-medium">Applications</h4>
        <div className="mt-2 space-y-4">
          {info.applications.map((app, index) => (
            <div key={index}>
              <h5 className="text-sm font-medium">{app.name}</h5>
              <p className="text-sm text-muted-foreground">{app.description}</p>
            </div>
          ))}
        </div>
      </div>

      {info.history && (
        <div>
          <h4 className="font-medium">Historical Context</h4>
          <p className="mt-2 text-sm text-muted-foreground">{info.history}</p>
        </div>
      )}
    </div>
  )
} 