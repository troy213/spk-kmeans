import React from 'react'
import './index.scss'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-wrapper'>
        <div className='navbar-left'>
          <span className='navbar-title'>Logo</span>
        </div>
        <div className='navbar-right'>
          <span className='navbar-user'>Admin</span>
          <button className='btn btn-outline-light'>Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
