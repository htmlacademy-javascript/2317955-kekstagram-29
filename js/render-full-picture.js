import {renderAllComments} from './render-comments.js';
import {SHOWN_COMMENTS_AMOUNT} from './constants.js';
import {fullPicture, commentsContainer, allComments} from './full-picture-modal.js';


const renderFullPicture = ({url, likes, comments, description}) => {
  fullPicture.querySelector('.big-picture__img img').src = url;
  fullPicture.querySelector('.likes-count').textContent = likes;
  fullPicture.querySelector('.comments-count').textContent = comments.length;
  fullPicture.querySelector('.social__caption').textContent = description;

  // let commentCountText = fullPicture.querySelector('.social__comment-count').textContent;
  // console.log('commentCount :>> ', commentCountText);
  // commentCountText = commentCountText.replace(/\d+/,'hoo');
  // console.log('commentCount :>> ', commentCountText);
  // fullPicture.querySelector('.social__comment-count').textContent = commentCountText;

  // почему линтер ругается на такой тернарник?
  // comments.length < 6 ? fullPicture.querySelector('.social__comments-loader').classList.add('hidden') : fullPicture.querySelector('.social__comments-loader').classList.remove('hidden');
  if (comments.length < 6) {
    fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
  } else {
    fullPicture.querySelector('.social__comments-loader').classList.remove('hidden');
  }

  commentsContainer.innerHTML = '';

  const commentsTemporaryFragment = renderAllComments(comments);
  commentsContainer.append(commentsTemporaryFragment);
  if (allComments.length > SHOWN_COMMENTS_AMOUNT) {
    for (let i = SHOWN_COMMENTS_AMOUNT; i < allComments.length; i++) {
      allComments.item(i).classList.add('hidden');
    }
  }
};

export {fullPicture, renderFullPicture};
