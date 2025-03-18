# Curve Explorer

A modern, interactive web application for exploring and visualizing mathematical curves. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Interactive visualization of various mathematical curves:
  - Polynomial curves
  - Bézier curves
  - Parametric curves
  - Trigonometric functions
  - Exponential functions
- Real-time parameter adjustment
- Mathematical formula display
- Educational information and applications
- Responsive design
- Dark/light theme support

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Canvas Rendering**: HTML5 Canvas API

## Project Structure

```
app/
├── components/         # React components
│   ├── CurveCanvas.tsx    # Main canvas for curve rendering
│   ├── ParameterPanel.tsx # Curve parameter controls
│   ├── CurveSelector.tsx  # Curve type selection
│   ├── FunctionDisplay.tsx # Mathematical formula display
│   ├── InfoPanel.tsx      # Educational information
│   └── ThemeProvider.tsx  # Theme management
├── types/             # TypeScript type definitions
├── lib/              # Utility functions and helpers
├── hooks/            # Custom React hooks
└── styles/           # Global styles
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Select a curve type from the sidebar
2. Adjust parameters using the control panel
3. View the mathematical formula and educational information
4. Interact with the curve visualization in the main canvas

## Development

- The application uses TypeScript for type safety
- Components are built using React functional components and hooks
- Styling is done with Tailwind CSS for responsive design
- Canvas rendering is optimized for performance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 