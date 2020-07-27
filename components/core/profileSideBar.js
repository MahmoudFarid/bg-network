import { useState, useEffect } from 'react'
import Link from 'next/link'
import API from '../../api'
import { useDispatch } from 'react-redux'
import { SendRequest } from '../../redux/actions/requestsActions'
import Loading from './loading'

export default function ProfileSideBar({ cid }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const [profile, setProfile] = useState({})
  const [count, setCount] = useState({})
  const dispatch = useDispatch()

  const onSendRequest = () => {
    setIsPending(!isPending)
    if (!isPending) dispatch(SendRequest(cid))
  }

  useEffect(() => {
    if (cid) {
      async function fetchCompany() {
        await API.get(`reds/${cid}/`).then((res) => {
          setProfile(res.data)
          setIsLoading(false)
        })
      }
      fetchCompany()
    } else if (cid == 0) {
      async function fetchProfile() {
        await API.get('users/me/').then((res) => {
          setProfile(res.data)
          setIsLoading(false)
        })
      }
      async function fetchCount() {
        await API.get('reds/count').then((res) => {
          setCount(res.data)
          setIsLoading(false)
        })
      }
      fetchCount()
      fetchProfile()
    }
  }, [cid])

  return (
    <div className="bg-bgLight py-12 pt-24">
      {!isLoading && (
        <div>
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
                  profile.friend_status === 'Pending' || isPending
                    ? 'bg-gray-400 text-gray-600 italic'
                    : profile.friend_status === 'Friends'
                    ? 'bg-success text-white italic'
                    : 'bg-primary text-gray-400 hover:text-white'
                }`}
                onClick={onSendRequest}>
                {profile.friend_status === 'Pending' || isPending
                  ? 'Pending'
                  : profile.friend_status === 'Friends'
                  ? 'Following'
                  : 'Send a request'}
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
                <div>
                  <p className="font-bold">Projects</p>
                  <span className="text-sm">
                    {count.friends_projects_count ? count.friends_projects_count : '0'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-around">
                <div>
                  <p className="font-bold">Projects</p>
                  <span className="text-sm">
                    {profile.projects_count ? profile.projects_count : '0'}
                  </span>
                </div>
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
      )}
    </div>
  )
}
