import React, { useState, useEffect } from 'react'
import { Info } from '@material-ui/icons'
import './index.scss'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/

const ChangePassword = () => {
  const [oldPwd, setOldPwd] = useState('')
  const [validOldPwd, setValidOldPwd] = useState(true)
  const [oldPwdFocus, setOldPwdFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  return (
    <section className='change-password'>
      <h1 className='change-password__title'>Change Password</h1>
      <form className='change-password__form'>
        <div className='change-password__wrapper'>
          <label htmlFor='old-password'>Old Password</label>
          <input
            type='password'
            id='old-password'
            required
            aria-invalid={validOldPwd ? 'false' : 'true'}
            aria-describedby='oldpwdnote'
            onChange={(e) => setOldPwd(e.target.value)}
            onFocus={() => setOldPwdFocus(true)}
            onBlur={() => setOldPwdFocus(false)}
            className={!validOldPwd ? 'input-error' : ''}
            value={oldPwd}
          />
          <p
            id='oldpwdnote'
            className={
              oldPwdFocus && pwd && !validOldPwd ? 'instructions' : 'offscreen'
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
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onChange={(e) => setPwd(e.target.value)}
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
          <label htmlFor='confirm_pwd'>Confirm Password</label>
          <input
            type='password'
            id='confirm_pwd'
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onChange={(e) => setMatchPwd(e.target.value)}
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
          disabled={!pwd || !validPwd || !validMatch ? true : false}
          className={`btn btn-primary${
            !pwd || !validPwd || !validMatch ? ' disabled' : ''
          }`}
        >
          Sign Up
        </button>
      </form>
    </section>
  )
}

export default ChangePassword
