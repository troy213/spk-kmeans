import React from 'react'
import CalonPetugas from './CalonPetugas'
import './index.scss'

const Home = () => {
  return (
    <section className='home'>
      <h1 className='home-title'>Home</h1>
      <br />
      <div className='home-content'>
        <CalonPetugas />
      </div>
    </section>
  )
}

export default Home
