export function getStorageObject(): Record<string, string | undefined> {
  const storage = sessionStorage.getItem('_application_process')

  try {
    if (storage != null) {
      return JSON.parse(storage) || {}
    }
  } catch {
    return {}
  }

  return {}
}
