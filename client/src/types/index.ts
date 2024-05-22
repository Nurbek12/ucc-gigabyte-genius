export interface IUser {
  id?: number

  firstName: string
  lastName: string
  password?: string
  email?: string
  phone?: string
  avatar?: string

  dateOfBirth?: string
  address?: string

  role: "ADMIN" | "DOCTOR" | "PATIENT"

  speciality?: string
  roomNumber?: number

  doctorHistories?: IHistory[]
  patientHistories?: IHistory[]

  doctorRedirects?: IRedirect[]

  createdAt?: string
  updatedAt?: string
}
  
export interface IHistory {
  id?: number

  doctorId: number
  doctor?: IUser

  patientId: number
  patient?: IUser

  status: "NEW" | "PROCESS" | "FINISH"
  
  redirects?: IRedirect[]
  diagnosis?: IDiagnosis

  createdAt?: string
  updatedAt?: string
}
  
export interface IRedirect {
  id?: number

  files?: string[]
  title: string
  description: string

  fromDoctorId: number | null
  fromDoctor?: IUser
  
  doctorId: number | null
  doctor?: IUser

  historyId: number | null
  history?: IHistory
  
  createdAt?: string
  updatedAt?: string
}
  
export interface IDiagnosis {
  id?: number

  title: string
  description: string
  drug: number[]
  files?: string[]

  historyId: number | null
  history?: History
  
  createdAt?: string
  updatedAt?: string
}