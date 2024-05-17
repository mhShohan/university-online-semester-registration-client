const academicSession = () => {
  const currentYear = new Date().getFullYear()

  const academicSessions = []

  for (let i = currentYear - 8; i <= currentYear; i++) {
    academicSessions.push(`${i}-${i + 1}`)
  }

  return academicSessions
}

export default academicSession