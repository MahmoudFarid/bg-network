import { useRouter } from 'next/router'
import PlanData from '../../components/forms/planData'

export default function Edit() {
  const {
    query: { pid },
  } = useRouter()

  return <PlanData pid={pid} />
}
