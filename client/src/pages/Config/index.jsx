import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { criteriaAction } from '../../store/criteria-slice'
import './index.scss'

const Config = () => {
  const { data, name, weight } = useSelector((state) => state.criteria)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = data.length
      ? `C${parseInt(data[data.length - 1].id.replace(/^\D+/g, '')) + 1}`
      : 'C1'
    dispatch(
      criteriaAction.setInputField({
        field: 'data',
        value: [...data, { id, name, weight, isBenefit: true }],
      })
    )
  }

  const handleEdit = () => {
    const id = data.length
      ? `C${parseInt(data[data.length - 1].id.replace(/^\D+/g, '')) + 1}`
      : 'C1'
    const newData = [
      ...data,
      {
        id,
        name,
        weight,
        isBenefit: true,
      },
    ]
    dispatch(criteriaAction.setInputField({ field: 'data', value: newData }))
  }

  const handleDelete = (id) => {
    const newData = data.filter((criteria) => criteria.id !== id)
    dispatch(criteriaAction.setInputField({ field: 'data', value: newData }))
  }

  const handleChange = (field, value) => {
    dispatch(criteriaAction.setInputField({ field, value }))
  }

  return (
    <div className='config'>
      <h1 className='config-title'>Config</h1>
      <div className='config-content'>
        <h3 className='config-content-title'>Tambah Kriteria</h3>
        <form className='config-form-wrapper' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <label htmlFor='weight'>Weight</label>
          <input
            id='weight'
            type='number'
            value={weight}
            onChange={(e) => handleChange('weight', e.target.value)}
          />
          <div>
            <button type='submit' className='btn btn-primary mt-4'>
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className='config-content'>
        <h3 className='config-content-title'>Kriteria List</h3>
        {data?.length ? (
          <div className='config-content-table-wrapper'>
            <table className='config-table'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Criteria</th>
                  <th>Weight</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((criterion) => {
                  const { id, name, weight } = criterion
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{weight}</td>
                      <td>
                        <div className='config-btn-wrapper'>
                          <button className='btn btn-primary'>Edit</button>
                          <button
                            className='btn btn-danger'
                            onClick={() => handleDelete(id)}
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
          <p className='text-center mt-4'>No data to display</p>
        )}
      </div>
    </div>
  )
}

export default Config
