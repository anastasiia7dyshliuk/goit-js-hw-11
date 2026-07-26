import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('#gallery');

const loaderEl = document.querySelector('#loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
@param {Array<Object>} images 
export function createGallery(images) {

  const markup = images
    .map(image => {

      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
          </a>
          <ul class="gallery-info">
            <li class="gallery-info-item">
              <span class="gallery-info-label">Likes</span>
              <span class="gallery-info-value">${likes}</span>
            </li>
            <li class="gallery-info-item">
              <span class="gallery-info-label">Views</span>
              <span class="gallery-info-value">${views}</span>
            </li>
            <li class="gallery-info-item">
              <span class="gallery-info-label">Comments</span>
              <span class="gallery-info-value">${comments}</span>
            </li>
            <li class="gallery-info-item">
              <span class="gallery-info-label">Downloads</span>
              <span class="gallery-info-value">${downloads}</span>
            </li>
          </ul>
        </li>
      `;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.add('is-active');
}

export function hideLoader() {
  loaderEl.classList.remove('is-active');
}
