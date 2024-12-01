import { getStorageObject } from '@/app/form/lib/get-storage-object'
import { setStorageObject } from '@/app/form/lib/set-storage-object'

export function setStorageValue(key: string, value: unknown) {
  const storage = getStorageObject()

  storage[key] = value

  setStorageObject(storage)

  return true
}
