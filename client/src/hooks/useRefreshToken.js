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


    setAuth((prevState) => {
      return {
        ...prevState,
        id: response.data.id,
        username: response.data.username,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      }
    })
    return response?.data?.accessToken
  }
  return refresh
}

export default useRefreshToken
