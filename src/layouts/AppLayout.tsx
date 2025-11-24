import { NavLink, Outlet } from 'react-router-dom'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-full text-sm font-medium ${
    isActive ? 'bg-brand-blue text-white' : 'text-slate-600 hover:bg-slate-100'
  }`

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-teal">CareConnect</p>
            <h1 className="text-2xl font-semibold text-brand-gray">Healthcare Portal</h1>
            <p className="text-sm text-slate-500">
              Discover doctors, book appointments, and track your visits.
            </p>
          </div>
          <nav className="flex flex-wrap gap-2">
            <NavLink to="/" className={navLinkClasses} end>
              Doctors
            </NavLink>
            <NavLink to="/appointments" className={navLinkClasses}>
              My Appointments
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

