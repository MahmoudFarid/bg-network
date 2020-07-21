import { useForm } from 'react-hook-form';
import Filter from "./filter";
import DropdownMenu from "./dropdownMenu";

export default function AdvancedFilter({ preventShowLetter, dropdownOptions, itemSelectedFunc, onAdvancedSearch }) {
  const { register, errors, getValues, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    console.log(data)
    onAdvancedSearch(false)
  }

  return (
    <form className="bg-white z-50 absolute top-0 right-0 w-5/12 h-screen transition duration-500 ease-in-out origin-top-right scale-150 p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between border-b-2 border-gray-200 py-2 pt-0 mb-3">
        <p className="text-primary font-bold">Advanced Filters</p>
        <i className="fas fa-times fa-2x text-gray-400 cursor-pointer transition duration-500 ease-in-out hover:text-primaryLight" onClick={onAdvancedSearch}></i>
      </div>
      <div className="grid grid-cols-2 col-gap-5 row-gap-0">
        <Filter
          register={register}
          errors={errors}
          name="price"
          label1="from"
          labelTxt1="From"
          label2="to"
          labelTxt2="To"
          width="w-5/12"
          preventShowLetter={preventShowLetter}
          />
        <br />
        <Filter
        register={register}
        errors={errors}
        name="Area"
        label1="from"
        labelTxt1="From"
        label2="to"
        labelTxt2="To"
        width="w-5/12"
        preventShowLetter={preventShowLetter}
        />
        <br />
        <Filter
        register={register}
        errors={errors}
        name=""
        label1="roomsNo"
        labelTxt1="Rooms No"
        width="w-11/12"
        preventShowLetter={preventShowLetter}
        />
        <Filter
        register={register}
        errors={errors}
        name=""
        label1="floorsNo"
        labelTxt1="Floors No"
        width="w-11/12"
        preventShowLetter={preventShowLetter}
        />
        <Filter
        register={register}
        errors={errors}
        name=""
        label1="bathroomsNo"
        labelTxt1="No of bathrooms"
        width="w-11/12"
        preventShowLetter={preventShowLetter}
        />
        <Filter
        register={register}
        errors={errors}
        name=""
        label1="direction"
        labelTxt1="Direction"
        width="w-11/12"
        />
        <div>
          <p className="text-primaryLight text-sm font-semibold mb-1 mt-3 transition ease-in duration-300">
              Types
          </p>
          <DropdownMenu
              order="first"
              name="Types"
              dropdownWidth="w-full"
              options={dropdownOptions}
              itemSelectedFunc={itemSelectedFunc}
          />
        </div>
        <Filter
        register={register}
        errors={errors}
        label1="location"
        labelTxt1="Location"
        width="w-11/12"
        />
      </div>
      <div className="float-right border-t-2 border-gray-200 pt-3 mt-8 w-full">
        <button className="py-3 px-12 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none" onClick={onAdvancedSearch}>
          Cancel
        </button>
        <button className="py-3 px-12 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none" type="submit">
          Save
        </button>
      </div>

    </form>
  )
}