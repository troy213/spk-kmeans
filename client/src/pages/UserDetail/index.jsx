import React, { useState, useEffect } from 'react'
import cogoToast from 'cogo-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Info } from '@material-ui/icons'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './index.scss'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-]{3,23}$/
const UPDATE_URL = '/api/users'
const ROLES = [
  {
    id: 1,
    role: 'Admin',
  },
  {
    id: 2,
    role: 'Staff',
  },
]

const UserDetail = (props) => {
  const { id } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState({
    id: '',
    username: '',
    roles: '',
  })
  const [isValidName, setIsValidName] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const result = USER_REGEX.test(user.username)
    setIsValidName(result)
  }, [user])

  useEffect(() => {
    let isMounted = true
    // to cancel any pending request on component unmount
    const controller = new AbortController()

    const getUserId = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}`, {
          signal: controller.signal,
        })
        isMounted && setUser(response.data.data[0])
      } catch (err) {
        console.error('Users Error: ', err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUserId()

    // clean up to cancel/abort any pending request
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleChange = (input, value) => {
    setUser((prevState) => ({
      ...prevState,
      [input]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user.username)
    const v2 = user.roles.toString().length > 0
    if (!v1 || !v2) {
      cogoToast.error('Invalid Entry')
      return
    }

    try {
      const response = await axiosPrivate.put(
        UPDATE_URL,
        JSON.stringify({
          id: user.id,
          username: user.username,
          roles: user.roles,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      setIsSuccess(true)
      cogoToast.success('Update Success!')
      // clear input fields
    } catch (err) {
      if (!err?.response) {
        cogoToast.error('No Server Response')
      } else {
        cogoToast.error(err.response?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/staff')
    }
  }, [isSuccess])

  return (
    <div className='user-detail'>
      <h1 className='user-detail-title'>User Detail</h1>
      <form className='user-detail-form' onSubmit={handleSubmit}>
        <div className='user-detail-form-wrapper'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            aria-invalid={isValidName ? 'false' : 'true'}
            aria-describedby='uidnote'
            value={user.username}
            onChange={(e) => handleChange('username', e.target.value)}
            required
            className={user?.username && !isValidName ? 'input-error' : ''}
          />
          <p
            id='uidnote'
            className={
              user?.username && !isValidName ? 'instructions' : 'offscreen'
            }
          >
            <Info className='info-icon' />
            4 to 24 characters. <br />
            Must begin with a letter. Letters, numbers, underscores, hyphens
            allowed.
          </p>
          <label htmlFor='roles'>Roles</label>
          <select
            name='roles'
            id='roles'
            value={user.roles}
            onChange={(e) => handleChange('roles', e.target.value)}
          >
            {ROLES.map((roles) => {
              return (
                <option value={roles.id} key={roles.id}>
                  {roles.role}
                </option>
              )
            })}
          </select>
        </div>

        <button
          disabled={!isValidName ? true : false}
          className={`btn btn-primary${!isValidName ? ' disabled' : ''}`}
          type='submit'
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default UserDetail
