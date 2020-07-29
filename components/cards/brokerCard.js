import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SendRequest } from '../../redux/actions/requestsActions'

export default function BrokerCard({ broker }) {
  const [isPending, setIsPending] = useState(false)
  const dispatch = useDispatch()

  const onSendRequest = () => {
    setIsPending(!isPending)
    if (!isPending) dispatch(SendRequest(broker.id))
  }

  return (
    <div className="flex justify-start border border-gray-200 shadow-lg rounded-lg p-5 hover:border-primaryText">
      <div className="w-20 h-16 mr-2 mt-2">
        <img
          src={broker.avatar ? broker.avatar : '/assets/profile-pic.png'}
          alt="broker"
          className="block w-10/12 h-full rounded-full mx-auto"
        />
      </div>
      <div className="item w-9/12">
        <button className="text-secondary font-semibold text-lg hover:text-primaryText focus:outline-none">
          {broker.name}
        </button>
        <p className="desc text-primaryLight text-sm font-semibold mb-4 mt-1 overflow-hidden whitespace-no-wrap">
          {broker.description ? broker.description : 'No Description'}
        </p>
        <button
          className={`block py-1 mt-1 w-1/3 text-xs font-semibold rounded-full focus:outline-none ${
            isPending
              ? 'bg-gray-400 text-gray-600 italic'
              : 'bg-primary text-gray-400 hover:text-white'
          }`}
          onClick={onSendRequest}>
          {isPending ? 'Pending' : 'Send'}
        </button>
      </div>
    </div>
  )
}
