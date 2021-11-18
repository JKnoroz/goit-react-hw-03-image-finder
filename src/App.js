import React, { Component } from 'react';

import './App.css';
import SearchBar from './components/Searchbar/Searchbar';

class App extends Component {
  state = {
    searchRequest: '',
    loading: false,
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=22088587-b9222ac51e20698a54a4430fc&image_type=photo&orientation=horizontal&per_page=12',
  //   )
  //     .then(res => res.json())
  //     .then(images => this.setState({ images }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        {/* {this.state.loading && <h1>Loading...</h1>}
        {this.state.images && <div>Pokemon</div>} */}
      </div>
    );
  }
}

export default App;
