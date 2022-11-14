import React, { useState, useEffect, useRef } from 'react'
import { Info } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import axios from '../../api/axios'
import './index.scss'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9- ]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/
const REGISTER_URL = '/api/register'

const Register = () => {
  const navigate = useNavigate()

  const userRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      cogoToast.error('Invalid Entry')
      return
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log('Response Data: ', response.data)
      console.log('Response AccessToken: ', response.accessToken)
      console.log('Response: ', response)
      setSuccess(true)
      cogoToast.success('Registration Success!')
      // clear input fields
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        cogoToast.error('No Server Response')
      } else {
        cogoToast.error(err.response?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (success) {
      navigate('/login')
    }
  }, [success])

  return (
    <section className='register'>
      <h1 className='register-title'>Register New Staff</h1>
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='register-form-wrapper'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className={user && !validName ? 'input-error' : ''}
          />
          <p
            id='uidnote'
            className={
              userFocus && user && !validName ? 'instructions' : 'offscreen'
            }
          >
            <Info className='info-icon' />
            4 to 24 characters. <br />
            Must begin with a letter. Letters, numbers, underscores, hyphens
            allowed.
          </p>

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className={pwd && !validPwd ? 'input-error' : ''}
          />
          <p
            id='pwdnote'
            className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
          >
            <Info className='info-icon' />
            5 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number and a special
            character. <br />
            Allowed special characters:{' '}
            <span aria-label='exclamation mark'>!</span>
            <span aria-label='at symbol'>@</span>
            <span aria-label='hashtag'>#</span>
            <span aria-label='dollar sign'>$</span>
            <span aria-label='percent'>%</span>
          </p>

          <label htmlFor='confirm_pwd'>Confirm Password:</label>
          <input
            type='password'
            id='confirm_pwd'
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className={matchPwd && !validMatch ? 'input-error' : ''}
          />
          <p
            id='confirmnote'
            className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
          >
            <Info className='info-icon' />
            Must match the first password input field
          </p>
        </div>

        <button
          disabled={!validName || !validPwd || !validMatch ? true : false}
          className={`btn btn-primary${
            !validName || !validPwd || !validMatch ? ' disabled' : ''
          }`}
        >
          Sign Up
        </button>
      </form>
    </section>
  )
}

export default Register
