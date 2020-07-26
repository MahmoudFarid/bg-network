import Link from 'next/link'

export default function ProjectCard({ project }) {
  return (
    <div className="relative">
      <div className="absolute top-0 bg-overlay h-full w-full opacity-75 rounded-md hover:shadow-2xl"></div>

      <div className="h-64 overflow-hidden">
        <img src={project.cover_image} alt="project" className="w-full h-full rounded-md" />
      </div>

      <div className="absolute bottom-0 ml-5 mb-3">
        <Link
          href={{
            pathname: '/projects/[pid]',
            query: { pid: project.id },
          }}
          as={`/projects/${project.id}`}>
          <a className="text-white text-xl font-semibold block hover:underline focus:outline-none">
            {project.name}
          </a>
        </Link>

        <span className="text-gray-300 font-semibold text-sm">
          <i className="fas fa-home fa-sm text-white mr-3"></i>
          {project.units_count} {project.units_count <= 1 ? 'Unit' : 'Units'}
        </span>
      </div>
    </div>
  )
}
