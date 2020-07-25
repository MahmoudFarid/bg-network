import ProjectCard from '../components/cards/projectCard'
import ProfileSideBar from '../components/core/profileSideBar'

export default function MyProfile() {
  return (
    <div className="grid grid-cols-1 gap-0 ml-8 mr-8 lg:grid-cols-3 lg:gap-16 lg:ml-0">
      <ProfileSideBar />

      <div className="col-span-2 mt-10 mb-16">
        <h2 className="text-black font-bold text-lg mb-5">Projects</h2>
        <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  )
}
