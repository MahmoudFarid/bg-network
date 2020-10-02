import Head from 'next/head'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import FollowCard from '../../components/cards/followCard'
import { connect, useDispatch } from 'react-redux'
import { GetRequests, GetPendingList } from './../../redux/actions/requestsActions'
import Pagination from '../../components/features/pagination'
import FollowCardSkeleton from './../../components/skeletons/followCardSkeleton'

function Requests({ requests }) {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  const setPageItem = (offset, limit) => {
    dispatch(GetRequests(offset, limit))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    dispatch(GetPendingList()).then((res) => setIsLoading(false))
  }, [])

  return (
    <div>
      <Head>
        <title>All Requests</title>
      </Head>
      <div className="container my-12">
        <div>
          <button
            className="py-3 px-10 bg-white rounded-tl-lg focus:outline-none"
            onClick={() => Router.push('/requests')}>
            Requests
          </button>
          <button
            className="py-3 px-10 bg-primaryText text-white rounded-tr-lg focus:outline-none"
            onClick={() => Router.push('/requests/pending')}>
            Pending list
          </button>
        </div>
        <div className="bg-white p-5 pt-0 rounded-lg shadow-lg">
          {isLoading ? (
            Array(5)
              .fill()
              .map((item, i) => <FollowCardSkeleton isRequests={false} key={i} />)
          ) : requests?.length === 0 || !requests ? (
            <div className="text-primary text-4xl text-center mx-auto py-16 w-8/12">
              You don't send any request
            </div>
          ) : (
            requests?.map((request) => (
              <FollowCard
                key={request.to_user.id}
                account={request.to_user}
                request={request}
                isRequests={false}
                isBroker={request.to_user.is_broker}
              />
            ))
          )}
        </div>
        <Pagination count={requests?.count} limit={10} setPageItem={setPageItem} />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  requests: state.requests.pending,
})

export default connect(mapStateToProps)(Requests)
