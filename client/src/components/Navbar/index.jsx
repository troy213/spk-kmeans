import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'
import './index.scss'

const Navbar = () => {
  const navigate = useNavigate()
  const logout = useLogout()
  const { auth } = useAuth()

  const signOut = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className='navbar'>
      <div className='navbar-wrapper'>
        <div className='navbar-left'>
          <span className='navbar-title'>Logo</span>
        </div>
        <div className='navbar-right'>
          <span className='navbar-user'>{auth?.username}</span>
          <button className='btn btn-outline-light' onClick={signOut}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
