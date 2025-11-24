import { Link } from 'react-router-dom'
import type { Doctor } from '../types'

interface DoctorCardProps {
  doctor: Doctor
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1
    const filled = rating >= starValue - 0.2
    return (
      <span key={starValue} className={filled ? 'text-amber-400' : 'text-slate-300'}>
        ★
      </span>
    )
  })
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Link
      to={`/doctor/${doctor.id}`}
      className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-brand-gray">{doctor.name}</h3>
          <p className="text-sm text-slate-500">{doctor.specialty}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            doctor.acceptingNewPatients
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {doctor.acceptingNewPatients ? 'Accepting New Patients' : 'Not Accepting'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Experience</p>
          <p className="font-semibold">{doctor.experience} yrs</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Location</p>
          <p className="font-semibold">{doctor.location}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Fee</p>
          <p className="font-semibold">₹{doctor.consultationFee}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-600">
        <div className="flex items-center gap-1">{renderStars(doctor.rating)}</div>
        <p className="font-medium">{doctor.rating.toFixed(1)} / 5</p>
      </div>
    </Link>
  )
}

