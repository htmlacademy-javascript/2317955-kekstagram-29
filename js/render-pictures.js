const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createNewPicture = ({url, description, likes, comments, id}) => {
  const newPicture = pictureTemplate.cloneNode(true);
  const image = newPicture.querySelector('.picture__img');

  newPicture.dataset.pictureId = id;
  image.src = url;
  image.alt = description;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;

  return newPicture;
};

const renderPictures = (data) => {
  const picturesTemporaryFragment = document.createDocumentFragment();
  data.forEach((datum) => {
    const newPicture = createNewPicture(datum);
    picturesTemporaryFragment.append(newPicture);
  });

  picturesContainer.append(picturesTemporaryFragment);
};


export {renderPictures, picturesContainer};
