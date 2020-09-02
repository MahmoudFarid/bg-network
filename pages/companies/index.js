import { useState, useEffect } from 'react'
import API from '../../api'
import CompanyCard from '../../components/cards/companyCard'
import Loading from '../../components/core/loading'
import Pagination from '../../components/features/pagination'

export default function Companies() {
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState([])
  const [companiesCount, setCompaniesCount] = useState(Number)

  const setPageItem = (offset, limit) => {
    async function fetchCompanies() {
      await API.get(`reds/new/?limit=${offset}&offset=${offset * limit}`).then((res) => {
        setCompanies(res.data.results)
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetchCompanies()
  }

  useEffect(() => {
    async function fetchCompanies() {
      await API.get('reds/new').then((res) => {
        setCompanies(res.data.results)
        setCompaniesCount(res.data.count)
        setIsLoading(false)
      })
    }
    fetchCompanies()
  }, [])

  return (
    <div className="container-fluid mb-16">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="relative w-2/3 mx-auto my-10 md:w-1/2 lg:w-5/12">
            <i className="icon fas fa-search fa-2x absolute inline-block text-gray-400"></i>
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <CompanyCard company={company} key={company.id} />
              ))}
            </div>
          </div>
        </div>
      )}
      <Pagination count={companiesCount} limit={15} setPageItem={setPageItem} />

      <style jsx>{`
        .icon {
          top: 10px;
          left: 20px;
        }
      `}</style>
    </div>
  )
}
