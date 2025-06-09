# Chord Builder - Backend API

Express API for the chord builder app.


## Local Development

1. Clone and install:
   ```bash
   git clone <repo-url>
   npm install
   ```

2. Add `.env` file:
   ```
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="your-neon-postgres-url"
   AUTH0_DOMAIN=your-domain.auth0.com
   AUTH0_AUDIENCE=https://chord-app-api
   FRONTEND_URL=http://localhost:5173
   ```

3. Set up database:
   ```bash
   npx prisma migrate dev
   ```

4. Start server:
   ```bash
   npm run dev
   ```

## API Endpoints
* `GET /api/sheets` - Get user's sheets
* `POST /api/sheets` - Create sheet
* `PUT /api/sheets/:id` - Update sheet
* `DELETE /api/sheets/:id` - Delete sheet

## Tech Stack
Node.js, Express, TypeScript, Prisma, PostgreSQL, Auth0