import { useState, useEffect } from 'react'

export default function DropdownMenu({
  id,
  order,
  name,
  dropdownWidth,
  options,
  choices,
  multiple,
  defaultValue,
  itemSelectedFunc,
}) {
  const [openDropdown, toggleDropdown] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState('')

  const onItemSelecting = (option) => {
    if (multiple) {
      setIsOpen(true)
      if (!choices.includes(option.id)) choices.push(option.id)
      else {
        const index = choices.findIndex((id) => id === option.id)
        choices.splice(index, 1)
      }
      setItem(
        `${choices.length <= 1 ? choices.length + ' plan' : choices.length + ' plans'} selected`
      )
      itemSelectedFunc(choices)
    } else {
      setIsOpen(false)
      setItem(option.name.toUpperCase())
      itemSelectedFunc(option.id, name, option.name, id)
    }
  }

  useEffect(() => {
    if (defaultValue) setItem(defaultValue.toUpperCase())
  }, [defaultValue])

  return (
    <div className="relative">
      <div
        className="block appearance-none w-full py-2 px-4 rounded border cursor-pointer focus:outline-none border-gray-400"
        onClick={(e) => {
          toggleDropdown(order)
          setIsOpen(!isOpen)
        }}>
        <span>{item ? item.charAt(0).toUpperCase() + item.toLowerCase().slice(1) : name}</span>
        <i className="fas fa-angle-down fa-lg mt-2 text-primaryLight float-right"></i>
      </div>
      <div
        className={`dropdownOptions absolute left-0 z-40 rounded-lg border-2 border-gray-100 shadow-lg overflow-auto focus:outline-none ${dropdownWidth} ${
          openDropdown === order && isOpen ? 'block' : 'hidden'
        }`}>
        {options.length > 0 ? (
          options?.map((option) => (
            <div
              className={`item block px-4 py-1 border-b cursor-pointer transition duration-500 ease-in-out hover:text-primaryText ${
                multiple && choices.includes(option.id)
                  ? 'border border-primaryText bg-gray-100 text-primaryText'
                  : 'bg-white text-gray-400'
              }
                ${
                  item === option.name.toUpperCase()
                    ? 'border border-primaryText bg-gray-100 text-primaryText'
                    : ''
                }
              `}
              key={option.id}
              onClick={() => onItemSelecting(option)}>
              <i className="fas fa-circle fal-lg mr-5"></i>
              <span
                className={`inline-block w-10/12 py-3 hover:text-primaryText ${
                  multiple && choices.includes(option.id) ? 'text-primaryText' : 'text-primary'
                }`}>
                {option.name}
              </span>
              {multiple && choices.includes(option.id) && (
                <i className="fas fa-check-circle fa-lg text-success"></i>
              )}
            </div>
          ))
        ) : (
          <div className="item block px-4 py-3 bg-white"></div>
        )}
      </div>
      <style jsx>{`
        .dropdownOptions {
          max-height: 20rem !important;
        }
      `}</style>
    </div>
  )
}
