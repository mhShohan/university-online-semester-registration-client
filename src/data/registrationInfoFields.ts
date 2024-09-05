const removeFields = ['_id', 'facultyId', 'departmentId', 'createdAt', 'updatedAt', '__v']

export const modifiedDataOfRegistrationInfo = (resData: Record<string, unknown>) => {
  const data = { ...resData }

  for (const field of removeFields) {
    delete data[field as keyof typeof data]
  }

  return data
}

export const registrationInfoFields = {
  date: [
    { name: 'startDate', label: 'Start Date' },
    { name: 'endDate', label: 'End Date' }
  ],
  semester: [
    { name: 'tuitionFee', label: 'Tuition Fee', type: 'number' },
    { name: 'transport', label: 'Transport', type: 'number' },
    { name: 'library', label: 'Library', type: 'number' },
    { name: 'centralSports', label: 'Central Sports', type: 'number' },
    { name: 'studentWelfare', label: 'Student Welfare', type: 'number' },
    { name: 'treatment', label: 'Treatment', type: 'number' },
    { name: 'creditFee', label: 'Credit Fee', type: 'number' },
    { name: 'roverScout', label: 'Rover Scout', type: 'number' },
    { name: 'BNCC', label: 'BNCC', type: 'number' },
    { name: 'computerFee', label: 'Computer Fee', type: 'number' },
    { name: 'semesterExamFee', label: 'Semester Exam Fee', type: 'number' },
    { name: 'admitCard', label: 'Admit Card', type: 'number' },
    { name: 'othersFee', label: 'Others Fee', type: 'number' },
  ],
  department: [
    { name: 'developmentFee', label: 'Development Fee', type: 'number' },
    { name: 'association', label: 'Association', type: 'number' },
    { name: 'centerFee', label: 'Center Fee', type: 'number' },
  ],
  residentialFee: [
    { name: 'fee', label: 'Hall Rent Fee', type: 'number' },
    { name: 'from', label: 'From', type: 'date' },
    { name: 'to', label: 'to', type: 'date' },
  ],
  retake: [
    { name: 'creditFee', label: 'Credit Fee', type: 'number' },
    { name: 'admitCard', label: 'Admit Card', type: 'number' },
    { name: 'centerFee', label: 'Center Fee', type: 'number' },
  ]
}


