'use client'

import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import useRentModal from '@/app/hooks/useRentModal'
import dynamic from 'next/dynamic'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import Modal from './Modal'
import CountrySelect from '../inputs/CountrySelect'
import Counter from '../inputs/Counter'
import ImpageUpload from '../inputs/ImpageUpload'

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
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false
      }),
    [location]
  )

  const setCustomeValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
    console.log(value)
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
        <CountrySelect
          value={location}
          onChange={value => setCustomeValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some basic info about your place'
          subtitle='What amenities do you offer?'
        />
        <Counter
          title='Number of guest'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={value => setCustomeValue('guestCount', value)}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={value => setCustomeValue('roomCount', value)}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={value => setCustomeValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place is like!'
        />
        <ImpageUpload />
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
