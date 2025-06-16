export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")

  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)

  if (!match) return phone

  const [, ddd, prefix, suffix] = match

  return `(${ddd}) ${prefix} - ${suffix}`
}