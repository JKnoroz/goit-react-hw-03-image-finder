import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import ImageGallery from './components/ImageGallery/ImageGallery';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/Searchbar/Searchbar';

class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchRequest !== this.props.searchRequest) {
      console.log(prevState.searchRequest);
      console.log(this.state.searchRequest);
    }
  }

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />

        <ImageGallery images={this.state.images} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
