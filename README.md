# Bhupati - Next.js E-commerce Platform

A comprehensive Next.js e-commerce website specializing in PC hardware, components, and custom-built computers. Features an advanced PC builder tool with automatic compatibility checking. Built with a modern orange and black theme. All prices are displayed in Indian Rupees (₹).

## 🚀 Features

### Core E-commerce Features
- **Product Catalog**: Browse CPUs, GPUs, motherboards, RAM, storage, PSUs, cases, and cooling solutions
- **Shopping Cart**: Add/remove items, quantity management, persistent cart storage
- **Product Filtering**: Filter by category, brand, price range, and specifications
- **Search Functionality**: Search products by name, brand, or specifications
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### PC Builder Tool
- **Component Selection**: Choose from all major PC component categories
- **Compatibility Checking**: Automatic validation of component compatibility
- **Build Management**: Save, load, and manage custom PC builds
- **Price Calculation**: Real-time total price calculation
- **Build Summary**: Detailed overview of selected components

### Technical Features
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **State Management**: Zustand for cart and PC builder state
- **UI Components**: Custom components with Radix UI primitives
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with Next.js App Router and Turbopack

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd itkz
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── pc-builder/        # PC builder tool page
│   ├── products/          # Product catalog page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── pc-builder/       # PC builder components
│   ├── product/          # Product-related components
│   └── ui/               # Reusable UI components
├── data/                 # Mock data and constants
├── lib/                  # Utility functions
├── store/               # Zustand stores
└── types/                # TypeScript type definitions
```

## 🎯 Key Components

### Product Management
- **ProductCard**: Individual product display with add-to-cart functionality
- **ProductGrid**: Grid layout for product listings
- **Product filtering and sorting**

### PC Builder
- **PCBuilder**: Main builder interface
- **ComponentSelector**: Component selection modal
- **BuildSummary**: Build overview and compatibility checking

### Shopping Cart
- **Cart management with persistent storage**
- **Quantity adjustment**
- **Price calculation with taxes and shipping**

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add other environment variables as needed
```

### Customization
- **Colors**: Modify CSS variables in `globals.css`
- **Products**: Update mock data in `src/data/products.ts`
- **Categories**: Modify categories in the same file

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Adapted layouts with touch-friendly interfaces
- **Mobile**: Streamlined experience with mobile-first design

## 🛡️ Type Safety

The entire application is built with TypeScript, providing:
- **Type-safe component props**
- **Interface definitions for all data structures**
- **Compile-time error checking**
- **Enhanced developer experience**

## 🔮 Future Enhancements

- **User Authentication**: User accounts and build history
- **Payment Integration**: Stripe/PayPal integration
- **Inventory Management**: Real-time stock tracking
- **Reviews & Ratings**: Customer review system
- **Wishlist**: Save products for later
- **Comparison Tool**: Compare multiple products
- **AR Visualization**: 3D component visualization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

Built by Vijay Suthar using Next.js and modern web technologies.
