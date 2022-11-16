import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './index.scss'

const Users = () => {
  const [users, setUsers] = useState()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    // to cancel any pending request on component unmount
    const controller = new AbortController()

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
      <h3 className='users__title'>Users List</h3>
      {users?.data.length ? (
        <table className='users__table'>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Roles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className='users__name'>{user?.username}</td>
                <td className='users__roles'>
                  {user?.roles === 1 ? 'Admin' : 'Staff'}
                </td>
                <td className='users__action'>
                  <div className='users__btn-wrapper'>
                    <button className='btn btn-warning'>Update</button>
                    <button className='btn btn-danger'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user to display</p>
      )}
    </article>
  )
}

export default Users
