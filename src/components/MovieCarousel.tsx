import { FunctionComponent } from "react";
import Carousel from 'react-material-ui-carousel';

import MovieCardCarousel from './MovieCardCarousel';

import { MOVIES } from "../constants/MoviesList";
import '../styles/MovieCarousel.scss';

type MovieCarouselProps = object
 
const MovieCarousel: FunctionComponent<MovieCarouselProps> = () => {
    const movies = MOVIES.slice(0, 5);
    return ( 
        <div className="movie_carousel_main"> 
            <Carousel
                animation="fade"
                navButtonsAlwaysVisible={true}
                autoPlay={true}
            >
            {
                movies.map( (item) => 
                    <MovieCardCarousel 
                        key={item.imdbID}   
                        title={item.Title}
                        poster={item.Poster}
                        posterbackground={item.PosterBackground}
                    /> 
                )
            }
            </Carousel>
        </div>
    );
}
 
export default MovieCarousel;