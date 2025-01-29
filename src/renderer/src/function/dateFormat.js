export function dateFormat(date) {
  const day = String(date.getDate()).padStart(2, '0') // Add leading zero if single digit
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed, so add 1
  const year = String(date.getFullYear()).slice(-2) // Get the last 2 digits of the year
  return `${day}/${month}/${year}`
}
