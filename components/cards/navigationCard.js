export default function NavigationCard() {
  return (
    <div className="grid grid-cols-4 border-b border-gray-300 py-2">
      <div className="mt-3">
        <img
          src="/assets/user.jpg"
          alt="user"
          className="block w-8/12 h-full rounded-full mx-auto"
        />
      </div>
      <div className="col-span-3 text-primary text-sm self-center">
        <span className="font-bold">Mohamed Ahmed</span> wants to you to share{' '}
        <span className="font-bold">Skyline</span> project
      </div>
      <div className="btn col-span-4 self-center">
        <div>
          <button className="py-2 px-5 mr-2 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none">
            Ignore
          </button>
          <button className="py-2 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none">
            Accept
          </button>
        </div>
      </div>
      <style jsx>{`
        .btn {
          justify-self: end;
        }
      `}</style>
    </div>
  )
}
