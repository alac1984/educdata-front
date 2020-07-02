import axios from 'axios'
const API_URL = 'https://educdata-api.herokuapp.com/'

export default class Api {

   async buscaUnidade(nome) {
      const url = `${API_URL}unidades?nome=${nome}`
      return await axios.get(url).then(response => response.data)
   }
}