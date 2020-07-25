import { useState } from 'react'
import Router from 'next/router'

export default function CompanyInfo({ company }) {
  const [isPending, setIsPending] = useState(false)

  return (
    <div>
      <div className="flex justify-start">
        <div className="w-24 h-16 mr-2 mt-2">
          <img
            src={company.avatar}
            alt="company"
            className="block w-10/12 h-full rounded-full mx-auto"
          />
        </div>
        <div className="item w-full">
          <button
            className="text-secondary font-semibold text-lg hover:text-primaryText focus:outline-none"
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
          <button
            className={`block py-1 mt-1 w-1/3 text-xs font-semibold rounded-full focus:outline-none ${
              isPending
                ? 'bg-gray-400 text-gray-600 italic'
                : 'bg-primary text-gray-400 hover:text-white'
            }`}
            onClick={() => setIsPending(!isPending)}>
            {isPending ? 'Pending' : 'Send'}
          </button>
        </div>
      </div>
      <hr className="my-4 border border-gray-200" />
    </div>
  )
}
