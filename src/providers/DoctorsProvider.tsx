import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { doctors as doctorSeed } from '../data/doctors'
import type { Appointment, Doctor, Filters, SortOption } from '../types'

interface DoctorsContextValue {
  doctors: Doctor[]
  filteredDoctors: Doctor[]
  filters: Filters
  specialties: string[]
  selectedDoctor: Doctor | null
  selectDoctor: (doctor: Doctor | null) => void
  updateFilters: (updates: Partial<Filters>) => void
  appointments: Appointment[]
  bookAppointment: (payload: Omit<Appointment, 'id'>) => void
}

const defaultFilters: Filters = {
  search: '',
  specialty: 'All',
  acceptingOnly: false,
  sort: 'rating',
}

const DoctorsContext = createContext<DoctorsContextValue | null>(null)
const APPOINTMENTS_STORAGE_KEY = 'careconnect_appointments'

const readStoredAppointments = (): Appointment[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(APPOINTMENTS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const DoctorsProvider = ({ children }: { children: ReactNode }) => {
  const [doctors] = useState<Doctor[]>(doctorSeed)
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    readStoredAppointments(),
  )

  const specialties = useMemo(
    () => ['All', ...new Set(doctors.map((doc) => doc.specialty))],
    [doctors],
  )

  const updateFilters = useCallback((updates: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...updates }))
  }, [])

  const filteredDoctors = useMemo(() => {
    const applySort = (list: Doctor[], sort: SortOption) => {
      switch (sort) {
        case 'experience':
          return [...list].sort((a, b) => b.experience - a.experience)
        case 'alphabetical':
          return [...list].sort((a, b) => a.name.localeCompare(b.name))
        case 'rating':
        default:
          return [...list].sort((a, b) => b.rating - a.rating)
      }
    }

    const searchQuery = filters.search.toLowerCase()
    const filtered = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery) ||
        doctor.specialty.toLowerCase().includes(searchQuery)
      const matchesSpecialty =
        filters.specialty === 'All' || doctor.specialty === filters.specialty
      const matchesAccepting =
        !filters.acceptingOnly || doctor.acceptingNewPatients

      return matchesSearch && matchesSpecialty && matchesAccepting
    })

    return applySort(filtered, filters.sort)
  }, [doctors, filters])

  const getId = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 11)

  const bookAppointment = useCallback(
    (payload: Omit<Appointment, 'id'>) => {
      const id = getId()
      setAppointments((prev) => [...prev, { ...payload, id }])
    },
    [setAppointments],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(
        APPOINTMENTS_STORAGE_KEY,
        JSON.stringify(appointments),
      )
    } catch (error) {
      console.error('Failed to persist appointments', error)
    }
  }, [appointments])

  const value: DoctorsContextValue = {
    doctors,
    filteredDoctors,
    filters,
    specialties,
    selectedDoctor,
    selectDoctor: setSelectedDoctor,
    updateFilters,
    appointments,
    bookAppointment,
  }

  return <DoctorsContext.Provider value={value}>{children}</DoctorsContext.Provider>
}

export const useDoctors = () => {
  const context = useContext(DoctorsContext)
  if (!context) {
    throw new Error('useDoctors must be used within DoctorsProvider')
  }
  return context
}

