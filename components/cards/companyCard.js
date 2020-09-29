import { useState } from 'react'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { SendRequest } from '../../redux/actions/requestsActions'

export default function CompanyCard({ company }) {
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const onSendRequest = () => {
    setIsPending(!isPending)
    if (!isPending) dispatch(SendRequest(company.id))
  }

  return (
    <div className="bg-white border-none shadow-md rounded-lg overflow-hidden">
      <div className="transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <div className="cover relative">
          {company.friend_status !== 'Friends' && (
            <button
              className={`absolute bottom-0 right-0 py-1 mb-3 mr-5 w-1/4 text-sm rounded-full ransition duration-700 ease-in-out focus:outline-none ${
                company.friend_status === 'Pending' || isPending
                  ? 'bg-gray-400 text-gray-600 italic'
                  : 'bg-white text-primaryText hover:bg-primaryText hover:text-white'
              }`}
              onClick={onSendRequest}>
              {company.friend_status === 'Pending' || isPending ? 'Pending' : 'Send'}
            </button>
          )}
        </div>

        <div className="flex justify-start p-5">
          <div className="w-16 h-16 mr-6 mt-3">
            <img
              src={company.avatar ? company.avatar : '/assets/company-pict.png'}
              alt="company"
              className="block w-full h-full rounded-full mx-auto"
            />
          </div>
          <div className="item w-9/12">
            <button
              className="text-black font-bold text-lg cursor-pointer hover:text-primaryText focus:outline-none"
              onClick={() => Router.push('/companies/[cid]', `/companies/${company.id}`)}>
              {company.name}
            </button>
            <p className="desc text-primaryLight text-xs tracking-wide font-semibold mb-4 overflow-hidden whitespace-no-wrap">
              {company.description ? company.description : 'No Description'}
            </p>
            <div className="inline-block mr-2 mb-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
              <i className="fas fa-city fa-xs text-black mr-2"></i>
              <span className="details text-xs text-secondary font-semibold">
                {company.projects_count} {company.projects_count <= 1 ? 'Project' : 'Projects'}
              </span>
            </div>
            <div className="inline-block mr-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
              <i className="fas fa-home fa-xs text-black mr-2"></i>
              <span className="details text-xs text-secondary font-semibold">
                {company.units_count} {company.units_count <= 1 ? 'Unit' : 'Units'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .desc {
          text-overflow: ellipsis;
        }
        .details {
          font-size: 0.7rem;
        }
        .cover {
          height: 120px;
          background-image: url(${company.project_photo
            ? company.project_photo
            : '/assets/company-cover.jpg'});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 50% 50%;
        }
      `}</style>
    </div>
  )
}
