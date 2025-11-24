## CareConnect Healthcare Portal

Single-page React + Vite + Tailwind CSS experience that showcases a modern doctor discovery and appointment booking flow.

### What’s included
- **Doctor Directory** with responsive cards that show name, specialty, rating, experience, locations, and badges for accepting new patients.
- **Filters & Sorting** for search, specialty dropdown, accepting toggle, and sort (rating/experience/alphabetical).
- **Doctor Detail Page** presenting full bio, conditions treated, fee, languages, and available slots.
- **Booking Modal** with date/time selection, patient info, and success state that updates the in-memory appointment list.
- **My Appointments** page listing all booked visits (doctor, date/time, reason).
- **State Management** powered by a custom React Context (`DoctorsProvider`).

### Tech stack
- Vite + TypeScript
- React 19 with React Router 7
- Tailwind CSS 3.x

### AI Symptom Matching
- Doctor detail pages include an “Ask AI” panel.
- Users enter symptoms (e.g., “headache”, “skin rash”) and receive a rule-based recommendation that checks specialty fit and suggests alternatives.
- Includes quick reference table:
  - Headache → Neurologist
  - Skin rash → Dermatologist
  - Anxiety / Depression → Psychiatrist
  - Fever / throat pain → General Physician

### Data persistence
- Booked appointments are persisted to `localStorage` (`careconnect_appointments`) and automatically rehydrated on load.
- `DoctorsProvider` handles all read/write logic; swap with a backend API when ready.

### Getting started
```bash
cd healthcare-portal
npm install
npm run dev
```
Visit http://localhost:5174.

### Project structure
```
src/
  components/        # UI building blocks (cards, filters, modal)
  data/              # Doctor seed data
  layouts/           # App shell with navigation
  providers/         # Doctors context/state
  screens/           # Route-level pages
  types.ts           # Shared TypeScript types
  routes.tsx         # React Router configuration
  main.tsx           # App entry
```

### Deliverables checklist
- **GitHub repo:** update with your remote URL after pushing (e.g., `https://github.com/your-org/healthcare-portal`).
- **Instructions:** this README (“Getting started”, “Tech stack”, etc.) documents setup and usage.
- **AI Collaboration Log:** see `ai-collab.md` for tooling, prompt history, and reflections.

Appointments, filters, and AI helpers are optimized for mobile-to-desktop layouts with Tailwind utilities.

