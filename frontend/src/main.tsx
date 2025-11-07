import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import LandingPage from "./pages/Landing/LandingPage.tsx";
import EventsPage from "./pages/Events/EventsPage.tsx";
import NewsPage from "./pages/News/NewsPage.tsx";
import ProjectsPage from "./pages/Projects/ProjectsPage.tsx";
import AboutPage from "./pages/About/AboutPage.tsx";
import AdminPanel from "./admin/AdminPanel.tsx";
import AdminDashboard from "./admin/AdminDashboard.tsx";
import { AuthProvider } from "./admin/AuthContext.tsx";
import PrivateRoutes from "./admin/PrivateRoutes.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path="events" element={<EventsPage />} />
      <Route path="news" element={<NewsPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="about" element={<AboutPage />} />

      <Route
        path="admin/*"
        element={
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        }
      >
        <Route index element={<AdminPanel />} />
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
