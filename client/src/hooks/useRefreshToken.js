import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.post(
      '/api/refresh_token',
      {},
      {
        withCredentials: true,
      }
    )

    console.log('Response: ', response?.data)

    setAuth((prevState) => {
      console.log('PrevState: ', JSON.stringify(prevState))
      console.log('New AccessToken: ', response?.data?.accessToken)
      return {
        ...prevState,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      }
    })
    return response?.data?.accessToken
  }
  return refresh
}

export default useRefreshToken
