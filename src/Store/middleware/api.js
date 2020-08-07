import axios from 'axios'
import * as actions from '../action/variables'

const api = ({ dispatch }) => next => async action => {

   if (
      action.type !== actions.unidadesRequested &&
      action.type !== actions.selectedUnidadeRequested &&
      action.type !== actions.cityInfoRequested &&
      action.type !== actions.schoolInfoRequested &&
      action.type !== actions.stateInfoRequested &&
      action.type !== actions.painelInfoRequested
   ) {
      return next(action)
   } 

   next(action)

   const { url, method, data, onSuccess, onError, cancelToken } = action.payload

   try {
      const response = await axios.request({
         baseURL: `https://educdata-api.herokuapp.com`,
         url,
         data,
         method,
         cancelToken,
      })
      dispatch({
         type: onSuccess,
         payload: response.data
      })
   } catch (error) {
      dispatch({
         type: onError,
         payload: error
      })
   }

}

export default api