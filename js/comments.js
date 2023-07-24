import {makeElement} from './util.js';
import {MODALS, NODES} from './html-elements.js';

const SHOWN_COMMENTS_COUNT = 5;

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
  for (let i = SHOWN_COMMENTS_COUNT; i < NODES.allComments.length; i++) {
    NODES.allComments.item(i).classList.add('hidden');
  }
};

function onCommentsLoadBtnClick () {
  const firstHiddenComment = MODALS.fullPicture.querySelector('.social__comment.hidden');
  const firstHiddenCommentIndex = [...NODES.allComments].indexOf(firstHiddenComment);
  const breakpoint = Math.min(firstHiddenCommentIndex + SHOWN_COMMENTS_COUNT, NODES.allComments.length) ;
  for (let i = firstHiddenCommentIndex; i < breakpoint ; i++) {
    NODES.allComments.item(i).classList.remove('hidden');
  }
  if (breakpoint === NODES.allComments.length) {
    MODALS.fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
    NODES.commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  }
  NODES.commentCount.textContent = `${breakpoint} из `;
}


export {renderComments, hideSomeComments, onCommentsLoadBtnClick, SHOWN_COMMENTS_COUNT};
