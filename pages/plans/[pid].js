import { useRouter } from 'next/router'
import PlanData from '../../components/forms/planData'

export default function Edit() {
  const {
    query: { pid },
  } = useRouter()

  return (
    <div className="container my-12">
      <PlanData pid={pid} />
    </div>
  )
}
