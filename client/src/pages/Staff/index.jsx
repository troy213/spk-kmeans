import React from 'react'
import { Link } from 'react-router-dom'
import { Users } from '..'
import './index.scss'

const Staff = () => {
  return (
    <section className='staff'>
      <h1>Staff's Page</h1>
      <br />
      <Users />
      <br />
      <div className='flexGrow'>
        <Link to='/'>Home</Link>
      </div>
    </section>
  )
}

export default Staff
