import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '56870812-ac76cb8e74390f6834c65b371';
/**
 * @param {string} query
 * @returns {Promise}
 */
export function getImagesByQuery(query) {

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, { params }).then(response => {
    return response.data;
  });
}
