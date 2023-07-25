import {createMessageModal} from './util.js';


const TEMPLATE = {
  picture     : document.querySelector('#picture').content.querySelector('.picture'),
  successModal: document.querySelector('#success').content.querySelector('.success'),
  errorModal  : document.querySelector('#error').content.querySelector('.error'),
};

const RESULT_MESSAGE = {
  success: createMessageModal(TEMPLATE.successModal),
  error  : createMessageModal(TEMPLATE.errorModal),
};

const GALLERY_ROOT = document.querySelector('.pictures');
const GALLERY = {
  root: GALLERY_ROOT,
};

const FITERS_ROOT = document.querySelector('.img-filters');
const FILTERS = {
  root   : FITERS_ROOT,
  default: FITERS_ROOT.querySelector('#filter-default'),
};

const FULL_PCITURE_ROOT = document.querySelector('.big-picture');
const FULL_PICTURE = {
  root              : FULL_PCITURE_ROOT,
  picture           : FULL_PCITURE_ROOT.querySelector('.big-picture__img img'),
  closeBtn          : FULL_PCITURE_ROOT.querySelector('.big-picture__cancel'),
  commentsContainer : FULL_PCITURE_ROOT.querySelector('.social__comments'),
  shownCommentsCount: FULL_PCITURE_ROOT.querySelector('.comments-count__shown'),
  allCommentsCount  : FULL_PCITURE_ROOT.querySelector('.comments-count'),
  commentsLoadBtn   : FULL_PCITURE_ROOT.querySelector('.social__comments-loader'),
  commentsLoader    : FULL_PCITURE_ROOT.querySelector('.social__comments-loader'),
  likesCount        : FULL_PCITURE_ROOT.querySelector('.likes-count'),
  description       : FULL_PCITURE_ROOT.querySelector('.social__caption'),
};

const NEW_PICTURE_FORM_ROOT = document.querySelector('.img-upload__form');
const NEW_PICTURE_FORM = {
  root             : NEW_PICTURE_FORM_ROOT,
  uploadingModal   : NEW_PICTURE_FORM_ROOT.querySelector('.img-upload__overlay'),
  pictureInput     : NEW_PICTURE_FORM_ROOT.querySelector('.img-upload__input'),
  hashtagInput     : NEW_PICTURE_FORM_ROOT.querySelector('.text__hashtags'),
  commentInput     : NEW_PICTURE_FORM_ROOT.querySelector('.text__description'),
  sliderContainer  : NEW_PICTURE_FORM_ROOT.querySelector('.img-upload__effect-level'),
  slider           : NEW_PICTURE_FORM_ROOT.querySelector('.effect-level__slider'),
  sliderInput      : NEW_PICTURE_FORM_ROOT.querySelector('.effect-level__value'),
  scaleInput       : NEW_PICTURE_FORM_ROOT.querySelector('.scale__control--value'),
  scalingUpButton  : NEW_PICTURE_FORM_ROOT.querySelector('.scale__control--bigger'),
  scalingDownButton: NEW_PICTURE_FORM_ROOT.querySelector('.scale__control--smaller'),
  preview          : NEW_PICTURE_FORM_ROOT.querySelector('.img-upload__preview img'),
  buttonsContainer : NEW_PICTURE_FORM_ROOT.querySelector('.img-upload__effects'),
  defaultEffect    : NEW_PICTURE_FORM_ROOT.querySelector('.effects__radio[value = "none"]'),
  effectsPreviews  : NEW_PICTURE_FORM_ROOT.querySelectorAll('.effects__preview'),
  submitBtn        : NEW_PICTURE_FORM_ROOT.querySelector('.img-upload__submit'),
  formCloseBtn     : NEW_PICTURE_FORM_ROOT.querySelector('.img-upload__cancel'),
};


export {
  TEMPLATE,
  NEW_PICTURE_FORM,
  FULL_PICTURE,
  FILTERS,
  RESULT_MESSAGE,
  GALLERY
};
