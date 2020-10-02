import Skeleton from 'react-loading-skeleton'

export default function CountSkeleton() {
  return (
    <section>
      <div className="flex justify-start mt-4">
        <Skeleton circle={true} height={40} width={40} />
        <div className="ml-2">
          <Skeleton width={50} style={{ display: 'block' }} />
          <Skeleton width={90} />
        </div>
      </div>
    </section>
  )
}
