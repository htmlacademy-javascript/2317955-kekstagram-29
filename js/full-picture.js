import {renderComments, hideSomeComments, SHOWN_COMMENTS_COUNT} from './comments.js';
import {MODALS, NODES} from './html-elements.js';


const renderFullPicture = ({url, likes, comments, description}) => {
  NODES.picture.src = url;
  NODES.picture.alt = description;
  MODALS.fullPicture.querySelector('.likes-count').textContent = likes;
  MODALS.fullPicture.querySelector('.comments-count').textContent = comments.length;
  MODALS.fullPicture.querySelector('.social__caption').textContent = description;

  NODES.commentsContainer.innerHTML = '';
  const commentsTemporaryFragment = renderComments(comments);
  NODES.commentsContainer.append(commentsTemporaryFragment);
  if (NODES.allComments.length > SHOWN_COMMENTS_COUNT) {
    hideSomeComments();
    MODALS.fullPicture.querySelector('.social__comments-loader').classList.remove('hidden');
  } else {
    MODALS.fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
  }

  NODES.commentCount.textContent = Math.min(comments.length, SHOWN_COMMENTS_COUNT);
};


export {renderFullPicture};
