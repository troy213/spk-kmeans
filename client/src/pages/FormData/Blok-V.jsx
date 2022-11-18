import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
import './index.scss'

const BlokV = (props) => {
  const { title, subtitle } = props

  const kesimpulan = useSelector((state) => state.form.kesimpulan)
  const dispatch = useDispatch()

  const handleChange = (input, value) => {
    dispatch(formActions.setKesimpulan({ input, value }))
  }

  return (
    <div className='form-data-content'>
      <h3 className='form-data-content__title'>{title}</h3>
      <span className='form-data-content__subtitle'>{subtitle}</span>
      <div className='form-data-content__question'>
        <label htmlFor='catatan'>Catatan</label>
        <textarea
          id='catatan'
          maxLength='255'
          onChange={(e) => handleChange('catatan', e.target.value)}
          value={kesimpulan.catatan}
        ></textarea>
      </div>
    </div>
  )
}

export default BlokV
