import useSWR from 'swr'
import { hasCookie, getCookie } from 'cookies-next'

const API_URL = 'https://interview-test-api-2bfhetuihq-de.a.run.app'

export const login = (username: string, password: string) => {
  return fetch(
    `${API_URL}/user/login`,
    {
      body: JSON.stringify({ username, password }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    }
  ).then((response) => response.json())
  .then(
    (result) => {
      if (result?.status === 'success') {
        return [result.data]
      } else if (result?.status === 'error') {
        return [undefined, new Error(result.error)]
      }
      return [undefined, new Error('Unexpected Error')]
    }
  )
}

const fetcher = (url, opts = {}, ...args) => {
  const options = { ...opts }
  if (hasCookie('token')) {
    options.headers = {
      ...(options?.headers),
      Authorization: getCookie('token'),
    }
  }
  return fetch(url, options, ...args)
  .then(res => res.json())
  .then(
    (result) => result?.status === 'success'
      ? result.data
      : Promise.reject(result.error)
  )
}

export const useUserData = () => {
  return useSWR(`${API_URL}/user`, fetcher)
}
