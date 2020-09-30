import Head from 'next/head'
import { useState, useEffect } from 'react'
import API from '../../api'
import Loading from '../../components/core/loading'
import DataCard from './../../components/cards/dataCard'
import Pagination from '../../components/features/pagination'

export default function Companies() {
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState([])
  const [companiesCount, setCompaniesCount] = useState(Number)
  const [limit, setLimit] = useState(Number)
  const [offset, setOffset] = useState(Number)

  const setPageItem = (offset, limit) => {
    setOffset(offset)
    setLimit(limit)
    async function fetchCompanies() {
      await API.get(`reds/new/?limit=${offset}&offset=${offset * limit}`).then((res) => {
        setCompanies(res.data.results)
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetchCompanies()
  }

  const onSendRequest = () => {
    setTimeout(async () => {
      await API.get(`reds/new/?limit=${offset}&offset=${offset * limit}`).then((res) => {
        setCompanies(res.data.results)
      })
    }, 100)
  }

  useEffect(() => {
    async function fetchCompanies() {
      await API.get('reds/new/?limit=20').then((res) => {
        setCompanies(res.data.results)
        setCompaniesCount(res.data.count)
        setIsLoading(false)
      })
    }
    fetchCompanies()
  }, [])

  return (
    <div>
      <Head>
        <title>All Companies</title>
      </Head>
      <div className="container mb-16">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="relative w-2/3 mx-auto mt-8 mb-6 md:w-1/2 lg:w-5/12">
              <i className="icon fas fa-search fa-2x absolute inline-block text-gray-300"></i>
              <input
                className="appearance-none block w-full bg-white text-secondary placeholder-gray-400 border border-gray-400 rounded-full p-3 pl-20 focus:outline-none focus:border-gray-600"
                id="search"
                type="search"
                name="search"
                autoComplete="off"
                placeholder="Type Company name"
              />
            </div>

            <div className="bg-white p-5 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {companies.map((company) => (
                  <DataCard data={company} key={company.id} onSendRequest={onSendRequest} />
                ))}
              </div>
            </div>
          </div>
        )}
        <Pagination count={companiesCount} limit={20} setPageItem={setPageItem} />

        <style jsx>{`
          .icon {
            top: 10px;
            left: 20px;
          }
        `}</style>
      </div>
    </div>
  )
}
