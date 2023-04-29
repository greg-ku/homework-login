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
