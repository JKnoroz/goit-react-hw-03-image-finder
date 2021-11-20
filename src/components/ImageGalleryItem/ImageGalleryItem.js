import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
