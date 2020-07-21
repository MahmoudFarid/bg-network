import { useState } from 'react'
import Link from 'next/link'

export default function CompanyInfo() {
  const [isPending, setIsPending] = useState(false)

  return (
    <div>
      <div className="flex justify-start">
        <div className="w-24 h-16 mr-2 mt-2">
          <img
            src="/assets/company-pic.jpg"
            alt="company"
            className="block w-10/12 h-full rounded-full mx-auto"
          />
        </div>
        <div className="item w-full">
          <Link href="/profile?id=1">
            <a className="text-secondary font-semibold text-lg hover:text-primaryText focus:outline-none">
              Cityscape
            </a>
          </Link>
          <p className="text-primaryLight text-xs tracking-wide font-semibold mb-4 mt-1">
            Best city company development in egypt has over 300 project with overthan 3,000
            employees.
          </p>
          <div className="inline-block mr-2 mb-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
            <i className="fas fa-city fa-xs text-black mr-2"></i>
            <span className="text-xs text-secondary font-semibold">20 Project</span>
          </div>
          <div className="inline-block mr-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
            <i className="fas fa-home fa-xs text-black mr-2"></i>
            <span className="text-xs text-secondary font-semibold">200 Units</span>
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
