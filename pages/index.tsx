import { hasCookie } from 'cookies-next'

export default function Home() {
  return (
    <>
      hello
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  if (!hasCookie('token', { req, res })) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}
