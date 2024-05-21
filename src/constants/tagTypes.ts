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
  status: 'status',
} as const

const tagTypesList = Object.values(tagTypes);

export default tagTypesList;