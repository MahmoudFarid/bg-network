import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import NavigationCard from './../cards/navigationCard'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  return (
    <div className="bg-white p-5 mt-1">
      {isNavigationOpen && (
        <div className="navigation absolute top-0 right-0 z-40 w-1/3 bg-white px-2 rounded-lg shadow-lg border border-gray-200 hidden lg:block xl:w-1/4">
          <NavigationCard />
          <NavigationCard />
          <NavigationCard />
          <Link
            href={{
              pathname: '/followers',
              query: { isFollowersComp: false },
            }}
            as="/followers">
            <a
              className="block text-secondary text-center font-semibold uppercase py-3 hover:text-primaryText"
              onClick={() => setIsNavigationOpen(false)}>
              View All Requests
            </a>
          </Link>
        </div>
      )}
      <nav className="container-fluid">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
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
              <Link href="/companies">
                <a className="block mt-4 mr-8 font-semibold text-primaryLight hover:text-primaryText lg:inline-block lg:mt-0">
                  Companies
                </a>
              </Link>
              <Link href="/plans">
                <a className="block mt-4 mr-8 font-semibold text-primaryLight hover:text-primaryText lg:inline-block lg:mt-0">
                  Plans
                </a>
              </Link>
              <Link
                href={{
                  pathname: '/followers',
                  query: { isFollowersComp: true },
                }}
                as="/followers">
                <a className="block mt-4 mr-8 font-semibold text-primaryLight hover:text-primaryText lg:inline-block lg:mt-0">
                  Brockers
                </a>
              </Link>
            </div>
            <div onClick={() => setIsOpen(false)}>
              <div
                className="block relative text-gray-400 mt-4 mr-8 py-1 transition duration-500 ease-in-out cursor-pointer hover:text-primaryText lg:inline-block lg:mt-0"
                onClick={() => setIsNavigationOpen(!isNavigationOpen)}>
                <span className="hidden lg:inline">
                  <i className="fas fa-bell fa-lg"></i>
                  <span className="absolute top-0 left-0 h-2 w-2 rounded-full bg-danger"></span>
                </span>
              </div>
              <Link
                href={{
                  pathname: '/followers',
                  query: { isFollowersComp: false },
                }}
                as="/followers">
                <a>
                  <span className="font-semibold text-primaryLight block hover:text-primaryText lg:hidden">
                    Notification
                  </span>
                </a>
              </Link>
              <Link href="/profile">
                <a className="block relative mt-4 mr-8 lg:inline-block lg:mt-0">
                  <div className="inline-block mr-12">
                    <img
                      src="/assets/profile-pic.png"
                      className="profile-img rounded-full h-10 w-10 absolute top-0"
                    />
                  </div>
                  <span className="font-semibold text-primaryLight hover:text-primaryText">
                    Username
                  </span>
                </a>
              </Link>
              <a
                href="#responsive-header"
                className="inline-block text-gray-400 py-1 mt-4 mr-4 transition duration-500 ease-in-out hover:text-primaryText lg:mt-0">
                <i className="fas fa-cog fa-lg"></i>
              </a>
              <btton
                className="inline-block text-gray-400 py-1 mt-4 transition duration-500 ease-in-out cursor-pointer hover:text-danger focus:outline-none lg:mt-0"
                onClick={() => Router.replace('/')}>
                <i className="fas fa-sign-out-alt fa-lg"></i>
              </btton>
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
          right: 19%;
        }
      `}</style>
    </div>
  )
}
