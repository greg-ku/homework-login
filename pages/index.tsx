import { hasCookie } from 'cookies-next'

import Home from '@/components/pages/Home'

export default function HomePage() {
  return (
    <Home />
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
