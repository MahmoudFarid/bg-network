import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from './../forms/formInput'
import DropdownMenu from './dropdownMenu'

export default function Filter({
  types,
  setInputVal,
  itemSelectedFunc,
  onBlur,
  isAllUnits,
  companies,
  projects,
  companySelected,
}) {
  const [isAdvanced, setIsAdvanced] = useState(false)

  const { register, errors, watch } = useForm({
    mode: 'onChange',
  })
  const watchFields = watch([
    'area_to',
    'area_from',
    'price_from',
    'price_to',
    'bedroom',
    'bathroom',
    'floor',
    'reception',
    'direction',
    'type',
    'red',
    'project',
  ])

  const directionsOptions = [
    { id: 1, name: 'Frontal' },
    { id: 2, name: 'Rear' },
    { id: 3, name: 'Sidy' },
  ]

  const preventShowLetter = (e) => {
    const char = String.fromCharCode(e.which)
    if (e.which != 8 && !/[0-9]/.test(char)) {
      e.preventDefault()
    } else {
      setInputVal(watchFields)
    }
  }

  return (
    <div>
      <div className="bg-white p-3 w-full ">
        <div
          className={`${
            isAllUnits
              ? 'grid grid-cols-1 row-gap-2 items-end sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7'
              : 'grid grid-cols-1 row-gap-2 items-end md:grid-cols-2 xl:grid-cols-6'
          }`}>
          {isAllUnits && (
            <div>
              <p className="text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                Companies
              </p>
              <DropdownMenu
                order="first"
                placeholder="Companies"
                name="Companies"
                classes="py-1"
                dropdownWidth="w-11/12"
                options={companies}
                itemSelectedFunc={itemSelectedFunc}
              />
            </div>
          )}

          {isAllUnits && (
            <div>
              <p className="text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                Projects
              </p>
              <DropdownMenu
                order="second"
                placeholder="Projects"
                name="Projects"
                classes="py-1"
                dropdownWidth="w-11/12"
                allunits={companySelected}
                options={projects}
                itemSelectedFunc={itemSelectedFunc}
              />
            </div>
          )}

          <FormInput
            register={register}
            errors={errors}
            label="area_from"
            labelTxt="Area"
            placeholder="From"
            type="text"
            classes="w-11/12 py-1 text-sm"
            req={false}
            onKeyUp={preventShowLetter}
            onKeyPress={preventShowLetter}
            onBlur={onBlur}
          />
          <FormInput
            register={register}
            errors={errors}
            label="area_to"
            placeholder="To"
            type="text"
            classes="w-11/12 py-1 text-sm"
            req={false}
            onKeyUp={preventShowLetter}
            onKeyPress={preventShowLetter}
            onBlur={onBlur}
          />
          <FormInput
            register={register}
            errors={errors}
            label="price_from"
            labelTxt="Price"
            placeholder="From"
            type="text"
            classes="w-11/12 py-1 text-sm"
            req={false}
            onKeyUp={preventShowLetter}
            onKeyPress={preventShowLetter}
            onBlur={onBlur}
          />
          <FormInput
            register={register}
            errors={errors}
            label="price_to"
            placeholder="To"
            type="text"
            classes="w-11/12 py-1 text-sm"
            req={false}
            onKeyUp={preventShowLetter}
            onKeyPress={preventShowLetter}
            onBlur={onBlur}
          />
          <div className={`${!isAllUnits && 'col-span-2'} self-center`}>
            <p className="text-primaryLight text-sm font-semibold my-1 transition ease-in duration-300">
              Types
            </p>
            <DropdownMenu
              order="first"
              placeholder="Types"
              name="Types"
              classes="w-11/12 py-1 text-sm"
              dropdownWidth="w-full"
              options={types}
              itemSelectedFunc={itemSelectedFunc}
            />
          </div>
        </div>

        <p
          className="text-black text-xs text-right font-bold mb-3 underline cursor-pointer hover:text-primaryText"
          onClick={() => setIsAdvanced(!isAdvanced)}>
          Advanced filters
        </p>
      </div>
      <div
        className={`search bg-white p-3 w-full grid grid-cols-1 row-gap-2 items-end md:grid-cols-2 xl:grid-cols-6 ${
          isAdvanced
            ? 'animate__slideInDown animate__animated opacity-1'
            : 'animate__slideOutUp animate__animated opacity-0'
        } `}>
        <FormInput
          register={register}
          errors={errors}
          label="bedroom"
          labelTxt="Bedrooms"
          type="text"
          classes="w-11/12 py-1 text-sm"
          req={false}
          onKeyUp={preventShowLetter}
          onKeyPress={preventShowLetter}
          onBlur={onBlur}
        />
        <FormInput
          register={register}
          errors={errors}
          label="bathroom"
          labelTxt="Bathrooms"
          type="text"
          classes="w-11/12 py-1 text-sm"
          req={false}
          onKeyUp={preventShowLetter}
          onKeyPress={preventShowLetter}
          onBlur={onBlur}
        />
        <FormInput
          register={register}
          errors={errors}
          label="floor"
          labelTxt="Floors"
          type="text"
          classes="w-11/12 py-1 text-sm"
          req={false}
          onKeyUp={preventShowLetter}
          onKeyPress={preventShowLetter}
          onBlur={onBlur}
        />
        <FormInput
          register={register}
          errors={errors}
          label="reception"
          labelTxt="Receptions"
          type="text"
          classes="w-11/12 py-1 text-sm"
          req={false}
          onKeyUp={preventShowLetter}
          onKeyPress={preventShowLetter}
          onBlur={onBlur}
        />
        <div className="col-span-2 self-center">
          <p className="text-primaryLight text-sm font-semibold my-1 transition ease-in duration-300">
            Directions
          </p>
          <DropdownMenu
            order="first"
            placeholder="Directions"
            name="Directions"
            classes="w-11/12 py-1 text-sm"
            dropdownWidth="w-full"
            options={directionsOptions}
            itemSelectedFunc={itemSelectedFunc}
          />
        </div>
      </div>

      <style jsx>{`
        .search {
          bottom: 64px;
          transition: opacity 0.4s ease-in-out;
        }
      `}</style>
    </div>
  )
}
