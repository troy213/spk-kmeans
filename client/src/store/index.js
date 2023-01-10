import { configureStore } from '@reduxjs/toolkit'
import formSlice from './form-slice'
import criteriaSlice from './criteria-slice'

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    criteria: criteriaSlice.reducer,
  },
})

export default store
