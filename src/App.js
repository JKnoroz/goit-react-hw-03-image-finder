import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';

import ImageGallery from './components/ImageGallery/ImageGallery';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/Searchbar/Searchbar';
import imagesAPI from './services/images-api';

class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.searchRequest;
    const nextRequest = this.state.searchRequest;
    if (prevRequest !== nextRequest) {
      this.setState({ status: 'pending', images: [] });
      imagesAPI
        .fetchImages(nextRequest)
        .then(({ hits }) => hits)
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    const { images, error, status } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && null}
        {status === 'pending' && <Loader type="Circles" color="#3f51b5" />}
        {status === 'rejected' && <div>{error.message}</div>}
        {status === 'resolved' && <ImageGallery images={images} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
