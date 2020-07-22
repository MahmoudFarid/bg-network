import { useState } from 'react'
import { useRouter } from 'next/router'
import FollowCard from '../../components/cards/followCard'

export default function Followers() {
  const {
    query: { isFollowersComp },
  } = useRouter()
  const isFollowersChoice = isFollowersComp === 'true' ? true : false
  const [isFollowers, setIsFollowers] = useState(isFollowersChoice)

  return (
    <div className="container-fluid my-16">
      <h2 className="text-black font-bold text-lg mb-8">{isFollowers ? 'Brokers' : 'Requests'}</h2>
      <button className="bg-white focus:outline-none" onClick={() => setIsFollowers(true)}>
        <span
          className={`py-3 px-16 rounded-tl-lg border-b border-gray-100 ${
            isFollowers ? 'bg-primaryText text-white' : 'bg-white'
          }`}>
          Brokers list
        </span>
      </button>
      <button className="bg-white focus:outline-none" onClick={() => setIsFollowers(false)}>
        <span
          className={`py-3 px-16 rounded-tr-lg border-b border-gray-100  ${
            isFollowers ? 'bg-white' : 'bg-primaryText text-white'
          }`}>
          Requests
        </span>
      </button>
      <div className="bg-white p-5 pt-0 mt-3 rounded-lg shadow-lg">
        <FollowCard isFollowers={isFollowers} />
        <FollowCard isFollowers={isFollowers} />
        <FollowCard isFollowers={isFollowers} />
        <FollowCard isFollowers={isFollowers} />
        <FollowCard isFollowers={isFollowers} />
        <FollowCard isFollowers={isFollowers} />
      </div>
    </div>
  )
}
