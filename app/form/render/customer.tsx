import React, { useContext, useEffect, useRef } from 'react'
import { ApplicationProcessContext } from '@/app/form/lib/application-process-context'
import { useRegisterField } from '@/app/form/lib/use-register-field'

export function FieldsetCustomer() {
  const applicationProcess = useContext(ApplicationProcessContext)

  // todo: verify whether this is dirty or clean
  const setValue = useRef(applicationProcess.setValue)

  const firstName = applicationProcess?.delayedValues?.['customer.firstName']
  useEffect(() => {
    setValue.current(
      'customer.insertion', `${firstName} - dirty workaround or clean`
    )
  }, [firstName])

  return (
    <fieldset id="customer" /*onChange={onChange}*/>
      <label>
        FirstName
        <input
          type="text"
          {...useRegisterField('customer.firstName')}
          required
          autoComplete="given-name"
        />
      </label>
      immediate:
      {applicationProcess.errors?.['customer.firstName']._errors.map((error) => (
        <b key={error.toString()}>
          {error}
        </b>
      ))}
      delayed:
      {applicationProcess.delayedErrors?.['customer.firstName']._errors.map((error) => (
        <b key={error.toString()}>
          {error}
        </b>
      ))}
      <br/>
      <label>
        Insertion
        <input
          type="text"
          name="customer.insertion"
          value={applicationProcess.getValue('customer.insertion')}
          onChange={(e) => {
            console.log('allow value override')
            applicationProcess.setValue('customer.insertion', e.target.value)
          }}
        />
      </label>
      <br/>
      <label>
        LastName
        <input
          type="text"
          {...useRegisterField('customer.lastName')}
          required
          autoComplete="family-name"
        />
      </label>
      <label>
        Email
        <input type="email" name="email-random-name" autoComplete="email" />
      </label>
    </fieldset>
  )
}
