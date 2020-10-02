import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import API from '../../api'
import { Logout } from '../../redux/actions/authActions'
import { GetRequests } from './../../redux/actions/requestsActions'
import NotificationCard from './../cards/notificationCard'

function Header({ requests }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(router.pathname)
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
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
    <div className="container-fluid bg-white p-6 mt-1">
      {isNavigationOpen && (
        <div className="navigation absolute top-0 right-0 z-40 w-1/3 bg-white px-2 rounded-lg shadow-lg border border-gray-200 hidden lg:block xl:w-1/4">
          {!requests || requests.length === 0 ? (
            <div className="text-primary text-xl text-center mx-auto py-8">
              You don't have any Requests
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
                  onClick={() => setIsNavigationOpen(false)}>
                  View All Requests
                </a>
              </Link>
            </div>
          )}
        </div>
      )}
      <nav className="container">
        <div className="flex items-center justify-between flex-wrap">
          <div
            className="logo flex items-center flex-shrink-0 text-white mr-6"
            onClick={() => setActive('/dashboard')}>
            <Link href="/dashboard">
              <img src="/assets/logo.svg" alt="logo" className="cursor-pointer" />
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-primaryText border-primaryText focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}>
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
            className={`w-full block flex-grow pl-6 pb-6 mt-3 transition duration-300 ease-in-out lg:flex lg:items-center lg:w-auto lg:pb-0 lg:mt-0 lg:opacity-100 ${
              isOpen ? 'block' : 'hidden'
            }`}>
            <div className="text-sm lg:flex-grow" onClick={() => setIsOpen(false)}>
              {account.is_broker ? (
                <Link href="/companies">
                  <a
                    onClick={() => setActive('/companies')}
                    className={`block mt-4 mr-8 font-semibold hover:text-primaryText lg:inline-block lg:mt-0 focus:outline-none ${
                      active === '/companies' ? 'text-primaryText' : 'text-primaryLight'
                    }`}>
                    All Companies
                  </a>
                </Link>
              ) : (
                <Link href="/brokers">
                  <a
                    onClick={() => setActive('/brokers')}
                    className={`block mt-4 mr-8 font-semibold hover:text-primaryText lg:inline-block lg:mt-0 focus:outline-none ${
                      active === '/brokers' ? 'text-primaryText' : 'text-primaryLight'
                    }`}>
                    All Brokers
                  </a>
                </Link>
              )}
              <Link href="/projects">
                <a
                  onClick={() => setActive('/projects')}
                  className={`block mt-4 mr-8 font-semibold hover:text-primaryText lg:inline-block lg:mt-0 focus:outline-none ${
                    active === '/projects' ? 'text-primaryText' : 'text-primaryLight'
                  }`}>
                  My Projects
                </a>
              </Link>
              {account.is_broker && (
                <Link href="/units">
                  <a
                    onClick={() => setActive('/units')}
                    className={`block mt-4 mr-8 font-semibold hover:text-primaryText lg:inline-block lg:mt-0 focus:outline-none ${
                      active === '/units' ? 'text-primaryText' : 'text-primaryLight'
                    }`}>
                    My Units
                  </a>
                </Link>
              )}
              {!account.is_broker && (
                <Link href="/plans">
                  <a
                    onClick={() => setActive('/plans')}
                    className={`block mt-4 mr-8 font-semibold hover:text-primaryText lg:inline-block lg:mt-0 focus:outline-none ${
                      active === '/plans' ? 'text-primaryText' : 'text-primaryLight'
                    }`}>
                    My Plans
                  </a>
                </Link>
              )}
              <Link href="/requests">
                <a
                  onClick={() => setActive('/requests')}
                  className={`block mt-4 mr-8 font-semibold hover:text-primaryText lg:inline-block lg:mt-0 focus:outline-none ${
                    active === '/requests' ? 'text-primaryText' : 'text-primaryLight'
                  }`}>
                  Requests
                </a>
              </Link>
            </div>
            <div onClick={() => setIsOpen(false)}>
              <div
                className={`block relative mt-4 mr-8 py-1 transition duration-500 ease-in-out cursor-pointer hover:text-primaryText lg:inline-block lg:mt-0 ${
                  isNavigationOpen ? 'text-primaryText' : 'text-gray-400'
                }`}
                onClick={() => setIsNavigationOpen(!isNavigationOpen)}>
                <span className="hidden lg:inline">
                  <i className="fas fa-bell fa-lg"></i>
                  {requests?.length !== 0 && (
                    <span className="absolute top-0 left-0 h-2 w-2 rounded-full bg-danger"></span>
                  )}
                </span>
              </div>
              <Link href="/requests">
                <a>
                  <span className="font-semibold text-primaryLight block hover:text-primaryText lg:hidden">
                    Notification
                  </span>
                </a>
              </Link>
              <Link href="/profile">
                <a
                  className="block relative mt-4 mr-8 lg:inline-block lg:mt-0 focus:outline-none"
                  onClick={() => setActive('/profile')}>
                  <div className="inline-block mr-12">
                    <img
                      src={account.avatar ? account.avatar : '/assets/profile-pic.png'}
                      className="profile-img rounded-full h-10 w-10 absolute top-0"
                    />
                  </div>
                  <span
                    className={`font-semibold hover:text-primaryText ${
                      active === '/profile' ? 'text-primaryText' : 'text-primaryLight'
                    }`}>
                    {account.name}
                  </span>
                </a>
              </Link>
              <Link href="/settings">
                <a
                  onClick={() => setActive('/settings')}
                  className={`inline-block py-1 mt-4 mr-4 transition duration-500 ease-in-out hover:text-primaryText lg:mt-0 focus:outline-none ${
                    active === '/settings' ? 'text-primaryText' : 'text-gray-400'
                  }`}>
                  <i className="fas fa-cog fa-lg"></i>
                </a>
              </Link>
              <button
                className="inline-block text-gray-400 py-1 mt-4 transition duration-500 ease-in-out cursor-pointer hover:text-danger focus:outline-none lg:mt-0"
                onClick={logout}>
                <i className="fas fa-sign-out-alt fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .profile-img {
          top: -8px;
        }
        .navigation {
          top: 9%;
          right: 18%;
        }
        .logo {
          width: 11%;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  requests: state.requests.data,
})

export default connect(mapStateToProps)(Header)
