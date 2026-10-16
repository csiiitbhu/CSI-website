# Registration backend: setup

## 1. Start the backend (new `server/` folder)
    cd server
    npm install
    ADMIN_KEY=choose-a-long-secret npm start      # runs on http://localhost:4000
(Windows PowerShell: `$env:ADMIN_KEY="choose-a-long-secret"; npm start`)

Registrations are saved in `server/data/registrations.db` (SQLite).

## 2. Connect the website in development
Add this proxy to your `vite.config.ts` so `/api` reaches the backend:

    server: { proxy: { '/api': 'http://localhost:4000' } }

## 3. See the registrations
    curl -H "x-admin-key: choose-a-long-secret" http://localhost:4000/api/registrations
    curl -H "x-admin-key: choose-a-long-secret" -o registrations.csv "http://localhost:4000/api/registrations.csv?eventId=sample-upcoming-event"

## 4. Production
Run `npm run build` in the site root, then start the server: it serves `dist/` and the API together.
If the API is on a different domain, set `VITE_API_URL=https://api.example.com` when building,
and start the server with `CORS_ORIGIN=https://your-site.com`.
