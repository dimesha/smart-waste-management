
import axios from 'axios';
import {API_URL} from './constants'

//fetch waste data from the backend
export const fetchWasteData = async () => {

  try {
    const response = await axios.get(`${API_URL}/api/qr/get-all-waste`);
    return response.data; //contains waste data
  } catch (error) {
    throw error; // error for handling in the container
  }
};
