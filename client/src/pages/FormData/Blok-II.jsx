import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
import './index.scss'

const BlokII = (props) => {
  const { title } = props

  const pertanyaanPetugas = useSelector((state) => state.form.pertanyaanPetugas)
  const pertanyaanPetugasErr = useSelector(
    (state) => state.form.error.pertanyaanPetugasErr
  )
  const dispatch = useDispatch()

  const handleChange = (input, value) => {
    dispatch(formActions.setPertanyaanPetugas({ input, value }))
  }

  const FORM_CONTENT = [
    {
      id: 'bersediaBelajar',
      question:
        'Apakah Saudara/i bersedia mengikuti pembelajaran materi Pendataan Awal Regsosek?',
      value: pertanyaanPetugas.bersediaBelajar,
      radioContent: [
        {
          name: 'Ya',
          value: 2,
        },
        {
          name: 'Ragu-ragu',
          value: 1,
        },
        {
          name: 'Tidak',
          value: 0,
        },
      ],
    },
    {
      id: 'bersediaTTD',
      question:
        'Apakah Saudara/i bersedia menandatangani perjanjian kerja sebagai petugas Pendataan Awal Regsosek selama bulan Oktober dan tidak terikan dengan pekerjaan lain?',
      value: pertanyaanPetugas.bersediaTTD,
      radioContent: [
        {
          name: 'Ya',
          value: 2,
        },
        {
          name: 'Ragu-ragu',
          value: 1,
        },
        {
          name: 'Tidak',
          value: 0,
        },
      ],
    },
    {
      id: 'bersediaAturan',
      question:
        'Apakah Saudara/i bersedia mengikuti semua aturan yang berlaku sebagai petugas Pendataan Awal Regsosek?',
      value: pertanyaanPetugas.bersediaAturan,
      radioContent: [
        {
          name: 'Ya',
          value: 2,
        },
        {
          name: 'Ragu-ragu',
          value: 1,
        },
        {
          name: 'Tidak',
          value: 0,
        },
      ],
    },
    {
      id: 'bersediaTugas',
      question:
        'Apakah Saudara/i bersedia melakukan rangkaian tugas Pendataan Awal Regsosek secara fokus?',
      value: pertanyaanPetugas.bersediaTugas,
      radioContent: [
        {
          name: 'Ya',
          value: 2,
        },
        {
          name: 'Ragu-ragu',
          value: 1,
        },
        {
          name: 'Tidak',
          value: 0,
        },
      ],
    },
    {
      id: 'kesibukan',
      question:
        'Bagaimana jadwal aktivitas kesibukan Saudara/i pada bulan Oktober - November 2022',
      value: pertanyaanPetugas.kesibukan,
      radioContent: [
        {
          name: 'Luang',
          value: 2,
        },
        {
          name: 'Sedang',
          value: 1,
        },
        {
          name: 'Sibuk',
          value: 0,
        },
      ],
    },
    {
      id: 'hasMotor',
      question:
        'Apakah Saudara/i memiliki kendaraan roda 2 pada bulan Oktober November 2022?',
      value: pertanyaanPetugas.hasMotor,
      radioContent: [
        {
          name: 'Ya',
          value: 2,
        },
        {
          name: 'Ragu-ragu',
          value: 1,
        },
        {
          name: 'Tidak',
          value: 0,
        },
      ],
    },
    {
      id: 'bisaBerkendara',
      question: 'Apakah Saudara/i bisa mengendarai kendaraan roda 2?',
      value: pertanyaanPetugas.bisaBerkendara,
      radioContent: [
        {
          name: 'Bisa',
          value: 2,
        },
        {
          name: 'Ragu-ragu',
          value: 1,
        },
        {
          name: 'Tidak bisa',
          value: 0,
        },
      ],
    },
    {
      id: 'hasAndroid',
      question:
        'Apakah Saudara/i memiliki handphone berbasis Android pada bulan Oktober November 2022?',
      value: pertanyaanPetugas.hasAndroid,
      radioContent: [
        {
          name: 'Ada',
          value: 2,
        },
        {
          name: 'Ragu-ragu',
          value: 1,
        },
        {
          name: 'Tidak ada',
          value: 0,
        },
      ],
    },
  ]

  return (
    <div className='form-data-content'>
      <h3 className='form-data-content__title'>{title}</h3>
      {FORM_CONTENT.map((content, index) => {
        const { id, question, value, radioContent } = content

        return (
          <div className='form-data-content__question' key={index}>
            <label
              className={
                pertanyaanPetugasErr?.[`${id}Err`] && !value
                  ? 'label-input-error'
                  : ''
              }
            >
              {question}
            </label>
            <div className='form-data-content__radio-group'>
              {radioContent.map((radioValue, index) => {
                return (
                  <div className='form-data-content__radio' key={index}>
                    <input
                      type='radio'
                      value={radioValue.value}
                      name={id}
                      checked={value === radioValue.value.toString()}
                      onChange={(e) => handleChange(id, e.target.value)}
                    />
                    <span className='form-data-content__radio-value'>
                      {radioValue.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BlokII
