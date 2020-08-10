import { useRouter } from 'next/router'
import UnitData from '../../../../components/forms/unitData'

export default function Add() {
  const {
    query: { pid },
  } = useRouter()

  return <UnitData pid={pid} />
}
