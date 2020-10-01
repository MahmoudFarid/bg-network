import Link from 'next/link'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import { AcceptRequest, RejectRequest } from '../../redux/actions/requestsActions'

function NotificationCard({ isBroker, account, request, acceptRequest, rejectRequest }) {
  const date = new Date(request.created)
  const formattedDate = format(date, 'MMMM dd, yyy H:mma')

  return (
    <div className="grid grid-cols-4 border-b border-gray-300 py-2">
      <div className="mt-3">
        <img
          src={account.avatar ? account.avatar : '/assets/profile-pic.png'}
          alt="user"
          className="block w-7/12 h-full rounded-full mx-auto"
        />
      </div>
      <div className="col-span-3 text-primary text-sm self-center hover:text-primaryText">
        {isBroker ? (
          <Link href="companies/[cid]" as={`companies/${account.id}`}>
            <a>
              <span className="font-bold">{account.name}</span>
              <span className="text-primary"> wants to connect with you</span>
            </a>
          </Link>
        ) : (
          <Link href="brokers/[bid]" as={`brokers/${account.id}`}>
            <a>
              <span className="font-bold">{account.name}</span>
              <span className="text-primary"> wants to connect with you</span>
            </a>
          </Link>
        )}
      </div>
      <div className="btn col-span-4 self-center">
        <div>
          <button
            className="py-1 px-5 mr-2 text-primary border border-primary text-xs font-semibold rounded-lg hover:bg-gray-100 focus:outline-none"
            onClick={() => rejectRequest(request.from_user.id)}>
            Ignore
          </button>
          <button
            className="py-1 px-5 bg-primary text-gray-400 text-xs font-semibold rounded-lg hover:text-white focus:outline-none"
            onClick={() => acceptRequest(request.from_user.id)}>
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

const mapDispatchToProps = (dispatch) => ({
  rejectRequest: (id) => dispatch(RejectRequest(id)),
  acceptRequest: (id) => dispatch(AcceptRequest(id)),
})

export default connect(null, mapDispatchToProps)(NotificationCard)
