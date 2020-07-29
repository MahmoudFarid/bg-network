import { useState, useEffect } from 'react'
import API from '../../api'
import Loading from '../../components/core/loading'
import BrokerCard from './../../components/cards/brokerCard'

export default function Brokers() {
  const [isLoading, setIsLoading] = useState(true)
  const [brokers, setBrokers] = useState([])

  useEffect(() => {
    async function fetchBrokers() {
      await API.get(`brokers/`).then((res) => {
        setBrokers(res.data.results)
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
