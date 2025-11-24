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

Appointments persist for the current session via React state; integrate your API by swapping out the context implementation. Tattoos from Tailwind ensure the design adapts from mobile to desktop.

