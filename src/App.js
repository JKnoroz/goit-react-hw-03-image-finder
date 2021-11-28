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
    const { page, searchRequest } = this.state;

    if (searchRequest !== prevState.searchRequest || page > prevState.page) {
      if (page === 1) {
        this.setState({ images: [], status: 'pending' });
      }
      imagesAPI
        .fetchImages(searchRequest, page)
        .then(({ hits }) => {
          if (hits.length === 0) {
            toast.info('No images found');
          }
          this.setState(
            prevState => ({
              status: 'resolved',
              images: [...prevState.images, ...hits],
            }),
            () => scroll.scrollToBottom(),
          );
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImgClick = (bigImg, tags) => {
    this.setState({ bigImg, tags });
    this.toggleModal();
  };

  render() {
    const { images, error, status, showModal, bigImg, tags } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && null}

        {(status === 'resolved' || status === 'pending') && (
          <ImageGallery images={images} showBigImg={this.handleImgClick} />
        )}

        {status === 'pending' && <LoaderSpinner />}

        {status === 'resolved' && images.length >= 12 && (
          <Button onLoadMore={this.handleLoadMore} />
        )}

        {status === 'rejected' && <div>{error}</div>}
        {showModal && (
          <Modal onClose={this.toggleModal} bigImg={bigImg} tags={tags}></Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
