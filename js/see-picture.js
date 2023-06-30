import {picturesData} from './render-pictures.js';

const picturesContainer = document.querySelector('.pictures');
const fullPicture = document.querySelector('.big-picture');
const fullPictureImg = fullPicture.querySelector('.big-picture__img img');
const fullPictureLikes = fullPicture.querySelector('.likes-count');
const fullPictureCommentsAmount = fullPicture.querySelector('.comments-count');
const fullPictureCommentsAmountContainer = fullPicture.querySelector('.social__comment-count');
const fullPictureCommentsLoader = fullPicture.querySelector('.comments-loader');
const fullPictureCommentsContainer = fullPicture.querySelector('.social__comments');
const fullPictureDescription = fullPicture.querySelector('.social__caption');
const fullPictureCloseBtn = fullPicture.querySelector('.big-picture__cancel');

const openFullPicture = (evt) => {
  evt.preventDefault();
  const picture = evt.target.closest('.picture');
  const pictureData = picturesData.find((date) => date.id === +picture.dataset.id);

  fullPicture.classList.remove('hidden');
  fullPictureImg.src = pictureData.url;
  fullPictureLikes.textContent = pictureData.likes;
  fullPictureCommentsAmount.textContent = pictureData.comments.length;
  fullPictureDescription.textContent = pictureData.description;

  fullPictureCommentsAmountContainer.classList.add('hidden');
  fullPictureCommentsLoader.classList.add('hidden');
  fullPictureCommentsContainer.innerHTML = '';
  console.log(pictureData.comments);
  const commentsTemporaryFragment = document.createDocumentFragment();
  pictureData.comments.forEach((comment) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    newComment.append(commentAvatar);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    newComment.append(commentText);
    commentsTemporaryFragment.append(newComment);
  });
  fullPictureCommentsContainer.append(commentsTemporaryFragment);

  document.body.classList.add('modal-open');
};
const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
const onEsc = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPicture();
  }
}

picturesContainer.addEventListener('click', (evt) => {
  openFullPicture(evt);
  document.addEventListener('keydown', onEsc);
});

fullPictureCloseBtn.addEventListener('click', () => {
  closeFullPicture();
  document.removeEventListener('keydown', onEsc);
});
