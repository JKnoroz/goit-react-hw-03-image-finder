import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';

import ImageGallery from './components/ImageGallery/ImageGallery';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/Searchbar/Searchbar';

class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.searchRequest;
    const nextRequest = this.state.searchRequest;
    if (prevRequest !== nextRequest) {
      this.setState({ loading: true, images: [] });
      fetch(
        `https://pixabay.com/api/?q=${nextRequest}&page=1&key=22088587-b9222ac51e20698a54a4430fc&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('No such image'));
        })
        .then(({ hits }) => hits)
        .then(images => this.setState({ images }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        {this.state.loading && <Loader type="Circles" color="#3f51b5" />}
        {this.state.error && <div>{this.state.error.message}</div>}
        <ImageGallery images={this.state.images} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
