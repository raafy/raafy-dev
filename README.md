# Raafy Dev Portfolio

A modern, multilingual portfolio website built with Next.js 15, featuring automated resume generation and internationalization support.

## Features

- **Multilingual Support**: Full i18n implementation with English and Malay translations
- **Automated PDF Resume**: Dynamic PDF generation with creative styling using @react-pdf/renderer
- **Dark Mode**: System-aware theme with manual toggle support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Animations**: Smooth transitions using Framer Motion
- **SEO Optimized**: Structured data and meta tags for better search visibility
- **Contact Form**: Integrated email functionality using Resend API
- **Type-Safe**: Full TypeScript implementation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **PDF Generation**: @react-pdf/renderer
- **Internationalization**: next-intl
- **Email**: Resend
- **Icons**: Lucide React
- **Fonts**: Fira Code, Google Sans

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file with the following:

```env
# Resend API for contact form
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── [locale]/          # Locale-based routing
│   └── api/               # API routes (resume download, contact)
├── components/            # React components
│   ├── home/             # Home page components
│   ├── layouts/          # Layout components
│   ├── pdf/              # PDF generation components
│   └── ui/               # Reusable UI components
├── data/                  # Static data (resume.json)
├── i18n/                  # Internationalization config
├── lib/                   # Utility functions
├── messages/              # Translation files
├── public/                # Static assets
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
```

## Key Features

### PDF Resume Generation

The portfolio includes an automated PDF resume generator that:
- Dynamically generates styled PDFs from JSON data
- Supports multiple languages (English/Malay)
- Features creative design with color-coded sections
- Includes progress bars for skill proficiency
- Maintains consistent styling across all pages

### Internationalization

Built-in support for multiple languages:
- Language switcher in navigation
- Locale-based routing
- Translated content for all pages
- Automatic date formatting per locale

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

## Customization

### Resume Data

Edit `data/resume.json` to update your personal information, work experience, skills, and education.

### Translations

Add or modify translations in:
- `messages/en-US.json` for English
- `messages/ms-MY.json` for Malay

### Styling

- Global styles: `styles/globals.css`
- Tailwind config: `tailwind.config.ts`
- PDF styles: `components/pdf/ResumePDF.tsx`

## Deployment

### Vercel (Recommended)

The easiest deployment option:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Environment Variables

Remember to set up environment variables in your deployment platform:
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

## License

MIT License - feel free to use this project as a template for your own portfolio.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://www.framer.com/motion)
- PDF generation powered by [@react-pdf/renderer](https://react-pdf.org)
