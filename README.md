# TaskNew

Production-ready Vite + React app using DummyJSON APIs for auth, profile, products list (with pagination), and product detail.

## Features

- Login with email or username + password
- Protected routes (redirect to login when unauthorized)
- Logged-in user profile via token
- Paginated products list
- Product details page
- Tailwind CSS styling

## Environment

Create `.env` in the project root:

```env
VITE_API_URL=https://dummyjson.com
```

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Demo Credentials

- Username: `michaelw`
- Password: `michaelwpass`

## Project Structure

```text
TaskNew/
├─ package.json
├─ index.html
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ .gitignore
├─ .env
├─ README.md
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ styles/
   │  └─ global.css
   ├─ context/
   │  └─ AuthContext.jsx
   ├─ components/
   │  └─ ProtectedRoute.jsx
   ├─ services/
   │  └─ api.js
   └─ pages/
      ├─ Login.jsx
      ├─ Dashboard.jsx
      ├─ Profile.jsx
      ├─ Products.jsx
      └─ ProductDetail.jsx
```
