export const formatDateBr = (dateValue) => {
  if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    const [year, month, day] = dateValue.split('-')
    return `${day}/${month}/${year}`
  }

  const parsed = new Date(dateValue)
  if (Number.isNaN(parsed.getTime())) {
    return String(dateValue)
  }

  return new Intl.DateTimeFormat('pt-BR').format(parsed)
}
