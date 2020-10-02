import { useState, useEffect } from 'react'
import API from '../../api'
import DeleteObj from './../popup/deleteObj'
import Overlay from './../features/overlay'
import { useDispatch } from 'react-redux'
import { SendRequest, RejectRequest } from '../../redux/actions/requestsActions'
import { DeleteFriend } from './../../redux/actions/requestsActions'
import Spinner from './spinner'

export default function ProfileSideBar({ cid, bid, details }) {
  const [isBroker, setIsBroker] = useState()
  const [isSpinner, setIsSpinner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const [profile, setProfile] = useState({})
  const [changeState, setChangeState] = useState('')
  const [isDeleteOverlay, setIsDeleteOverlay] = useState(false)
  const dispatch = useDispatch()

  const onSendRequest = (e) => {
    if (changeState === 'Not Friends') {
      setChangeState('Pending')
      setIsSpinner(true)
      if (bid) {
        if (!isPending) dispatch(SendRequest(bid))
      } else {
        if (!isPending) dispatch(SendRequest(cid))
      }
      setTimeout(() => {
        setIsSpinner(false)
      }, 1000)
    } else if (changeState === 'Pending') {
      setChangeState('Not Friends')
      setIsSpinner(true)
      if (bid) {
        if (!isPending) dispatch(RejectRequest(bid))
      } else {
        if (!isPending) dispatch(RejectRequest(cid))
      }
      setTimeout(() => {
        setIsSpinner(false)
      }, 1000)
    } else if (changeState === 'Friends') {
      setChangeState('Friends')
      e.stopPropagation()
      setIsDeleteOverlay(true)
    }
  }

  const onDeletingItem = () => {
    dispatch(DeleteFriend(profile.id))
    setChangeState('Not Friends')
  }

  useEffect(() => {
    const isBroker = localStorage.getItem('isBroker')
    setIsBroker(isBroker)

    if (cid != 0 && isBroker == 'true') {
      async function fetchCompany() {
        await API.get(`reds/${cid}/`).then((res) => {
          setProfile(res.data)
          setChangeState(res.data.friend_status)

          setIsLoading(false)
        })
      }
      fetchCompany()
    } else if (cid == 0) {
      async function fetchProfile() {
        await API.get('users/me/').then((res) => {
          setProfile(res.data)
          setChangeState(res.data.friend_status)
          setIsLoading(false)
        })
      }
      fetchProfile()
    } else if (bid) {
      async function fetchBroker() {
        await API.get(`brokers/${bid}/`).then((res) => {
          setProfile(res.data)
          setChangeState(res.data.friend_status)
          setIsLoading(false)
        })
      }
      fetchBroker()
    }
  }, [cid, bid])

  return (
    <div
      className="profile col-span-2 bg-bgLight py-12 pt-24"
      onClick={(e) => {
        e.stopPropagation()
        setIsDeleteOverlay(false)
      }}>
      {!isLoading && (
        <div>
          <Overlay opacity={isDeleteOverlay} />
          {isDeleteOverlay && (
            <DeleteObj
              name={profile.name}
              onDeletingItem={onDeletingItem}
              msg={true}
              setIsDeleteOverlay={setIsDeleteOverlay}
            />
          )}

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
          </div>
          {cid != 0 && isBroker == 'true' && (
            <div className="w-3/4 mx-auto mt-5 text-center">
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
            </div>
          )}
          {cid == 0 && (
            <div className="w-3/4 mx-auto mt-5 text-center">
              <div className="flex justify-around">
                <div className="inline-block py-1 pt-0 px-3 ml-5 bg-white text-black rounded-full">
                  <i className="fas fa-city fa-xs text-black mr-2"></i>
                  <span className="details text-xs text-secondary font-semibold">
                    {details[0] !== 0 ? details[0] : '0'} {details[0] <= 1 ? 'Project' : 'Projects'}
                  </span>
                </div>
                <div className="inline-block py-1 pt-0 px-3 ml-5 bg-white text-black rounded-full">
                  <i className="fas fa-home fa-xs text-black mr-2"></i>
                  <span className="details text-xs text-secondary font-semibold">
                    {details[1] !== 0 ? details[1] : '0'} {details[1] <= 1 ? 'Unit' : 'Units'}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="w-full text-center">
            {cid != 0 && isBroker != 'true' && (
              <div className="inline-block py-1 pt-0 px-3 mr-5 bg-white text-black rounded-full">
                <i className="fas fa-building fa-xs text-black mr-2"></i>
                <span className="details text-xs text-secondary font-semibold">
                  {profile.reds_count} {profile.reds_count <= 1 ? 'Company' : 'Companies'}
                </span>
              </div>
            )}
            {cid != 0 && !profile.is_broker && (
              <button
                className={`py-3 mt-5 w-1/3 mx-auto text-xs font-semibold rounded-full focus:outline-none ${
                  cid != 0 && isBroker != 'true' ? 'inline-block' : 'block'
                } ${
                  changeState === 'Not Friends'
                    ? 'bg-primary text-gray-400 hover:text-white'
                    : changeState === 'Pending'
                    ? 'bg-gray-400 text-gray-600 italic'
                    : changeState === 'Friends'
                    ? 'bg-success text-white italic'
                    : ''
                }`}
                onClick={onSendRequest}>
                {isSpinner ? (
                  <Spinner />
                ) : changeState == 'Not Friends' ? (
                  'Send a request'
                ) : changeState == 'Pending' ? (
                  'Pending'
                ) : changeState === 'Friends' ? (
                  'Friends'
                ) : (
                  ''
                )}
              </button>
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
