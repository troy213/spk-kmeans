import React from 'react'
import Users from './Users'
import './index.scss'

const Staff = () => {
  return (
    <section className='staff'>
      <h1 className='staff__title'>Staff's Page</h1>
      <div className='staff__content'>
        <Users />
      </div>
    </section>
  )
}

export default Staff
