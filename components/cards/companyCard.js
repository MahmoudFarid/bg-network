import Link from 'next/link'
import { useState } from 'react'

export default function CompanyCard({ myCompany }) {
  const [isPending, setIsPending] = useState(false)

  return (
    <div className="bg-white border-none shadow-md rounded-lg">
      <div className="relative">
        <img src="/assets/company-cover.jpg" alt="company" />
        {!myCompany && (
          <button
            className={`absolute bottom-0 right-0 py-1 m-3 w-1/4 text-sm rounded-full ransition duration-700 ease-in-out focus:outline-none ${
              isPending
                ? 'bg-gray-400 text-gray-600 italic'
                : 'bg-white text-primaryText hover:bg-primaryText hover:text-white'
            }`}
            onClick={() => setIsPending(!isPending)}>
            {isPending ? 'Pending' : 'Send'}
          </button>
        )}
      </div>

      <div className="flex justify-start p-5">
        <div className="w-32 h-20 mr-5 mt-5">
          <img
            src="/assets/company-pic.jpg"
            alt="company"
            className="block w-10/12 h-full rounded-full mx-auto"
          />
        </div>
        <div className="item w-full">
          <Link href="/profile?id=1">
            <a className="text-black font-extrabold text-lg hover:text-primaryText focus:outline-none">
              Talaat Mustafa
            </a>
          </Link>
          <p className="text-secondaryLight text-xs tracking-wide font-semibold mb-4 mt-1">
            Best city company development in egypt has over 300 project with overthan 3,000
            employees.
          </p>
          <div className="inline-block mr-2 mb-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
            <i className="fas fa-city fa-xs text-black mr-2"></i>
            <span className="text-xs text-secondary font-semibold">20 Projects</span>
          </div>
          <div className="inline-block mr-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
            <i className="fas fa-home fa-xs text-black mr-2"></i>
            <span className="text-xs text-secondary font-semibold">200 Units</span>
          </div>
        </div>
      </div>
    </div>
  )
}
