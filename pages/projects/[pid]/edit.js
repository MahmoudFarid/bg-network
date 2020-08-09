import { useRouter } from 'next/router'
import ProjectData from './../../../components/forms/projectData'

export default function Edit() {
  const {
    query: { pid },
  } = useRouter()

  return <ProjectData pid={pid} />
}
