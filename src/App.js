import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './components/Searchbar/Searchbar';
import imagesAPI from './services/images-api';
import LoaderSpinner from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
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
    bigImg: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.searchRequest;
    const nextRequest = this.state.searchRequest;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest || prevPage !== nextPage) {
      this.setState({ status: 'pending', images: [] });
      imagesAPI
        .fetchImages(nextRequest, nextPage)
        .then(({ hits }) => {
          return hits;
        })
        .then(images => {
          if (nextPage === 1 && images.length > 0) {
            toast.success('Wow! You found great photos!', {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            this.setState({ images, status: 'resolved' });
          } else if (images.length === 0) {
            this.setState({
              images: [],
              status: 'rejected',
              error: 'images not found',
            });
            toast.info('No images found');
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
    this.scroll();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.clearModalProps();
  };

  handleImgClick = (bigImg, tags) => {
    this.setState({ bigImg, tags });
    this.toggleModal();
  };

  clearModalProps = () => {
    const { bigImg, tags } = this.state;
    if ((bigImg, tags)) {
      this.setState({ bigImg: '', tags: '' });
    }
  };

  scroll = () => {
    scroll.scrollToBottom();
  };

  render() {
    const { images, error, status, page, showModal, bigImg, tags } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && null}

        {status === 'pending' && <LoaderSpinner />}

        {status === 'rejected' && <div>{error}</div>}

        {status === 'resolved' && (
          <ImageGallery images={images} showBigImg={this.handleImgClick} />
        )}

        {images.length > 0 && images.length / 12 === page && (
          <Button onLoadMore={this.handleLoadMore} />
        )}

        {images.length > 0 && images.length / 12 < page && (
          <div>No more images</div>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} bigImg={bigImg} tags={tags}></Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
