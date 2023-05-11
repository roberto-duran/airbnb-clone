import { IconType } from 'react-icons'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
}

export default function CategoryBox ({
  icon: IconCategory,
  label,
  selected
}: CategoryBoxProps) {
  return (
    <div
      className={`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    p-3
    border-b-2
    hover:text-neutral-800
    transition
    cursor-pointer
    ${
      selected
        ? 'text-neutral-800 border-neutral-800'
        : 'text-neutral-500 border-transparent'
    }
    `}
    >
      <IconCategory size={26} />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  )
}
