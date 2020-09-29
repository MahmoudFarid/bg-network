import Head from 'next/head'
import { useState, useEffect } from 'react'
import API from '../../api'
import Loading from '../../components/core/loading'
import BrokerCard from './../../components/cards/brokerCard'
import Pagination from '../../components/features/pagination'

export default function Brokers() {
  const [isLoading, setIsLoading] = useState(true)
  const [brokers, setBrokers] = useState([])
  const [brokersCount, setBrokersCount] = useState(Number)

  const setPageItem = (offset, limit) => {
    async function fetchBrokers() {
      await API.get(`brokers/new/?limit=${offset}&offset=${offset * limit}`).then((res) => {
        setBrokers(res.data.results)
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetchBrokers()
  }

  useEffect(() => {
    async function fetchBrokers() {
      await API.get(`brokers/new`).then((res) => {
        setBrokers(res.data.results)
        setBrokersCount(res.data.count)
        setIsLoading(false)
      })
    }
    fetchBrokers()
  }, [])

  return (
    <div>
      <Head>
        <title>All Brokers</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mb-16">
          <div className="relative w-2/3 mx-auto mt-8 mb-6 md:w-1/2 lg:w-5/12">
            <i className="icon fas fa-search fa-2x absolute inline-block text-gray-300"></i>
            <input
              className="appearance-none block w-full bg-white text-secondary placeholder-gray-400 border border-gray-400 rounded-full p-3 pl-20 focus:outline-none focus:border-gray-600"
              id="search"
              type="search"
              name="search"
              autoComplete="off"
              placeholder="Type Broker name"
            />
          </div>

          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 lg:grid-cols-3">
              {brokers.map((broker) => (
                <BrokerCard key={broker.id} broker={broker} />
              ))}
            </div>
          </div>
          <Pagination count={brokersCount} limit={21} setPageItem={setPageItem} />
        </div>
      )}
      <style jsx>{`
        .desc {
          text-overflow: ellipsis;
        }
        .icon {
          top: 10px;
          left: 20px;
        }
      `}</style>
    </div>
  )
}
