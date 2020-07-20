import Link from 'next/link'

export default function CompanyCard() {
  return (
    <div className="bg-white border-none shadow-md rounded-lg">
      <div className="relative">
        <img src="/assets/company-cover.jpg" alt="company" />
        <button className="absolute bottom-0 right-0 bg-white text-primaryText text-sm m-3 py-1 px-10 rounded-full transition duration-700 ease-in-out hover:bg-primaryText hover:text-white focus:outline-none">
          Send
        </button>
      </div>

      <div className="flex justify-start p-5">
        <div className="w-1/4 mr-5 mt-5">
          <img
            src="/assets/company-pic.jpg"
            alt="company"
            className="block w-10/12 rounded-full mx-auto"
          />
        </div>
        <div className="item w-full">
          <Link href="/">
            <a className="text-black font-extrabold text-lg hover:text-primaryText focus:outline-none">
              Talaat Mustafa
            </a>
          </Link>
          <p className="text-secondaryLight text-xs tracking-wide font-semibold mb-4 mt-1">
            Best city company development in egypt has over 300 project with overthan 3,000
            employees.
          </p>
          <div className="inline-block mr-2 mb-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
            <i className="fas fa-city fa-xs text-black mr-2"></i>
            <span className="text-xs text-secondary font-semibold">20 Project</span>
          </div>
          <div className="inline-block mr-2 py-1 pt-0 px-3 bg-bgLight text-black rounded-full">
            <i className="fas fa-home fa-xs text-black mr-2"></i>
            <span className="text-xs text-secondary font-semibold">200 Property</span>
          </div>
        </div>
      </div>
    </div>
  )
}
