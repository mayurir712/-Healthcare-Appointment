import { DoctorCard } from '../components/DoctorCard'
import { DoctorFilters } from '../components/DoctorFilters'
import { useDoctors } from '../providers/DoctorsProvider'

export const DoctorListPage = () => {
  const { filteredDoctors, filters, specialties, updateFilters } = useDoctors()

  return (
    <div className="space-y-6">
      <DoctorFilters
        filters={filters}
        specialties={specialties}
        onChange={updateFilters}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
          No doctors match your search. Try adjusting filters.
        </div>
      )}
    </div>
  )
}

