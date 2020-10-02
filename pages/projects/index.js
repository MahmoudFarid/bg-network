import Head from 'next/head'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import API from '../../api'
import ProjectCard from '../../components/cards/projectCard'
import Pagination from '../../components/features/pagination'
import ProjectCardSkeleton from './../../components/skeletons/projectCardSkeleton'

export default function Projects() {
  const [isBroker, setIsBroker] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [ProjectsCount, setProjectsCount] = useState(Number)

  const setPageItem = (offset, limit) => {
    if (isBroker == 'true') {
      async function fetchProjects() {
        await API.get(`reds/projects/?limit=${offset}&offset=${offset * limit}`).then((res) => {
          setProjects(res.data.results)
        })
      }
      fetchProjects()
    } else {
      async function fetchProjects() {
        await API.get(`projects/?limit=${offset}&offset=${offset * limit}`).then((res) => {
          setProjects(res.data.results)
        })
      }
      fetchProjects()
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const isBroker = localStorage.getItem('isBroker')
    setIsBroker(isBroker)

    async function fetchProjects() {
      if (isBroker == 'true') {
        await API.get(`reds/projects/?limit=16`).then((res) => {
          setProjects(res.data.results)
          setProjectsCount(res.data.count)
          setIsLoading(false)
        })
      } else {
        await API.get(`projects/?limit=16`).then((res) => {
          setProjects(res.data.results)
          setProjectsCount(res.data.count)
          setIsLoading(false)
        })
      }
    }
    fetchProjects()
  }, [])

  return (
    <div>
      <Head>
        <title>All Projects</title>
      </Head>
      <div className="container my-12">
        <div className="flex justify-between mb-5">
          <h2 className="text-black font-bold text-md">Projects</h2>
          {isBroker != 'true' && (
            <button
              className="py-2 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-full hover:text-white focus:outline-none"
              onClick={() => Router.push('/projects/add')}>
              <i className="fas fa-plus-circle fa-lg text-white mr-5"></i>
              Add Project
            </button>
          )}
        </div>
        <div className="bg-white p-10 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="grid grid-cols-1 col-gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array(12)
                .fill()
                .map((item, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
            </div>
          ) : projects.length === 0 ? (
            isBroker == 'true' ? (
              <div className="text-primary text-4xl text-center mx-auto my-10">
                You don't have any Projects yet
                <button
                  className="block bg-primary text-gray-400 text-sm font-semibold w-2/12 py-3 mt-5 mx-auto rounded-full hover:text-white focus:outline-none"
                  onClick={() => Router.push('/companies')}>
                  Companies list
                </button>
              </div>
            ) : (
              <div className="text-primary text-4xl text-center mx-auto my-10">
                You don't have any Projects yet
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 col-gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
        <Pagination count={ProjectsCount} limit={16} setPageItem={setPageItem} />
      </div>
    </div>
  )
}
