import Container from '../Container'
import { TbBeach } from 'react-icons/tb'
import { GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '../CategoryBox'

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!'
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!'
  }
]

export default function Categories () {
  return (
    <Container>
      <div className='flex flex-row items-center justify-between pt-4 overflow-x-auto'>
        {categories.map(category => (
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
          />
        ))}
      </div>
    </Container>
  )
}
