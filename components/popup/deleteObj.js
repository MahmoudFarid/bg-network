export default function DeleteObj({ name, msg, onDeletingItem, setIsDeleteOverlay }) {
  return (
    <div
      className={`details w-10/12 bg-white overflow-auto fixed z-50 p-10 shadow-lg rounded-lg text-center md:w-7/12 ${
        msg ? 'xl:w-5/12' : 'xl:w-1/3'
      }`}>
      <h2 className="text-primaryText text-lg">
        {msg ? (
          <span>
            Are you sure you want to remove <span className="font-bold">{name}</span> as your friend
            ?
          </span>
        ) : (
          <span>
            Are you sure to delete <span className="font-bold">{name}</span> ?
          </span>
        )}
      </h2>
      <div className="mt-6 w-full">
        <button
          className="py-3 px-12 mr-5 text-danger text-xs border border-danger font-semibold rounded-lg transition duration-500 ease-in-out hover:bg-danger hover:text-white focus:outline-none"
          onClick={() => setIsDeleteOverlay(false)}>
          No
        </button>
        <button
          className="py-3 px-12 text-success text-xs border border-success font-semibold rounded-lg transition duration-500 ease-in-out hover:bg-success hover:text-white focus:outline-none"
          onClick={() => {
            onDeletingItem(), setIsDeleteOverlay()
          }}>
          Yes
        </button>
      </div>

      <style jsx>{`
        .details {
          height: 11rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  )
}
