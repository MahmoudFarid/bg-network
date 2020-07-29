import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import NumberFormat from 'react-number-format'
import API from '../../../../api'
import Loading from '../../../../components/core/loading'
import PlanDetails from '../../../../components/cards/planDetails'
import GoogleMap from '../../../../components/features/googleMap'
import Carousel from '../../../../components/features/carousel'
import Carousel2 from '../../../../components/features/carousel2'
import Overlay from './../../../../components/features/overlay'

export default function Unit() {
  const {
    query: { pid, uid },
  } = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isOverlay, setIsOverlay] = useState(false)
  const [isOverlay2, setIsOverlay2] = useState(false)
  const [isPlanOverlay, setIsPlanOverlay] = useState(false)
  const [plan, setPlan] = useState({})
  const [unit, setUnit] = useState({})

  const setIsOverlayFunc = (bool) => {
    setIsOverlay(bool)
  }

  const setIsOverlayFunc2 = (bool) => {
    setIsOverlay2(bool)
  }

  useEffect(() => {
    const cid = localStorage.getItem('CID')

    if ((pid, uid)) {
      console.log('company -> ', cid, ' in project -> ', pid, ' in unit -> ', uid)
      async function fetchUnit() {
        await API.get(`reds/${cid}/projects/${pid}/units/${uid}`).then((res) => {
          setUnit(res.data)
          setIsLoading(false)
        })
      }
      fetchUnit()
    }
  }, [pid, uid])
  console.log(unit)

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="container-fluid my-16"
          onClick={() => {
            setIsOverlay(false)
            setIsOverlay2(false)
            setIsPlanOverlay(false)
          }}>
          <Overlay opacity={isPlanOverlay} />
          {isPlanOverlay && <PlanDetails plan={plan} />}
          <div className="mb-5 overflow-hidden">
            <button className="py-3 px-6 float-right text-secondaryLight text-xs font-bold border border-secondaryLight rounded-lg transition duration-500 ease-in-out focus:outline-none hover:bg-secondaryLight hover:text-white">
              Share with your Brokers
            </button>
            <button className="py-3 px-12 mr-5 float-right text-success border border-success text-xs font-bold rounded-lg transition duration-500 ease-in-out focus:outline-none hover:bg-success hover:text-white">
              Edit
            </button>
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="w-full mt-5 lg:w-5/12">
              <h2 className="text-black font-bold text-3xl">{unit.name}</h2>
              <p className="text-primary my-4 w-11/12">
                Talaat Mustafa Group (TMG) Holding is the leading community real estate developer in
                Egypt, with a land bank of 50 million square meters. The group has a strong track
                record of over 40 years in the housing and real-estate development industry, having
                developed 8.5 million sqm of land so far.
              </p>
              <p className="text-primary my-4 w-11/12">
                Talaat Mustafa Group (TMG) Holding is the leading community real estate developer in
                Egypt, with a land bank of 50 million square meters. The group has a strong track
                record of over 40 years in the housing and real-estate development industry, having
                developed 8.5 million sqm of land so far.
              </p>
            </div>
            <div className="imgs relative w-full lg:w-7/12">
              <Carousel2
                isOverlay2={isOverlay2}
                setIsOverlayFunc2={setIsOverlayFunc2}
                sources2={unit.images}
                order={2}
              />
              <div className="absolute bottom-0 right-0 bg-white py-3 px-5 border-b-2 border-gray-200 w-full sm:w-8/12">
                <div className="inline-block font-bold text-secondary w-1/2">
                  <p className="text-lg mb-1">Total</p>
                  <span className="inline-block text-black text-3xl">
                    <NumberFormat value={unit.cost} displayType={'text'} thousandSeparator={true} />
                    &nbsp; LE
                  </span>
                </div>
                <div className="inline-block font-bold text-secondary w-1/2">
                  <p className="text-lg mb-1">In cash</p>
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
          </div>

          <div className="overflow-hidden mb-5">
            <div className="float-right flex flex-row-reverse flex-wrap w-full bg-white text-center rounded-lg lg:w-3/4 lg:flex-no-wrap">
              {unit.status && (
                <div className="w-3/12 py-4 border-r-2 border-gray-200">
                  <img
                    src="/assets/units/clock.jpg"
                    alt="clock"
                    className="block w-10 mx-auto mb-2"
                  />
                  <span>{unit.status}</span>
                </div>
              )}
              {unit.reception && (
                <div className="w-3/12 py-4 border-r-2 border-gray-200">
                  <img
                    src="/assets/units/room.jpg"
                    alt="room"
                    className="block w-10 mx-auto mb-2"
                  />
                  <span>{unit.reception} Receptions</span>
                </div>
              )}
              {unit.floor_number && (
                <div className="w-3/12 py-4 border-r-2 border-gray-200">
                  <img
                    src="/assets/units/floor.jpg"
                    alt="floor"
                    className="block w-10 mx-auto mb-2"
                  />
                  <span>{unit.floor_number} Floors</span>
                </div>
              )}
              {unit.direction && (
                <div className="w-3/12 py-4 border-r-2 border-gray-200">
                  <img
                    src="/assets/units/north.jpg"
                    alt="north"
                    className="block w-10 mx-auto mb-2"
                  />
                  <span>{unit.direction}</span>
                </div>
              )}
              {unit.area && (
                <div className="w-3/12 py-4 border-r-2 border-gray-200">
                  <img src="/assets/units/m2.jpg" alt="m2" className="block w-10 mx-auto mb-2" />
                  <span>
                    {unit.area} M<sup>2</sup>
                  </span>
                </div>
              )}
              {unit.bathrooms && (
                <div className="w-3/12 py-4 mt-2 border-r-2 border-gray-200">
                  <img
                    src="/assets/units/bathroom.jpg"
                    alt="bathroom"
                    className="block w-10 mx-auto mb-2"
                  />
                  <span>{unit.bathrooms}</span>
                </div>
              )}
              {unit.bedrooms && (
                <div className="w-3/12 py-4 border-r-2 border-gray-200">
                  <img
                    src="/assets/units/bedroom.jpg"
                    alt="bedroom"
                    className="block w-10 mx-auto mb-2"
                  />
                  <span>{unit.bedrooms} Bedrooms</span>
                </div>
              )}
              <div className="w-3/12 py-4 border-r-2 border-gray-200">
                <img
                  src="/assets/units/appartment.jpg"
                  alt="appartment"
                  className="block w-10 mx-auto mb-2"
                />
                <span>{unit.type.name}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-black text-lg font-bold mb-2">Plans ({unit.plans.length} Plan)</h2>
            {unit.plans.map((plan, index) => (
              <div className="bg-white mb-5 p-5">
                <p
                  className="text-primaryText font-semibold text-lg cursor-pointer hover:text-secondaryLight"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPlanOverlay(true)
                    setPlan(plan)
                  }}>
                  <span className="font-bold">{index + 1}- </span>
                  {plan.name}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-0 mb-10 lg:grid-cols-2 lg:gap-10 xl:gap-24">
            <div>
              <h2 className="text-black text-lg font-bold mb-2">Project Video</h2>
              <div className="project bg-white p-5 rounded-lg shadow-lg h-full">
                <ReactPlayer url={unit.p_youtube} width="100%" height="100%" controls={true} />
              </div>
            </div>
            <div>
              <h2 className="text-black text-lg font-bold mb-2 mt-5 lg:mt-0">Project Gallery</h2>
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
              <GoogleMap />
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .project {
          height: 33rem;
        }
        .imgs {
          height: 30rem;
        }
      `}</style>
    </div>
  )
}
