import React, { useState, useEffect, useRef } from 'react'
import { Info } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import './index.scss'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/
const CHANGE_PASSWORD_URL = '/api/users/change-password'

const ChangePassword = () => {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const oldPwdRef = useRef()

  const [oldPwd, setOldPwd] = useState('')
  const [isValidOldPwd, setIsValidOldPwd] = useState(true)
  const [isOldPwdFocus, setIsOldPwdFocus] = useState(false)

  const [newPwd, setNewPwd] = useState('')
  const [isValidPwd, setIsValidPwd] = useState(false)
  const [isPwdFocus, setIsPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [isValidMatch, setIsValidMatch] = useState(false)
  const [isMatchFocus, setIsMatchFocus] = useState(false)

  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    oldPwdRef.current.focus()
  }, [])

  useEffect(() => {
    const result = PWD_REGEX.test(newPwd)
    setIsValidPwd(result)
    const match = newPwd === matchPwd
    setIsValidMatch(match)
  }, [newPwd, matchPwd])

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = PWD_REGEX.test(newPwd)
    if (!v1) {
      cogoToast.error('Invalid Entry')
      return
    }

    try {
      const response = await axiosPrivate.put(
        CHANGE_PASSWORD_URL,
        JSON.stringify({ id: auth?.id, oldPwd, newPwd })
      )

      console.log(response)
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

  return (
    <section className='change-password'>
      <h1 className='change-password__title'>Change Password</h1>
      <form className='change-password__form' onSubmit={handleSubmit}>
        <div className='change-password__wrapper'>
          <label htmlFor='old-password'>Old Password</label>
          <input
            type='password'
            id='old-password'
            ref={oldPwdRef}
            required
            aria-invalid={isValidOldPwd ? 'false' : 'true'}
            aria-describedby='oldpwdnote'
            onChange={(e) => setOldPwd(e.target.value)}
            onFocus={() => setIsOldPwdFocus(true)}
            onBlur={() => setIsOldPwdFocus(false)}
            className={!isValidOldPwd ? 'input-error' : ''}
            value={oldPwd}
          />
          <p
            id='oldpwdnote'
            className={
              isOldPwdFocus && newPwd && !isValidOldPwd
                ? 'instructions'
                : 'offscreen'
            }
          >
            <Info className='info-icon' />
            Your old password is incorrect
          </p>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            aria-invalid={isValidPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onChange={(e) => setNewPwd(e.target.value)}
            onFocus={() => setIsPwdFocus(true)}
            onBlur={() => setIsPwdFocus(false)}
            className={newPwd && !isValidPwd ? 'input-error' : ''}
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
            required
            aria-invalid={isValidMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onChange={(e) => setMatchPwd(e.target.value)}
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
          disabled={!newPwd || !isValidPwd || !isValidMatch ? true : false}
          className={`btn btn-primary${
            !newPwd || !isValidPwd || !isValidMatch ? ' disabled' : ''
          }`}
          type='submit'
        >
          Sign Up
        </button>
      </form>
    </section>
  )
}

export default ChangePassword
