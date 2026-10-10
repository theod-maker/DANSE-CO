export function isPublicPosthogKey(value: string | undefined): value is string {
  return typeof value === 'string' && /^phc_[A-Za-z0-9]+$/.test(value)
}
