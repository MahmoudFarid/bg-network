import { useRouter } from 'next/router'
import UnitData from '../../../../../components/forms/unitData'

export default function Edit() {
  const {
    query: { pid, uid },
  } = useRouter()

  return <UnitData pid={pid} uid={uid} />
}
