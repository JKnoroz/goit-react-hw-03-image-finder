import React from 'react';
import s from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={s.Button} onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default Button;
