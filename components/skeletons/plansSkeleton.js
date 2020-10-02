import Skeleton from 'react-loading-skeleton'

export default function PlansSkeleton() {
  return (
    <tr>
      <td>
        <Skeleton width={200} style={{ padding: 10, marginBottom: 10 }} />
      </td>
      <td>
        <Skeleton width={`90%`} style={{ padding: 10, marginBottom: 10 }} />
      </td>
      <td>
        <Skeleton style={{ padding: 10, marginBottom: 10 }} />
      </td>
    </tr>
  )
}
