import React, {Component} from 'react';
import DefaultPoster from './pages/default'

class App extends Component {
  constructor() {
    super();
    //Setting up and initial stage of State
    //Movies will have the response object
    //SearchQuerySucess will have weather data has been fetched or not?
    this.state = {
      movies: [],
      searchQuerySucess: false
    }
    //isDefault will return default state management
    this.isDefault = true;

    //requestCompleteStatus state that request has been successfully made
    this.requestCompleteStatus = false;
    //This will hold the serchTerm
    this.searchTerm = "";
  }
  //FetchMovie will take care of all application fetch request.
  //FetchMovie is only function will take care of all list/specefic movie fetch request
  fetchMovie(param, isList) {
    /*requestCompleteStatus = true will form that request is going to be made. = false will state a request
    complete state*/
    this.requestCompleteStatus = true
    //paramType will save if requre specefic movie reqest of the list?
    let paramsType = (isList === true)
      ? 's'
      : 'i';
    fetch('http://www.omdbapi.com/?' + paramsType + '=' + param).then((response) => {
      return response.json();
    }).then(response => {
      if (response.Error) {
        //Operation to perform if movie not found
        alert("Movie not found try another name")
        this.isDefault = true;
        this.requestCompleteStatus = false;
        this.setState({searchQuerySucess: false});
      } else {
        if (isList) 
          this.isDefault = false;
        this.requestCompleteStatus = false;
        this.setState({
          movies: this.isDefault
            ? response
            : response.Search,
          searchQuerySucess: true
        });
      }
    }).catch((error) => {
      //anyfetch error handling will go here
    })
  }
  componentDidMount() {
    //Default Movie call
    if (this.isDefault) 
      this.fetchMovie('tt0111161', false)
  }
  updateSearchTerm(e) {
    //Updating search term here
    this.searchTerm = e.target.value;
  }
  fetchNewMovies() {
    //request to fetch new movies list and changing the default state to false
    this.isDefault = false;
    this.fetchMovie(this.searchTerm, true)
  }
  render() {
    return (
      //container of the application
      <section className="pageWrapper">
        <header>
          <h1>Awesome Movie Search</h1>
        </header>
        <section className="page">
          <p className="inputText">
            {/*Text input for movie search query input*/}
            <input
              className={this.state.searchQuerySucess
              ? ''
              : 'error'}
              onKeyUp={this
              .updateSearchTerm
              .bind(this)}
              type="search"
              placeholder="Enter Movie Name"/>
              {/*Button to Trigger the movie search event*/}
            <input
              type="button"
              value="Search"
              onClick={this
              .fetchNewMovies
              .bind(this)}/>
            <br/>
            {/*Loader to show when search is happning.
            The best way would be to take it from state. But at the same time updating state will reinitialize
            the entire application. Not activated from state
            */}
            <span
              className={this.requestCompleteStatus
              ? 'active spinner'
              : 'spinner'}>
              <span className="double-bounce1"></span>
              <span className="double-bounce2"></span>
            </span>
          </p>
          {/*This will query the default component and will take care of passing props onto it*/}
          {this.isDefault
            ? <DefaultPoster isDefault={this.isDefault} movieDetail={this.state.movies}/>
            : this
              .state
              .movies
              .map((movie) => {
                return (
                  <DefaultPoster key={movie.imdbID + Math.random()} movieDetail={movie}></DefaultPoster>
                )
              })}
        </section>
        <footer>
          <h2>@copyright</h2>
        </footer>
      </section>
    );
  }
}

export default App;
