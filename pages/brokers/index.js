import { useState, useEffect } from 'react'
import API from '../../api'
import Loading from '../../components/core/loading'
import BrokerCard from './../../components/cards/brokerCard'
import Pagination from '../../components/features/pagination'

export default function Brokers() {
  const [isLoading, setIsLoading] = useState(true)
  const [brokers, setBrokers] = useState([])
  const [brokersCount, setBrokersCount] = useState(Number)

  const setPageItem = (pageNo) => {
    async function fetchBrokers() {
      await API.get(`brokers/?page=${pageNo}`).then((res) => {
        setBrokers(res.data.results)
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetchBrokers()
  }

  useEffect(() => {
    async function fetchBrokers() {
      await API.get(`brokers/`).then((res) => {
        setBrokers(res.data.results)
        setBrokersCount(res.data.count)
        setIsLoading(false)
      })
    }
    fetchBrokers()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid my-16">
          <h2 className="text-black font-bold text-lg mb-5">Brokers</h2>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 lg:grid-cols-3">
              {brokers.map((broker) => (
                <BrokerCard key={broker.id} broker={broker} />
              ))}
            </div>
          </div>
          <div>
            <Pagination count={brokersCount} setPageItem={setPageItem} />
          </div>
        </div>
      )}
      <style jsx>{`
        .desc {
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  )
}
