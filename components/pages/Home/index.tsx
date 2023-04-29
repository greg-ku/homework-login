import { useUserData } from 'utils/api'

export default function Home() {
  const { data } = useUserData()

  return (
    <>
      {data && JSON.stringify(data)}
    </>
  )
}
