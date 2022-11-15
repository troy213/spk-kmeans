import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
import './index.scss'

const BlokIV = (props) => {
  const { title, subtitle } = props

  const pengetahuan = useSelector((state) => state.form.pengetahuan)
  const pengetahuanErr = useSelector((state) => state.form.error.pengetahuanErr)
  const dispatch = useDispatch()

  const handleChange = (input, value) => {
    if ((value >= 1 && value <= 10) || value.length === 0)
      dispatch(formActions.setPengetahuan({ input, value }))
  }

  const FORM_CONTENT = [
    {
      id: 'strategiPerumElite',
      question:
        'Jika ditugaskan mendata di perumahan elit, bagaimana strategi mandiri anda agar pendataan berjalan lancar?',
      value: pengetahuan.strategiPerumElite,
    },
    {
      id: 'strategiApartemen',
      question:
        'Jika ditugaskan mendata di Apartemen, bagaimana strategi mandiri anda agar pendataan berjalan lancar?',
      value: pengetahuan.strategiApartemen,
    },
    {
      id: 'strategiResponden',
      question:
        'Bagaimana strategi anda agar pendataan berjalan lancar ketika menghadapi Responden yang tidak mau didata?',
      value: pengetahuan.strategiResponden,
    },
  ]

  return (
    <div className='form-data-content'>
      <h3 className='form-data-content__title'>{title}</h3>
      <span className='form-data-content__subtitle'>{subtitle}</span>
      {FORM_CONTENT.map((content, index) => {
        const { id, question, value } = content

        return (
          <div className='form-data-content__question' key={index}>
            <label htmlFor={id}>{question}</label>
            <input
              id={id}
              type='number'
              onChange={(e) => handleChange(id, e.target.value)}
              value={value}
              min='1'
              max='10'
              className={
                pengetahuanErr?.[`${id}Err`] && !value ? 'input-error' : ''
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default BlokIV
