import { theme } from '../../tailwind.config'
import { useState } from 'react'

export default function Plans() {
  const [isOpen, setIsOpen] = useState(false)
  const [rowId, setRowId] = useState(0)

  return (
    <div className="container-fluid my-16">
      <div className="flex justify-between mb-5">
        <h2 className="text-black font-bold text-lg">Plans</h2>
        <button className="py-3 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-full hover:text-white focus:outline-none">
          <i className="fas fa-plus-circle fa-lg text-white mr-5"></i>
          Add Plan
        </button>
      </div>
      <div className="bg-white p-5 rounded-lg">
        <table className="table-auto w-full">
          <thead className="text-primaryText text-left font-bold">
            <tr>
              <th className="p-5 pt-0 w-4/12">Name</th>
              <th className="p-5 pt-0 w-1/2">Description</th>
              <th className="p-5 pt-0 w-1/6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-secondary">
            <tr className="transition duration-300 ease-in-out border-l-4 border-transparent hover:bg-secondaryLightest hover:border-secondaryLight">
              <td className="p-5">name</td>
              <td className="p-5">
                <p className="desc w-11/12 h-6 overflow-hidden lg:whitespace-no-wrap">
                  A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact
                  on Design
                </p>
              </td>
              <td className="relative p-5 text-right">
                <i
                  className="fas fa-ellipsis-v text-primaryLight pl-5 pr-2 cursor-pointer hover:text-primary"
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setRowId(1)
                  }}></i>
                {isOpen && rowId === 1 && (
                  <div className="absolute right-0 z-10 bg-white text-primaryLight text-left mr-5 w-9/12 border border-gray-200 rounded-lg shadow-md">
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-pen mr-5"></i>
                      Edit
                    </p>
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-trash mr-5"></i>
                      Delete
                    </p>
                  </div>
                )}
              </td>
            </tr>
            <tr className="transition duration-300 ease-in-out hover:bg-secondaryLightest border-l-4 border-transparent hover:border-secondaryLight">
              <td className="p-5">Adam</td>
              <td className="p-5">desc</td>
              <td className="relative p-5 text-right">
                <i
                  className="fas fa-ellipsis-v text-primaryLight pl-5 pr-2 cursor-pointer hover:text-primary"
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setRowId(2)
                  }}></i>
                {isOpen && rowId === 2 && (
                  <div className="absolute right-0 z-10 bg-white text-primaryLight text-left mr-5 w-9/12 border border-gray-200 rounded-lg shadow-md">
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-pen mr-5"></i>
                      Edit
                    </p>
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-trash mr-5"></i>
                      Delete
                    </p>
                  </div>
                )}
              </td>
            </tr>
            <tr className="transition duration-300 ease-in-out hover:bg-secondaryLightest border-l-4 border-transparent hover:border-secondaryLight">
              <td className="p-5">Chris</td>
              <td className="p-5">Intro to JavaScript</td>
              <td className="relative p-5 text-right">
                <i
                  className="fas fa-ellipsis-v text-primaryLight pl-5 pr-2 cursor-pointer hover:text-primary"
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setRowId(3)
                  }}></i>
                {isOpen && rowId === 3 && (
                  <div className="absolute right-0 z-10 bg-white text-primaryLight text-left mr-5 w-9/12 border border-gray-200 rounded-lg shadow-md">
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-pen mr-5"></i>
                      Edit
                    </p>
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-trash mr-5"></i>
                      Delete
                    </p>
                  </div>
                )}
              </td>
            </tr>
            <tr className="transition duration-300 ease-in-out hover:bg-secondaryLightest border-l-4 border-transparent hover:border-secondaryLight">
              <td className="p-5">Chris</td>
              <td className="p-5">Intro to JavaScript</td>
              <td className="relative p-5 text-right">
                <i
                  className="fas fa-ellipsis-v text-primaryLight pl-5 pr-2 cursor-pointer hover:text-primary"
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setRowId(4)
                  }}></i>
                {isOpen && rowId === 4 && (
                  <div className="absolute right-0 z-10 bg-white text-primaryLight text-left mr-5 w-9/12 border border-gray-200 rounded-lg shadow-md">
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-pen mr-5"></i>
                      Edit
                    </p>
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-trash mr-5"></i>
                      Delete
                    </p>
                  </div>
                )}
              </td>
            </tr>
            <tr className="transition duration-300 ease-in-out hover:bg-secondaryLightest border-l-4 border-transparent hover:border-secondaryLight">
              <td className="p-5">Chris</td>
              <td className="p-5">Intro to JavaScript</td>
              <td className="relative p-5 text-right">
                <i
                  className="fas fa-ellipsis-v text-primaryLight pl-5 pr-2 cursor-pointer hover:text-primary"
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setRowId(5)
                  }}></i>
                {isOpen && rowId === 5 && (
                  <div className="absolute right-0 z-10 bg-white text-primaryLight text-left mr-5 w-9/12 border border-gray-200 rounded-lg shadow-md">
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-pen mr-5"></i>
                      Edit
                    </p>
                    <p className="py-3 px-5 cursor-pointer hover:bg-gray-100 hover:text-primary hover:font-semibold">
                      <i className="fas fa-trash mr-5"></i>
                      Delete
                    </p>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <style jsx>{`
        tr:nth-child(even) {
          background-color: #eee;
        }
        tr:nth-child(even):hover {
          background-color: ${theme.extend.colors.secondaryLightest};
        }
        .desc {
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  )
}
