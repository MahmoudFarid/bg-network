import { useState } from 'react'
import Router from 'next/router'

export default function Requests() {
  const [requestsList, isRequestsList] = useState(false)
  return (
    <div className="container-fluid my-16">
      <h2 className="text-black font-bold text-lg mb-5">Requests</h2>
      <button
        className={`py-3 px-10 bg-white rounded-tl-lg focus:outline-none ${
          requestsList ? 'bg-white' : 'bg-primaryText text-white'
        }`}
        onClick={() => {
          isRequestsList(false)
          Router.push('/followers')
        }}>
        Brokers list
      </button>
      <button
        className={`py-3 px-10 bg-white rounded-tr-lg focus:outline-none ${
          requestsList ? 'bg-primaryText text-white' : 'bg-white'
        }`}
        onClick={() => {
          isRequestsList(true)
          Router.push('/followers/requests')
        }}>
        Requests
      </button>
    </div>
  )
}
