import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlanetCard from './PlanetCard';
import {loginAction, updateSearchResultsAction, updateFetchStatusAction } from '../Actions/index';
import debounce from '../utils/debounce';
import './search-page.css';

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
    };
  }
  componentDidMount() {
    const { updateSearchResults } = this.props;
    fetch('https://swapi.co/api/planets/?format=json')
      .then(res => res.json())
      .then((data) => {
        updateSearchResults({
          results: data.results,
          
        });
      });
      document.querySelector('.search-textfield').addEventListener(
        'keydown',
        debounce(this.fetchResults, 0),
      );
  }

  fetchResults = () => {
    const { searchString } = this.state;
    const { updateSearchResults, updateFetchStatus } = this.props;
    updateFetchStatus({
      isFetching: true,
    });
    fetch(`https://swapi.co/api/planets/?search=${searchString}`)
      .then(res => res.json()).then((data) => {
        updateSearchResults({
          results: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
          isFetching: false,
        });
      }).catch((err) => {
        console.log(`error in fetching swapi api ${err}`);
      });
  }

  updateResults = (e) => {
    const { value } = e.target;
    this.setState({
      searchString: value,
    });
  }
   
  renderPlanetCard = (results) => {
    if (results.length > 0) {
      const planetCards = results.map(i => (
        <PlanetCard key={i.name} planetDetails={i} />
      ));
      return planetCards;
    } return <div className='noresult_found text-center'> No results found </div>;
  }
  logOut = () => {
    localStorage.clear();
    window.location = "/"
  }
  render() {
    const {
      props, state, updateResults, renderPlanetCard,
    } = this;
    const { searchString } = state;
    const {
      results,
      isFetching,
    } = props;
    return (
      <div className='search-container'>
        <div className="header">
        <input
          className='search-textfield'
          type='text'
          placeholder='Search For Planet'
          value={searchString}
          onChange={updateResults}
        />
        <button type="button" onClick={this.logOut} className="btn btn-primary">Logout</button>
        </div>
        {isFetching ? <div className='noresult_found text-center'> Loading Planets... </div> :
        <>
          <div className="container">{renderPlanetCard(results)}</div>
        </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.searchReducer.results,
  prevUrl: state.searchReducer.prevUrl,
  nextUrl: state.searchReducer.nextUrl,
  searchString: state.searchReducer.searchString,
  isFetching: state.searchReducer.isFetching
});
const mapDispatchToProps = dispatch => ({
  updateSearchResults: props => dispatch(updateSearchResultsAction(props)),
  login: props => dispatch(loginAction(props)),
  updateFetchStatus: props => dispatch(updateFetchStatusAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

 