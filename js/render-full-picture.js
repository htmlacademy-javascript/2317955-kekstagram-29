import {renderFewComments} from './comments.js';


const fullPicture = document.querySelector('.big-picture');
const fullPictureCommentsContainer = fullPicture.querySelector('.social__comments');
const fullPictureCommentsLoadBtn = fullPicture.querySelector('.social__comments-loader');


const renderFullPicture = ({url, likes, comments, description}) => {
  fullPicture.querySelector('.big-picture__img img').src = url;
  fullPicture.querySelector('.likes-count').textContent = likes;
  fullPicture.querySelector('.comments-count').textContent = comments.length;
  fullPicture.querySelector('.social__caption').textContent = description;

  // почему линтер ругается на такой тернарник?
  // comments.length < 6 ? fullPicture.querySelector('.social__comments-loader').classList.add('hidden') : fullPicture.querySelector('.social__comments-loader').classList.remove('hidden');

  if (comments.length < 6) {
    fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
  } else {
    fullPicture.querySelector('.social__comments-loader').classList.remove('hidden');
  }

  fullPictureCommentsContainer.innerHTML = '';
  const getCommentsTemporaryFragment = renderFewComments(5, comments);
  const commentsTemporaryFragment = getCommentsTemporaryFragment();
  fullPictureCommentsContainer.append(commentsTemporaryFragment);

  fullPictureCommentsLoadBtn.addEventListener('click', () => {
    const commentsTemporaryFragment2 = getCommentsTemporaryFragment();
    fullPictureCommentsContainer.append(commentsTemporaryFragment2);

    if (comments.length === fullPictureCommentsContainer.children.length) {
      fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
    }
  });

};

export {fullPicture, renderFullPicture, fullPictureCommentsContainer};
