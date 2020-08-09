import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import API from '../../../../api'
import Loading from '../../../../components/core/loading'
import Filter from '../../../../components/features/filter'
import Overlay from '../../../../components/features/overlay'
import UnitCard from '../../../../components/cards/unitCard'
import DropdownMenu from '../../../../components/features/dropdownMenu'
import AdvancedFilter from '../../../../components/features/advancedFilter'

export default function Units() {
  const {
    query: { pid },
  } = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [inputVal, setInputVal] = useState(0)
  const [isOverlay, setIsOverlay] = useState(false)
  const [isBroker, setIsBroker] = useState()
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

  useEffect(() => {
    const cid = localStorage.getItem('CID')
    const isBroker = localStorage.getItem('isBroker')
    setIsBroker(isBroker)

    if (pid) {
      console.log('units of company id -> ', cid, ' in project id -> ', pid)
      if (isBroker == 'true') {
        async function fetchUnits() {
          await API.get(`reds/${cid}/projects/${pid}/units/`).then((res) => {
            setUnits(res.data.results)
            setIsLoading(false)
          })
        }
        fetchUnits()
      } else {
        async function fetchUnits() {
          await API.get(`projects/${pid}/units/`).then((res) => {
            setUnits(res.data.results)
            setIsLoading(false)
          })
        }
        fetchUnits()
      }
    }
  }, [pid])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid my-16" onClick={() => setIsOverlay(false)}>
          <Overlay opacity={isOverlay} />
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
          <div className="flex justify-between mb-5">
            <h2 className="text-black font-bold text-lg">Skyline Complex</h2>
            {isBroker != 'true' && (
              <button className="py-3 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-full hover:text-white focus:outline-none">
                <i className="fas fa-plus-circle fa-lg text-white mr-5"></i>
                Add Unit
              </button>
            )}
          </div>
          <div className="bg-white p-5 rounded-lg w-full">
            <div className="grid grid-cols-1 col-gap-8 row-gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
              <div className="self-end mb-0 xl:mb-5">
                <p className="text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                  Direction
                </p>
                <DropdownMenu
                  order="first"
                  name="Direction"
                  dropdownWidth="w-full"
                  options={dropdownOptions}
                  itemSelectedFunc={itemSelectedFunc}
                />
              </div>
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
                  order="second"
                  name="Types"
                  dropdownWidth="w-full"
                  options={dropdownOptions}
                  itemSelectedFunc={itemSelectedFunc}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} pid={pid} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
