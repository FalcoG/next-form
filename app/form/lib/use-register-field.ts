import React, { useContext } from 'react'
import { ApplicationProcessContext } from '@/app/form/lib/application-process-context'

export function useRegisterField (name) {
  const applicationProcess = useContext(ApplicationProcessContext)

  return {
    value: applicationProcess.getValue(name),
    name: name,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      applicationProcess.setValue(name, event.target.value)
    }
  }
}
