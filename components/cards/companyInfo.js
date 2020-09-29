import { useState } from 'react'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { SendRequest } from './../../redux/actions/requestsActions'

export default function CompanyInfo({ company }) {
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const onSendRequest = () => {
    setIsPending(!isPending)
    if (!isPending) dispatch(SendRequest(company.id))
  }

  return (
    <div>
      <div className="flex justify-start">
        <div className="w-16 h-12 mr-2 mt-2">
          <img
            src={company.avatar ? company.avatar : '/assets/company-pict.png'}
            alt="company"
            className="block w-10/12 h-full rounded-full mx-auto"
          />
        </div>
        <div className="item w-9/12">
          <button
            className="text-secondary font-bold text-md hover:text-primaryText focus:outline-none"
            onClick={() => Router.push('/companies/[cid]', `/companies/${company.id}`)}>
            {company.name}
          </button>
          <p className="desc text-primaryLight text-xs tracking-wide font-semibold mb-2 mt-1 overflow-hidden whitespace-no-wrap">
            {company.description ? company.description : 'No Description'}
          </p>
          <div className="inline-block mr-2 mb-1 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
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
          <button
            className={`block py-1 mt-1 w-1/3 text-xs font-semibold rounded-full focus:outline-none ${
              company.friend_status === 'Pending' || isPending
                ? 'bg-gray-400 text-gray-600 italic'
                : 'bg-primary text-gray-400 hover:text-white'
            }`}
            onClick={onSendRequest}>
            {company.friend_status === 'Pending' || isPending ? 'Pending' : 'Send'}
          </button>
        </div>
      </div>
      <hr className="my-4 border-top border-gray-300" />
      <style jsx>{`
        .desc {
          text-overflow: ellipsis;
        }
        .details {
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  )
}
