import {makeElement} from './util.js';
import {SHOWN_COMMENTS_NUMBER} from './constants.js';
import {allComments, fullPicture, commentsLoadBtn, commentCount} from './full-picture-modal.js';


const renderComment = ({avatar, name, message}) => {
  const newComment = makeElement('li', {className: 'social__comment'});
  const commentAvatar = makeElement('img', {className: 'social__picture', alt: name, src: avatar, width: 35, height: 35});
  newComment.append(commentAvatar);
  const commentText = makeElement('p', {className: 'social__text', textContent: message});
  newComment.append(commentText);

  return newComment;
};

const renderAllComments = (commentsData) => {
  const commentsTemporaryFragment = document.createDocumentFragment();
  commentsData.forEach((commentDatum) => {
    const newComment = renderComment(commentDatum);
    commentsTemporaryFragment.append(newComment);
  });
  return commentsTemporaryFragment;
};

const hideSomeComments = () => {
  for (let i = SHOWN_COMMENTS_NUMBER; i < allComments.length; i++) {
    allComments.item(i).classList.add('hidden');
  }
};

function onCommentsLoadBtnClick () {
  const firstHiddenComment = fullPicture.querySelector('.social__comment.hidden');
  const firstHiddenCommentIndex = [...allComments].indexOf(firstHiddenComment);
  const breakpoint = Math.min(firstHiddenCommentIndex + SHOWN_COMMENTS_NUMBER, allComments.length) ;
  for (let i = firstHiddenCommentIndex; i < breakpoint ; i++) {
    allComments.item(i).classList.remove('hidden');
  }
  if (breakpoint === allComments.length) {
    fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
    commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  }
  commentCount.textContent = `${breakpoint} из `;
}


export {renderAllComments, hideSomeComments, onCommentsLoadBtnClick};
