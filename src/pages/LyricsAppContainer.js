import React, { Component } from 'react';
import { SearchBar } from '../components/search/Search';
import { fetchLyricSuggestions } from '../services/lyrics';
import { debounce } from '../utility';
import { searchDebounceTime } from '../utility/appConstants';
import './lyricsApp.css';

class LyricsAppContainer extends Component {
  state = { searchQuery: '', suggestions: [] };

  constructor(props) {
    super(props);
    this.fetchLyrics = debounce(this.fetchLyrics, searchDebounceTime);
  }

  onSearchQueryChange = ({ target }) => {
    const searchQuery = target.value;
    this.setState({ searchQuery }, this.fetchLyrics);
  };

  fetchLyrics = () => {
    fetchLyricSuggestions(this.state.searchQuery)
      .then((response) => response.json())
      .then((response) => this.setState({ suggestions: response.data }));
  };

  onSearchBarQuerySubmit = (event) => {
    event.preventDefault();
    console.log('hello');
  };

  render() {
    return (
      <div className='app-container'>
        <div className='search-panel-container'>
          <SearchBar
            onChange={this.onSearchQueryChange}
            onSubmit={this.onSearchBarQuerySubmit}
            value={this.state.searchQuery}
          />
        </div>
      </div>
    );
  }
}

export default LyricsAppContainer;
