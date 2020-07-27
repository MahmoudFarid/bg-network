import { useEffect } from 'react'
import FollowCard from '../components/cards/followCard'
import { connect, useDispatch } from 'react-redux'
import { GetRequests } from './../redux/actions/requestsActions'

function Requests({ requests }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetRequests())
  }, [])

  return (
    <div className="container-fluid my-16">
      <h2 className="text-black font-bold text-lg mb-8">Requests</h2>
      <div className="bg-white p-5 pt-0 mt-3 rounded-lg shadow-lg">
        {requests?.length === 0 || !requests ? (
          <div className="text-primary text-4xl text-center mx-auto py-16 w-8/12">
            You don't have any Requests
          </div>
        ) : (
          requests?.map((request) => (
            <FollowCard key={request.id} account={request.from_user} request={request} />
          ))
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  requests: state.requests.data,
})

export default connect(mapStateToProps)(Requests)
