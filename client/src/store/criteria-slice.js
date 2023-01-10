import { createSlice } from '@reduxjs/toolkit'

const criteriaSlice = createSlice({
  name: 'criteria',
  initialState: {
    data: [
      {
        id: 'C1',
        name: 'Blok II',
        weight: 0.4,
        isBenefit: true,
      },
      {
        id: 'C2',
        name: 'Blok III',
        weight: 0.3,
        isBenefit: true,
      },
      {
        id: 'C3',
        name: 'Blok IV',
        weight: 0.3,
        isBenefit: true,
      },
    ],
    id: '',
    name: '',
    weight: '',
    error: {
      id: false,
      name: false,
      weight: false,
    },
  },
  reducers: {
    setInputField(state, action) {
      state[action.payload.field] = action.payload.value
    },
    setError(state, action) {
      state.error[action.payload.field] = action.payload.value
    },
    clearForm(state) {
      for (const stateObj in state) {
        const EXCEPTION = ['error']
        if (EXCEPTION.includes(stateObj)) continue

        state[stateObj] = ''
      }

      for (const stateObj in state.error) {
        state.error[stateObj] = false
      }
    },
  },
})

export const criteriaAction = criteriaSlice.actions

export default criteriaSlice
