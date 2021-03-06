import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import NumberFormat from 'react-number-format'
import API from '../../../../../api'
import Overlay from '../../../../../components/features/overlay'
import Carousel from '../../../../../components/features/carousel'
import Carousel2 from '../../../../../components/features/carousel2'
import DeleteObj from './../../../../../components/popup/deleteObj'
import GoogleMap from '../../../../../components/features/googleMap'
import { DeleteUnit } from './../../../../../redux/actions/unitsActions'
import UnitDetailsSkeleton from '../../../../../components/skeletons/unitDetailsSkeletons'

export default function Unit() {
  const {
    query: { pid, uid },
  } = useRouter()

  const [isBroker, setIsBroker] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isOverlay, setIsOverlay] = useState(false)
  const [isOverlay2, setIsOverlay2] = useState(false)
  const [isDeleteOverlay, setIsDeleteOverlay] = useState(false)
  const [plansSelected, setSelectPlans] = useState([])
  const [unit, setUnit] = useState({})
  const dispatch = useDispatch()

  const setIsOverlayFunc = (bool) => {
    setIsOverlay(bool)
  }

  const setIsOverlayFunc2 = (bool) => {
    setIsOverlay2(bool)
  }

  const onDeletingItem = () => {
    dispatch(DeleteUnit(pid, uid))
  }

  const onSelectingPlan = (plan) => {
    if (plansSelected.find((p) => p.id === plan.id) == undefined)
      setSelectPlans((old) => [...old, plan])
    else {
      const index = plansSelected.findIndex((p) => p.id === plan.id)
      plansSelected.splice(index, 1)
      setSelectPlans((old) => [...old])
    }
  }

  useEffect(() => {
    const cid = localStorage.getItem('CID')
    const isBroker = localStorage.getItem('isBroker')
    setIsBroker(isBroker)

    if (pid && uid) {
      if (isBroker == 'true' && cid) {
        async function fetchUnit() {
          await API.get(`reds/${cid}/projects/${pid}/units/${uid}`).then((res) => {
            setUnit(res.data)
            plansSelected.push(res.data.plans[0])
            setIsLoading(false)
          })
        }
        fetchUnit()
      } else {
        async function fetchUnit() {
          await API.get(`projects/${pid}/units/${uid}`).then((res) => {
            setUnit(res.data)
            plansSelected.push(res.data.plans[0])
            setIsLoading(false)
          })
        }
        fetchUnit()
      }
    }
  }, [pid, uid])

  return (
    <div>
      <Head>
        <title>Unit Details</title>
      </Head>
      {isLoading ? (
        <UnitDetailsSkeleton />
      ) : (
        <div
          className="container my-16"
          onClick={() => {
            setIsOverlay(false)
            setIsOverlay2(false)
            setIsDeleteOverlay(false)
          }}>
          <Overlay opacity={isDeleteOverlay} />

          {isDeleteOverlay && <DeleteObj name={unit.name} onDeletingItem={onDeletingItem} />}

          <div className="relative flex justify-between flex-wrap">
            <div className="w-full mt-5 lg:w-5/12">
              <div className="flex justify-between items-baseline w-11/12">
                <h2 className="text-black font-bold text-3xl">{unit.name}</h2>
                {isBroker != 'true' && (
                  <div>
                    <button
                      className="py-1 px-2 text-primary text-sm border border-gray-400 font-semibold rounded-md mr-2 transition duration-500 ease-in-out hover:bg-gray-200 focus:outline-none"
                      onClick={(e) => {
                        Router.push(
                          '/projects/[pid]/units/[uid]/edit',
                          `/projects/${pid}/units/${uid}/edit`
                        )
                      }}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="py-1 px-2 text-primary text-sm border border-gray-400 font-semibold rounded-md transition duration-500 ease-in-out hover:bg-gray-200 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsDeleteOverlay(true)
                        setIsOverlay(false)
                        setIsOverlay2(false)
                      }}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                )}
              </div>
              {unit.description ? (
                <p className="desc w-11/12 text-primary my-4 overflow-y-auto">{unit.description}</p>
              ) : (
                <div className="text-primary text-3xl text-center mx-auto my-12">
                  This unit has no description
                </div>
              )}
            </div>
            <div className="imgs w-full lg:w-7/12">
              <Carousel2
                isOverlay2={isOverlay2}
                setIsOverlayFunc2={setIsOverlayFunc2}
                sources2={unit.images}
                order={2}
              />
            </div>
            <div className="price absolute bottom-0 bg-white py-2 px-4 ml-0 border-b-2 border-gray-200">
              <div className="inline-block font-bold text-secondary mr-20">
                <p className="text-md">Total</p>
                <span className="inline-block text-black text-3xl">
                  <NumberFormat value={unit.cost} displayType={'text'} thousandSeparator={true} />
                  &nbsp; LE
                </span>
              </div>
              <div className="inline-block font-bold text-secondary">
                <p className="text-md">In cash</p>
                <span className="inline-block text-danger text-3xl">
                  <NumberFormat
                    value={unit.cash_value}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                  &nbsp; LE
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden mb-5">
            <div className="float-right flex flex-row-reverse flex-wrap w-full bg-white text-center lg:w-3/4 lg:flex-no-wrap">
              <div className="w-3/12 py-2 border-r-2 border-gray-200">
                <img src="/assets/units/clock.jpg" alt="clock" className="block w-8 mx-auto mb-2" />
                <span>
                  {unit.status.charAt(0).toUpperCase() + unit.status.toLowerCase().slice(1)}
                </span>
              </div>
              <div className="w-3/12 py-2 border-r-2 border-gray-200">
                <img src="/assets/units/room.jpg" alt="room" className="block w-8 mx-auto mb-2" />
                <span>{unit.reception} Receptions</span>
              </div>
              <div className="w-3/12 py-2 border-r-2 border-gray-200">
                <img src="/assets/units/floor.jpg" alt="floor" className="block w-8 mx-auto mb-2" />
                <span>{unit.floor_number} Floors</span>
              </div>
              <div className="w-3/12 py-2 border-r-2 border-gray-200">
                <img src="/assets/units/north.jpg" alt="north" className="block w-8 mx-auto mb-2" />
                <span>
                  {unit.direction.charAt(0).toUpperCase() + unit.direction.toLowerCase().slice(1)}
                </span>
              </div>
              <div className="w-3/12 py-2 border-r-2 border-gray-200">
                <img src="/assets/units/m2.jpg" alt="area" className="block w-8 mx-auto mb-2" />
                <span>
                  {unit.area} M<sup>2</sup>
                </span>
              </div>
              <div className="w-3/12 py-2 mt-2 border-r-2 border-gray-200">
                <img
                  src="/assets/units/bathroom.jpg"
                  alt="bathroom"
                  className="block w-8 mx-auto mb-3"
                />
                <span>{unit.bathrooms} Bathrooms</span>
              </div>
              <div className="w-3/12 py-2 border-r-2 border-gray-200">
                <img
                  src="/assets/units/bedroom.jpg"
                  alt="bedroom"
                  className="block w-8 mx-auto mb-2"
                />
                <span>{unit.bedrooms} Bedrooms</span>
              </div>
              <div className="w-3/12 py-2 border-r-2 border-gray-200">
                <img
                  src="/assets/units/appartment.jpg"
                  alt="appartment"
                  className="block w-8 mx-auto mb-2"
                />
                <span>{unit.type.name}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-black text-md font-bold mb-3">Plans ({unit.plans.length} Plans)</h2>
            {unit.plans.map((plan) => (
              <div className="p-3" key={plan.id}>
                <div
                  className="text-primaryText font-semibold text-xl cursor-pointer hover:text-secondaryLight"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectingPlan(plan)
                  }}>
                  {plan.name}
                </div>
                <div className="bg-white w-full">
                  <div className="mt-2 flex flex-start flex-no-wrap overflow-x-auto overflow-y-hidden">
                    {plansSelected.map(
                      (p) =>
                        p.name === plan.name &&
                        p.installments.map((installment) => (
                          <div
                            className={`installment p-5 animate__animated animate__slideInDown`}
                            key={installment.id}>
                            <p className="text-lg text-secondary">{installment.name}</p>
                            <span className="text-secondary font-semibold block">
                              {installment.amount}
                            </span>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-0 mb-10 lg:grid-cols-2 lg:gap-10 xl:gap-24">
            <div>
              <h2 className="text-black text-md font-bold mb-3">Project Video</h2>
              <div className="project relative bg-white p-5 rounded-lg shadow-lg h-full">
                {unit.p_youtube ? (
                  <ReactPlayer url={unit.p_youtube} width="100%" height="100%" controls={true} />
                ) : (
                  <div className="msg absolute w-full text-primary text-3xl text-center mx-auto">
                    The project has no video yet
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-black text-md font-bold mb-3 mt-5 lg:mt-0">Project Gallery</h2>
              <div className="project bg-white p-5 rounded-lg shadow-lg">
                <Carousel
                  isOverlay={isOverlay}
                  setIsOverlayFunc={setIsOverlayFunc}
                  sources={unit.p_images}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 bg-white p-5 rounded-lg shadow-lg lg:grid-cols-3 lg:gap-20">
            <p className="text-black text-lg self-center mb-5">
              The project enjoys an outstanding location in Nasr City that is only a few minutes
              away from 90th Street.
              <br />
              5th Settlement, through Al Mosheer Tantawy Axis. Also, it is very close to Mokattam,
              Maadi, Heliopolis, Ring Road and Ain Sokhna
            </p>
            <div className="col-span-2">
              <GoogleMap height="30rem" />
            </div>
          </div>
        </div>
      )}
      <style jsx>
        {`
          .project {
            height: 33rem;
          }
          .imgs {
            height: 32rem;
          }
          .installment {
            min-width: 20%;
          }
          .msg {
            top: 45%;
            left: 50%;
            transform: translate(-50%);
          }
          .price {
            margin-left: 25%;
            min-width: 33%;
          }
          .desc {
            height: 66%;
          }
        `}
      </style>
    </div>
  )
}
