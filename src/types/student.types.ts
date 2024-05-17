export interface IStudent {
  _id: string
  studentId: string
  name: string
  email: string
  password: string
  dateOfBirth: string
  fatherName: string
  motherName: string
  avatar: string
  session: string
  phone: string
  facultyId: string
  departmentId: string
  hallId: string
  educationalQualifications: EducationalQualification[]
  presentAddress: PresentAddress
  permanentAddress: PermanentAddress
  nationality: string
  religion: string
  status: string
  isVerified: boolean
  hall: string
  faculty: string
  department: string
  departmentShortName: string
}

export interface EducationalQualification {
  name: string
  passingYear: string
  institute: string
  board: string
  roll: string
  GPA: number
}

export interface PresentAddress {
  village: string
  subDistrict: string
  postOffice: string
  district: string
  zipCode: string
}

export interface PermanentAddress {
  village: string
  subDistrict: string
  postOffice: string
  district: string
  zipCode: string
}
