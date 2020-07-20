import ProjectCard from '../components/cards/projectCard'

export default function Projects() {
  return (
    <div className="container-fluid my-16">
      <div className="flex justify-between mb-6">
        <h2 className="text-black font-bold text-lg">Projects</h2>
        <button className="py-3 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-full hover:text-white focus:outline-none">
          <i className="fas fa-plus-circle fa-lg text-white mr-5"></i>
          Add Project
        </button>
      </div>
      <div className="bg-white p-5 rounded-lg">
        <div className="grid grid-cols-1 col-gap-8 row-gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
