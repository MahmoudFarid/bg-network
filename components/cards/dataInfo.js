import { useState } from 'react'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { SendRequest } from './../../redux/actions/requestsActions'

export default function DataInfo({ data, isBroker, onSendRequest }) {
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const sendRequestFun = () => {
    setIsPending(!isPending)
    if (!isPending) dispatch(SendRequest(data.id))
  }

  return (
    <div className={isPending && 'animate__animated animate__fadeOut animate__faster'}>
      <div className="flex justify-start">
        <div className="w-16 h-12 mr-2 mt-2">
          <img
            src={data.avatar ? data.avatar : '/assets/company-pict.png'}
            alt="company"
            className="block w-10/12 h-full rounded-full mx-auto"
          />
        </div>
        <div className="item w-9/12">
          {isBroker == 'true' ? (
            <button
              className="text-secondary font-bold text-md hover:text-primaryText focus:outline-none"
              onClick={() => Router.push('/companies/[cid]', `/companies/${data.id}`)}>
              {data.name}
            </button>
          ) : (
            <button
              className="text-secondary font-bold text-md hover:text-primaryText focus:outline-none"
              onClick={() => Router.push('/brokers/[bid]', `/brokers/${data.id}`)}>
              {data.name}
            </button>
          )}

          <p className="desc text-primaryLight text-xs tracking-wide font-semibold mb-2 mt-1 overflow-hidden">
            {data.description && data.description !== 'null' ? data.description : 'No Description'}
          </p>
          {isBroker ? (
            <div className="inline-block mr-2 mb-1 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
              <i className="fas fa-city fa-xs text-black mr-2"></i>
              <span className="details text-xs text-secondary font-semibold">
                {data.reds_count} {data.reds_count <= 1 ? 'Company' : 'Companies'}
              </span>
            </div>
          ) : (
            <div>
              <div className="inline-block mr-2 mb-1 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
                <i className="fas fa-city fa-xs text-black mr-2"></i>
                <span className="details text-xs text-secondary font-semibold">
                  {data.projects_count} {data.projects_count <= 1 ? 'Project' : 'Projects'}
                </span>
              </div>
              <div className="inline-block mr-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
                <i className="fas fa-home fa-xs text-black mr-2"></i>
                <span className="details text-xs text-secondary font-semibold">
                  {data.units_count} {data.units_count <= 1 ? 'Unit' : 'Units'}
                </span>
              </div>
            </div>
          )}
          <button
            className={`bg-primary text-gray-400 hover:text-white py-1 mt-1 w-1/3 text-xs font-semibold rounded-full focus:outline-none
            ${isBroker ? 'inline-block' : 'block'}`}
            onClick={() => {
              onSendRequest(), sendRequestFun()
            }}>
            Send
          </button>
        </div>
      </div>
      <hr className="my-4 border-top border-gray-300" />
      <style jsx>{`
        .desc {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .details {
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  )
}
