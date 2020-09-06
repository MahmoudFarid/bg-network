import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import API from '../../api'
import Loading from '../../components/core/loading'
import ProjectCard from '../../components/cards/projectCard'
import ProfileSideBar from '../../components/core/profileSideBar'

export default function Company() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const {
    query: { cid },
  } = useRouter()

  useEffect(() => {
    if (cid) {
      localStorage.setItem('CID', cid)
      console.log('company id -> ', cid)
      async function fetchProjects() {
        await API.get(`reds/${cid}/projects/`).then((res) => {
          setProjects(res.data.results)
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
        <div className="grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-4 lg:gap-6 lg:ml-0">
          <ProfileSideBar cid={cid} />

          <div className="col-span-3 mt-10 mb-16">
            <h2 className="text-black font-bold text-lg mb-5">Projects</h2>
            <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
