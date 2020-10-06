import React from "react";
import { movieVideos, movieActors } from "../API/API";
import ActorsList from "../ActorList/ActorsList";
import "./MoviePage.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

class MoviePage extends React.Component {
    // Declare state for trailer and actors
    state = { trailer: "", actors: [] };

    // When component is mounted, state is updated
    async componentDidMount() {
        // Always opens page on top of the page
        window.scrollTo(0, 0);
        const trailer = await movieVideos(this.props.match.params.movieId);
        const actors = await movieActors(this.props.match.params.movieId);
        this.setState({ trailer: trailer, actors: actors });
    }

    render() {
        const {
            title,
            image,
            overview,
            votes,
            release_date,
        } = this.props.location.state;

        return (
            <div className="movie-page">
                <Link className="arrow-back" to="/">
                    <FaArrowLeft />
                </Link>

                <div className="movie-details">
                    <div className="movie-page-poster">
                        {/*If image = null, return default image*/}
                        <img
                            src={
                                image === "https://image.tmdb.org/t/p/w500/null"
                                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHbCglUlOWGjDMfifMUFHX-yRxt17LD3xZ5A&usqp=CAU"
                                    : image
                            }
                            alt={overview}
                        />
                    </div>

                    <div className="movie-detail-text">
                        <h1>{title}</h1>
                        <div className="movie-numbers">
                            <h4>Raiting: {votes}</h4>
                            <h4>Realese Year: {release_date.split("-")[0]}</h4>
                        </div>
                        <p>{overview}</p>
                    </div>
                </div>

                <div className="movie-trailer">
                    <iframe
                        src={`https://www.youtube.com/embed/${this.state.trailer}`}
                        frameBorder="0"
                        title="video"
                    ></iframe>
                </div>
                <ActorsList actors={this.state.actors} />
            </div>
        );
    }
}

export default MoviePage;
