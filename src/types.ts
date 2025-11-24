export interface Doctor {
  id: number
  name: string
  specialty: string
  experience: number
  location: string
  rating: number
  acceptingNewPatients: boolean
  bio: string
  conditions: string[]
  consultationFee: number
  languages: string[]
  availableSlots: string[]
}

export interface Appointment {
  id: string
  doctorId: number
  doctorName: string
  date: string
  time: string
  patientName: string
  reason?: string
}

export type SortOption = 'rating' | 'experience' | 'alphabetical'

export interface Filters {
  search: string
  specialty: string
  acceptingOnly: boolean
  sort: SortOption
}

