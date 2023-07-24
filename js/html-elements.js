import {createMessageModal} from './util.js';

export const MODALS = {
  newPictureForm: document.querySelector('.img-upload__form'),
  fullPicture: document.querySelector('.big-picture'),
  resultMessage: {
    success: createMessageModal(document.querySelector('#success').content.querySelector('.success')),
    error  : createMessageModal(document.querySelector('#error').content.querySelector('.error')),
  },
};

export const NODES = {
  uploadingModal   : MODALS.newPictureForm.querySelector('.img-upload__overlay'),
  pictureInput     : MODALS.newPictureForm.querySelector('.img-upload__input'),
  hashtagInput     : MODALS.newPictureForm.querySelector('.text__hashtags'),
  commentInput     : MODALS.newPictureForm.querySelector('.text__description'),
  sliderContainer  : MODALS.newPictureForm.querySelector('.img-upload__effect-level'),
  slider           : MODALS.newPictureForm.querySelector('.effect-level__slider'),
  sliderInput      : MODALS.newPictureForm.querySelector('.effect-level__value'),
  scaleInput       : MODALS.newPictureForm.querySelector('.scale__control--value'),
  scalingUpButton  : MODALS.newPictureForm.querySelector('.scale__control--bigger'),
  scalingDownButton: MODALS.newPictureForm.querySelector('.scale__control--smaller'),
  preview          : MODALS.newPictureForm.querySelector('.img-upload__preview img'),
  buttonsContainer : MODALS.newPictureForm.querySelector('.img-upload__effects'),
  effectsPreviews  : MODALS.newPictureForm.querySelectorAll('.effects__preview'),
  submitBtn        : MODALS.newPictureForm.querySelector('.img-upload__submit'),
  formCloseBtn     : MODALS.newPictureForm.querySelector('.img-upload__cancel'),

  picture              : MODALS.fullPicture.querySelector('.big-picture__img img'),
  commentsContainer  : MODALS.fullPicture.querySelector('.social__comments'),
  allComments        : MODALS.fullPicture.querySelector('.social__comments').children,
  commentCount       : MODALS.fullPicture.querySelector('.comments-count__shown'),
  commentsLoadBtn    : MODALS.fullPicture.querySelector('.social__comments-loader'),
  fullPictureCloseBtn: MODALS.fullPicture.querySelector('.big-picture__cancel'),
};

