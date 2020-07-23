import axios from 'axios'

const api = ({ dispatch }) => next => async action => {
   if(
      action.type !== 'unidadesRequested' 
      && action.type !== 'selectedUnidadeRequested') {
         return next(action)
      }

   next(action)

   const { url, method, data, onSuccess, onError } = action.payload

   try {
      const response = await axios.request({
         baseURL: `https://educdata-api.herokuapp.com`,
         url,
         method,
      })
      dispatch({
         type: onSuccess,
         payload: response.data
      })
   } catch(error) {
      console.log('error', error)
      dispatch({
         type: onError,
         payload: error
      })
   }
}

export default api