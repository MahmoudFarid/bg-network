import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import API from '../../api'
import Loading from '../../components/core/loading'
import ProjectCard from '../../components/cards/projectCard'
import ProfileSideBar from '../../components/core/profileSideBar'

export default function Broker() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const {
    query: { bid },
  } = useRouter()

  useEffect(() => {
    if (bid) {
      async function fetchProjects() {
        // This API For testing only !!
        await API.get(`brokers/${bid}/`).then((res) => {
          setProjects(res.data.results)
          setIsLoading(false)
        })
      }
      fetchProjects()
    }
  }, [bid])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-3 lg:gap-20 lg:ml-0">
          <ProfileSideBar bid={bid} />

          <div className="col-span-2 mt-10 mb-16">
            <h2 className="text-black font-bold text-lg mb-5">Projects</h2>
            <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
              {/* {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))} */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
