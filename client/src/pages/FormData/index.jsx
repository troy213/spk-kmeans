import React from 'react'
import BlokI from './Blok-I'
import BlokII from './Blok-II'
import BlokIII from './Blok-III'
import BlokIV from './Blok-IV'
import BlokV from './Blok-V'
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
import cogoToast from 'cogo-toast'
import './index.scss'

const FormData = () => {
  const data = useSelector((state) => state.form)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    let isValid = true

    // check if all required field is not empty
    for (const obj in data) {
      if (obj === 'error') continue

      for (const field in data[obj]) {
        // skip checking value of catatan field
        if (field === 'catatan') continue
        if (!data[obj][field]) {
          isValid = false
          dispatch(
            formActions.setError({
              state: `${obj}Err`,
              input: `${field}Err`,
              value: true,
            })
          )
        } else {
          dispatch(
            formActions.setError({
              state: `${obj}Err`,
              input: `${field}Err`,
              value: false,
            })
          )
        }
      }
    }

    if (isValid) {
      cogoToast.success('Data Aman')
    } else {
      cogoToast.error('Data masih ada yang kosong')
    }
  }

  return (
    <div className='form-data' onSubmit={handleSubmit}>
      <h1 className='form-data-title'>Form Pendataan Awal Calon Petugas</h1>
      <form className='form-data__form'>
        <BlokI title='Blok I. Keterangan Calon Petugas' />
        <BlokII title='Blok II. Ditanyakan Kepada Calon Petugas' />
        <BlokIII title='Blok III. Diisi Oleh Pewawancara' />
        <BlokIV
          title='Blok IV. Pertanyaan Pengetahuan'
          subtitle='(diisikan skor 1-10, 1 untuk sangat tidak layak, dan 10 untuk sangat layak)'
        />
        <BlokV title='Kesimpulan' />
        <button type='submit' className='btn btn-primary mt-4 p-3'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default FormData
