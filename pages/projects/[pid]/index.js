import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import API from '../../../api'
import Router from 'next/router'
import Filter from '../../../components/features/filter'
import UnitCard from '../../../components/cards/unitCard'
import Overlay from '../../../components/features/overlay'
import ProfileSideBar from '../../../components/core/profileSideBar'
import DropdownMenu from '../../../components/features/dropdownMenu'
import AdvancedFilter from '../../../components/features/advancedFilter'
import CarouselOverlay from '../../../components/features/carouselOverlay'

export default function Project() {
  const {
    query: { pid, cid },
  } = useRouter()

  const [inputVal, setInputVal] = useState(0)
  const [isOverlay, setIsOverlay] = useState(false)
  const [isCarouselOverlay, setIsCarouselOverlay] = useState(false)
  const [units, setUnits] = useState([])

  const { register, errors, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const dropdownOptions = [
    { id: 1, name: 'type 1' },
    { id: 2, name: 'type 2' },
  ]

  const itemSelectedFunc = (id, name) => {
    console.log(id, name)
  }

  const preventShowLetter = (e) => {
    const char = String.fromCharCode(e.which)
    if (!/[0-9]/.test(char)) {
      e.preventDefault()
    } else {
      setInputVal(getValues())
    }
    console.log(inputVal)
  }

  const onAdvancedSearch = (e) => {
    console.log(inputVal)
    setIsOverlay(!isOverlay)
  }

  const setIsCarouselOverlayFunc = (bool) => {
    setIsCarouselOverlay(bool)
  }

  useEffect(() => {
    if (cid) {
      async function fetchUnits() {
        const {
          data: { results },
        } = await API.get(`reds/${cid}/projects/${pid}/units/`)
        setUnits(results)
      }
      fetchUnits()
    }
  }, [cid])
  console.log(units)

  return (
    <div
      onClick={() => {
        setIsOverlay(false)
        setIsCarouselOverlay(false)
      }}>
      <Overlay opacity={isOverlay} />
      <Overlay opacity={isCarouselOverlay} />
      {isOverlay && (
        <div onClick={(e) => e.stopPropagation()}>
          <AdvancedFilter
            preventShowLetter={preventShowLetter}
            dropdownOptions={dropdownOptions}
            itemSelectedFunc={itemSelectedFunc}
            onAdvancedSearch={onAdvancedSearch}
          />
        </div>
      )}
      {isCarouselOverlay && (
        <CarouselOverlay
          sources={['project.jpg', 'company-pic.jpg', 'company-cover.jpg']}
          setIsOverlayFunc={setIsCarouselOverlayFunc}
        />
      )}

      <div className="grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-3 lg:gap-16 lg:ml-0">
        <ProfileSideBar cid={cid} />

        <div className="col-span-2 mt-10 mb-16">
          <div className="flex justify-between mb-5">
            <h2 className="text-black font-bold text-lg">Skyline Complex</h2>
            <button
              className="py-2 px-3 text-secondaryLight text-xs font-bold border border-secondaryLight rounded-full transition duration-500 ease-in-out hover:bg-secondaryLight hover:text-white focus:outline-none"
              onClick={(e) => {
                e.stopPropagation()
                setIsCarouselOverlayFunc(true)
              }}>
              <i className="fas fa-image fa-lg mr-5"></i>
              Show Project Images
            </button>
          </div>
          <div className="bg-white p-5 rounded-lg w-full">
            <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
              <Filter
                register={register}
                errors={errors}
                name="Price"
                label1="from"
                labelTxt1="From"
                label2="to"
                labelTxt2="To"
                width="w-5/12"
                preventShowLetter={preventShowLetter}
              />
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
              <div>
                <p
                  className="text-black text-sm text-right font-bold mb-3 underline cursor-pointer hover:text-primaryText"
                  onClick={(e) => {
                    setIsOverlay(true)
                    e.stopPropagation()
                  }}>
                  Advanced Search
                </p>
                <p className="text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
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
            </div>
          </div>
          <div className="overflow-hidden">
            <button
              className="text-secondaryLight font-semibold mt-4 mr-4 float-right hover:text-primaryText focus:outline-none"
              onClick={() => Router.push('/projects/[pid]/units', '/projects/2/units')}>
              See all units
              <i className="fas fa-angle-right ml-2"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 xl:grid-cols-3">
            <UnitCard pid={pid} />
            <UnitCard pid={pid} />
            <UnitCard pid={pid} />
            <UnitCard pid={pid} />
            <UnitCard pid={pid} />
            <UnitCard pid={pid} />
          </div>
        </div>
      </div>
    </div>
  )
}
