# Frontend Assignment

Tech Stack: React 19, TypeScript Css (v4), Vite, React Icons (`fi`, `hi2`), and Tailwind CSS.

## Quick Start

1. Clone the repository:

   ```bash
   git clone <repo-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Key Implementations

- **Micro-interactions:** Custom quantity-button animations with temporary checkmark feedback after updates.
- **Performance:** Cross-sell carousel navigation tracks scroll state and updates via `requestAnimationFrame` for smooth controls.
- **Maintainability:** Separation of concerns in components and centralized design tokens using CSS variables.

## Features

- Dynamic cart with quantity controls (+/-)
- Subtotal, shipping, and total price calculation
- Free shipping logic from 900 kr
- Cross-sell section with Add to cart
- Empty cart state and responsive modal
