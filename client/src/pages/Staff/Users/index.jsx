import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import useAuth from '../../../hooks/useAuth'
import { Spinner, Modal } from '../../../components'
import './index.scss'

const Users = () => {
  const [users, setUsers] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const deleteIdRef = useRef()

  const { auth } = useAuth()
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

        if (response?.data?.data?.length > 0) {
          setIsLoading(false)
        }
        isMounted && setUsers(response?.data?.data)
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

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])

  const handleOpenModal = (id) => {
    setModalIsOpen(true)
    deleteIdRef.current = id
  }

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/api/users/${id}`)
      cogoToast.success('Delete Success!')
      setIsSuccess(true)
    } catch (err) {
      setIsSuccess(false)
      if (!err?.response) {
        cogoToast.error('No Server Response')
      } else {
        cogoToast.error(err.response?.data?.message)
      }
    }
  }

  if (isLoading)
    return (
      <div className='spinner-container'>
        <Spinner />
      </div>
    )

  return (
    <div className='users'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='p-4'>
          <p>Are you sure you want to delete this user?</p>
          <div className='btn-wrapper pt-4'>
            <button
              className='btn btn-danger'
              onClick={() => handleDelete(deleteIdRef.current)}
            >
              Yes
            </button>
            <button className='btn btn-light'>No</button>
          </div>
        </div>
      </Modal>
      <h3 className='users__title'>User List</h3>
      {users?.length ? (
        <div className='users__table-wrapper'>
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
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className='users__name'>{user?.username}</td>
                  <td className='users__roles'>
                    {user?.roles === 1 ? 'Admin' : 'Staff'}
                  </td>
                  <td className='users__action'>
                    <div className='users__btn-wrapper'>
                      <Link to={`/staff/${user?.id}`}>
                        <button className='btn btn-warning'>Edit</button>
                      </Link>
                      {auth?.id !== user?.id ? (
                        <button
                          className='btn btn-danger'
                          onClick={() => handleOpenModal(user?.id)}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No user to display</p>
      )}
    </div>
  )
}

export default Users
