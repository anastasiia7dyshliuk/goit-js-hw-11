// iziToast - бібліотека спливаючих повідомлень (нотифікацій).
import iziToast from 'izitoast';
// Стилі бібліотеки, як і для SimpleLightbox, підключаємо окремим імпортом.
import 'izitoast/dist/css/iziToast.min.css';

// Функція для HTTP-запиту до Pixabay.
import { getImagesByQuery } from './js/pixabay-api.js';
// Функції для роботи з розміткою галереї та лоадером.
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

// Знаходимо форму пошуку один раз при завантаженні модуля.
const searchFormEl = document.querySelector('#search-form');

// Підписуємось на подію 'submit' форми. Ця подія спрацьовує щоразу,
// коли користувач натискає кнопку "Search" (або тисне Enter в полі).
searchFormEl.addEventListener('submit', handleSearch);

/**
 * Обробник сабміту форми пошуку.
 * @param {SubmitEvent} event
 */
function handleSearch(event) {
  // За замовчуванням сабміт форми перезавантажує сторінку.
  // preventDefault() забороняє цю поведінку, щоб ми могли
  // самостійно обробити запит через JavaScript.
  event.preventDefault();

  // event.target - це сама форма. Через input з name="search-text"
  // дістаємось до поля вводу і беремо його значення.
  // trim() прибирає пробіли на початку/в кінці, щоб рядок з самих
  // пробілів теж вважався порожнім.
  const query = event.target.elements['search-text'].value.trim();

  // Перевіряємо, чи не порожнє поле пошуку. Якщо порожнє - показуємо
  // попередження і одразу виходимо з функції через return, не роблячи
  // жодного запиту на бекенд.
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  // Перед новим пошуком обов'язково очищаємо попередні результати,
  // щоб картки з різних запитів не змішувалися між собою.
  clearGallery();

  // Показуємо індикатор завантаження ПЕРЕД відправкою запиту -
  // так користувач одразу бачить, що застосунок працює.
  showLoader();

  // Виконуємо запит до Pixabay і обробляємо результат через .then()/.catch(),
  // як цього вимагає завдання, - щоб помилки мережі не "зламали" сторінку.
  getImagesByQuery(query)
    .then(data => {
      // data.hits - масив знайдених зображень.
      const images = data.hits;

      // Якщо масив порожній - підходящих зображень не знайдено.
      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        // Інакше - малюємо галерею на основі отриманих даних.
        createGallery(images);
      }
    })
    .catch(error => {
      // Якщо запит завершився помилкою (наприклад, немає інтернету
      // або невірний API-ключ) - повідомляємо про це користувачу,
      // а не залишаємо його з "мовчазною" сторінкою.
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.error(error);
    })
    .finally(() => {
      // finally() спрацьовує в будь-якому випадку - і при успіху,
      // і при помилці, тож лоадер завжди коректно ховається.
      hideLoader();

      // Очищаємо поле вводу після завершення пошуку.
      event.target.reset();
    });
}
