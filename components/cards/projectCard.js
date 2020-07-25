import Link from 'next/link'

export default function ProjectCard({ cid }) {
  return (
    <div className="relative">
      <div className="absolute top-0 bg-overlay h-full w-full opacity-75 rounded-md hover:shadow-2xl"></div>

      <div className="h-64 overflow-hidden">
        <img src="/assets/project.jpg" alt="project" className="w-full h-full rounded-md" />
      </div>

      <div className="absolute bottom-0 ml-5 mb-3">
        <Link
          href={{
            pathname: '/projects/[pid]',
            query: { cid: cid },
          }}
          as="/projects/2">
          <a className="text-white text-xl font-semibold block hover:underline focus:outline-none">
            Skyline Complex
          </a>
        </Link>

        <span className="text-gray-300 font-semibold text-sm">
          <i className="fas fa-home fa-sm text-white mr-3"></i>
          24 Units
        </span>
      </div>
    </div>
  )
}
