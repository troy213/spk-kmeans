import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { Spinner, Modal } from '../../../components'
import './index.scss'

const CALON_PETUGAS_URL = '/api/calon-petugas'

const CalonPetugas = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const deleteIdRef = useRef()

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    // to cancel any pending request on component unmount
    const controller = new AbortController()

    const getData = async () => {
      try {
        const response = await axiosPrivate.get(CALON_PETUGAS_URL, {
          signal: controller.signal,
        })

        if (response?.data?.data?.length > 0) {
          setIsLoading(false)
        }
        isMounted && setData(response?.data?.data)
      } catch (err) {
        console.error('Calon Petugas Error: ', err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getData()

    // clean up to cancel/abort any pending request
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])

  const handleOpenModal = (id) => {
    setModalIsOpen(true)
    deleteIdRef.current = id
  }

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/api/calon-petugas/${id}`)
      cogoToast.success('Delete Success!')
      setIsSuccess(true)
    } catch (err) {
      setIsSuccess(false)
      if (!err?.response) {
        cogoToast.error('No Server Response')
      } else {
        cogoToast.error(err.response?.data?.message)
      }
    }
  }

  if (isLoading)
    return (
      <div className='spinner-container'>
        <Spinner />
      </div>
    )

  return (
    <div className='calon-petugas'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='p-4'>
          <p>Are you sure you want to delete this data?</p>
          <div className='btn-wrapper pt-4'>
            <button
              className='btn btn-danger'
              onClick={() => handleDelete(deleteIdRef.current)}
            >
              Yes
            </button>
            <button className='btn btn-light'>No</button>
          </div>
        </div>
      </Modal>
      <h3 className='calon-petugas-title'>Calon Petugas List</h3>
      {data?.length ? (
        <div className='calon-petugas-table-wrapper'>
          <table className='calon-petugas-table'>
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Nama Calon Petugas</th>
                <th>Nama Pewawancara</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((calon, index) => {
                const dataCalon = JSON.parse(calon.data)
                const date = calon.date.split('T')[0]
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className='calon-petugas-date'>{date}</td>
                    <td className='calon-petugas-name'>
                      {dataCalon.keteranganCalon.namaCalon}
                    </td>
                    <td className='calon-petugas-pewawancara'>
                      {calon.username}
                    </td>
                    <td className='calon-petugas-action'>
                      <div className='calon-petugas-btn-wrapper'>
                        <Link to={`/calon-petugas/${calon.id}`}>
                          <button className='btn btn-primary'>Detail</button>
                        </Link>
                        <button
                          className='btn btn-danger'
                          onClick={() => handleOpenModal(calon.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  )
}

export default CalonPetugas
