import { useState, useEffect } from 'react'
import Link from 'next/link'
import API from '../../api'

export default function ProfileSideBar({ cid }) {
  const [isPending, setIsPending] = useState(false)
  const [profile, setProfile] = useState({})
  const [count, setCount] = useState({})

  useEffect(() => {
    if (cid) {
      async function fetchCompany() {
        const { data } = await API.get(`reds/${cid}/`)
        setProfile(data)
      }
      fetchCompany()
    } else {
      async function fetchProfile() {
        const { data } = await API.get('users/me/')
        setProfile(data)
      }
      async function fetchCount() {
        const { data } = await API.get('reds/count')
        setCount(data)
      }
      fetchCount()
      fetchProfile()
    }
  }, [])

  return (
    <div className="bg-bgLight py-12 pt-24">
      <div className="w-48 h-40 mx-auto">
        <img
          src={profile.avatar ? profile.avatar : '/assets/profile-pic.png'}
          alt="profile"
          className="block w-10/12 h-full rounded-full mx-auto"
        />
      </div>
      <div className="text-center mt-5">
        <p className="text-black font-semibold text-lg">{profile.name}</p>
        <span className="text-secondary text-sm">Cairo, Egypt</span>
        {cid && (
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
        {profile.is_broker ? (
          <div className="flex justify-around">
            <div>
              <p className="font-bold">Companies</p>
              <span className="text-sm hover:text-primaryText">
                {count.friends_count ? count.friends_count : '0'}
              </span>
            </div>
            <Link
              href={{
                pathname: '/projects',
                query: { cid: cid },
              }}
              as="/projects">
              <a className="hover:text-primaryText">
                <p className="font-bold">Projects</p>
                <span className="text-sm">
                  {count.friends_projects_count ? count.friends_projects_count : '0'}
                </span>
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex justify-around">
            <Link
              href={{
                pathname: '/projects',
                query: { cid: cid },
              }}
              as="/projects">
              <a className="hover:text-primaryText">
                <p className="font-bold">Projects</p>
                <span className="text-sm">
                  {profile.projects_count ? profile.projects_count : '0'}
                </span>
              </a>
            </Link>
            <div>
              <p className="font-bold">Units</p>
              <span className="text-sm hover:text-primaryText">
                {profile.units_count ? profile.units_count : '0'}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 px-8">
        <p className="font-semibold ml-2 mb-2">About</p>
        <p className="text-primary">
          {profile.description ? profile.description : 'No Description'}
        </p>
      </div>
    </div>
  )
}
