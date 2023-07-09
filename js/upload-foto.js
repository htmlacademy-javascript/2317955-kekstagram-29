const form = document.querySelector('.img-upload__form');
const uploadModal = form.querySelector('.img-upload__overlay');
const inputImg = form.querySelector('.img-upload__input');
const formCloseBtn = form.querySelector('.img-upload__cancel');
const hashTagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
// const submitBtn = form.querySelector('.img-upload__submit');

const openModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCloseBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentEscape);
};

const resetForm = () => {
  /*
  - масштаб возвращается к 100%;
  - эффект сбрасывается на «Оригинал»;
  + поля для ввода хэш-тегов и комментария очищаются;
  + поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается.
  */
  hashTagInput.value = '';
  commentInput.value = '';
  inputImg.value = '';
};

const closeUploadModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
  formCloseBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscape);
};

function onCloseBtnClick () {
  closeUploadModal();
}

function onDocumentEscape (evt) {
  // как это надо было реализовать через evt.stopPropagation?
  if (commentInput === document.activeElement || hashTagInput === document.activeElement) {
    return;
  }
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadModal();
  }
}

const onInputImgChange = () => {
  openModal();
};

inputImg.addEventListener('change', onInputImgChange);


export {form};
