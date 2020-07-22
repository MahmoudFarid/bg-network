import Router from 'next/router'

export default function ProjectCard({ isAnotherCompany }) {
  return (
    <div className="relative">
      {isAnotherCompany ? (
        <div className="absolute top-0 bg-overlay h-full w-full opacity-75 rounded-md"></div>
      ) : (
        <div
          className="absolute top-0 bg-overlay h-full w-full opacity-75 rounded-md  cursor-pointer hover:shadow-2xl"
          onClick={() => Router.push('/projects/[pid]', '/projects/2')}></div>
      )}
      <div className="h-64 overflow-hidden">
        <img src="/assets/project.jpg" alt="project" className="w-full h-full rounded-md" />
      </div>
      <div className="absolute bottom-0 ml-5 mb-3">
        {isAnotherCompany ? (
          <p className="text-white text-xl font-semibold">Skyline Complex</p>
        ) : (
          <button
            className="text-white text-xl font-semibold block hover:underline focus:outline-none"
            onClick={() => Router.push('/projects/[pid]', '/projects/2')}>
            Skyline Complex
          </button>
        )}

        <span className="text-gray-300 font-semibold text-sm">
          <i className="fas fa-home fa-sm text-white mr-3"></i>
          24 Units
        </span>
      </div>
    </div>
  )
}
