import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import API from '../../api'
import Loading from '../../components/core/loading'
import ProjectCard from '../../components/cards/projectCard'
import ProfileSideBar from '../../components/core/profileSideBar'
import Pagination from '../../components/features/pagination'

export default function Company() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [projectsCount, setprojectsCount] = useState(Number)

  const {
    query: { cid },
  } = useRouter()

  const setPageItem = (offset, limit) => {
    async function fetchCompanies() {
      await API.get(`reds/${cid}/projects/?limit=${offset}&offset=${offset * limit}`).then(
        (res) => {
          setProjects(res.data.results)
        }
      )
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetchCompanies()
  }

  useEffect(() => {
    if (cid) {
      localStorage.setItem('CID', cid)
      console.log('company id -> ', cid)
      async function fetchProjects() {
        await API.get(`reds/${cid}/projects/?limit=12`).then((res) => {
          setProjects(res.data.results)
          setprojectsCount(res.data.count)
          setIsLoading(false)
        })
      }
      fetchProjects()
    }
  }, [cid])

  return (
    <div>
      <Head>
        <title>Company Details</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-7 lg:ml-0">
          <ProfileSideBar cid={cid} />

          <div className="col-span-5 mt-6 mb-16 ml-8 mr-16">
            <h2 className="text-black font-bold text-md mb-3">Projects</h2>
            <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <Pagination count={projectsCount} limit={12} setPageItem={setPageItem} />
          </div>
        </div>
      )}
    </div>
  )
}
