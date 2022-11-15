import React from 'react'
import DatePicker from 'react-datepicker'
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
import 'react-datepicker/dist/react-datepicker.css'
import './index.scss'

const BlokI = (props) => {
  const { title } = props

  const keteranganCalon = useSelector((state) => state.form.keteranganCalon)
  const keteranganCalonErr = useSelector(
    (state) => state.form.error.keteranganCalonErr
  )
  const dispatch = useDispatch()

  const handleChange = (input, value) => {
    dispatch(formActions.setKeteranganCalon({ input, value }))
  }

  const FORM_CONTENT = [
    {
      id: 'hari',
      question: 'Hari/Tanggal Wawancara',
      value: keteranganCalon.hari,
      isDate: true,
    },
    {
      id: 'waktuDanTempat',
      question: 'Waktu dan Tempat Wawancara',
      value: keteranganCalon.waktuDanTempat,
    },
    {
      id: 'namaCalon',
      question: 'Nama Calon Petugas Pendataan Awal Regsosek',
      value: keteranganCalon.namaCalon,
    },
    {
      id: 'nik',
      question: 'NIK',
      value: keteranganCalon.nik,
    },
    {
      id: 'kecamatan',
      question: 'Kecamatan Domisili',
      value: keteranganCalon.kecamatan,
    },
    {
      id: 'kelurahan',
      question: 'Kelurahan Domisili',
      value: keteranganCalon.kelurahan,
    },
    {
      id: 'nomorHpCalon',
      question: 'Nomor HP Calon Petugas',
      value: keteranganCalon.nomorHpCalon,
    },
  ]

  return (
    <div className='form-data-content'>
      <h3 className='form-data-content__title'>{title}</h3>
      {FORM_CONTENT.map((content, index) => {
        const { id, question, value, isDate = false } = content

        return (
          <div className='form-data-content__question' key={index}>
            <label htmlFor={id}>{question}</label>
            {isDate ? (
              <DatePicker
                id={id}
                selected={value && new Date(value)}
                onChange={(date) => handleChange(id, date.toString())}
                className={
                  keteranganCalonErr?.[`${id}Err`] && !value
                    ? 'input-error'
                    : ''
                }
              />
            ) : (
              <input
                id={id}
                type='text'
                onChange={(e) => handleChange(id, e.target.value)}
                value={value}
                className={
                  keteranganCalonErr?.[`${id}Err`] && !value
                    ? 'input-error'
                    : ''
                }
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default BlokI
