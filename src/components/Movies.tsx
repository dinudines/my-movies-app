import { FunctionComponent } from "react";
import MovieCard from "./MovieCard";

import { MOVIES } from "../constants/MoviesList";
import '../styles/Movies.scss';

type RecentlyAddedMoviesProps = object
 
const Movies: FunctionComponent<RecentlyAddedMoviesProps> = () => {
    const recentlyAddedMovies = MOVIES.slice(10, 15);
    const trendingMovies = MOVIES.slice(5, 10);
    return (
        <div>
            <h3> Recently Added </h3>
            <div className="movie_card_main">
                { 
                    recentlyAddedMovies.map((item) => { return (
                        <MovieCard 
                            key={item.imdbID}
                            title={item.Title} 
                            plot={item.Plot}
                            poster={item.Poster}
                            duration={item.Runtime}
                            imdbId={item.imdbID}
                        />
                    )})
                }
            </div>
            <h3> Trending </h3>
            <div className="movie_card_main">
                { 
                    trendingMovies.map((item) => { return (
                        <MovieCard 
                            key={item.imdbID}
                            title={item.Title} 
                            plot={item.Plot}
                            poster={item.Poster}
                            duration={item.Runtime}
                            imdbId={item.imdbID}
                        />
                    )})
                }
            </div>
        </div>
    );
}
 
export default Movies;