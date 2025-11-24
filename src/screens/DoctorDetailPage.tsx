import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDoctors } from '../providers/DoctorsProvider'
import { BookingModal } from '../components/BookingModal'

const DetailStat = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => (
  <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 text-center shadow-sm">
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="text-lg font-semibold text-brand-gray">{value}</p>
  </div>
)

export const DoctorDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { doctors } = useDoctors()
  const [showModal, setShowModal] = useState(false)

  const doctor = useMemo(
    () => doctors.find((doc) => doc.id === Number(id)),
    [doctors, id],
  )

  if (!doctor) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Doctor not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-sm font-semibold text-brand-blue"
        >
          Back to list
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm">
        <button className="text-sm text-brand-blue" onClick={() => navigate(-1)}>
          ← Back to doctors
        </button>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-teal">
              {doctor.specialty}
            </p>
            <h2 className="text-3xl font-semibold text-brand-gray">{doctor.name}</h2>
            <p className="text-sm text-slate-500">
              {doctor.location} • {doctor.experience} years experience
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm font-semibold text-brand-gray">
                {doctor.rating.toFixed(1)}
              </p>
              <p className="text-xs text-slate-500">Rating</p>
            </div>
            <span
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                doctor.acceptingNewPatients
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {doctor.acceptingNewPatients ? 'Accepting New Patients' : 'Not Accepting'}
            </span>
            <button
              className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30"
              onClick={() => setShowModal(true)}
            >
              Book appointment
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <DetailStat label="Consultation fee" value={`₹${doctor.consultationFee}`} />
        <DetailStat label="Languages" value={doctor.languages.join(', ')} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-gray">About</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{doctor.bio}</p>
          <h4 className="mt-5 text-sm font-semibold text-brand-gray">Conditions treated</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {doctor.conditions.map((condition) => (
              <span
                key={condition}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-gray">
            Available time slots
          </h3>
          <p className="text-sm text-slate-500">Tap a slot to book instantly</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {doctor.availableSlots.map((slot) => (
              <button
                key={slot}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:border-brand-blue hover:bg-brand-blue/10 hover:text-brand-blue"
                onClick={() => setShowModal(true)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <BookingModal doctor={doctor} open={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

