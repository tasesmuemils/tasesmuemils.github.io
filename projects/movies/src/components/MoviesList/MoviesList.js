import React from "react";
import Movie from "../Movie/Movie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movies-list.css";

class MoviesList extends React.Component {
    render() {
        // For each movie in returned array, create Movie component
        const moviesList = this.props.movies.map((movie) => {
            const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

            return (
                <div key={movie.id}>
                    <Movie
                        title={movie.title}
                        image={imageUrl}
                        overview={movie.overview}
                        key={movie.id}
                        movieId={movie.id}
                        votes={movie.vote_average}
                        release_date={movie.release_date}
                    />
                </div>
            );
        });

        //Setting for react-slick carousel
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            focusOnSelect: false,
            responsive: [
                {
                    breakpoint: 1315,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 1093,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 660,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1,
                    },
                },
            ],
        };

        return (
            <div className="list-container">
                <h2>{this.props.listName}</h2>
                <div className="movies-genre-list">
                    <Slider {...settings}>{moviesList}</Slider>
                </div>
            </div>
        );
    }
}

export default MoviesList;
