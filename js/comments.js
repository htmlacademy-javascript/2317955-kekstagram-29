import {makeElement} from './util.js';
import {fullPicture, fullPictureCommentsContainer} from './render-full-picture.js'


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

const renderFewComments = (amount, data) => {
  let firstIndex = 0;
  return function() {
    const lastIndex = firstIndex + amount;
    const commentsTemporaryFragment = document.createDocumentFragment();
    const necessaryData = data.slice(firstIndex, lastIndex);
    necessaryData.forEach((commentDatum) => {
      const newComment = renderComment(commentDatum);
      commentsTemporaryFragment.append(newComment);
    });

    firstIndex = lastIndex;
    // console.log('commentsTemporaryFragment :>> ', commentsTemporaryFragment);
    return commentsTemporaryFragment;
  };
};


export {renderFewComments};
