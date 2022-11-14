import axios from '../api/axios'
import useAuth from './useAuth'

const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth({})
    try {
      const response = await axios.post(
        '/api/logout',
        {},
        {
          withCredentials: true,
        }
      )
      console.log(response)
    } catch (err) {
      console.error('Logout Error:', err)
    }
  }
  return logout
}

export default useLogout
