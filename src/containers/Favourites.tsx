import { FunctionComponent } from "react";
import MovieCard from "../components/MovieCard";

import { MOVIES } from "../constants/MoviesList";
import '../styles/Favourites.scss';

type FavouritesProps = object
 
const Favourites: FunctionComponent<FavouritesProps> = () => {
    const favouriteIds = localStorage.getItem('favorites') || [];
    const favourites = MOVIES.filter((movie) => favouriteIds.indexOf(movie.imdbID) > -1);
    return (
        <div>
            <h3> My Favourites </h3>
            <div className="movie_card_fav">
                { 
                    favourites.map((item) => { return (
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
 
export default Favourites;