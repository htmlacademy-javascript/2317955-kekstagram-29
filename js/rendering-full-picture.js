import {renderComments, hideSomeComments, SHOWN_COMMENTS_COUNT} from './comments.js';
import {FULL_PICTURE} from './html-elements.js';


const render = ({url, likes, comments, description}) => {
  FULL_PICTURE.picture.src = url;
  FULL_PICTURE.picture.alt = description;
  FULL_PICTURE.likesCount.textContent = likes;
  FULL_PICTURE.allCommentsCount.textContent = comments.length;
  FULL_PICTURE.description.textContent = description;

  FULL_PICTURE.commentsContainer.innerHTML = '';
  const commentsTemporaryFragment = renderComments(comments);
  FULL_PICTURE.commentsContainer.append(commentsTemporaryFragment);

  if (FULL_PICTURE.commentsContainer.children.length > SHOWN_COMMENTS_COUNT) {
    hideSomeComments();
    FULL_PICTURE.commentsLoader.classList.remove('hidden');
  } else {
    FULL_PICTURE.commentsLoader.classList.add('hidden');
  }

  FULL_PICTURE.shownCommentsCount.textContent = Math.min(comments.length, SHOWN_COMMENTS_COUNT);
};


export {render};
