# SocialFlow - Social Media Management Platform

A premium social media management platform for managing multiple clients, scheduling posts, and generating AI-powered captions.

## Features

- **Client Management** - Add and manage multiple clients with their own profiles, logos, and dashboards
- **Multi-Platform Support** - Schedule and publish to Instagram, Facebook, and LinkedIn
- **AI-Powered Captions** - Generate unique, engaging captions using Claude AI
- **Smart Scheduling** - Schedule posts in advance with automatic publishing
- **Content Calendar** - Visual calendar to plan content strategy
- **Media Library** - Upload and organize design images for posts
- **Client Dashboards** - Each client gets their own private dashboard

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: Anthropic Claude API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-scheduler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Claude AI API Key (get from https://console.anthropic.com)
   ANTHROPIC_API_KEY="your-anthropic-api-key"

   # Contact Email
   CONTACT_EMAIL="your-email@gmail.com"
   ```

4. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite database URL | Yes |
| `NEXTAUTH_URL` | Your app URL | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth sessions | Yes |
| `ANTHROPIC_API_KEY` | Claude AI API key for caption generation | Yes |
| `CONTACT_EMAIL` | Email for contact form submissions | No |

## Project Structure

```
social-scheduler/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth authentication
│   │   ├── clients/      # Client CRUD operations
│   │   ├── posts/        # Post management
│   │   ├── ai/           # AI caption generation
│   │   └── contact/      # Contact form submissions
│   ├── components/       # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ChatBot.tsx
│   │   ├── ClientLogoCard.tsx
│   │   └── ContactSection.tsx
│   ├── dashboard/        # Admin dashboard pages
│   ├── client-dashboard/ # Client dashboard pages
│   ├── login/            # Authentication page
│   ├── about/            # About page
│   ├── lib/              # Utilities and configurations
│   ├── globals.css       # Global styles and theme
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── prisma/
│   └── schema.prisma     # Database schema
└── public/
    └── uploads/          # Uploaded media files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design

The application features a modern, premium design with:
- Soft purple and pink gradient backgrounds
- Glass morphism effects
- Smooth animations and transitions
- Dark theme optimized for content creation

## Deployment

The app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Future Improvements

- [ ] Real social media API integrations (Instagram Graph API, Facebook API, LinkedIn API)
- [ ] Email notifications for scheduled posts
- [ ] Analytics dashboard with engagement metrics
- [ ] Team collaboration features
- [ ] Bulk post scheduling
- [ ] Content templates

## License

MIT License
