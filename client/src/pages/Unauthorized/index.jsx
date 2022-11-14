import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <section className='unauthorized'>
      <h1>401 Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <br />
      <button onClick={goBack} className='btn btn-light'>
        Go Back
      </button>
    </section>
  )
}

export default Unauthorized
