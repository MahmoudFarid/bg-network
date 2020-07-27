import { useState } from 'react'
import Router from 'next/router'

export default function CompanyCard({ company }) {
  const [isPending, setIsPending] = useState(false)

  return (
    <div className="bg-white border-none shadow-md rounded-lg overflow-hidden">
      <div className="transition duration-1000 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <div className="relative">
          <img src="/assets/company-cover.jpg" alt="company" />
          {company.friend_status !== 'Friends' && (
            <button
              className={`absolute bottom-0 right-0 py-1 mb-3 mr-5 w-1/4 text-sm rounded-full ransition duration-700 ease-in-out focus:outline-none ${
                company.friend_status === 'Pending' || isPending
                  ? 'bg-gray-400 text-gray-600 italic'
                  : 'bg-white text-primaryText hover:bg-primaryText hover:text-white'
              }`}
              onClick={() => setIsPending(!isPending)}>
              {company.friend_status === 'Pending' || isPending ? 'Pending' : 'Send'}
            </button>
          )}
        </div>

        <div className="flex justify-start p-5">
          <div className="w-32 h-20 mr-5 mt-5">
            <img
              src={company.avatar}
              alt="company"
              className="block w-10/12 h-full rounded-full mx-auto"
            />
          </div>
          <div className="item w-full">
            <button
              className="text-black font-extrabold text-lg cursor-pointer hover:text-primaryText focus:outline-none"
              onClick={() => Router.push('/companies/[cid]', `/companies/${company.id}`)}>
              {company.name}
            </button>
            <p className="text-primaryLight text-xs tracking-wide font-semibold mb-4 mt-1">
              {company.description ? company.description : 'No Description'}
            </p>
            <div className="inline-block mr-2 mb-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
              <i className="fas fa-city fa-xs text-black mr-2"></i>
              <span className="text-xs text-secondary font-semibold">
                {company.projects_count} {company.projects_count <= 1 ? 'Project' : 'Projects'}
              </span>
            </div>
            <div className="inline-block mr-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
              <i className="fas fa-home fa-xs text-black mr-2"></i>
              <span className="text-xs text-secondary font-semibold">
                {company.units_count} {company.units_count <= 1 ? 'Unit' : 'Units'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
