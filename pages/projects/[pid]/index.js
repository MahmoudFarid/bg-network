import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import API from '../../../api'
import Loading from './../../../components/core/loading'
import Filter from '../../../components/features/filter'
import UnitCard from '../../../components/cards/unitCard'
import Overlay from '../../../components/features/overlay'
import DeleteObj from '../../../components/popup/deleteObj'
import DropdownMenu from '../../../components/features/dropdownMenu'
import ProjectSideBar from './../../../components/core/projectSideBar'
import AdvancedFilter from '../../../components/features/advancedFilter'
import CarouselOverlay from '../../../components/features/carouselOverlay'
import { DeleteProject } from './../../../redux/actions/projectsActions'
import Pagination from '../../../components/features/pagination'

export default function Project() {
  const {
    query: { pid },
  } = useRouter()

  const [isBroker, setIsBroker] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isProjectLoading, setIsProjectLoading] = useState(true)
  const [inputVal, setInputVal] = useState(0)
  const [isOverlay, setIsOverlay] = useState(false)
  const [isDeleteOverlay, setIsDeleteOverlay] = useState(false)
  const [isCarouselOverlay, setIsCarouselOverlay] = useState(false)
  const [cid, setCid] = useState()
  const [project, setProject] = useState({})
  const [units, setUnits] = useState([])
  const [unitsCount, setUnitsCount] = useState(Number)
  const dispatch = useDispatch()

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

  const onDeletingItem = () => {
    dispatch(DeleteProject(pid))
  }

  const toggleProjectImgs = (e) => {
    e.stopPropagation()
    setIsCarouselOverlayFunc(true)
    setIsDeleteOverlay(false)
  }

  const deleteProject = (e) => {
    e.stopPropagation()
    setIsDeleteOverlay(true)
    setIsCarouselOverlayFunc(false)
  }

  const setPageItem = (offset, limit) => {
    if (cid == 0) {
      async function fetchUnits() {
        await API.get(`projects/${pid}/units/?limit=${offset}&offset=${offset * limit}`).then(
          (res) => {
            setUnits(res.data.results)
          }
        )
      }
      fetchUnits()
    } else {
      async function fetchUnits() {
        await API.get(
          `reds/${cid}/projects/${pid}/units/?limit=${offset}&offset=${offset * limit}`
        ).then((res) => {
          setUnits(res.data.results)
        })
      }
      fetchUnits()
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const cid = localStorage.getItem('CID')
    const isBroker = localStorage.getItem('isBroker')

    setCid(cid)
    setIsBroker(isBroker)

    if (pid) {
      console.log('company -> ', cid, ' with project -> ', pid)
      if (cid == 0) {
        async function fetchProject() {
          await API.get(`projects/${pid}/`).then((res) => {
            setProject(res.data)
            setIsProjectLoading(false)
          })
        }
        async function fetchUnits() {
          await API.get(`projects/${pid}/units/`).then((res) => {
            setUnits(res.data.results)
            setUnitsCount(res.data.count)
            setIsLoading(false)
          })
        }
        fetchProject()
        fetchUnits()
      } else {
        async function fetchUnits() {
          await API.get(`reds/${cid}/projects/${pid}/units/`).then((res) => {
            setUnits(res.data.results)
            setUnitsCount(res.data.count)
            setIsLoading(false)
          })
        }
        fetchUnits()
      }
    }
  }, [pid])

  return (
    <div>
      <Head>
        <title>Project Details</title>
      </Head>
      {isLoading && isProjectLoading ? (
        <Loading />
      ) : (
        <div
          onClick={() => {
            setIsOverlay(false)
            setIsDeleteOverlay(false)
            setIsCarouselOverlay(false)
          }}>
          <Overlay opacity={isOverlay} />
          <Overlay opacity={isDeleteOverlay} />
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
          {isDeleteOverlay && <DeleteObj onDeletingItem={onDeletingItem} name={project.name} />}

          {isCarouselOverlay && (
            <CarouselOverlay sources={project.images} setIsOverlayFunc={setIsCarouselOverlayFunc} />
          )}

          <div className="grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-4 lg:gap-6 lg:ml-0">
            <ProjectSideBar
              project={project}
              toggleProjectImgs={toggleProjectImgs}
              deleteProject={deleteProject}
              isBroker={isBroker}
            />

            <div className="col-span-3 mt-10 mb-16">
              <div className="w-full mb-5 clearfix">
                {isBroker != 'true' && units.length > 0 && (
                  <button
                    className="float-right py-3 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-full hover:text-white focus:outline-none"
                    onClick={() =>
                      Router.push('/projects/[pid]/units/add', `/projects/${pid}/units/add`)
                    }>
                    <i className="fas fa-plus-circle fa-lg text-white mr-5"></i>
                    Add Unit
                  </button>
                )}
              </div>
              {units.length === 0 ? (
                <div className="bg-white p-5 rounded-lg shadow-lg mt-20">
                  <div className="text-primary text-4xl text-center mx-auto my-10">
                    This project has no Units yet
                    <button
                      className="block bg-primary text-gray-400 text-sm font-semibold w-1/4 py-3 mt-5 mx-auto rounded-full hover:text-white focus:outline-none"
                      onClick={() =>
                        Router.push('/projects/[pid]/units/add', `/projects/${pid}/units/add`)
                      }>
                      Add Unit
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-white p-3 rounded-lg w-full xl:pb-0">
                    <div className="grid grid-cols-1 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                            setIsDeleteOverlay(false)
                            setIsCarouselOverlayFunc(false)
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
                          classes="py-1"
                          dropdownWidth="w-full"
                          options={dropdownOptions}
                          itemSelectedFunc={itemSelectedFunc}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 xl:grid-cols-3">
                    {units.map((unit) => (
                      <UnitCard key={unit.id} unit={unit} pid={pid} />
                    ))}
                  </div>
                  <Pagination count={unitsCount} limit={9} setPageItem={setPageItem} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
