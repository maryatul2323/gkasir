import axios from 'axios';

const ApiManager = axios.create({
  timeout: 20000,
  headers: {
      Accept: "application/json",
  },
})

export default ApiManager;