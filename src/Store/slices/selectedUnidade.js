import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../action/apiActions'

// Slices

const slice = createSlice({
   name: 'selectedUnidade',
   initialState: {
      unidade: [],
   },
   reducers: {
      unidadeReturned: (selectedUnidade, action) => {
         selectedUnidade.unidade = action.payload
      }
   }
})

export default slice.reducer

// Action Creators

export const loadUnidade = (id) => apiCallBegan({
   url: `/unidades/${id}`,
   onSuccess: slice.actions.unidadeReturned.type,
})
