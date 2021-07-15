import articlesTpl from './templates/articles.hbs';
import './sass/main.scss';
import LoadMoreBtn from './js/components/loal-more-btn';
import ImageApiService from './js/apiService.js';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  searchBtn: document.querySelector('.js-search-btn'),
  articlesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn-load-more'),
};

const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.btn-load-more', hidden: true });

console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
refs.searchBtn.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(event) {
  event.preventDefault();
  imageApiService.query = event.currentTarget.elements.query.value;
  if (imageApiService.query === '') {
    return alert('input error');
  }

  imageApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
  loadMoreBtn.show();
}

function scrollToLastImg() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

//вставляет результат вызова шаблона
function appendArticlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
  scrollToLastImg();
}
function fetchArticles() {
  imageApiService.fetchArticles().then(hits => appendArticlesMarkup(hits));
}

//при каждом новом запросе очищает контейнер,
//чтобы все было с самого начала.Делаем при сабмите формы
function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
