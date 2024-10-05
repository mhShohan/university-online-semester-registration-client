export const tagTypes = {
  user: 'user',
  faculty: 'faculty',
  department: 'department',
  hall: 'hall',
  course: 'course',
  admin: 'admin',
  student: 'student',
  operator: 'operator',
  registrationData: 'registrationData',
  registrationFeeForm: 'registrationFeeForm',
  status: 'status',
  payment: 'payment',
} as const

const tagTypesList = Object.values(tagTypes);

export default tagTypesList;