import { createContext } from 'react';
import { getStorageValue } from '@/app/form/lib/get-storage-value'
import z, { type ZodAny } from 'zod'
import { getStorageObject } from '@/app/form/lib/get-storage-object'

export type TApplicationProcessContext = {
  setValue: (name: string, value: string) => void
  getValue: (name: string) => ReturnType<typeof getStorageValue>
  updates: number
  delayedUpdates: number
  errors?: z.inferFormattedError<ZodAny>
  delayedErrors?: z.inferFormattedError<ZodAny>
  values?: ReturnType<typeof getStorageObject>
  delayedValues?: ReturnType<typeof getStorageObject>
}
export const ApplicationProcessContext = createContext<TApplicationProcessContext>({
  setValue: (name, value) => {
    console.log('default value set', value)
  },
  getValue: (name) => {
    return getStorageValue(name)
  },
  updates: 0,
  delayedUpdates: 0,
});
