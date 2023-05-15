'use client'

import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import Modal from './Modal'
import CountrySelect from '../inputs/CountrySelect'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

export default function RentModal () {
  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imgSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const category = watch('category')

  const setCustomeValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return 'Next'
    }

    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLable = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div
        className='grid 
                   grid-cols-1 
                      md:grid-cols-2 
                      gap-3 
                      max-h-[50vh] 
                      overflow-y-auto'
      >
        {categories.map(item => (
          <div key={item.label}>
            <CategoryInput
              onClick={category => setCustomeValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find your places'
        />
        <CountrySelect />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title='Airbnb your home!'
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLable}
    />
  )
}