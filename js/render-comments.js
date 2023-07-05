import {makeElement} from './util.js';
import {SHOWN_COMMENTS_AMOUNT} from './constants.js';
import {allComments} from './full-picture-modal.js';

// почему я не могу импортнуть эти перменные из full-picture-modal? если пытаюсь, то все ломается и в консоли выводится "comments.js:7 Uncaught ReferenceError: Cannot access 'fullPicture' before initialization (at comments.js:7:25)". При этом с allComments такой ошибки не выдает
const fullPicture = document.querySelector('.big-picture');
const commentsLoadBtn = fullPicture.querySelector('.social__comments-loader');


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

const renderAllComments = (comments) => {
  const commentsTemporaryFragment = document.createDocumentFragment();
  comments.forEach((commentDatum) => {
    const newComment = renderComment(commentDatum);
    commentsTemporaryFragment.append(newComment);
  });
  return commentsTemporaryFragment;
};


let firstHiddenCommentIndex = SHOWN_COMMENTS_AMOUNT;

const onCommentsLoadBtnClick = () => {
  const breakpoint = Math.min(firstHiddenCommentIndex + SHOWN_COMMENTS_AMOUNT, allComments.length) ;
  for (let i = firstHiddenCommentIndex; i < breakpoint ; i++) {
    allComments.item(i).classList.remove('hidden');
  }
  firstHiddenCommentIndex = breakpoint;
  if (breakpoint === allComments.length) {
    fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
    firstHiddenCommentIndex = SHOWN_COMMENTS_AMOUNT;
    commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  }
};


export {renderAllComments, onCommentsLoadBtnClick};
