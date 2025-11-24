import { useDoctors } from '../providers/DoctorsProvider'

export const AppointmentsPage = () => {
  const { appointments } = useDoctors()

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-brand-gray">My Appointments</h2>
        <p className="text-sm text-slate-500">
          Track upcoming visits and share with your care team.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
          No appointments yet. Book a doctor to see them listed here.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Doctor
                  </p>
                  <p className="text-lg font-semibold text-brand-gray">
                    {appointment.doctorName}
                  </p>
                </div>
                <div className="text-sm text-slate-600">
                  <p className="font-semibold">{appointment.date}</p>
                  <p>{appointment.time}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Patient: {appointment.patientName}
                </span>
                {appointment.reason && (
                  <p className="text-slate-500">Reason: {appointment.reason}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

