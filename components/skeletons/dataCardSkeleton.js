import Skeleton from 'react-loading-skeleton'

export default function DataCardSkeleton({ isBroker }) {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-5 text-center">
      <Skeleton
        circle={true}
        height={100}
        width={100}
        style={{ margin: '0 auto', display: 'block', marginBottom: 10 }}
      />
      <div className="w-full ml-2">
        <Skeleton width={120} style={{ marginBottom: 10 }} />
        <Skeleton count={2} width={`95%`} />
        {isBroker == 'true' ? (
          <div className="mt-4">
            <Skeleton width={90} />
            <Skeleton width={90} style={{ marginLeft: 10 }} />
          </div>
        ) : (
          <div className="mt-4">
            <Skeleton width={90} />
          </div>
        )}
      </div>
    </div>
  )
}
