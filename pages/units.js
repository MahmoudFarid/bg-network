import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import API from '../api'
import Filter from '../components/features/filter'
import UnitCard from './../components/cards/unitCard'
import Pagination from './../components/features/pagination'
import DropdownMenu from '../components/features/dropdownMenu'
import AdvancedFilter from '../components/features/advancedFilter'
import UnitCardSkeleton from './../components/skeletons/unitCardSkeleton'
import Overlay from './../components/features/overlay'

export default function Units() {
  const [isOverlay, setIsOverlay] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterLoading, setIsFilterLoading] = useState(true)
  const [inputVal, setInputVal] = useState(0)
  const [types, setTypes] = useState([])
  const [units, setUnits] = useState([])
  const [projects, setProjects] = useState([])
  const [companies, setCompanies] = useState([])
  const [unitsCount, setUnitsCount] = useState(Number)
  const [companySelected, setCompanySelected] = useState(Number)
  const [projectSelected, setProjectSelected] = useState(Number)

  const { register, errors, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const itemSelectedFunc = (id, name) => {
    if (name === 'Companies') {
      setCompanySelected(id)
      setProjects([])
      async function fetchProjects() {
        await API.get(`reds/${id}/projects/`).then((res) => {
          setProjects(res.data.results)
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      fetchProjects()
    } else if (name === 'Projects') {
      console.log(id, name)
    }
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

  const setPageItem = (offset, limit) => {
    async function fetchUnits() {
      await API.get(`reds/units/?limit=${offset}&offset=${offset * limit}`).then((res) => {
        setUnits(res.data.results)
      })
    }
    fetchUnits()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    async function fetchCompanies() {
      await API.get(`reds/friends/`).then((res) => {
        setCompanies(res.data.results)
        setIsFilterLoading(false)
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetchCompanies()

    async function fetchUnits() {
      await API.get(`reds/units/?limit=9`).then((res) => {
        setUnits(res.data.results)
        setUnitsCount(res.data.count)
        setIsLoading(false)
      })
    }
    fetchUnits()

    async function fetchTypes() {
      await API.get(`projects/unit_types/`).then((res) => {
        setTypes(res.data.results)
        setIsFilterLoading(false)
      })
    }
    fetchTypes()
  }, [])

  return (
    <div>
      <Head>
        <title>All Units</title>
      </Head>

      <Overlay opacity={isOverlay} />

      <div className="container my-12">
        {isOverlay && (
          <div onClick={(e) => e.stopPropagation()}>
            <AdvancedFilter
              dropdownOptions={types}
              preventShowLetter={preventShowLetter}
              itemSelectedFunc={itemSelectedFunc}
              onAdvancedSearch={onAdvancedSearch}
            />
          </div>
        )}

        <div
          className={`bg-white p-3 rounded-lg w-full xl:pb-0 ${
            isLoading && isFilterLoading && 'invisible'
          }`}>
          <div className="grid grid-cols-1 row-gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            <div>
              <p className="text-primaryLight text-sm font-semibold mb-1 mt-8 transition ease-in duration-300">
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

            <div>
              <p className="text-primaryLight text-sm font-semibold mb-1 mt-8 transition ease-in duration-300">
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
            <div className="md:col-span-2 lg:col-span-1">
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
            </div>
            <div>
              <p
                className="text-black text-xs text-right font-bold mb-3 underline cursor-pointer hover:text-primaryText"
                onClick={(e) => {
                  setIsOverlay(true)
                  e.stopPropagation()
                }}>
                Advanced filters
              </p>
              <p className="text-primaryLight text-sm font-semibold mb-1 transition ease-in duration-300">
                Types
              </p>
              <DropdownMenu
                order="first"
                placeholder="Types"
                classes="py-1"
                dropdownWidth="w-full"
                options={types}
                itemSelectedFunc={itemSelectedFunc}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 col-gap-10 row-gap-6 mt-5 md:grid-cols-3 xl:grid-cols-4">
            {Array(4)
              .fill()
              .map((item, i) => (
                <UnitCardSkeleton key={i} />
              ))}
          </div>
        ) : units.length === 0 ? (
          <div className="bg-white p-5 rounded-lg shadow-lg mt-20">
            <div className="text-primary text-4xl text-center mx-auto my-10">
              This project has no Units yet
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 col-gap-10 row-gap-6 mt-5 md:grid-cols-3 xl:grid-cols-4">
              {units.map((unit) => (
                <UnitCard key={unit.id} unit={unit} pid={unit.project?.id} allunits={true} />
              ))}
            </div>
            <Pagination count={unitsCount} limit={12} setPageItem={setPageItem} />
          </div>
        )}
      </div>
    </div>
  )
}
