import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { Spinner } from '../../components'
import simpleAdditiveWeighting from '../../utils/simpleAdditiveWeighting'
import './index.scss'

const PROCESS_URL = '/api/proses'

const Reports = () => {
  const [result, setResult] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const criteria = useSelector((state) => state.criteria)

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    // to cancel any pending request on component unmount
    const controller = new AbortController()

    const getData = async () => {
      try {
        const response = await axiosPrivate.get(PROCESS_URL, {
          signal: controller.signal,
        })

        if (response?.data?.data) {
          setIsLoading(false)
        }
        isMounted &&
          setResult(
            simpleAdditiveWeighting(criteria.data, response?.data?.data)
          )
      } catch (err) {
        console.error('Proses Error: ', err)
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

  if (isLoading)
    return (
      <div className='reports'>
        <h1 className='reports-title'>Reports</h1>
        <div className='reports-content'>
          <div className='spinner-container'>
            <Spinner />
          </div>
        </div>
      </div>
    )

  return (
    <div className='reports'>
      <h1 className='reports-title'>Reports</h1>
      <div className='reports-content'>
        <h3 className='reports-content-title'>Calon Petugas List</h3>
        {result?.length ? (
          <div className='reports-content-table-wrapper'>
            <table className='reports-table'>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Date</th>
                  <th>Nama Calon Petugas</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {result.map((calon, index) => {
                  const { id, namaCalon, scores } = calon
                  const isoStr = new Date(calon.date)
                  const date = `${isoStr.getDate()}-${
                    isoStr.getMonth() + 1
                  }-${isoStr.getFullYear()}`

                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{date}</td>
                      <td>{namaCalon}</td>
                      <td>{scores}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-center mt-4'>No data to display</p>
        )}
      </div>
    </div>
  )
}

export default Reports
