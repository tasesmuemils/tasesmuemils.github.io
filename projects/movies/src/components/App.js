import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import MoviesList from "./MoviesList/MoviesList";
import "./App.css";
import {
    nowPlaying,
    searchByName,
    popular,
    topRated,
    upcoming,
} from "./API/API";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends React.Component {
    //Sets necessary state key/value pairs
    state = {
        searchResults: [],
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
        loading: true,
    };

    // Search movie by name
    // Create a prop function to pass it down to SearchBar component
    // Function takes in value from search input in SearchBar component
    // On submit, value is passed in API call function to find results
    MovieSearch = async (value) => {
        this.setState({
            searchResults: (await searchByName(value)).data.results,
        });
    };

    // When component mounts, movie lists renders on the page
    async componentDidMount() {
        const nowPlayingMovies = nowPlaying();
        const popularMovies = popular();
        const topRatedMovies = topRated();
        const upcomingMovies = upcoming();

        this.setState({
            nowPlaying: (await nowPlayingMovies).data.results,
            popular: (await popularMovies).data.results,
            topRated: (await topRatedMovies).data.results,
            upcoming: (await upcomingMovies).data.results,
            loading: false,
        });
    }

    render() {
        //Checks, if "loading" state is false
        //If it is FALSE, show MoviesList, if true, show loading icon
        const ListLoading = (state, ListName) => {
            return !this.state.loading ? (
                <MoviesList listName={ListName} movies={state} />
            ) : (
                <Loader
                    type="TailSpin"
                    color="#FFFFFF"
                    height={50}
                    width={50}
                    timeout={3000}
                    className="loader-style"
                />
            );
        };

        return (
            <div className="app-style">
                <SearchBar MovieSearch={this.MovieSearch} />
                <div>
                    {/*Checks if searchResults state is empty,
                    IF it is empty, MovieList is not shown, if state is not empty,
                    SearchResults MoviesList component is shown*/}
                    {this.state.searchResults.length === 0
                        ? null
                        : ListLoading(
                              this.state.searchResults,
                              "Search Results"
                          )}
                    {ListLoading(this.state.nowPlaying, "Now Playing")}
                    {ListLoading(this.state.popular, "Popular Movies")}
                    {ListLoading(this.state.upcoming, "Upcoming Movies")}
                    {ListLoading(this.state.topRated, "Top Rated Movies")}
                </div>
            </div>
        );
    }
}

export default App;
