import Head from 'next/head'
import { useState, useEffect } from 'react'
import API from '../api'
import Router from 'next/router'
import Loading from '../components/core/loading'
import ProjectCard from '../components/cards/projectCard'
import ProfileSideBar from '../components/core/profileSideBar'
import Pagination from '../components/features/pagination'

export default function MyProfile() {
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
    localStorage.setItem('CID', 0)
    const isBroker = localStorage.getItem('isBroker')
    setIsBroker(isBroker)

    async function fetchProjects() {
      if (isBroker == 'true') {
        await API.get('reds/projects/?limit=15').then((res) => {
          setProjects(res.data.results)
          setProjectsCount(res.data.count)
          setIsLoading(false)
        })
      } else {
        await API.get('projects/?limit=15').then((res) => {
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
        <title>My Profile</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-7 lg:ml-0">
          <ProfileSideBar cid={0} />

          <div className="col-span-5 mt-10 mb-16 ml-8 mr-16">
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
            <Pagination count={ProjectsCount} limit={15} setPageItem={setPageItem} />
          </div>
        </div>
      )}
    </div>
  )
}
