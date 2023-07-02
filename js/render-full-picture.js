const fullPicture = document.querySelector('.big-picture');
const fullPictureCommentsContainer = fullPicture.querySelector('.social__comments');

const renderFullPicture = ({url, likes, comments, description}) => {
  fullPicture.querySelector('.big-picture__img img').src = url;
  fullPicture.querySelector('.likes-count').textContent = likes;
  fullPicture.querySelector('.comments-count').textContent = comments.length;
  fullPicture.querySelector('.social__caption').textContent = description;

  fullPicture.querySelector('.social__comment-count').classList.add('hidden');
  fullPicture.querySelector('.comments-loader').classList.add('hidden');

  fullPictureCommentsContainer.innerHTML = '';
  const commentsTemporaryFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    newComment.append(commentAvatar);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;
    newComment.append(commentText);

    commentsTemporaryFragment.append(newComment);
  });

  fullPictureCommentsContainer.append(commentsTemporaryFragment);
};

export {renderFullPicture};
