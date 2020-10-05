import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import API from '../../api'
import Pagination from '../../components/features/pagination'
import ProjectCard from '../../components/cards/projectCard'
import ProfileSideBar from '../../components/core/profileSideBar'
import ProjectCardSkeleton from './../../components/skeletons/projectCardSkeleton'
import ProfileSideBarSkeleton from '../../components/skeletons/profileSideBarSkeleton'

export default function Company() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [friendStatus, setFriendStatus] = useState(Boolean)
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
      async function fetchProjects() {
        await API.get(`reds/${cid}/projects/?limit=12`).then((res) => {
          setProjects(res.data.results)
          setprojectsCount(res.data.count)
          setIsLoading(false)
        })
      }
      async function fetchFriendStatus() {
        await API.post('users/friend_status/', { user_id: cid }).then((res) => {
          setFriendStatus(res.data.status)
        })
      }
      fetchFriendStatus()
      fetchProjects()
    }
  }, [cid])

  return (
    <div>
      <Head>
        <title>Company Details</title>
      </Head>
      <div className="container-fluid grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-7 lg:ml-0">
        {isLoading ? (
          <ProfileSideBarSkeleton cid={cid} isBroker={'true'} />
        ) : (
          <ProfileSideBar cid={cid} isBroker={'true'} />
        )}

        <div className="col-span-5 mt-6 mb-16 ml-8 mr-16">
          <h2 className="text-black font-bold text-md mb-3">Projects</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array(12)
                .fill()
                .map((item, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
            </div>
          ) : projects?.length === 0 ? (
            <div className="text-primary text-4xl text-center mx-auto my-10">
              This company doesn't have any project
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects?.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    cid={cid}
                    friendStatus={friendStatus}
                  />
                ))}
              </div>
              <Pagination count={projectsCount} limit={12} setPageItem={setPageItem} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
