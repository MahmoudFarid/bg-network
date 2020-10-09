import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import API from '../../api'
import { Logout } from '../../redux/actions/authActions'
import { GetRequests } from './../../redux/actions/requestsActions'
import NotificationCard from './../cards/notificationCard'
import HeaderSideBar from './headerSideBar'

function Header({ requests }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(router.pathname)
  const [isNotificationOpen, setIsNotificationnOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [account, setAccount] = useState({})
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(Logout())
  }

  useEffect(() => {
    async function fetchAccount() {
      const { data } = await API.get('users/me/')
      setAccount(data)
    }
    fetchAccount()

    dispatch(GetRequests())
    const end = () => {
      dispatch(GetRequests())
      async function fetchAccount() {
        const { data } = await API.get('users/me/')
        setAccount(data)
      }
      fetchAccount()
    }

    Router.events.on('routeChangeEnd', end)
    Router.events.on('routeChangeStart', end)
  }, [])

  return (
    <div>
      <HeaderSideBar isBroker={account.is_broker} active={active} setActive={setActive} />

      <div className="bg-white p-3 z-50 fixed top-0 w-full border-b border-gray-300 shadow-sm">
        {isNotificationOpen && (
          <div className="navigation absolute top-0 right-0 z-40 w-1/3 bg-white px-2 rounded-lg shadow-lg border border-gray-400 hidden lg:block xl:w-1/4">
            {!requests || requests.length === 0 ? (
              <div className="text-primary text-xl text-center mx-auto py-16">
                <i className="fas fa-bell fa-2x"></i>
                <p className="mt-5">All caught up!</p>
              </div>
            ) : (
              <div>
                {requests?.map((request) => (
                  <NotificationCard
                    key={request.from_user.id}
                    account={request.from_user}
                    request={request}
                    isBroker={account.is_broker}
                  />
                ))}
                <Link href="/requests">
                  <a
                    className="block text-secondary text-center font-semibold uppercase py-3 hover:text-primaryText"
                    onClick={() => setIsNotificationnOpen(false)}>
                    View All Requests
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}
        {isSettingsOpen && (
          <div className="navigation absolute top-0 z-40 w-3/5 bg-white px-2 rounded-lg shadow-lg border border-gray-400 left-0 xl:w-1/4 lg:right-0 lg:left-auto">
            <div
              className="border-b p-3 border-gray-300 cursor-pointer hover:text-primaryText"
              onClick={() => {
                Router.push('/settings'), setIsSettingsOpen(false), setIsNotificationnOpen(false)
              }}>
              <p className="font-semibold">Profile</p>
              <span className="text-gray-600 text-sm">Profile, Avatar, Password and Email.</span>
            </div>
            <div className="border-b p-3 border-gray-300 cursor-pointer hover:text-primaryText">
              <p className="font-semibold">Account Management</p>
              <span className="text-gray-600 text-sm">Team members and Company Settings.</span>
            </div>
            <div
              className="p-3 transition duration-500 ease-in-out cursor-pointer hover:text-danger"
              onClick={logout}>
              <button className="font-semibold focus:outline-non">Logout</button>
            </div>
          </div>
        )}
        <nav>
          <div className="flex items-center justify-between flex-wrap">
            <div
              className="logo flex flex-grow items-center flex-shrink-0 text-white mr-6"
              onClick={() => {
                setActive('/dashboard'), setIsSettingsOpen(false), setIsNotificationnOpen(false)
              }}>
              <Link href="/dashboard">
                <img src="/assets/logo.svg" alt="logo" className="cursor-pointer" />
              </Link>
            </div>
            <div className="block lg:hidden">
              <button
                className="flex items-center px-3 py-2 border rounded text-primaryText border-primaryText focus:outline-none"
                onClick={() => {
                  setIsOpen(!isOpen), setIsSettingsOpen(false)
                }}>
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div
              className={`w-full block pl-6 pb-6 mt-3 transition duration-300 ease-in-out lg:flex lg:items-center lg:w-auto lg:pb-0 lg:mt-0 lg:opacity-100 ${
                isOpen ? 'block' : 'hidden'
              }`}>
              <div onClick={() => setIsOpen(false)} className="block lg:flex">
                <div
                  className={`block relative mt-4 mr-8 py-1 transition duration-500 ease-in-out cursor-pointer hover:text-primaryText lg:inline-block lg:mt-0 ${
                    isNotificationOpen ? 'text-primaryText' : 'text-gray-400'
                  }`}
                  onClick={() => {
                    setIsNotificationnOpen(!isNotificationOpen), setIsSettingsOpen(false)
                  }}>
                  <span className="hidden lg:inline">
                    <i className="fas fa-bell fa-lg"></i>
                    {requests?.length !== 0 && (
                      <span className="absolute top-0 left-0 h-2 w-2 rounded-full bg-danger"></span>
                    )}
                  </span>
                </div>

                <div className="lg:hidden">
                  <Link href="/dashboard">
                    <a>
                      <span className="font-semibold block mb-3 text-primaryLight hover:text-primaryText">
                        Dashboard
                      </span>
                    </a>
                  </Link>
                  <Link href="/companies">
                    <a>
                      <span className="font-semibold block mb-3 text-primaryLight hover:text-primaryText">
                        Companies
                      </span>
                    </a>
                  </Link>
                  <Link href="/projects">
                    <a>
                      <span className="font-semibold block mb-3 text-primaryLight hover:text-primaryText">
                        My Projects
                      </span>
                    </a>
                  </Link>
                  {account.is_broker ? (
                    <Link href="/units">
                      <a>
                        <span className="font-semibold block mb-3 text-primaryLight hover:text-primaryText">
                          My Units
                        </span>
                      </a>
                    </Link>
                  ) : (
                    <Link href="/plans">
                      <a>
                        <span className="font-semibold block mb-3 text-primaryLight hover:text-primaryText">
                          My Plans
                        </span>
                      </a>
                    </Link>
                  )}
                  <Link href="/requests">
                    <a>
                      <span className="font-semibold block mb-3 text-primaryLight hover:text-primaryText">
                        Notification
                      </span>
                    </a>
                  </Link>
                </div>

                <div
                  className={`block relative mt-4 mr-8 cursor-pointer lg:inline-block lg:mt-0 hover:text-primaryText focus:outline-none ${
                    isSettingsOpen && 'text-primaryText'
                  }`}
                  onClick={(e) => {
                    setIsSettingsOpen(!isSettingsOpen),
                      setIsNotificationnOpen(false),
                      e.stopPropagation()
                  }}>
                  <div className="flex">
                    <img
                      src={account.avatar ? account.avatar : '/assets/profile-pic.png'}
                      className="profile-img rounded-full h-8 w-8 mr-3"
                    />
                    <div>
                      <span className="font-semibold">
                        {account.name}
                        <i className="fas fa-angle-down fa-lg mt-2 ml-3"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <style jsx>{`
          .profile-img {
            top: -8px;
          }
          .navigation {
            top: 100%;
          }
          .logo {
            width: 11%;
          }
        `}</style>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  requests: state.requests.data,
})

export default connect(mapStateToProps)(Header)
