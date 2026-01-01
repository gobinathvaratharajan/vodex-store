# Overview

A modern, full-featured e-commerce web application built with Next.js 16, React 19, and Redux Toolkit. This project showcases a complete online shopping experience with product listings, filtering, categories, and a marketing dashboard.

## Features

- **🏠 Dynamic Homepage** - Interactive banner carousel, category navigation, and featured products
- **🛍️ Product Listing** - Advanced filtering and sorting with sidebar navigation
- **📦 Product Details** - Individual product pages with detailed information
- **🎯 Category Browsing** - Organized product categories with custom icons
- **🔍 Advanced Filtering** - Real-time product filtering by category, brand, price, and more
- **🎨 Responsive Design** - Mobile-first approach with Tailwind CSS
- **📊 Marketing Dashboard** - Content management system for posts and team members
- **🌙 Dark Mode Support** - Built-in dark mode compatibility
- **🔄 State Management** - Centralized state with Redux Toolkit and Redux Persist
- **🎭 Mock API** - Axios Mock Adapter for simulating backend responses

## Tech Stack

### Core Technologies
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management
- **[React Redux](https://react-redux.js.org/)** - React bindings for Redux
- **[Redux Persist](https://github.com/rt2zz/redux-persist)** - Persist and rehydrate Redux store

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[Embla Carousel](https://www.embla-carousel.com/)** - Lightweight carousel library

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter)** - API mocking

## Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 8.x or higher (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gobinathvaratharajan/vodex-store.git
   cd vodex-store
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm prettier` - Format code with Prettier

## Project Structure

```
vodex/
├── app/                      # Next.js App Router pages
│   ├── categories/          # Category listing page
│   ├── listing/             # Product listing with filters
│   ├── product/[slug]/      # Dynamic product detail pages
│   └── layout.tsx           # Root layout
├── components/              # Reusable UI components
│   ├── ui/                  # Base UI components (carousel, dropdown, etc.)
│   ├── category.tsx         # Category display component
│   ├── feature.tsx          # Featured products
│   └── header.tsx           # Navigation header
├── store/                   # Redux store configuration
│   ├── slices/              # Redux slices
│   └── provider.tsx         # Redux provider
├── services/                # API services
│   ├── api.ts               # API endpoints
│   └── mockAdapter.ts       # Mock data adapter
├── types/                   # TypeScript type definitions
├── constant/                # App constants and icons
├── __mocksData__/           # Mock data for development
└── marketing-dashboard/     # Marketing CMS dashboard
```

## Features in Detail

### Product Listing & Filtering
The listing page provides comprehensive filtering options including:
- Category selection
- Brand filtering
- Price range filtering
- Active filter display with clear functionality
- Responsive sidebar navigation

### Marketing Dashboard
Integrated content management system featuring:
- Post creation and management
- Team member management
- Sidebar navigation
- Responsive dashboard layout

### Mock API Integration
Uses Axios Mock Adapter to simulate backend API responses, making it easy to develop and test without a real backend.

## Dependencies

### Production Dependencies
- **@radix-ui/react-dropdown-menu** (^2.1.16) - Accessible dropdown menus
- **@reduxjs/toolkit** (^2.11.0) - State management toolkit
- **axios** (^1.13.2) - Promise-based HTTP client
- **axios-mock-adapter** (^2.1.0) - Mock API responses
- **clsx** (^2.1.1) - Conditional className utility
- **embla-carousel-react** (^8.6.0) - Carousel component
- **lucide-react** (^0.554.0) - Icon library
- **next** (16.0.10) - React framework
- **react** (19.2.0) - UI library
- **react-redux** (^9.2.0) - Redux React bindings
- **redux-persist** (^6.0.0) - Persist Redux state
- **tailwind-merge** (^3.4.0) - Merge Tailwind classes

### Development Dependencies
- **@tailwindcss/postcss** (^4) - Tailwind CSS processing
- **@types/node**, **@types/react**, **@types/react-dom** - TypeScript types
- **eslint** (^9) & **eslint-config-next** (16.0.10) - Code linting
- **prettier** (^3.6.2) - Code formatting
- **husky** (^9.1.7) - Git hooks
- **typescript** (^5) - TypeScript compiler

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards:
- Run `pnpm lint` before committing
- Use Prettier for code formatting
- Write meaningful commit messages
- Add appropriate TypeScript types

## License

This project is private and proprietary.

## Author

**Gobinath Varatharajan**
- GitHub: [@gobinathvaratharajan](https://github.com/gobinathvaratharajan)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ using Next.js and React
