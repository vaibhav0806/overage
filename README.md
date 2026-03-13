# Overage

Track project scope drift, calculate unbilled work, and generate professional scope change reports to send to clients.

Built for freelance devs, designers, consultants, and small agencies.

**[overage.app](https://overage.app)**

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Database**: NeonDB (Postgres)
- **ORM**: Drizzle
- **Auth**: Better Auth (email + password)
- **Payments**: DodoPayments
- **Hosting**: Railway
- **Styling**: Tailwind CSS

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a Neon database at [neon.tech](https://neon.tech) (free tier works)

3. Copy `.env.local.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.local.example .env.local
   ```
   ```
   DATABASE_URL=your-neon-connection-string
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   ```
   Generate a secret: `openssl rand -base64 32`

4. Push the database schema:
   ```bash
   npx drizzle-kit push
   ```

5. Run the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to get started.
