import type { Filters } from '../types'

interface DoctorFiltersProps {
  filters: Filters
  specialties: string[]
  onChange: (updates: Partial<Filters>) => void
}

export const DoctorFilters = ({
  filters,
  specialties,
  onChange,
}: DoctorFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-end">
      <div className="flex-1">
        <label className="text-xs font-semibold text-slate-500">
          Search by name or specialty
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Try “Dermatology” or “Maya”"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>

      <div className="flex flex-1 flex-wrap gap-4">
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-semibold text-slate-500">Specialty</label>
          <select
            value={filters.specialty}
            onChange={(event) => onChange({ specialty: event.target.value })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[160px]">
          <label className="text-xs font-semibold text-slate-500">Sort by</label>
          <select
            value={filters.sort}
            onChange={(event) => onChange({ sort: event.target.value as Filters['sort'] })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          >
            <option value="rating">Rating (High → Low)</option>
            <option value="experience">Experience (High → Low)</option>
            <option value="alphabetical">Alphabetical (A → Z)</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={filters.acceptingOnly}
          onChange={(event) => onChange({ acceptingOnly: event.target.checked })}
          className="h-4 w-4 accent-brand-blue"
        />
        Accepting new patients
      </label>
    </div>
  )
}

