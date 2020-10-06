import React from "react";
import "./movie.css";
import { Link } from "react-router-dom";

const Movie = ({ title, image, overview, movieId, votes, release_date }) => {
    return (
        <div className="movie-card">
            {/*Each movie in MovieList wrapped in Link to THIS movie page*/}
            <Link
                to={{
                    pathname: movieId,
                    // Passing allready captured data in LInk State from API to MoviePage
                    state: {
                        title: title,
                        image: image,
                        overview: overview,
                        votes: votes,
                        release_date: release_date,
                    },
                }}
                className="link-style"
            >
                <div className="movie-img-wrapper">
                    {/*If Image null, return default image*/}
                    <img
                        src={
                            image === "https://image.tmdb.org/t/p/w500/null"
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHbCglUlOWGjDMfifMUFHX-yRxt17LD3xZ5A&usqp=CAU"
                                : image
                        }
                        alt={overview}
                    />
                    {/*Shows votes with one number behind comma*/}
                    <h4>{votes.toFixed(1)}</h4>
                </div>
                <h3>{title}</h3>
            </Link>
        </div>
    );
};

export default Movie;
