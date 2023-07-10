const form = document.querySelector('.img-upload__form');
const uploadModal = form.querySelector('.img-upload__overlay');
const imgInput = form.querySelector('.img-upload__input');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const submitBtn = form.querySelector('.img-upload__submit');
const formCloseBtn = form.querySelector('.img-upload__cancel');

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
  form.querySelector('.effects__radio[value = "none"]').checked = true;
  hashtagInput.value = '';
  commentInput.value = '';
  imgInput.value = '';
};

const closeModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
  formCloseBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscape);
};

function onCloseBtnClick () {
  closeModal();
}

function onDocumentEscape (evt) {
  // в задании предлагалось реализовать это через evt.stopPropagation?, как именно?..
  if (commentInput !== document.activeElement && hashtagInput !== document.activeElement) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  }
}

const onInputImgChange = () => {
  openModal();
};

imgInput.addEventListener('change', onInputImgChange);


export {
  form,
  submitBtn,
  hashtagInput,
  commentInput
};
