export default function ProjectCard({ profileId }) {
  return (
    <div className="relative">
      <div className="absolute top-0 bg-overlay h-full w-full opacity-75 rounded-md"></div>
      <div className="h-64 overflow-hidden">
        <img src="/assets/project.jpg" alt="project" className="w-full h-full rounded-md" />
      </div>
      <div className="absolute bottom-0 ml-5 mb-3">
        {profileId ? (
          <p className="text-white text-xl font-semibold">Skyline Complex</p>
        ) : (
          <a href="#" className="text-white text-xl font-semibold block hover:underline">
            Skyline Complex
          </a>
        )}

        <span className="text-gray-300 font-semibold text-sm">
          <i className="fas fa-home fa-sm text-white mr-3"></i>
          24 Units
        </span>
      </div>
    </div>
  )
}
