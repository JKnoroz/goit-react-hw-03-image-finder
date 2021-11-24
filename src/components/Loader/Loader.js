import React from 'react';
import Loader from 'react-loader-spinner';
import s from './loader.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderSpinner = () => {
  return (
    <div className={s.loader}>
      <Loader
        type="Circles"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={0} //1000 = 1 sec
      />
    </div>
  );
};

export default LoaderSpinner;
