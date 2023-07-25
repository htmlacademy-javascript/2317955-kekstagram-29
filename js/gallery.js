import {GALLERY, TEMPLATE} from './html-elements.js';


const createNewPicture = ({url, description, likes, comments, id}) => {
  const newPicture = TEMPLATE.picture.cloneNode(true);
  const image = newPicture.querySelector('.picture__img');

  newPicture.dataset.pictureId = id;
  image.src = url;
  image.alt = description;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;

  return newPicture;
};

const render = (data) => {
  const picturesTemporaryFragment = document.createDocumentFragment();
  data.forEach((datum) => {
    const newPicture = createNewPicture(datum);
    picturesTemporaryFragment.append(newPicture);
  });

  GALLERY.root.append(picturesTemporaryFragment);
};


export {render};
