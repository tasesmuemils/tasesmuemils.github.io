import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
    //Declare state for movies search input
    state = { input: "" };

    //On input change, state is updated
    onInputChange = (e) => {
        this.setState({ input: e.target.value });
    };

    //On form submit, passing search value in MovieSearch
    //MovieSearch is passed down as a prop from App component
    onMovieSearch = (e) => {
        e.preventDefault();
        this.props.MovieSearch(this.state.input);
    };

    render() {
        return (
            <div className="search-bar">
                <form action="MovieSearch" onSubmit={this.onMovieSearch}>
                    <label htmlFor="">Search a movie</label>
                    <input
                        type="text"
                        onChange={this.onInputChange}
                        placeholder="Search and press ENTER "
                    />
                </form>
            </div>
        );
    }
}

export default SearchBar;
