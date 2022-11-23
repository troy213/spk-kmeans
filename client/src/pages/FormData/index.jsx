import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formActions } from '../../store/form-slice'
import { useNavigate } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import BlokI from './Blok-I'
import BlokII from './Blok-II'
import BlokIII from './Blok-III'
import BlokIV from './Blok-IV'
import BlokV from './Blok-V'
import './index.scss'

const CALON_PETUGAS_URL = '/api/calon-petugas'

const FormData = () => {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const data = useSelector((state) => state.form)
  const dispatch = useDispatch()

  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess])

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
      submitForm()
    } else {
      cogoToast.error('Data masih ada yang kosong')
    }
  }

  const submitForm = async () => {
    const {
      keteranganCalon,
      pertanyaanPetugas,
      penilaian,
      pengetahuan,
      kesimpulan,
    } = data
    const formData = JSON.stringify({
      keteranganCalon,
      pertanyaanPetugas,
      penilaian,
      pengetahuan,
      kesimpulan,
    })

    try {
      const response = await axiosPrivate.post(
        CALON_PETUGAS_URL,
        JSON.stringify({
          userId: auth.id,
          date: keteranganCalon.hari,
          formData,
        })
      )
      dispatch(formActions.clearForm())
      setIsSuccess(true)
      cogoToast.success('Form Submited!')
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
