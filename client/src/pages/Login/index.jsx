import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import './index.scss'

const LOGIN_URL = '/api/login'

const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      const accessToken = response?.data?.accessToken
      const username = response?.data?.username
      const roles = response?.data?.roles
      const id = response?.data?.id

      setAuth({ id, username, roles, accessToken })
      setUser('')
      setPwd('')
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else {
        setErrMsg(err.response.data?.message)
      }
      errRef.current.focus() // to trigger aria accessibility
    }
  }

  return (
    <div className='login-container'>
      <section className='login'>
        <p
          ref={errRef}
          className={errMsg ? 'error-message' : 'offScreen'}
          aria-live='assertive'
        >
          {errMsg}
        </p>
        <h1 className='login-title'>Sign In</h1>
        <form onSubmit={handleSubmit} className='login-form'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            className='login-form-input'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            className='login-form-input'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <button type='submit' className='btn btn-primary p-3'>
            Sign In
          </button>
        </form>
      </section>
    </div>
  )
}

export default Login
