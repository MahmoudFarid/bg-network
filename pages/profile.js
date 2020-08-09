import { useState, useEffect } from 'react'
import API from '../api'
import Router from 'next/router'
import Loading from '../components/core/loading'
import ProjectCard from '../components/cards/projectCard'
import ProfileSideBar from '../components/core/profileSideBar'

export default function MyProfile() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [isBroker, setIsBroker] = useState()

  useEffect(() => {
    localStorage.setItem('CID', 0)
    const isBroker = localStorage.getItem('isBroker')
    setIsBroker(isBroker)

    async function fetchProjects() {
      if (isBroker == 'true') {
        await API.get('reds/projects/').then((res) => {
          setProjects(res.data.results)
          setIsLoading(false)
        })
      } else {
        await API.get('projects/').then((res) => {
          setProjects(res.data.results)
          setIsLoading(false)
        })
      }
    }
    fetchProjects()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-3 lg:gap-16 lg:ml-0">
          <ProfileSideBar cid={0} />

          <div className="col-span-2 mt-10 mb-16">
            <h2 className="text-black font-bold text-lg mb-5">Projects</h2>
            {projects.length === 0 ? (
              <div className="text-primary text-4xl text-center mx-auto mt-32 w-7/12">
                You don't have any Projects yet start by adding ones
                {isBroker == 'true' ? (
                  <button
                    className="block bg-primary text-gray-400 text-sm font-semibold w-1/3 py-3 mt-5 mx-auto rounded-full hover:text-white focus:outline-none"
                    onClick={() => Router.push('/companies')}>
                    Companies list
                  </button>
                ) : (
                  <button
                    className="block bg-primary text-gray-400 text-sm font-semibold w-1/3 py-3 mt-5 mx-auto rounded-full hover:text-white focus:outline-none"
                    onClick={() => Router.push('/projects')}>
                    Add Project
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
