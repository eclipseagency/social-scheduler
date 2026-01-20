# SocialFlow - Social Media Management Platform

A production-ready, scalable social media management platform built with Next.js 16, TypeScript, and modern web technologies. Manage multiple clients, schedule posts across platforms with different times, and leverage AI for caption generation.

## Features

### User Roles & Authentication
- **Admin**: Full access to manage clients, moderators, view all dashboards, and system settings
- **Moderator**: Upload media, schedule posts, generate AI captions (no system settings access)
- Email & password authentication with NextAuth
- Role-based access control with protected routes
- JWT-based session management

### Clients Management
- Create, edit, and delete client accounts
- Each client includes:
  - Name and company information
  - **Brand tone** (Professional, Friendly, Casual, Formal, Humorous, Inspirational, Sales-Driven, Educational)
  - Connected social platforms (Instagram, Facebook, LinkedIn)
  - Industry and website information
- Client-specific dashboards with posts overview and analytics

### Post Scheduler
- Upload images or videos
- Select one or more platforms per post
- **Platform-specific scheduling** - Set different date & time per platform
- Manage and store platform-specific schedules
- Edit posts before publishing
- Post statuses: Draft, Scheduled, Posted, Failed

### AI Caption Generator
- Powered by **OpenAI API** (with intelligent fallback for development)
- Generate captions based on:
  - Client brand tone
  - Selected platforms
  - Topic/context
  - Image descriptions
- Platform-specific caption optimization (Instagram, Facebook, LinkedIn)
- Automatic hashtag generation
- Caption history to avoid repetition

### Calendar View
- Visual calendar of all scheduled posts
- Filter by client
- Click to view/edit scheduled posts
- Platform and status indicators
- Easy navigation between months

### Post Status System
- Track post status per platform:
  - **Scheduled**: Post is queued for publishing
  - **Posted**: Successfully published (mocked)
  - **Failed**: Publishing failed (mocked)
- Prepared for real social media API integration

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript
- **Styling**: TailwindCSS v4
- **Backend**: API Routes / Server Actions
- **Database**: SQLite (via better-sqlite3, easily switchable to PostgreSQL)
- **ORM**: Prisma 7
- **Authentication**: NextAuth.js
- **AI**: OpenAI API
- **State Management**: Server-first approach

## Database Models

```
User            - Admin and Moderator accounts with role-based access
Client          - Brand/company profiles with brand tone
SocialPlatform  - Instagram, Facebook, LinkedIn configurations
SocialAccount   - Client-platform connections with OAuth tokens
Post            - Content to be published
PlatformSchedule- Per-platform scheduling with individual timestamps
MediaAsset      - Uploaded files and media
CaptionHistory  - AI caption tracking for uniqueness
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/eclipseagency/social-scheduler.git
cd social-scheduler
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Create .env.local file
touch .env.local
```

Add to `.env.local`:
```env
NEXTAUTH_SECRET=your-secret-key-here-generate-random-string
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-api-key  # Optional - uses fallback without it
```

4. **Set up the database:**
```bash
npm run db:push    # Create database tables
npm run db:seed    # Seed with sample data
```

5. **Start the development server:**
```bash
npm run dev
```

6. **Open [http://localhost:3000](http://localhost:3000)**

### Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@socialscheduler.com | admin123 |
| Moderator | moderator@socialscheduler.com | moderator123 |

## Project Structure

```
social-scheduler/
├── app/
│   ├── (dashboard)/              # Dashboard route group (protected)
│   │   └── dashboard/
│   │       ├── page.tsx          # Main dashboard
│   │       ├── clients/          # Clients management
│   │       │   ├── page.tsx      # Clients list
│   │       │   ├── new/          # Create client
│   │       │   └── [id]/         # Client dashboard
│   │       ├── posts/            # Posts management
│   │       │   ├── page.tsx      # Posts list
│   │       │   └── new/          # Create post
│   │       ├── calendar/         # Calendar view
│   │       └── ai-caption/       # AI caption generator
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth routes
│   │   ├── register/             # User registration
│   │   ├── clients/              # Clients CRUD API
│   │   ├── posts/                # Posts CRUD + publish API
│   │   └── ai/generate-caption/  # AI caption generation
│   ├── components/
│   │   └── dashboard/            # Dashboard components
│   │       ├── Sidebar.tsx
│   │       ├── DashboardHeader.tsx
│   │       └── DashboardLayout.tsx
│   ├── lib/
│   │   ├── auth.ts               # Auth configuration & helpers
│   │   └── prisma.ts             # Prisma client
│   ├── login/                    # Login page
│   └── types/                    # TypeScript declarations
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeding
│   └── dev.db                    # SQLite database
└── public/                       # Static assets
```

## API Routes

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/[...nextauth]` | NextAuth endpoints |
| POST | `/api/register` | User registration |

### Clients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/clients` | List all clients |
| POST | `/api/clients` | Create new client |
| GET | `/api/clients/[id]` | Get client details |
| PUT | `/api/clients/[id]` | Update client |
| DELETE | `/api/clients/[id]` | Delete client |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | List all posts |
| POST | `/api/posts` | Create new post |
| GET | `/api/posts/[id]` | Get post details |
| PUT | `/api/posts/[id]` | Update post |
| DELETE | `/api/posts/[id]` | Delete post |
| POST | `/api/posts/[id]/publish` | Publish post (mock) |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/generate-caption` | Generate AI caption |

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset and reseed database
```

## Extending for Real Social Media APIs

The platform is prepared for real social media API integration. To connect actual platforms:

### Instagram/Facebook (Meta Graph API)
1. Register app at [Meta for Developers](https://developers.facebook.com/)
2. Implement OAuth flow in `/api/auth/instagram` and `/api/auth/facebook`
3. Update `SocialAccount` with real access tokens
4. Implement publish logic in `/api/posts/[id]/publish`

### LinkedIn API
1. Register app at [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Implement OAuth flow in `/api/auth/linkedin`
3. Update publish logic for LinkedIn's Share API

### Integration Points (TODO)

```typescript
// In /api/posts/[id]/publish/route.ts
// Replace mockPublishToplatform() with actual API calls:

async function publishToInstagram(accessToken: string, content: Post) {
  // TODO: Implement Instagram Graph API posting
}

async function publishToFacebook(accessToken: string, content: Post) {
  // TODO: Implement Facebook Graph API posting
}

async function publishToLinkedIn(accessToken: string, content: Post) {
  // TODO: Implement LinkedIn Share API posting
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_SECRET` | Random string for JWT encryption | Yes |
| `NEXTAUTH_URL` | Your app URL (e.g., http://localhost:3000) | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | No* |

*AI features will use intelligent fallback responses without an API key.

## Design

The application features a modern, premium design with:
- Soft purple (#8B5CF6) and pink (#EC4899) gradient accents
- Glass morphism effects
- Dark theme optimized for content creation
- Responsive layout for all devices
- Smooth animations and transitions

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Docker
```bash
docker build -t social-scheduler .
docker run -p 3000:3000 social-scheduler
```

## Future Improvements

- [ ] Real social media API integrations
- [ ] Email notifications for scheduled posts
- [ ] Analytics dashboard with engagement metrics
- [ ] Team collaboration features
- [ ] Bulk post scheduling
- [ ] Content templates library
- [ ] Media library management
- [ ] Webhook integrations

## License

MIT License - See LICENSE file for details

## Support

For support, please open an issue in the GitHub repository.
