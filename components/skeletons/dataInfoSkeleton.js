import Skeleton from 'react-loading-skeleton'

export default function DataInfoSkeleton({ isBroker }) {
  return (
    <section>
      <div className="flex justify-start">
        <Skeleton circle={true} height={50} width={50} />
        <div className="w-full ml-2">
          <Skeleton width={120} />
          <Skeleton count={2} width={`95%`} />
          <div>
            <Skeleton width={90} />
            <Skeleton width={90} style={{ marginLeft: 10 }} />
          </div>
          {isBroker == 'true' && <Skeleton width={90} />}
        </div>
      </div>
      <hr className="my-4 border-top border-gray-300" />
    </section>
  )
}
