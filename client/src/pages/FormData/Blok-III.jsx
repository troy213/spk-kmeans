import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
import './index.scss'

const BlokIII = (props) => {
  const { title } = props

  const penilaian = useSelector((state) => state.form.penilaian)
  const penilaianErr = useSelector((state) => state.form.error.penilaianErr)
  const dispatch = useDispatch()

  const handleChange = (input, value) => {
    dispatch(formActions.setPenilaian({ input, value }))
  }

  const FORM_CONTENT = [
    {
      id: 'nilaiCalon',
      question:
        'Bagaimana penilaian penguji terhadap kemampuan berkomunikasi dari calon petugas?',
      value: penilaian.nilaiCalon,
      radioContent: ['Baik sekali', 'Baik', 'Sedang', 'Kurang'],
    },
    {
      id: 'kelengkapanDokumen',
      question:
        'Bagaimana kelengkapan dokumen calon petugas (fotokopi KTP dan ijazah, surat lamaran dengan tulisan tangan, pas photo ukuran 3x4 dan 4x6)?',
      value: penilaian.kelengkapanDokumen,
      radioContent: ['Lengkap', 'Tidak lengkap'],
    },
    {
      id: 'kepribadian',
      question:
        'Bagaimana kepribadian calon petugas (penampilan, sikap dan cara berbicara calon petugas)?',
      value: penilaian.kepribadian,
      radioContent: ['Baik sekali', 'Baik', 'Sedang', 'Kurang'],
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
                penilaianErr?.[`${id}Err`] && !value ? 'label-input-error' : ''
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
                      value={radioValue}
                      name={id}
                      checked={value === radioValue}
                      onChange={(e) => handleChange(id, e.target.value)}
                    />
                    <span className='form-data-content__radio-value'>
                      {radioValue}
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

export default BlokIII
