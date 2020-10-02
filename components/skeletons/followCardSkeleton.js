import Skeleton from 'react-loading-skeleton'

export default function FollowCardSkeleton({ isRequests }) {
  return (
    <div className="grid grid-cols-9 lg:grid-cols-11 border-b border-gray-300 py-2">
      <Skeleton circle={true} height={70} width={70} />
      <div className="col-span-7 text-primary text-lg self-center ml-16 hover:text-primaryText lg:col-span-6 xl:ml-0">
        <Skeleton width={`80%`} />
      </div>
      <div className="btn col-span-9 self-center lg:col-span-4">
        <Skeleton width={150} />
        <Skeleton width={100} style={{ marginLeft: 10, padding: 10 }} />
        {isRequests && <Skeleton width={100} style={{ marginLeft: 10, padding: 10 }} />}
      </div>

      <style jsx>{`
        .btn {
          justify-self: end;
        }
      `}</style>
    </div>
  )
}
