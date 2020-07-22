export default function FollowCard({ isFollowers }) {
  return (
    <div className="grid grid-cols-9 lg:grid-cols-11 border-b border-gray-300 py-4">
      <div className="w-24 h-16 mr-2 mt-2">
        <img
          src="/assets/user.jpg"
          alt="user"
          className="block w-10/12 h-full rounded-full mx-auto"
        />
      </div>
      {isFollowers ? (
        <div className="col-span-7 sm:col-span-5 lg:col-span-7 text-primary text-lg self-center ml-16 xl:ml-0">
          <span className="font-bold">Mohamed Ahmed</span>
        </div>
      ) : (
        <div className="col-span-7 text-primary text-lg self-center ml-16 xl:ml-0">
          <span className="font-bold">Mohamed Ahmed</span> wants to you to share{' '}
          <span className="font-bold">Skyline</span> project
        </div>
      )}
      {isFollowers ? (
        <div className="btn col-span-9 sm:col-span-3 self-center">
          <button className="py-2 px-8 text-danger border border-danger text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none">
            UnFollow
          </button>
        </div>
      ) : (
        <div className="btn col-span-9 lg:col-span-3 self-center">
          <div>
            <button className="py-2 px-8 mr-5 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none">
              Ignore
            </button>
            <button className="py-2 px-8 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none">
              Accept
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .btn {
          justify-self: end;
        }
      `}</style>
    </div>
  )
}
