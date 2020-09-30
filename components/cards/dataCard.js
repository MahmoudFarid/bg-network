import { useState } from 'react'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { SendRequest } from '../../redux/actions/requestsActions'

export default function DataCard({ data, isBroker, onSendRequest }) {
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const sendRequestFun = () => {
    setIsPending(!isPending)
    if (!isPending) dispatch(SendRequest(data.id))
  }
  return (
    <div
      className={`bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden ${
        isPending && 'animate__animated animate__fadeOut'
      }`}>
      <div className="card relative text-center transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <div className="py-5">
          <div className="w-full mb-3 px-5">
            <img
              src={data.avatar ? data.avatar : '/assets/company-pict.png'}
              alt="company"
              className="block w-24 h-24 rounded-full mx-auto"
            />
          </div>
          <div className="px-5">
            {isBroker ? (
              <button
                className="text-black font-bold mb-3 text-lg cursor-pointer hover:text-primaryText focus:outline-none"
                onClick={() => Router.push('/brokers/[bid]', `/brokers/${data.id}`)}>
                {data.name}
              </button>
            ) : (
              <button
                className="text-black font-bold mb-3 text-lg cursor-pointer hover:text-primaryText focus:outline-none"
                onClick={() => Router.push('/companies/[cid]', `/companies/${data.id}`)}>
                {data.name}
              </button>
            )}
            {data.description && data.description !== 'null' ? (
              <p className="desc h-10 overflow-hidden text-primaryLight text-xs tracking-wide font-semibold mb-4">
                {data.description}
              </p>
            ) : (
              <p className="h-10 text-primaryLight text-xs tracking-wide font-semibold mb-4">
                No Description
              </p>
            )}
          </div>
          {isBroker ? (
            <div className="inline-block py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
              <i className="fas fa-building fa-xs text-black mr-2"></i>
              <span className="details text-xs text-secondary font-semibold">
                {data.reds_count} {data.reds_count <= 1 ? 'Company' : 'Companies'}
              </span>
            </div>
          ) : (
            <div>
              <div className="inline-block mr-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
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
          {data.friend_status !== 'Friends' && (
            <button
              className="bg-primary text-white sendBtn absolute left-0 w-full p-3 focus:outline-none"
              onClick={() => {
                onSendRequest(), sendRequestFun()
              }}>
              Send Request
            </button>
          )}
        </div>
      </div>
      <style jsx>{`
        .desc {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .details {
          font-size: 0.7rem;
        }
        .sendBtn {
          bottom: -5rem;
          transition: bottom 0.2s ease-in-out;
        }
        .card:hover .sendBtn {
          bottom: 0;
        }
      `}</style>
    </div>
  )
}
