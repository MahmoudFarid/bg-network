import Link from 'next/link'
import CompanyCard from '../components/cards/companyCard'
import CompanyInfo from '../components/cards/companyInfo'

export default function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="grid grid-cols-1 row-gap-4 mb-16 xl:grid-cols-3 xl:gap-4">
        <div className="col-span-2 bg-white p-5 rounded-lg mt-16">
          <div className="relative w-1/2 mx-auto mt-5 mb-10">
            <i className="icon fas fa-search fa-2x absolute inline-block text-gray-400"></i>
            <input
              className="appearance-none block w-full text-secondary placeholder-gray-400 border border-gray-400 rounded-full p-3 pl-20 focus:outline-none focus:border-primary"
              id="search"
              type="search"
              name="search"
              autoComplete="off"
              placeholder="Type Company name"
            />
          </div>
          <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2">
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
          </div>
        </div>

        <div className="mt-10 lg:mt-12">
          <div className="mb-10">
            <h2 className="text-black font-bold text-lg mb-2">Total</h2>
            <div className="bg-white p-5 rounded-lg">
              <div className="flex justify-start lg:justify-between">
                <div className="w-1/2">
                  <p className="text-secondaryLight uppercase tracking-wide mb-2">Companies</p>
                  <Link href="/companies">
                    <a className="focus:outline-none">
                      <div className="flex justify-start items-center">
                        <div className="bg-primary rounded-full p-2 px-3 mr-3 h-full">
                          <i className="fas fa-city fa-md text-white"></i>
                        </div>
                        <div className="text-secondary hover:text-primaryText">
                          <p className="text-3xl font-semibold -mb-3">607</p>
                          <span className="text-sm">out of 10,000</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div>
                  <p className="text-secondaryLight uppercase tracking-wide mb-2">Properties</p>
                  <Link href="/">
                    <a className="focus:outline-none">
                      <div className="flex justify-start items-center">
                        <div className="bg-primary rounded-full p-2 px-3 mr-3 h-full">
                          <i className="fas fa-home fa-md text-white"></i>
                        </div>
                        <div className="text-secondary hover:text-primaryText">
                          <p className="text-3xl font-semibold -mb-3">45</p>
                          <span className="text-sm">out of 10,000</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h2 className="text-black font-bold text-lg mb-2">Suggested Companies</h2>
              <Link href="/companies">
                <a className="text-secondaryLight text-sm underline hover:text-primaryText focus:outline-none">
                  View All
                </a>
              </Link>
            </div>
            <div className="bg-white p-5 rounded-lg">
              <CompanyInfo />
              <CompanyInfo />
              <CompanyInfo />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .icon {
          top: 10px;
          left: 20px;
        }
      `}</style>
    </div>
  )
}
