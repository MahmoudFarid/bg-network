import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import API from '../api'
import CompanyCard from '../components/cards/companyCard'
import CompanyInfo from '../components/cards/companyInfo'

export default function Dashboard() {
  const [companies, setCompanies] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [count, setCount] = useState({})

  useEffect(() => {
    async function fetchCompanies() {
      const {
        data: { results },
      } = await API.get('reds/friends')
      setCompanies(results)
    }
    async function fetchSuggestedCompanies() {
      const {
        data: { results },
      } = await API.get('reds/suggestions')
      setSuggestions(results)
    }
    async function fetchCount() {
      const { data } = await API.get('reds/count')
      setCount(data)
    }
    fetchCount()
    fetchCompanies()
    fetchSuggestedCompanies()
  }, [])

  return (
    <div className="container-fluid">
      <div className="grid grid-cols-1 row-gap-4 mb-16 xl:grid-cols-3 xl:gap-4">
        <div className="col-span-2 bg-white p-5 rounded-lg mt-16">
          {companies.length === 0 ? (
            <div className="text-primary text-4xl text-center mx-auto mt-64 w-8/12">
              You don't have any Companies yet start by adding ones
              <button
                className="block bg-primary text-gray-400 text-sm font-semibold w-1/3 py-3 mt-5 mx-auto rounded-full hover:text-white focus:outline-none"
                onClick={() => Router.push('/companies')}>
                Companies list
              </button>
            </div>
          ) : (
            <div>
              <div className="relative w-1/2 mx-auto mt-5 mb-10">
                <i className="icon fas fa-search fa-2x absolute inline-block text-gray-400"></i>
                <input
                  className="appearance-none block w-full text-secondary placeholder-gray-400 border border-gray-400 rounded-full p-3 pl-20 focus:outline-none focus:border-gray-600"
                  id="search"
                  type="search"
                  name="search"
                  autoComplete="off"
                  placeholder="Type Company name"
                />
              </div>
              <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2">
                {companies.map((company) => (
                  <CompanyCard company={company} key={company.id} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 lg:mt-12">
          <div className="mb-10">
            <h2 className="text-black font-bold text-lg mb-2">Total</h2>
            <div className="bg-white p-5 rounded-lg">
              <div className="flex justify-start lg:justify-between">
                <div className="w-1/2">
                  <p className="text-primaryLight uppercase tracking-wide mb-2">Companies</p>
                  <div className="flex justify-start items-center">
                    <div className="bg-primary rounded-full p-2 px-3 mr-3 h-full">
                      <i className="fas fa-building fa-md text-white"></i>
                    </div>
                    <div className="text-secondary">
                      <p className="text-3xl font-semibold -mb-3">
                        {count.friends_count ? count.friends_count : '0'}
                      </p>
                      <span className="text-sm">out of {count.reds_count}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-primaryLight uppercase tracking-wide mb-2">Projects</p>
                  <div className="flex justify-start items-center">
                    <div className="bg-primary rounded-full p-2 px-3 mr-3 h-full">
                      <i className="fas fa-city fa-md text-white"></i>
                    </div>
                    <div className="text-secondary">
                      <p className="text-3xl font-semibold -mb-3">
                        {count.friends_projects_count ? count.friends_projects_count : '0'}
                      </p>
                      <span className="text-sm">out of {count.reds_projects_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h2 className="text-black font-bold text-lg mb-2">Suggested Companies</h2>
              <Link href="/companies">
                <a className="text-primaryLight text-sm underline hover:text-primaryText focus:outline-none">
                  View All
                </a>
              </Link>
            </div>
            <div className="bg-white p-5 rounded-lg">
              {suggestions.map((suggestion) => (
                <CompanyInfo company={suggestion} key={suggestion.id} />
              ))}
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
