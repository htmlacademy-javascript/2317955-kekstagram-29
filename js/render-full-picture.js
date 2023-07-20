import {renderAllComments, hideSomeComments} from './render-comments.js';
import {SHOWN_COMMENTS_AMOUNT} from './constants.js';
import {fullPicture, commentsContainer, commentCount, allComments} from './full-picture-modal.js';


const renderFullPicture = ({url, likes, comments, description}) => {
  const image = fullPicture.querySelector('.big-picture__img img');
  image.src = url;
  image.alt = description;
  fullPicture.querySelector('.likes-count').textContent = likes;
  fullPicture.querySelector('.comments-count').textContent = comments.length;
  fullPicture.querySelector('.social__caption').textContent = description;

  commentsContainer.innerHTML = '';
  const commentsTemporaryFragment = renderAllComments(comments);
  commentsContainer.append(commentsTemporaryFragment);
  if (allComments.length > SHOWN_COMMENTS_AMOUNT) {
    hideSomeComments();
    fullPicture.querySelector('.social__comments-loader').classList.remove('hidden');
  } else {
    fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
  }

  commentCount.textContent = Math.min(comments.length, SHOWN_COMMENTS_AMOUNT);
};


export {renderFullPicture};
