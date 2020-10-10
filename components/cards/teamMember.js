export default function TeamMember({ setIsDeleteOverlay }) {
  return (
    <div>
      <div className="flex justify-between items-center px-10 my-3">
        <div className="flex justify-start">
          <div className="w-16 h-12 mr-2">
            <img
              src="/assets/user.jpg"
              alt="user"
              className="block w-10/12 h-full rounded-full mx-auto"
            />
          </div>
          <div className="item w-9/12">
            <p className="text-secondary font-bold text-sm">Hala Farid</p>
            <p className="desc text-primaryLight text-xs tracking-wide font-semibold mb-2 mt-1 overflow-hidden">
              hala@gmail.com
            </p>
          </div>
        </div>
        <div>
          <button className="py-1 px-2 text-primary text-sm border border-gray-400 font-semibold rounded-md mr-2 transition duration-500 ease-in-out hover:bg-gray-200 focus:outline-none">
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="py-1 px-2 text-primary text-sm border border-gray-400 font-semibold rounded-md transition duration-500 ease-in-out hover:bg-gray-200 focus:outline-none"
            onClick={() => setIsDeleteOverlay(true)}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <hr className="border-top border-gray-300" />
    </div>
  )
}
