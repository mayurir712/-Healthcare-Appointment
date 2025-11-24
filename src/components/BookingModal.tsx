import { useMemo, useState } from 'react'
import type { Doctor } from '../types'
import { useDoctors } from '../providers/DoctorsProvider'

interface BookingModalProps {
  doctor: Doctor
  open: boolean
  onClose: () => void
}

const dateOptions = ['Today', 'Tomorrow', 'Pick a date'] as const
type DateOption = (typeof dateOptions)[number]

export const BookingModal = ({ doctor, open, onClose }: BookingModalProps) => {
  const { bookAppointment } = useDoctors()
  const [dateChoice, setDateChoice] = useState<DateOption>('Today')
  const [customDate, setCustomDate] = useState('')
  const [timeSlot, setTimeSlot] = useState<string>(doctor.availableSlots[0])
  const [patientName, setPatientName] = useState('')
  const [reason, setReason] = useState('')
  const [success, setSuccess] = useState(false)

  const chosenDate = useMemo(() => {
    const today = new Date()
    if (dateChoice === 'Today') {
      return today.toLocaleDateString()
    }
    if (dateChoice === 'Tomorrow') {
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      return tomorrow.toLocaleDateString()
    }
    return customDate ? new Date(customDate).toLocaleDateString() : ''
  }, [dateChoice, customDate])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!patientName || !timeSlot || !chosenDate) return

    bookAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: chosenDate,
      time: timeSlot,
      patientName,
      reason,
    })

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setPatientName('')
      setReason('')
      setDateChoice('Today')
      setCustomDate('')
      setTimeSlot(doctor.availableSlots[0])
      onClose()
    }, 1200)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <button
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold text-brand-gray">Book Appointment</h3>
        <p className="text-sm text-slate-500">with {doctor.name}</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold text-slate-500">Date</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {dateOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setDateChoice(option)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    dateChoice === option
                      ? 'bg-brand-blue text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {dateChoice === 'Pick a date' && (
              <input
                type="date"
                value={customDate}
                onChange={(event) => setCustomDate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Time slot</label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {doctor.availableSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium ${
                    timeSlot === slot
                      ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                      : 'border-slate-200 text-slate-600'
                  }`}
                  onClick={() => setTimeSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Patient name</label>
            <input
              type="text"
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">
              Reason for visit (optional)
            </label>
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue/90 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!patientName || !chosenDate}
          >
            Confirm Booking
          </button>

          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Appointment booked successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

