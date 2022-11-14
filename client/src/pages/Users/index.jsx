import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const Users = () => {
  const [users, setUsers] = useState()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController() // to cancel any pending request on component unmount

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/api/users', {
          signal: controller.signal,
        })
        console.log(response.data)
        isMounted && setUsers(response.data)
      } catch (err) {
        console.error('Users Error: ', err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUsers()

    // clean up to cancel/abort any pending request
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <article className='users'>
      <h2>Users List</h2>
      {users?.data.length ? (
        <ul>
          {users.data.map((user, index) => (
            <li key={index}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No user to display</p>
      )}
    </article>
  )
}

export default Users
