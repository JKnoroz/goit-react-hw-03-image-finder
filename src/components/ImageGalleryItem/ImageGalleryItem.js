import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
