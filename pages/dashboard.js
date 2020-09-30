import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import API from '../api'
import Loading from '../components/core/loading'
import DataCard from './../components/cards/dataCard'
import DataInfo from './../components/cards/dataInfo'
import Pagination from '../components/features/pagination'

export default function Dashboard() {
  const [isBroker, setIsBroker] = useState()
  const [isFriendsLoading, setIsFriendsLoading] = useState(true)
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(true)
  const [isCountLoading, setIsCountLoading] = useState(true)
  const [suggestions, setSuggestions] = useState([])
  const [count, setCount] = useState({})
  const [companies, setCompanies] = useState([])
  const [companiesCount, setCompaniesCount] = useState(Number)
  const [brokers, setBrokers] = useState([])
  const [brokersCount, setBrokersCount] = useState(Number)

  const setPageItem = (offset, limit) => {
    if (isBroker == 'true') {
      async function fetchCompanies() {
        await API.get(`reds/friends/?limit=${offset}&offset=${offset * limit}`).then((res) => {
          setCompanies(res.data.results)
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      fetchCompanies()
    } else {
      async function fetchBrokers() {
        await API.get(`brokers/friends/?limit=${offset}&offset=${offset * limit}`).then((res) => {
          setCompanies(res.data.results)
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      fetchBrokers()
    }
  }

  const onSendRequest = () => {
    if (isBroker == 'true') {
      setTimeout(async () => {
        await API.get('reds/suggestions').then((res) => {
          setSuggestions(res.data.results)
        })
      }, 100)
    } else {
      setTimeout(async () => {
        await API.get('brokers/suggestions').then((res) => {
          setSuggestions(res.data.results)
        })
      }, 100)
    }
  }

  useEffect(() => {
    const isBroker = localStorage.getItem('isBroker')
    setIsBroker(isBroker)

    if (isBroker == 'true') {
      async function fetchCompanies() {
        await API.get('reds/friends/?limit=12').then((res) => {
          setCompanies(res.data.results)
          setCompaniesCount(res.data.count)
          setIsFriendsLoading(false)
        })
      }
      async function fetchSuggestedCompanies() {
        await API.get('reds/suggestions').then((res) => {
          setSuggestions(res.data.results)
          setIsSuggestionsLoading(false)
        })
      }
      async function fetchCount() {
        await API.get('reds/count').then((res) => {
          setCount(res.data)
          setIsCountLoading(false)
        })
      }
      fetchCount()
      fetchCompanies()
      fetchSuggestedCompanies()
    } else {
      async function fetchBrokers() {
        await API.get('brokers/friends/?limit=12').then((res) => {
          setBrokers(res.data.results)
          setBrokersCount(res.data.count)
          setIsFriendsLoading(false)
        })
      }
      async function fetchSuggestedBrokers() {
        await API.get('brokers/suggestions/').then((res) => {
          setSuggestions(res.data.results)
          setIsSuggestionsLoading(false)
        })
      }
      async function fetchCount() {
        await API.get('brokers/count').then((res) => {
          setCount(res.data)
          setIsCountLoading(false)
        })
      }
      fetchCount()
      fetchBrokers()
      fetchSuggestedBrokers()
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="container">
        <div>
          {isFriendsLoading || isSuggestionsLoading || isCountLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 row-gap-4 mb-16 lg:grid-cols-3 xl:grid-cols-7">
              {isBroker == 'true' ? (
                <div className="dashboard col-span-3 bg-white p-8 rounded-lg mt-16 lg:col-span-2 xl:col-span-5">
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
                      <div className="relative w-full mx-auto mt-2 mb-8 md:w-1/2  lg:w-8/12">
                        <i className="icon fas fa-search fa-2x absolute inline-block text-gray-300"></i>
                        <input
                          className="appearance-none block w-full text-secondary placeholder-gray-400 border border-gray-400 rounded-full p-3 pl-20 focus:outline-none focus:border-gray-600"
                          id="search"
                          type="search"
                          name="search"
                          autoComplete="off"
                          placeholder="Type Company name"
                        />
                      </div>
                      <div className="grid grid-cols-1 col-gap-8 row-gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {companies.map((company) => (
                          <DataCard data={company} key={company.id} />
                        ))}
                      </div>
                      <Pagination count={companiesCount} limit={9} setPageItem={setPageItem} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="dashboard col-span-3 bg-white p-8 rounded-lg mt-16 lg:col-span-2 xl:col-span-5">
                  {brokers.length === 0 ? (
                    <div className="text-primary text-4xl text-center mx-auto mt-64 w-8/12">
                      You don't have any Brokers yet start by adding ones
                      <button
                        className="block bg-primary text-gray-400 text-sm font-semibold w-1/3 py-3 mt-5 mx-auto rounded-full hover:text-white focus:outline-none"
                        onClick={() => Router.push('/brokers')}>
                        Brokers list
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="relative w-full mx-auto mt-2 mb-8 md:w-1/2 lg:w-8/12">
                        <i className="icon fas fa-search fa-2x absolute inline-block text-gray-300"></i>
                        <input
                          className="appearance-none block w-full text-secondary placeholder-gray-400 border border-gray-400 rounded-full p-3 pl-20 focus:outline-none focus:border-gray-600"
                          id="search"
                          type="search"
                          name="search"
                          autoComplete="off"
                          placeholder="Type Broker name"
                        />
                      </div>
                      <div className="grid grid-cols-1 col-gap-5 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {brokers.map((broker) => (
                          <DataCard data={broker} isBroker={true} key={broker.id} />
                        ))}
                      </div>
                      <Pagination count={brokersCount} limit={12} setPageItem={setPageItem} />
                    </div>
                  )}
                </div>
              )}

              <div className="col-span-2 mt-10 lg:mt-16">
                <div className="mb-6">
                  <div className="bg-white px-8 py-4 rounded-lg">
                    <div className="flex justify-start lg:justify-between">
                      <div className={isBroker == 'true' ? 'w-1/2' : 'mx-auto'}>
                        <p className="text-primaryLight text-sm uppercase tracking-wide mb-2">
                          {isBroker == 'true' ? 'Companies' : 'Brokers'}
                        </p>
                        <div className="flex justify-start items-center">
                          <div className="bg-primary rounded-full p-1 px-2 mr-2 h-full">
                            {isBroker == 'true' ? (
                              <i className="fas fa-building fa-md text-white"></i>
                            ) : (
                              <i className="fas fa-users fa-md text-white"></i>
                            )}
                          </div>
                          <div className="text-secondary">
                            <p className="text-3xl font-semibold -mb-3">
                              {count.friends_count ? count.friends_count : '0'}
                            </p>
                            <span className="text-xs">
                              out of {isBroker == 'true' ? count.reds_count : count.brokers_count}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isBroker == 'true' && (
                        <div>
                          <p className="text-primaryLight text-sm uppercase tracking-wide mb-2">
                            Projects
                          </p>
                          <div className="flex justify-start items-center">
                            <div className="bg-primary rounded-full p-1 px-2 mr-2 h-full">
                              <i className="fas fa-city fa-md text-white"></i>
                            </div>
                            <div className="text-secondary">
                              <p className="text-3xl font-semibold -mb-3">
                                {count.friends_projects_count ? count.friends_projects_count : '0'}
                              </p>
                              <span className="text-xs">out of {count.reds_projects_count}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {isBroker == 'true' ? (
                  <div className="flex justify-between">
                    <h2 className="text-black font-bold text-md mb-3">Suggested Companies</h2>
                    <Link href="/companies">
                      <a className="text-primaryLight text-xs underline hover:text-primaryText focus:outline-none">
                        View All
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <h2 className="text-black font-bold text-lg mb-2">Suggested Brokers</h2>
                    <Link href="/brokers">
                      <a className="text-primaryLight text-xs underline hover:text-primaryText focus:outline-none">
                        View All
                      </a>
                    </Link>
                  </div>
                )}
                <div className="bg-white p-5 rounded-lg">
                  {suggestions.map((suggestion) => (
                    <DataInfo
                      data={suggestion}
                      isBroker={isBroker}
                      onSendRequest={onSendRequest}
                      key={suggestion.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <style jsx>{`
          .icon {
            top: 10px;
            left: 20px;
          }
          .dashboard {
            width: 98%;
          }
        `}</style>
      </div>
    </div>
  )
}
