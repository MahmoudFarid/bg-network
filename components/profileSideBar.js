import { useState } from 'react'
import Link from 'next/link'

export default function ProfileSideBar({ profileId }) {
  const [isPending, setIsPending] = useState(false)

  return (
    <div className="bg-bgLight py-12 pt-24">
      <div className="w-48 h-40 mx-auto">
        <img
          src="/assets/company-pic.jpg"
          alt="company"
          className="block w-10/12 h-full rounded-full mx-auto"
        />
      </div>
      <div className="text-center mt-5">
        <p className="text-black font-semibold text-lg">Talaat Mustafa</p>
        <span className="text-secondary text-sm">Cairo, Egypt</span>
        {profileId && (
          <button
            className={`block py-3 mt-5 w-1/3 mx-auto text-xs font-semibold rounded-full focus:outline-none ${
              isPending
                ? 'bg-gray-400 text-gray-600 italic'
                : 'bg-primary text-gray-400 hover:text-white'
            }`}
            onClick={() => setIsPending(!isPending)}>
            {isPending ? 'Pending' : 'Send a request'}
          </button>
        )}
      </div>
      <div className="w-3/4 mx-auto mt-8 text-center">
        {profileId ? (
          <div className="flex justify-around">
            <div>
              <p className="font-bold">Projects</p>
              <span className="text-secondary text-sm">10,000</span>
            </div>
            <div>
              <p className="font-bold">Units</p>
              <span className="text-secondary text-sm">10000,00</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-around">
            <Link href="/projects">
              <a className="hover:text-primaryText">
                <p className="font-bold">Projects</p>
                <span className="text-secondary text-sm hover:text-primaryText">10,000</span>
              </a>
            </Link>
            <a href="#" className="hover:text-primaryText">
              <p className="font-bold">Units</p>
              <span className="text-secondary text-sm hover:text-primaryText">10000,00</span>
            </a>
          </div>
        )}
      </div>
      <div className="mt-8 px-8">
        <p className="font-semibold ml-2 mb-2">About</p>
        <p className="text-primary">
          Talaat Mustafa Group (TMG) Holding is the leading community real estate developer in
          Egypt, with a land bank of 50 million square meters. The group has a strong track record
          of over 40 years in the housing and real-estate development industry, having developed 8.5
          million sqm of land so far.
        </p>
      </div>
    </div>
  )
}
