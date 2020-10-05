import { useState } from 'react'
import Router from 'next/router'

export default function ProjectSideBar({ project, toggleProjectImgs, deleteProject, isBroker }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="profile col-span-2 bg-bgLight pt-10">
      {isBroker != 'true' && (
        <div className="relative px-5 text-right">
          <i
            className="fas fa-ellipsis-v text-primaryLight pl-5 pr-2 cursor-pointer hover:text-primary"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}></i>
          {isOpen && (
            <div
              className="absolute right-0 z-10 bg-white text-primaryLight text-left mr-5 w-2/5 border border-gray-200 rounded-lg shadow-md"
              onClick={() => setIsOpen(false)}>
              <p
                className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold"
                onClick={(e) => {
                  e.stopPropagation()
                  Router.push('/projects/[pid]/edit', `/projects/${project.id}/edit`)
                }}>
                <i className="fas fa-pen mr-5"></i>
                Edit
              </p>
              <p
                className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold"
                onClick={deleteProject}>
                <i className="fas fa-trash mr-5"></i>
                Delete
              </p>
            </div>
          )}
        </div>
      )}
      <div className="py-10">
        <div className="w-48 h-40 mx-auto">
          <img
            src={project?.cover_image ? project.cover_image : '/assets/profile-pic.png'}
            alt="project"
            className="block w-10/12 h-full rounded-full mx-auto"
          />
        </div>
        <div className="text-center mt-5">
          <p className="text-black font-semibold text-lg">{project.name}</p>
          <span className="text-secondary text-sm">Cairo, Egypt</span>
          <button
            className="block py-2 px-3 mt-5 mx-auto text-secondaryLight text-xs font-bold border border-secondaryLight rounded-full transition duration-500 ease-in-out hover:bg-secondaryLight hover:text-white focus:outline-none"
            onClick={toggleProjectImgs}>
            <i className="fas fa-image fa-lg mr-5"></i>
            Show Project Images
          </button>
        </div>

        <div className="w-3/4 mx-auto mt-8 text-center">
          <div className="flex justify-around mb-5">
            <div>
              <p className="font-bold">Code</p>
              <span className="text-sm">{project.code}</span>
            </div>
            <div>
              <p className="font-bold">Area</p>
              <span className="text-sm">
                {project.area} M<sup>2</sup>
              </span>
            </div>
          </div>
          <div className="flex justify-around">
            <div>
              <p className="font-bold">No. of Floors</p>
              <span className="text-sm">{project.floors_number}</span>
            </div>
            <div>
              <p className="font-bold">Flats per Floor</p>
              <span className="text-sm">{project.flats_per_floor}</span>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        .profile {
          width: 91%;
          min-height: 88vh;
        }
      `}
      </style>
    </div>
  )
}
