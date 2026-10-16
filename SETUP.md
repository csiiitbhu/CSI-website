# Registration backend (Express + MongoDB)

## 1. Create a free MongoDB Atlas database
1. Sign up at https://www.mongodb.com/cloud/atlas and create a free (M0) cluster.
2. Database Access -> Add New Database User -> choose a username and password (letters and numbers only is easiest).
3. Network Access -> Add IP Address -> "Allow access from anywhere" (0.0.0.0/0). Needed so your hosted server can connect.
4. Clusters -> Connect -> Drivers -> copy the connection string. Replace <password> with your user's password.

## 2. Run the backend locally
    cd server
    copy .env.example .env      (Mac/Linux: cp .env.example .env)
Open `server/.env` and fill in MONGODB_URI (from step 1) and ADMIN_KEY (any secret you make up). Then:

    npm install
    npm run dev                 # http://localhost:4000

You should see "Connected to MongoDB". Registrations appear in Atlas under Browse Collections -> csi -> registrations.

## 3. Connect the website in development
Add this to `vite.config.ts` so `/api` reaches the backend:

    server: { proxy: { '/api': 'http://localhost:4000' } }

## 4. See the registrations
    curl.exe -H "x-admin-key: YOUR_ADMIN_KEY" http://localhost:4000/api/registrations
    curl.exe -H "x-admin-key: YOUR_ADMIN_KEY" -o registrations.csv "http://localhost:4000/api/registrations.csv"

## 5. Going live
Host the `server` folder on a Node host (Render, Railway, ...). Set these environment variables there:
MONGODB_URI, ADMIN_KEY, and CORS_ORIGIN (your website address, e.g. https://csi.example.com).
Start command: `npm start`. Then build the website with VITE_API_URL set to the server's address.
