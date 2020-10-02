import Link from 'next/link'
import { useState } from 'react'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import { AcceptRequest, RejectRequest } from '../../redux/actions/requestsActions'

function FollowCard({ isBroker, account, request, isRequests, acceptRequest, rejectRequest }) {
  const [isAction, setIsAction] = useState(false)
  const date = new Date(request.created)
  const formattedDate = format(date, 'MMMM dd, yyy H:mma')

  return (
    <div
      className={`grid grid-cols-9 lg:grid-cols-11 border-b border-gray-300 py-2 ${
        isAction && 'animate__animated animate__fadeOut'
      }`}>
      <div className="w-20 h-16 mr-2 mt-2">
        <img
          src={account.avatar ? account.avatar : '/assets/profile-pic.png'}
          alt="avatar"
          className="block w-10/12 h-full rounded-full mx-auto"
        />
      </div>
      <div className="col-span-7 text-primary text-lg self-center ml-16 hover:text-primaryText lg:col-span-6 xl:ml-0">
        {isBroker ? (
          <Link href="/brokers/[bid]" as={`/brokers/${account.id}`}>
            <a>
              <span className="font-bold">{account.name}</span>
              {isRequests && <span className="text-primary"> wants to connect with you</span>}
            </a>
          </Link>
        ) : (
          <Link href="/companies/[cid]" as={`/companies/${account.id}`}>
            <a>
              <span className="font-bold">{account.name}</span>
              {isRequests && <span className="text-primary"> wants to connect with you</span>}
            </a>
          </Link>
        )}
      </div>
      <div className="btn col-span-9 self-center lg:col-span-4">
        {isRequests ? (
          <div>
            <span className="text-primaryLight text-sm italic mr-4 lg:block xl:inline-block">
              {formattedDate}
            </span>
            <button
              className="py-2 px-8 mr-2 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
              onClick={() => {
                rejectRequest(request.from_user.id), setIsAction(true)
              }}>
              Ignore
            </button>
            <button
              className="py-2 px-8 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
              onClick={() => {
                acceptRequest(request.from_user.id), setIsAction(true)
              }}>
              Accept
            </button>
          </div>
        ) : (
          <div>
            <span className="text-primaryLight text-sm italic mr-4 lg:block xl:inline-block">
              {formattedDate}
              <button
                className="py-2 px-8 bg-gray-400 text-gray-600 italic ml-5 text-xs font-semibold rounded-lg hover:bg-gray-500 focus:outline-none"
                onClick={() => {
                  rejectRequest(request.to_user.id), setIsAction(true)
                }}>
                Pending
              </button>
            </span>
          </div>
        )}
      </div>
      <style jsx>{`
        .btn {
          justify-self: end;
        }
      `}</style>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  rejectRequest: (id) => dispatch(RejectRequest(id)),
  acceptRequest: (id) => dispatch(AcceptRequest(id)),
})

export default connect(null, mapDispatchToProps)(FollowCard)
