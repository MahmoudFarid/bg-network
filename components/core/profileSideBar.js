import { useState, useEffect } from 'react'
import API from '../../api'
import { useDispatch } from 'react-redux'
import { SendRequest } from '../../redux/actions/requestsActions'

export default function ProfileSideBar({ cid, bid }) {
  const [isBroker, setIsBroker] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const [profile, setProfile] = useState({})
  const dispatch = useDispatch()

  const onSendRequest = () => {
    setIsPending(!isPending)
    if (!isPending) dispatch(SendRequest(cid))
  }

  useEffect(() => {
    const isBroker = localStorage.getItem('isBroker')
    setIsBroker(isBroker)

    if (cid != 0 && isBroker == 'true') {
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
      fetchProfile()
    } else if (bid) {
      async function fetchBroker() {
        await API.get(`brokers/${bid}/`).then((res) => {
          setProfile(res.data)
          setIsLoading(false)
        })
      }
      fetchBroker()
    }
  }, [cid, bid])
  console.log(profile)

  return (
    <div className="profile col-span-2 bg-bgLight py-12 pt-24">
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
            <div>
              <p className="text-black font-semibold text-lg">{profile.name}</p>
              <span className="text-secondary text-sm">Cairo, Egypt</span>
            </div>
            {cid != 0 && !profile.is_broker && (
              <button
                className={`inline-block py-3 mt-5 w-1/3 mx-auto text-xs font-semibold rounded-full focus:outline-none ${
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
                  ? 'Friends'
                  : 'Send a request'}
              </button>
            )}
            {cid != 0 && isBroker != 'true' && (
              <div className="inline-block py-1 pt-0 px-3 ml-5 bg-white text-black rounded-full">
                <i className="fas fa-building fa-xs text-black mr-2"></i>
                <span className="details text-xs text-secondary font-semibold">
                  {profile.reds_count} {profile.reds_count <= 1 ? 'Company' : 'Companies'}
                </span>
              </div>
            )}
          </div>
          <div className="w-3/4 mx-auto mt-8 text-center">
            {cid != 0 && isBroker == 'true' && (
              <div className="flex justify-around">
                <div className="inline-block py-1 pt-0 px-3 ml-5 bg-white text-black rounded-full">
                  <i className="fas fa-city fa-xs text-black mr-2"></i>
                  <span className="details text-xs text-secondary font-semibold">
                    {profile.projects_count ? profile.projects_count : '0'}{' '}
                    {profile.projects_count <= 1 ? 'Project' : 'Projects'}
                  </span>
                </div>
                <div className="inline-block py-1 pt-0 px-3 ml-5 bg-white text-black rounded-full">
                  <i className="fas fa-home fa-xs text-black mr-2"></i>
                  <span className="details text-xs text-secondary font-semibold">
                    {profile.units_count ? profile.units_count : '0'}{' '}
                    {profile.units_count <= 1 ? 'Unit' : 'Units'}
                  </span>
                </div>
              </div>
            )}
          </div>
          {profile.description && profile.description !== 'null' && (
            <div className="mt-10 px-8 h-56 overflow-auto lg:overflow-visible">
              <p className="font-semibold ml-2 mb-2">About</p>
              <p className="text-primary mb-4">
                {profile.description && profile.description !== 'null'
                  ? profile.description
                  : 'No Description'}
              </p>
            </div>
          )}
        </div>
      )}
      <style>
        {`
        .profile {
          width: 91%;
          min-height: 88vh;
        }
      `}
      </style>
    </div>
  )
}
