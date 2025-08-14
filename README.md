# 🐝 Beehave - Family Chore & Allowance Manager

A PWA that lets Queen Bee (parent) assign Pollination Tasks, pay Honey allowance, deduct Stingers, require photo proof, and approve kids' Honey spending requests.

## ✨ Features

- 🍯 **Honey Rewards System** - Gamified allowance system with bee-themed rewards
- 📱 **PWA Support** - Works offline and can be installed on mobile devices
- 📸 **Photo Proof** - Kids capture photos to prove chore completion
- 💰 **Spending Requests** - Kids request to spend honey, parents approve/deny
- 👶 **Kid Mode** - Simplified interface with large touch targets and TTS
- 👨‍👩‍👧‍👦 **Parent Dashboard** - Comprehensive management interface
- 🔒 **Secure Auth** - Supabase Authentication with family management
- 📊 **Analytics** - Track chore completion and spending patterns

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **Backend**: Supabase (Auth, PostgreSQL, Storage)
- **State Management**: TanStack Query
- **Type Safety**: TypeScript (strict mode)
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase project
- Vercel account (for deployment)

### Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd beehave
   npm install
   ```

2. **Supabase Configuration**
   
   a. Create a new Supabase project at [supabase.com](https://supabase.com)
   
   b. Run the database schema:
   ```sql
   -- Copy and run the contents of database/schema.sql in your Supabase SQL editor
   ```
   
   c. Create `.env.local` with your Supabase config:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── test/               # Test utilities and setup
database/               # Supabase database schema
```

## 🔧 Development Workflow

1. **Test-Driven Development** - Write Vitest tests first
2. **Conventional Commits** - Use conventional commit messages
3. **One Feature Per PR** - Keep changes focused
4. **TypeScript Strict** - No `any` types allowed

## 🏗 Data Models

### User
- `id`, `name`, `role` (manager|child), `uiMode` (adult|kid)
- `honeyBalance`, `avatarURL`, `createdAt`, `updatedAt`

### Chore
- `id`, `title`, `description`, `frequency` (daily|weekly|once)
- `honeyValue`, `assigneeId`, `proofPhotoURL`, `status`

### SpendRequest
- `id`, `kidId`, `description`, `costHoney`
- `status` (pending|approved|denied)

### Transaction
- `id`, `userId`, `type` (deposit|deduct|spend)
- `amount`, `reason`, `choreId?`, `spendRequestId?`

## 🗄️ Database Features

- **Row Level Security (RLS)** - Secure data access patterns
- **Real-time subscriptions** - Live updates across devices
- **Automatic backups** - Built-in with Supabase
- **Type-safe queries** - Generated TypeScript types

## 🚀 Deployment

Automatic deployment to Vercel on:
- **Preview**: Any PR to any branch
- **Production**: Merge to `main` branch

### Environment Variables in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 📱 PWA Features

- Offline functionality
- App-like experience
- Push notifications (future)
- Background sync (future)

## 🧪 Testing

- Unit tests with Vitest
- Component tests with React Testing Library
- Type checking with TypeScript
- Lighthouse performance testing

## 🔒 Security

- Row Level Security policies
- JWT-based authentication
- Secure file uploads
- API rate limiting

## 📄 License

MIT License - see LICENSE file for details

---

Built with 🍯 by the Beehave team 