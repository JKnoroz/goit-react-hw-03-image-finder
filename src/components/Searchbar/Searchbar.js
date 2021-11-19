import { Component } from 'react';
import s from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';

export default class SearchBar extends Component {
  state = {
    searchRequest: '',
  };

  handleSearch = e => {
    this.setState({ searchRequest: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchRequest.trim() === '') {
      return toast.error('Put in image name');
    }

    this.props.onSubmit(this.state.searchRequest);
    this.setState({ searchRequest: '' });
  };

  render() {
    return (
      <header className={s.Searchbar} onSubmit={this.handleSubmit}>
        <form className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>
              <BiSearch />
            </span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchRequest}
            onChange={this.handleSearch}
          />
        </form>
      </header>
    );
  }
}
