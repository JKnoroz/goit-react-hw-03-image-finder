import { Component } from 'react';
import s from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';
export default class SearchBar extends Component {
  state = {
    images: '',
  };

  render() {
    return (
      <header className={s.Searchbar}>
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
          />
        </form>
      </header>
    );
  }
}
