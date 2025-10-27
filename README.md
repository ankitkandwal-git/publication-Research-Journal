# Publication Project

This project contains the S.P.A.C.E. Publication website with separate frontend and backend.

## Structure

- **frontend/** - React application
- **backend/** - Express.js server for certificate uploads

## Frontend (React App)

```bash
cd frontend
npm install
npm start
```

Runs on http://localhost:3000

## Backend (Express Server)

```bash
cd backend
npm install
npm start
```

Runs on http://localhost:3001

## Deployment

- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Cyclic/Render/Railway

## Environment Variables

Frontend needs `REACT_APP_API_URL` pointing to the deployed backend URL.
