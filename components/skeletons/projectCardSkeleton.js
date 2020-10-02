import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function ProjectCardSkeleton({ company }) {
  return (
    <section>
      <div className="w-full relative">
        <Skeleton height={250} />
        <div className="absolute bottom-0 mb-3 ml-5">
          <SkeletonTheme color="#ccc">
            <Skeleton width={140} style={{ display: 'block', marginBottom: 5 }} />
            {!company && <Skeleton width={90} />}
          </SkeletonTheme>
        </div>
      </div>
    </section>
  )
}
