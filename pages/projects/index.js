import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import API from '../../api'
import ProjectCard from '../../components/cards/projectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [isBroker, setIsBroker] = useState()

  useEffect(() => {
    const isBroker = localStorage.getItem('isBroker')
    const cid = localStorage.getItem('cid')
    setIsBroker(isBroker)

    if (cid) {
      async function fetchProjects() {
        const {
          data: { results },
        } = await API.get(`reds/${cid}/projects/`)
        setProjects(results)
      }
      fetchProjects()
    }
  }, [])

  return (
    <div className="container-fluid my-16">
      <div className="flex justify-between mb-5">
        <h2 className="text-black font-bold text-lg">Projects</h2>
        {!isBroker && (
          <button className="py-3 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-full hover:text-white focus:outline-none">
            <i className="fas fa-plus-circle fa-lg text-white mr-5"></i>
            Add Project
          </button>
        )}
      </div>
      <div className="bg-white p-5 rounded-lg shadow-lg">
        {projects.length === 0 ? (
          <div className="text-primary text-4xl text-center mx-auto my-10">
            This company doesn't have any Projects yet
            <button
              className="block bg-primary text-gray-400 text-sm font-semibold w-2/12 py-3 mt-5 mx-auto rounded-full hover:text-white focus:outline-none"
              onClick={() => Router.push('/companies')}>
              Companies list
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
