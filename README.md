# React Template

A production-ready React boilerplate built with **Feature-Sliced Design (FSD)** architecture, custom Webpack 5 configuration, TypeScript, and a full testing setup including unit, integration, and visual regression tests.

## Tech Stack

- **React** 18 + **TypeScript** 5
- **Redux Toolkit** + **React Redux**
- **React Router DOM** v6
- **Axios** for HTTP requests
- **i18next** for internationalization
- **SCSS** via sass-loader
- **Webpack** 5 with custom config
- **Storybook** 8 with Loki for visual regression testing
- **Jest** + **React Testing Library** for unit/integration tests
- **ESLint** + **Prettier** + **Stylelint** for code quality
- **Webpack Bundle Analyzer** for bundle analysis

## Architecture

The project follows **Feature-Sliced Design (FSD)** methodology — a scalable frontend architecture that organizes code into layers and slices:

```
src/
├── app/          # App initialization, providers, styles
├── pages/        # Page components
├── widgets/      # Composite UI blocks
├── features/     # User interactions, business logic
├── entities/     # Business entities
└── shared/       # Reusable code, UI kit, utilities
```

## Getting Started

### Prerequisites

- Node.js >= 16
- npm

### Installation

```bash
git clone https://github.com/Svipestd/react-template.git
cd react-template
npm install
```

### Development

```bash
npm start
```

Starts the Webpack dev server on port 3000.

### Production Build

```bash
npm run build:prod
```

### Development Build

```bash
npm run build:dev
```

## Testing

### Unit & Integration Tests

```bash
npm run test:unit
```

### Visual Regression Tests (Storybook + Loki)

```bash
# Run visual tests
npm run test:ui

# Approve updated screenshots
npm run test:ui:ok

# Run in CI mode
npm run test:ui:ci

# Generate HTML report
npm run test:ui:report
```

## Storybook

```bash
# Start Storybook dev server
npm run storybook

# Build static Storybook
npm run storybook:build
```

## Linting

```bash
# Lint TypeScript/TSX
npm run lint:ts

# Fix TypeScript/TSX lint issues
npm run lint:ts:fix

# Lint SCSS
npm run lint:scss

# Fix SCSS lint issues
npm run lint:scss:fix
```

## Bundle Analysis

The project includes **Webpack Bundle Analyzer** for analyzing bundle size. Enable it in the Webpack config to visualize the output.

## Internationalization

Built-in i18n support via **i18next** with browser language detection and HTTP backend for loading translation files.
