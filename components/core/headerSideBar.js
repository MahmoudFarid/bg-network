import Link from 'next/link'

export default function HeaderSideBar({ isBroker, active, setActive }) {
  return (
    <nav className="bg-primaryGradient fixed top-0 h-screen hidden lg:block">
      <ul className="mt-20">
        <li className="relative">
          <Link href="/dashboard">
            <a
              onClick={() => setActive('/dashboard')}
              className={`block my-5 mx-2 font-semibold p-2 rounded-md transition ease-linear duration-200 hover:bg-gray-500 hover:text-white focus:outline-none ${
                active === '/dashboard'
                  ? 'text-white bg-secondaryLight hover:bg-secondaryLight'
                  : 'text-gray-200'
              }`}>
              <i className="fas fa-project-diagram"></i>
            </a>
          </Link>
          <div className="item absolute bg-primaryText text-white px-2 z-50 block rounded-md opacity-0">
            Dashboard
          </div>
        </li>
        {isBroker ? (
          <li className="relative">
            <Link href="/companies">
              <a
                onClick={() => setActive('/companies')}
                className={`block my-5 mx-2 font-semibold p-2 rounded-md transition ease-linear duration-200 hover:bg-gray-500 hover:text-white focus:outline-none ${
                  active === '/companies'
                    ? 'text-white bg-secondaryLight hover:bg-secondaryLight'
                    : 'text-gray-200'
                }`}>
                <i className="fas fa-building"></i>
              </a>
            </Link>
            <div className="item absolute bg-primaryText text-white px-2 z-50 block rounded-md opacity-0">
              Companies
            </div>
          </li>
        ) : (
          <li className="relative">
            <Link href="/brokers">
              <a
                onClick={() => setActive('/brokers')}
                className={`block my-5 mx-2 font-semibold p-2 rounded-md transition ease-linear duration-200 hover:bg-gray-500 hover:text-white focus:outline-none ${
                  active === '/brokers'
                    ? 'text-white bg-secondaryLight hover:bg-secondaryLight'
                    : 'text-gray-200'
                }`}>
                <i className="fas fa-users"></i>
              </a>
            </Link>
            <div className="item absolute bg-primaryText text-white px-2 z-50 block rounded-md opacity-0">
              Brokers
            </div>
          </li>
        )}
        <li className="relative">
          <Link href="/projects">
            <a
              onClick={() => setActive('/projects')}
              className={`block my-5 mx-2 font-semibold p-2 rounded-md transition ease-linear duration-200 hover:bg-gray-500 hover:text-white focus:outline-none ${
                active === '/projects'
                  ? 'text-white bg-secondaryLight hover:bg-secondaryLight'
                  : 'text-gray-200'
              }`}>
              <i className="fas fa-city"></i>
            </a>
          </Link>
          <div className="item absolute bg-primaryText text-white px-2 z-50 block rounded-md opacity-0">
            Projects
          </div>
        </li>
        {isBroker && (
          <li className="relative">
            <Link href="/units">
              <a
                onClick={() => setActive('/units')}
                className={`block my-5 mx-2 font-semibold p-2 rounded-md transition ease-linear duration-200 hover:bg-gray-500 hover:text-white focus:outline-none ${
                  active === '/units'
                    ? 'text-white bg-secondaryLight hover:bg-secondaryLight'
                    : 'text-gray-200'
                }`}>
                <i className="fas fa-home"></i>
              </a>
            </Link>
            <div className="item absolute bg-primaryText text-white px-2 z-50 block rounded-md opacity-0">
              Units
            </div>
          </li>
        )}
        {!isBroker && (
          <li className="relative">
            <Link href="/plans">
              <a
                onClick={() => setActive('/plans')}
                className={`block my-5 mx-2 font-semibold p-2 rounded-md transition ease-linear duration-200 hover:bg-gray-500 hover:text-white focus:outline-none ${
                  active === '/plans'
                    ? 'text-white bg-secondaryLight hover:bg-secondaryLight'
                    : 'text-gray-200'
                }`}>
                <i className="fas fa-building"></i>
              </a>
            </Link>
            <div className="item absolute bg-primaryText text-white px-2 z-50 block rounded-md opacity-0">
              Plans
            </div>
          </li>
        )}
        <li className="relative">
          <Link href="/requests">
            <a
              onClick={() => setActive('/requests')}
              className={`block my-5 mx-2 font-semibold p-2 rounded-md transition ease-linear duration-200 hover:bg-gray-500 hover:text-white focus:outline-none ${
                active === '/requests'
                  ? 'text-white bg-secondaryLight hover:bg-secondaryLight'
                  : 'text-gray-200'
              }`}>
              <i className="fas fa-building"></i>
            </a>
          </Link>
          <div className="item absolute bg-primaryText text-white px-2 z-50 block rounded-md opacity-0">
            Requests
          </div>
        </li>
      </ul>
      <style jsx>{`
        .item {
          left: 4rem;
          top: 0.5rem;
          transition: opacity 0.2s ease-in-out;
        }
        li:hover .item {
          opacity: 1;
        }
      `}</style>
    </nav>
  )
}
