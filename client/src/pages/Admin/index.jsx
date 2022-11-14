import React from 'react'
import { Link } from 'react-router-dom'
import { Users } from '../'
import './index.scss'

const Admin = () => {
  return (
    <section className='admin'>
      <h1>Admin's Page</h1>
      <br />
      <Users />
      <br />
      <div className='flexGrow'>
        <Link to='/'>Home</Link>
      </div>
    </section>
  )
}

export default Admin
