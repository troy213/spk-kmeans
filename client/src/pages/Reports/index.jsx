import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { WarningRounded } from '@material-ui/icons'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { Spinner } from '../../components'
import './index.scss'

const PROCESS_URL = '/api/proses'

const checkLulusHelper = (kmeans, index) => {
  const c1 = kmeans[0].centroid.reduce((a, b) => a + b, 0)
  const c2 = kmeans[1].centroid.reduce((a, b) => a + b, 0)

  if (c1 > c2) {
    if (kmeans[0].clusterInd.includes(index)) return 'Lulus'
    return 'Tidak Lulus'
  } else {
    if (kmeans[0].clusterInd.includes(index)) return 'Tidak Lulus'
    return 'Lulus'
  }
}

const Reports = () => {
  const [result, setResult] = useState({
    data: [],
    kmeans: [],
  })
  const [isLoading, setIsLoading] = useState(true)

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
          setResult({
            data: response?.data.data,
            kmeans: response?.data.kmeans,
          })
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

  if (result.data.length === 0)
    return (
      <div className='reports'>
        <h1 className='reports-title'>Reports</h1>
        <div className='reports-content'>
          <div className='reports-content-wrapper'>
            <WarningRounded className='reports-content-icon' />
            <p>Data yang tersimpan kurang dari 2</p>
          </div>
        </div>
      </div>
    )

  return (
    <div className='reports'>
      <h1 className='reports-title'>Reports</h1>
      <div className='reports-content'>
        <h3 className='reports-content-title'>Calon Petugas List</h3>
        {result.data?.length ? (
          <div className='reports-content-table-wrapper'>
            <table className='reports-table'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Date</th>
                  <th>Nama Calon Petugas</th>
                  <th>Score I</th>
                  <th>Score II</th>
                  <th>Score III</th>
                  <th>Cluster</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {result.data.map((calon, index) => {
                  const { namaCalon, score } = calon
                  const date = calon.date.split('T')[0]
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className='reports-date'>{date}</td>
                      <td className='reports-name'>{namaCalon}</td>
                      <td className='reports-score'>
                        {score.pertanyaanPetugas}
                      </td>
                      <td className='reports-score'>{score.penilaian}</td>
                      <td className='reports-score'>{score.pengetahuan}</td>
                      <td>
                        {result.kmeans[0].clusterInd.includes(index)
                          ? 'C1'
                          : 'C2'}
                      </td>
                      <td>{checkLulusHelper(result.kmeans, index)}</td>
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
    </div>
  )
}

export default Reports
