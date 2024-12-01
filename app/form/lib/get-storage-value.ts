import { getStorageObject } from '@/app/form/lib/get-storage-object'

export function getStorageValue(key: string) {
  const storage = getStorageObject()

  return storage[key]
}
