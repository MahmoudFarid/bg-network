import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function UnitCardSkeleton({ unit, pid }) {
  return (
    <section>
      <div className="border-none shadow-md rounded-lg">
        <div className="relative">
          <Skeleton height={210} />
          <div className="absolute bottom-0 px-2 mb-5 ml-5 w-1/3">
            <SkeletonTheme color="#ccc">
              <Skeleton />
            </SkeletonTheme>
          </div>
        </div>
        <div className="bg-white ">
          <div className="pt-3 pl-5 w-11/12">
            <Skeleton width={`90%`} style={{ marginBottom: 10 }} />
            <Skeleton width={80} />
          </div>
          <div className="py-5 pl-5">
            <Skeleton count={5} width={40} height={40} style={{ marginRight: 10 }} />
          </div>
        </div>
      </div>
    </section>
  )
}
