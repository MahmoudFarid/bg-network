import Head from 'next/head'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import FollowCard from '../../components/cards/followCard'
import { connect, useDispatch } from 'react-redux'
import { GetRequests, GetPendingList } from './../../redux/actions/requestsActions'
import Pagination from '../../components/features/pagination'

function Requests({ requests }) {
  const [isRequests, setIsRequests] = useState(true)
  const dispatch = useDispatch()

  const setPageItem = (offset, limit) => {
    dispatch(GetRequests(offset, limit))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // const requestsList = () => {
  //   setIsRequests(true)
  //   setTimeout(() => {
  //     dispatch(GetRequests())
  //   }, 1000)
  // }
  // console.log(requests)

  // const pendingList = () => {
  //   setIsRequests(false)
  //   setTimeout(() => {
  //     dispatch(GetPendingList())
  //   }, 1000)
  // }

  useEffect(() => {
    dispatch(GetRequests())
  }, [])

  return (
    <div>
      <Head>
        <title>All Requests</title>
      </Head>
      <div className="container my-12">
        <div>
          <button
            className={`py-3 px-10 bg-white rounded-tl-lg focus:outline-none ${
              isRequests ? 'bg-primaryText text-white' : 'bg-white'
            }`}
            onClick={() => Router.push('/requests')}>
            Requests
          </button>
          <button
            className={`py-3 px-10 bg-white rounded-tr-lg focus:outline-none ${
              isRequests ? 'bg-white' : 'bg-primaryText text-white'
            }`}
            onClick={() => Router.push('/requests/pending')}>
            Pending list
          </button>
        </div>
        <div className="bg-white p-5 pt-0 rounded-lg shadow-lg">
          {requests?.length === 0 || !requests ? (
            <div className="text-primary text-4xl text-center mx-auto py-16 w-8/12">
              You don't have any Requests
            </div>
          ) : (
            requests?.map((request) => (
              <FollowCard
                key={request.from_user.id}
                account={request.from_user}
                request={request}
                isRequests={isRequests}
                isBroker={request.from_user.is_broker}
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
  requests: state.requests.data,
})

export default connect(mapStateToProps)(Requests)
