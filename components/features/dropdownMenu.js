import { useState, useEffect } from 'react'

export default function DropdownMenu({
  id,
  order,
  name,
  placeholder,
  dropdownWidth,
  options,
  choices,
  classes,
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
      if (!name.trim().split(',').includes(option.name)) choices.push(option)
      else {
        const index = choices.findIndex((choice) => choice.id === option.id)
        choices.splice(index, 1)
      }
      setItem(`${choices.map((choice) => choice.name)}`)
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

  console.log(openDropdown)
  console.log(order)
  console.log(isOpen)
  return (
    <div className="relative">
      <div
        className={`block appearance-none w-full px-4 rounded border cursor-pointer focus:outline-none border-gray-400 ${
          classes ? classes : 'py-2'
        }`}
        onClick={(e) => {
          e.stopPropagation()
          toggleDropdown(order)
          setIsOpen(!isOpen)
        }}>
        <span>
          {item ? (
            item.charAt(0).toUpperCase() + item.toLowerCase().slice(1)
          ) : placeholder ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            name
          )}
        </span>
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
                multiple && name.trim().split(',').includes(option.name)
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
                  (multiple && name.trim().split(',').includes(option.name)) ||
                  item === option.name.toUpperCase()
                    ? 'text-primaryText'
                    : 'text-primary'
                }`}>
                {option.name}
              </span>
              {multiple && name.trim().split(',').includes(option.name) && (
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
