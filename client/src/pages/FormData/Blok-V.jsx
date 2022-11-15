import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
import './index.scss'

const BlokV = (props) => {
  const { title, subtitle } = props

  const kesimpulan = useSelector((state) => state.form.kesimpulan)
  const kesimpulanErr = useSelector((state) => state.form.error.kesimpulanErr)
  const dispatch = useDispatch()

  const handleChange = (input, value) => {
    dispatch(formActions.setKesimpulan({ input, value }))
  }

  return (
    <div className='form-data-content'>
      <h3 className='form-data-content__title'>{title}</h3>
      <span className='form-data-content__subtitle'>{subtitle}</span>
      <div className='form-data-content__question'>
        <label
          className={
            kesimpulanErr?.isLayakErr && !kesimpulan?.isLayak
              ? 'label-input-error'
              : ''
          }
        >
          Kesimpulan
        </label>
        <div className='form-data-content__radio-group'>
          <div className='form-data-content__radio'>
            <input
              type='radio'
              value='Layak'
              name='isLayak'
              checked={kesimpulan.isLayak === 'Layak'}
              onChange={(e) => handleChange('isLayak', e.target.value)}
            />
            <span className='form-data-content__radio-value'>Layak</span>
          </div>
          <div className='form-data-content__radio'>
            <input
              type='radio'
              value='Tidak layak'
              name='isLayak'
              checked={kesimpulan.isLayak === 'Tidak layak'}
              onChange={(e) => handleChange('isLayak', e.target.value)}
            />
            <span className='form-data-content__radio-value'>Tidak layak</span>
          </div>
        </div>
      </div>
      <div className='form-data-content__question'>
        <label htmlFor='catatan'>Catatan</label>
        <textarea
          id='catatan'
          maxLength='255'
          onChange={(e) => handleChange('catatan', e.target.value)}
        ></textarea>
      </div>
    </div>
  )
}

export default BlokV
