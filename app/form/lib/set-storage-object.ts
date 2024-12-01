export function setStorageObject(value) {
  sessionStorage.setItem('_application_process', JSON.stringify(value))
}
