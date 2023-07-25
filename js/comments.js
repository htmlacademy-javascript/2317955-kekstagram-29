import {makeElement} from './util.js';
import {FULL_PICTURE} from './html-elements.js';

const SHOWN_COMMENTS_COUNT = 5;
const root = FULL_PICTURE.commentsContainer;

const renderComment = ({avatar, name, message}) => {
  const newComment = makeElement('li', {className: 'social__comment'});
  const commentAvatar = makeElement('img', {className: 'social__picture', alt: name, src: avatar, width: 35, height: 35});
  newComment.append(commentAvatar);
  const commentText = makeElement('p', {className: 'social__text', textContent: message});
  newComment.append(commentText);

  return newComment;
};

const renderComments = (commentsData) => {
  const commentsTemporaryFragment = document.createDocumentFragment();
  commentsData.forEach((commentDatum) => {
    const newComment = renderComment(commentDatum);
    commentsTemporaryFragment.append(newComment);
  });

  return commentsTemporaryFragment;
};

const hideSomeComments = () => {
  for (let i = SHOWN_COMMENTS_COUNT; i < root.children.length; i++) {
    root.children.item(i).classList.add('hidden');
  }
};

function onCommentsLoadBtnClick () {
  const firstHiddenCommentIndex = [...root.children].findIndex((comment) => comment.classList.contains('hidden'));
  const breakpoint = Math.min(firstHiddenCommentIndex + SHOWN_COMMENTS_COUNT, root.children.length) ;

  for (let i = firstHiddenCommentIndex; i < breakpoint ; i++) {
    root.children.item(i).classList.remove('hidden');
  }

  if (breakpoint === root.children.length) {
    FULL_PICTURE.commentsLoader.classList.add('hidden');
    FULL_PICTURE.commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  }

  FULL_PICTURE.shownCommentsCount.textContent = `${breakpoint} из `;
}


export {renderComments, hideSomeComments, onCommentsLoadBtnClick, SHOWN_COMMENTS_COUNT};
