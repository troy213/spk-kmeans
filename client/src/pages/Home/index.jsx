import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const Home = () => {
  return (
    <section className='home'>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to='/editor'>Go to the Editor page</Link>
      <br />
      <Link to='/staff'>Go to the Staff's page</Link>
      <br />
      <Link to='/linkpage'>Go to the link page</Link>
    </section>
  )
}

export default Home
