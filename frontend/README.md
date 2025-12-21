In order to launch or build a project, you need to add an .env file to the frontend root to define the URL address for the backend.
```dotenv
VITE_API_URL=http://localhost:8000
```
I did this because in the production version requires a public URL so that the end user can communicate with the backend. In developer mode, the well-known localhost is enough.