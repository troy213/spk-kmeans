import React, { useState, useEffect, useRef } from 'react'
import { Info } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import axios from '../../api/axios'
import './index.scss'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/
const REGISTER_URL = '/api/register'

const Register = () => {
  const navigate = useNavigate()

  const userRef = useRef()

  const [user, setUser] = useState('')
  const [isValidName, setIsValidName] = useState(false)
  const [isUserFocus, setIsUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [isValidPwd, setIsValidPwd] = useState(false)
  const [isPwdFocus, setIsPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [isValidMatch, setIsValidMatch] = useState(false)
  const [isMatchFocus, setIsMatchFocus] = useState(false)

  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    setIsValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setIsValidPwd(result)
    const match = pwd === matchPwd
    setIsValidMatch(match)
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
      setIsSuccess(true)
      cogoToast.success('Registration Success!')
      // clear input fields
    } catch (err) {
      if (!err?.response) {
        cogoToast.error('No Server Response')
      } else {
        cogoToast.error(err.response?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess])

  return (
    <section className='register'>
      <h1 className='register-title'>Register New Staff</h1>
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='register-form-wrapper'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={isValidName ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setIsUserFocus(true)}
            onBlur={() => setIsUserFocus(false)}
            className={user && !isValidName ? 'input-error' : ''}
          />
          <p
            id='uidnote'
            className={
              isUserFocus && user && !isValidName ? 'instructions' : 'offscreen'
            }
          >
            <Info className='info-icon' />
            4 to 24 characters. <br />
            Must begin with a letter. Letters, numbers, underscores, hyphens
            allowed.
          </p>

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={isValidPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onFocus={() => setIsPwdFocus(true)}
            onBlur={() => setIsPwdFocus(false)}
            className={pwd && !isValidPwd ? 'input-error' : ''}
          />
          <p
            id='pwdnote'
            className={isPwdFocus && !isValidPwd ? 'instructions' : 'offscreen'}
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

          <label htmlFor='confirm_pwd'>Confirm Password</label>
          <input
            type='password'
            id='confirm_pwd'
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={isValidMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setIsMatchFocus(true)}
            onBlur={() => setIsMatchFocus(false)}
            className={matchPwd && !isValidMatch ? 'input-error' : ''}
          />
          <p
            id='confirmnote'
            className={
              isMatchFocus && !isValidMatch ? 'instructions' : 'offscreen'
            }
          >
            <Info className='info-icon' />
            Must match the first password input field
          </p>
        </div>

        <button
          disabled={!isValidName || !isValidPwd || !isValidMatch ? true : false}
          className={`btn btn-primary${
            !isValidName || !isValidPwd || !isValidMatch ? ' disabled' : ''
          }`}
          type='submit'
        >
          Sign Up
        </button>
      </form>
    </section>
  )
}

export default Register
