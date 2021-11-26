const KEY = '22088587-b9222ac51e20698a54a4430fc';
const URL = 'https://pixabay.com/api/';

function fetchImages(query, page) {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('No such image'));
  });
}

const api = {
  fetchImages,
};

export default api;
