import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import API from '../../api'
import Loading from '../../components/core/loading'
import ProfileSideBar from '../../components/core/profileSideBar'
import ProjectCard from './../../components/cards/projectCard'

export default function Broker() {
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState([])
  const {
    query: { bid },
  } = useRouter()

  useEffect(() => {
    if (bid) {
      async function fetchCompanies() {
        await API.get(`brokers/${bid}/`).then((res) => {
          setCompanies(res.data.reds)
          setIsLoading(false)
        })
      }
      fetchCompanies()
    }
  }, [bid])

  return (
    <div>
      <Head>
        <title>Broker Profile</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-7 lg:ml-0">
          <ProfileSideBar bid={bid} />

          <div className="col-span-5 mt-10 mb-16">
            <h2 className="text-black font-bold text-lg mb-5">Companies</h2>
            {companies.length > 0 ? (
              <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
                {companies.map((company) => (
                  <ProjectCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="text-primary text-4xl text-center mx-auto mt-32 w-full">
                This broker doesn't work with any company
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
