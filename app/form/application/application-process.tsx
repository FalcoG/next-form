'use client';

import { FieldsetCustomer } from '@/app/form/render/customer'
import { FieldsetAddress } from '@/app/form/render/address'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { setStorageValue } from '@/app/form/lib/set-storage-value'
import { ApplicationProcessContext, TApplicationProcessContext } from '@/app/form/lib/application-process-context'
import { getStorageValue } from '@/app/form/lib/get-storage-value'
import { applicationProcessSchema } from '@/app/form/application/application-process-schema'

export function ApplicationProcess() {
  const params = useParams<{ slug: string }>()

  function onSubmitForm (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const result = validateForm()

    if (result.success) {
      console.info('Form is all good!')
    } else {
      console.warn('Form is invalid')
    }

    console.info('Form result', result)
  }

  function onChangeForm (e: React.FormEvent<HTMLFormElement>) {
    console.log('onChangeForm', e)
    if (e.target) {
      const { name, value } = e.target;
      setLatestInteraction({
        type: e.type,
        timeStamp: e.timeStamp,
      })

      setStorageValue(name, value)
    }
  }

  function onBlurForm (e: React.FormEvent<HTMLFormElement>) {
    setLatestInteraction({
      type: e.type,
      timeStamp: e.timeStamp,
    })
  }

  function validateForm () {
    // note to developer: this will be dynamic validation depending on what you are rendering, take this into account!
    const formValues = Object.fromEntries(new FormData(formRef.current)) as TApplicationProcessContext['values']
    const result =
      applicationProcessSchema
        .safeParse(formValues)

    if (!result.success) {
      console.log('result errors', result.error.format())
      setErrors(result.error.format())
    } else {
      setErrors(undefined)
    }

    setValues(formValues)

    return result
  }

  const [errors, setErrors] = useState<TApplicationProcessContext['errors']>()
  const [values, setValues] = useState<TApplicationProcessContext['values']>()
  const [delayedErrors, setDelayedErrors] = useState<TApplicationProcessContext['errors']>()
  const [delayedValues, setDelayedValues] = useState<TApplicationProcessContext['values']>()

  const [latestInteraction, setLatestInteraction] = useState<{
    type: string,
    timeStamp: number,
  }>()
  const [fieldUpdates, setFieldUpdates] = useState(0)
  const [delayedUpdates, setDelayedUpdates] = useState(0)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  // to be called after debounce function finally gets called
  const debounceCallback = useCallback(() => {
    setDelayedUpdates((prev) => prev + 1)
    setDelayedErrors(errors)
    setDelayedValues(values)
  }, [errors, values])

  // create debounce
  useEffect(() => {
    const cleanup = () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }

    cleanup()

    if (latestInteraction && latestInteraction.type === 'change') {
      debounceRef.current = setTimeout(() => {
        debounceCallback()
      }, 400)

      return cleanup
    }

    debounceCallback();
  }, [debounceCallback, latestInteraction])

  const formRef = useRef<HTMLFormElement | null>(null)

  return (
    <ApplicationProcessContext.Provider value={{
      setValue: function(name, value) {
        validateForm()

        setStorageValue(name, value)
        setFieldUpdates((prev) => prev+1) // we must ++, to ensure getValue() is called again by the children!
      },
      getValue: (name) => {
        return getStorageValue(name)
      },
      errors,
      delayedErrors,
      values,
      delayedValues,
      updates: fieldUpdates,
      delayedUpdates: delayedUpdates,
    }}>
    <form
      id="application-process"
      onSubmit={onSubmitForm}
      onChange={onChangeForm}
      onBlur={onBlurForm}
      ref={formRef}
    >
      {params['slug'][0] === 'start' && (
        <>
          <FieldsetCustomer/>
        </>
      )}
      {params['slug'][0] === 'middle' && (
        <>
          <FieldsetAddress/>
        </>
      )}
      <input type="submit" />
    </form>
    </ApplicationProcessContext.Provider>
  );
}
