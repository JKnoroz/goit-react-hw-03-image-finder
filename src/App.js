import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';

import ImageGallery from './components/ImageGallery/ImageGallery';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/Searchbar/Searchbar';
import imagesAPI from './services/images-api';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.searchRequest;
    const nextRequest = this.state.searchRequest;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevRequest !== nextRequest || prevPage !== nextPage) {
      console.log(prevPage);
      console.log(nextPage);

      this.setState({ status: 'pending', images: [] });
      imagesAPI
        .fetchImages(nextRequest, nextPage)
        .then(({ hits }) => hits)
        .then(images => {
          if (nextPage === 1) {
            this.setState({ images, status: 'resolved' });
          } else {
            this.setState({
              images: [...prevState.images, ...images],
              status: 'resolved',
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest, page: 1 });
  };

  handleLoadMore = () => {
    const prevPage = this.state.page;
    const nextPage = prevPage + 1;
    this.setState({ page: nextPage });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImgClick = e => {
    console.log(e.target);
  };

  render() {
    const { images, error, status, page, showModal } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && null}
        {status === 'pending' && <Loader type="Circles" color="#3f51b5" />}
        {status === 'rejected' && <div>{error.message}</div>}
        {status === 'resolved' && (
          <ImageGallery images={images} showBigImg={this.handleImgClick} />
        )}
        {images.length > 0 && images.length / 12 === page && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {images.length > 0 && images.length / 12 < page && (
          <div>No more images</div>
        )}
        {showModal && <Modal onClose={this.toggleModal}></Modal>}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
