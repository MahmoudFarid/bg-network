import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import API from '../api'
import Filter from '../components/features/filter'
import UnitCard from './../components/cards/unitCard'
import Pagination from './../components/features/pagination'
import NotFoundSearch from './../components/notFoundSearch'
import UnitCardSkeleton from './../components/skeletons/unitCardSkeleton'

export default function Units() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterLoading, setIsFilterLoading] = useState(true)
  const [params, setParams] = useState('')
  const [inputVal, setInputVal] = useState({})
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

  const itemSelectedFunc = (id, name, option) => {
    if (name === 'Companies') {
      setCompanySelected(id)
      setProjects([])
      inputVal.red = id
      async function fetchProjects() {
        await API.get(`reds/${id}/projects/?limit=10000000`).then((res) => {
          setProjects(res.data.results)
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      fetchProjects()
    } else if (name === 'Projects') {
      inputVal.project = id
    } else if (name === 'Types') {
      inputVal.type = option
    } else if (name === 'Directions') {
      inputVal.direction = option.toUpperCase()
    }
    onBlur()
  }

  const onBlur = () => {
    let paramsUrl = ''
    for (const item in inputVal) {
      if (inputVal[item]) {
        paramsUrl += `${item}=${inputVal[item]}&`
        setParams(paramsUrl)
        setIsLoading(true)
      }
    }
    async function fetchUnits() {
      await API.get(`reds/units/?${paramsUrl}`).then((res) => {
        setUnits(res.data.results)
        setUnitsCount(res.data.count)
        setIsLoading(false)
      })
    }
    fetchUnits()
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
      await API.get(`reds/friends/?limit=10000000`).then((res) => {
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

      <div className="container my-12">
        <div className={`${isLoading && isFilterLoading && 'invisible'}`}>
          <Filter
            types={types}
            companies={companies}
            projects={projects}
            companySelected={companySelected}
            itemSelectedFunc={itemSelectedFunc}
            setInputVal={setInputVal}
            onBlur={onBlur}
            isAllUnits={true}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 col-gap-10 row-gap-6 mt-5 md:grid-cols-3 xl:grid-cols-4">
            {Array(4)
              .fill()
              .map((item, i) => (
                <UnitCardSkeleton key={i} />
              ))}
          </div>
        ) : units.length === 0 && params === '' ? (
          <div className="bg-white p-5 rounded-lg shadow-lg mt-20">
            <div className="text-primary text-4xl text-center mx-auto my-10">
              You don't have any Units yet
            </div>
          </div>
        ) : units.length === 0 && params !== '' ? (
          <div className="bg-white p-5 rounded-lg shadow-lg mt-20">
            <NotFoundSearch />
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
