import { useState, useEffect } from 'react'

export default function DropdownMenu({ order, name, dropdownWidth, options, itemSelectedFunc }) {
  const [openDropdown, toggleDropdown] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState('')

  const onItemSelecting = (option) => {
    setIsOpen(false)
    setItem(option.name)
    itemSelectedFunc(option.id, name)
  }

  return (
    <div className="relative">
      <div
        className="block appearance-none w-full py-2 px-4 rounded border cursor-pointer focus:outline-none border-gray-400"
        onClick={(e) => {
          toggleDropdown(order)
          setIsOpen(!isOpen)
        }}>
        <span>{item ? item : name}</span>
        <i className="fas fa-angle-down fa-lg mt-2 text-primaryLight float-right"></i>
      </div>
      <div
        className={`absolute left-0 z-40 rounded-lg border-2 border-gray-100 shadow-lg focus:outline-none ${dropdownWidth} ${
          openDropdown === order && isOpen ? 'block' : 'hidden'
        }`}>
        {options.length > 0 ? (
          options?.map((option) => (
            <div
              className="item block px-4 py-1 bg-white text-gray-400 border-b cursor-pointer transition duration-500 ease-in-out hover:text-primaryText"
              key={option.id}
              onClick={() => onItemSelecting(option)}>
              <i className="fas fa-circle fal-lg mr-5"></i>
              <span className="inline-block w-10/12 py-3 text-primary hover:text-primaryText">
                {option.name}
              </span>
            </div>
          ))
        ) : (
          <div className="item block px-4 py-3 bg-white"></div>
        )}
      </div>
    </div>
  )
}
