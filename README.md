# Orchestor Frontend

A Next.js application for social media content orchestration, built by AgentBunnies for the IBM watsonx Orchestrate Agentic AI Hackathon 2025.

## Tech Stack

### Core Framework & Runtime
- **Next.js** 16.0.3 (React framework with App Router)
- **React** 19.2.0 (UI library)
- **TypeScript** 5.x (Type safety)

### Styling & UI
- **Tailwind CSS** 4.x (Utility-first styling)
- **shadcn/ui** (Component library)
- **Radix UI** (Headless UI primitives)
- **Lucide React** 0.554.0 (Icons)

### Animation & Interactions
- **Framer Motion** 12.23.24 (Animations)
- **Lenis** 1.3.15 (Smooth scrolling)

### State Management & Data Fetching
- **TanStack Query** 5.90.10 (Server state management)
- **TanStack Table** 8.21.3 (Data tables)
- **Axios** 1.13.2 (HTTP client)

### Backend & Authentication
- **Supabase** 2.84.0 (Authentication & database)
- Backend API via [Orchestor Backend](https://github.com/TraFost/orchestor-be)

### Data Processing
- **PapaParse** 5.5.3 (CSV parsing)

## Features

- User authentication via Supabase
- AI-powered content scheduling and optimization
- Multi-platform post management
- Asset verification and validation
- Caption enhancement with AI
- Processing pipeline visualization
- Schedule optimization recommendations
- Repost analytics and recommendations
- Interactive dashboard with analytics

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jiwuuuu/orchestor-hackathon.git
cd orchestor-hackathon
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` (if available)
   - Configure your Supabase URL and keys:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Configure backend API URL:
     - `NEXT_PUBLIC_API_URL`

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── demo/              # Demo pages
│   ├── repost/            # Repost analytics
│   ├── schedule-preview/  # Schedule management
│   └── upload/            # Upload functionality
├── components/            # React components
│   ├── ai/               # AI-powered components
│   ├── dashboard/        # Dashboard components
│   ├── repost/           # Repost components
│   ├── schedule-preview/ # Schedule components
│   ├── sections/         # Landing page sections
│   ├── ui/               # shadcn/ui components
│   └── upload/           # Upload components
├── lib/                  # Utilities and configurations
│   ├── helper/           # Helper functions
│   ├── hooks/            # Custom React hooks
│   └── mock-data/        # Mock data for development
├── providers/            # React context providers
├── services/             # API service layer
└── types/                # TypeScript type definitions
```

## Related Projects

- **Backend Repository**: [Orchestor Backend](https://github.com/TraFost/orchestor-be) - Hono + Supabase API for content orchestration

## Development

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## License

MIT License © 2025 AgentBunnies. See LICENSE for details.
