import Head from 'next/head'
import { useEffect } from 'react'
import FollowCard from '../components/cards/followCard'
import { connect, useDispatch } from 'react-redux'
import { GetRequests } from './../redux/actions/requestsActions'
import Pagination from '../components/features/pagination'

function Requests({ requests }) {
  const dispatch = useDispatch()

  const setPageItem = (offset, limit) => {
    dispatch(GetRequests(offset, limit))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    dispatch(GetRequests())
  }, [])

  return (
    <div>
      <Head>
        <title>All Requests</title>
      </Head>
      <div className="container my-12">
        <h2 className="text-black font-bold text-md mb-3">Requests</h2>
        <div className="bg-white p-5 pt-0 mt-3 rounded-lg shadow-lg">
          {requests?.results.length === 0 || !requests ? (
            <div className="text-primary text-4xl text-center mx-auto py-16 w-8/12">
              You don't have any Requests
            </div>
          ) : (
            requests?.results.map((request) => (
              <FollowCard key={request.id} account={request.from_user} request={request} />
            ))
          )}
        </div>
        <Pagination count={requests?.count} limit={10} setPageItem={setPageItem} />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  requests: state.requests.data,
})

export default connect(mapStateToProps)(Requests)
