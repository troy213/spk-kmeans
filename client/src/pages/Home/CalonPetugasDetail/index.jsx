import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import './index.scss'

import CONTENT from './const/content'
import { valueIdentifier } from './utils'

/* TODO:  1. Add loading spinner while client is fetching data to server
          2. Refactor fetching function by using redux toolkit
*/

const CalonPetugasDetail = () => {
  const { id } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const [detailCalon, setDetailCalon] = useState({})

  useEffect(() => {
    let isMounted = true
    // to cancel any pending request on component unmount
    const controller = new AbortController()

    const getDataCalonId = async () => {
      try {
        const response = await axiosPrivate.get(`/api/calon-petugas/${id}`, {
          signal: controller.signal,
        })
        isMounted &&
          setDetailCalon((prevState) => ({
            ...prevState,
            data: JSON.parse(response?.data?.data.data), // i know it's silly, pls forgive me haha
            date: response?.data?.data.date,
            id: response?.data?.data.id,
            username: response?.data?.data.username,
          }))
      } catch (err) {
        console.error('Users Error: ', err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getDataCalonId()

    // clean up to cancel/abort any pending request
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div className='calon-petugas-detail'>
      <h1 className='calon-petugas-detail-title'>Detail Calon Petugas</h1>
      <div className='calon-petugas-detail-content'>
        {detailCalon.data ? (
          <>
            {CONTENT.map((data, index) => {
              const { idContent, title, content } = data

              return (
                <div className='calon-petugas-detail-wrapper' key={index}>
                  <h3>{title}</h3>
                  {content.map((questions, questionIndex) => {
                    const { question, identifier } = questions

                    return (
                      <div key={questionIndex}>
                        <p className='calon-petugas-detail-question'>
                          {question}
                        </p>
                        <p className='calon-petugas-detail-answer'>
                          {detailCalon.data
                            ? valueIdentifier(
                                idContent,
                                identifier,
                                detailCalon.data[idContent][identifier]
                              )
                            : null}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <p className='calon-petugas-detail-question'>Nama Pewawancara</p>
            <p className='calon-petugas-detail-answer'>
              {detailCalon.username}
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default CalonPetugasDetail
