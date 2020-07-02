import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../action/apiActions'

// Slices

const slice = createSlice({
   name: 'search',
   initialState: {
      unidades: [],
   },
   reducers: {
      searchReturned: (search, action) => {
         search.unidades = action.payload
      }
   }
})

export default slice.reducer

// Action Creators

export const loadUnidades = (searchTerm) => apiCallBegan({
   url: `/unidades?nome=${searchTerm}`,
   onSuccess: slice.actions.searchReturned.type,
})
