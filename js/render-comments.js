import {makeElement} from './util.js';
import {SHOWN_COMMENTS_AMOUNT} from './constants.js';
import {allComments, fullPicture, commentsLoadBtn, commentCount} from './full-picture-modal.js';


const renderComment = ({avatar, name, message}) => {
  const newComment = makeElement('li', 'social__comment');

  const commentAvatar = makeElement('img', 'social__picture', name);
  commentAvatar.src = avatar;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  newComment.append(commentAvatar);

  const commentText = makeElement('p', 'social__text', message);
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
  for (let i = SHOWN_COMMENTS_AMOUNT; i < allComments.length; i++) {
    allComments.item(i).classList.add('hidden');
  }
};

function onCommentsLoadBtnClick () {
  const firstHiddenComment = fullPicture.querySelector('.social__comment.hidden');
  const firstHiddenCommentIndex = [...allComments].indexOf(firstHiddenComment);
  const breakpoint = Math.min(firstHiddenCommentIndex + SHOWN_COMMENTS_AMOUNT, allComments.length) ;
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
