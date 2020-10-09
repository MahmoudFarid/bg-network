import Skeleton from 'react-loading-skeleton'

export default function SettingsSkeleton() {
  return (
    <div>
      <h2 className="mb-3">
        <Skeleton width={100} />
      </h2>
      <div className="flex justify-between">
        <div className="w-1/5 text-sm shadow-lg rounded-lg">
          <Skeleton count={2} style={{ padding: 10, marginBottom: 10 }} />
        </div>
        <div className="form relative w-9/12 bg-white py-5 shadow-lg rounded-lg">
          <Skeleton width={100} style={{ display: 'block', margin: 10 }} />
          <Skeleton width={`60%`} style={{ padding: 10, margin: 10 }} />
          <div>
            <Skeleton width={100} style={{ display: 'block', margin: 10 }} />
            <Skeleton width={`60%`} style={{ padding: 10, margin: 10 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
