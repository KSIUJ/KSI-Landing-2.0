# KSI-Landing Frontend

Frontend web application for the KSI (Koło Naukowe Informatyków UJ) landing page, created and developed during the **KSI Internship 2025** (_Staż KSI 2025_).

Built with React 19, TypeScript, Vite, React Router 7, Framer Motion, and Tailwind CSS v4.

---

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Local Development](#local-development)
  - [Build and Preview](#build-and-preview)
  - [Docker Compose](#docker-compose)
- [Configuration / Environment Variables](#configuration--environment-variables)
- [Project Structure](#project-structure)
- [Pages Overview](#pages-overview)
- [Admin & Maintenance Guide](#admin--maintenance-guide)
  - [Accessing the Admin Panel](#accessing-the-admin-panel)
  - [Updating the KSI Board](#updating-the-ksi-board)
  - [Updating VIP & Authorities](#updating-vip--authorities)
  - [Adding / Editing News & Projects](#adding--editing-news--projects)
  - [Adding a New Event or Static Service](#adding-a-new-event-or-static-service)
- [Troubleshooting & Tips](#troubleshooting--tips)

---

## Project Description

The frontend provides a modern, responsive, and animated user interface for Koło Naukowe Informatyków UJ (KSI UJ). It displays information about KSI's history, board members, VIPs/supervisors, upcoming events, news, projects, and the KSI-N conference.

This project was realized during the **KSI Internship 2025** to replace the legacy landing page with a modern single-page application (SPA) backed by a FastAPI administrative API.

---

## Tech Stack

- **Core**: React 19, TypeScript, Vite 7
- **Routing**: React Router 7 (`react-router-dom`)
- **Styling**: Tailwind CSS v4, Headless UI, Heroicons, React Icons
- **Animations & Layout**: Framer Motion, Swiper.js
- **Content Rendering**: React Markdown, Remark GFM

---

## Getting Started

### Local Development

1. Ensure you have **Node.js** (v20+ or v22 recommended) installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables (copy `.env.example` to `.env`):
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be running locally at `http://localhost:5173`.

### Build and Preview

To create a production build and preview it locally:

```bash
npm run build
npm run preview
```

### Docker Compose

The frontend contains a multi-stage `Dockerfile` that serves static files using `nginx-unprivileged`:

```bash
docker compose up --build
```

The container listens on port `8001` (configured in `nginx.conf`).

---

## Configuration / Environment Variables

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:8000
```

- `VITE_API_URL` - Base URL of the backend API (FastAPI server). Defaults to `http://localhost:8000`.

---

## Project Structure

```
frontend/
├── public/                 # Static assets (images, logos, favicon)
├── src/
│   ├── admin/              # Admin Panel components, auth context & API calls
│   ├── assets/             # Global assets (images, icons)
│   ├── components/         # Reusable UI components & navigation (Navbar, Footer)
│   ├── pages/              # Main route pages
│   │   ├── About/          # About page, board & VIP cards, history timeline
│   │   ├── Events/         # Events page & grid components
│   │   ├── KsiN/           # KSI-N conference page
│   │   ├── Landing/        # Home/Landing page & hero banner
│   │   ├── News/           # News page with markdown popups
│   │   ├── Projects/       # Projects portfolio page
│   │   └── http.ts         # Public API fetch functions & types
│   ├── api.ts              # API configuration & status check
│   ├── App.tsx             # Root layout component
│   └── main.tsx            # Application entry & React Router setup
├── Dockerfile
├── nginx.conf
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Pages Overview

- **Landing Page (`/`)**: Main entry point showcasing the hero banner, KSI introduction, timeline, static highlights, and featured events.
- **Events (`/events`)**: Overview of major KSI event formats (SFI, KSI-N, company workshops, internal initiatives).
- **News (`/news`)**: Dynamic news list fetched from the backend API `/news`.
- **Projects (`/projects`)**: List of active and past KSI projects fetched from `/projects`.
- **About (`/about`)**: Detailed information about the circle, history, statutes, active **KSI Board**, and **VIP members** (fetched from `/board` and `/vip`).
- **KSI-N (`/ksi-n`)**: Academic conference page listing editions and talk abstracts (fetched from `/ksi-editions`).
- **Admin Panel (`/admin`)**: Secured content management dashboard for administrators.

---

## Admin & Maintenance Guide

### Accessing the Admin Panel

1. Go to `/admin` in your web browser (e.g. `http://localhost:5173/admin`).
2. Log in using the `ADMIN_API_KEY` configured on the backend server.
3. Once authenticated, you will access the CRUD dashboard for managed resources.

### Updating the KSI Board

1. In the Admin Panel (`/admin`), select **About Board**.
2. Perform **Create**, **Update**, or **Delete** operations for board members.
3. **Important Note**: The board UI expects both a **president** and a **vicepresident** to be set in the database. Omitting either role may cause layout render issues.
4. **Photo URLs**: Place photo files in `frontend/public/` (e.g. `frontend/public/images/board/member.jpg`) and provide the path starting with `/` (e.g., `/images/board/member.jpg`).

### Updating VIP & Authorities

1. In the Admin Panel, select **About VIP**.
2. You can manage entries for the following roles:
   - `supervisor` (Opiekun Naukowy)
   - `admin` (Administratorzy)
   - `audit` (Komisja Rewizyjna)
   - `housekeeper` (Gospodarze)
   - `honorary` (Członkowie Honorowi)

### Adding / Editing News & Projects

- **News**: Go to `/admin` -> **News**. Fields support title, description (Markdown formatted), image URL, event date, start time, and location.
- **Projects**: Go to `/admin` -> **Projects**. Fields support name, description, link, image URL, and status (`ongoing`, `completed`, `archived`).

### Adding a New Event or Static Service

- **Dynamic News / Events**: Add them through the Admin Panel under **News**.
- **Static Event Formats (Events Page `/events`)**: Edit `src/pages/Events/data.tsx` to add or update entry cards (`SFI_EVENT`, `KSIN_EVENT`, `COMPANY_EVENTS`, `OTHER_EVENTS`).
- **Static Landing Page Cards / Services**: Modify data structures in `src/pages/Landing/data.tsx` or related components in `src/pages/Landing/`.

---

## Troubleshooting & Tips

- **Images Not Loading**: Ensure image paths start with a leading slash `/` and refer to valid files located inside `frontend/public/`.
- **API Connection Errors**: Check if `VITE_API_URL` in `.env` matches your backend address (default `http://localhost:8000`).
- **Board Render Issue**: Verify via `/admin` that at least one member with `president` and one with `vicepresident` roles exist in the database.
