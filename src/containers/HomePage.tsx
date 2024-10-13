import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import MovieCarousel from '../components/MovieCarousel';
import { fetchMovies, resetMovies } from '../models/SearchModel';
import Movies from '../components/Movies';
import MovieCard from '../components/MovieCard';

import debounce from '../utils/debounce';
import '../App.css';
import '../styles/HomePage.scss';

const HomePage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.search.status);
  const searchText = useSelector(state => state.search.searchText);
  const error = useSelector(state => state.search.error);
  const movies = useSelector(state => state.search.result);
  const page = useSelector(state => state.search.page);
  const hasMore = useSelector(state => state.search.hasMore);

  const debouncedFetchMovies = debounce((dispatch, searchKey: string, page: number) => {
    dispatch(fetchMovies({ searchKey, page }));
  }, 1000);

  useEffect(() => {
    dispatch(resetMovies());
    if(searchText.length > 2) {
        debouncedFetchMovies(dispatch, searchText, 1 );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const fetchMoreMovies = () => {
    if (status !== 'loading') {
        debouncedFetchMovies(dispatch, searchText, page );
    }
  };

  return (
    <div>
      { searchText.length > 2
      ? 
        <>  
            <div style={{ margin: '2rem 0' }}> 
                <h3> Results for "{ searchText }" </h3>
            </div>
            <InfiniteScroll
                dataLength={movies.length}
                next={fetchMoreMovies}
                hasMore={hasMore}
                loader={<h4></h4>}
                endMessage={<p>No more results</p>}
            >
                <div className="search_result_main">
                    {
                        movies?.map((item) => { return (
                            <MovieCard 
                                key={item.imdbID}
                                title={item.Title} 
                                plot={item.Plot || ''}
                                poster={item.Poster}
                                duration={item.Runtime || ''}
                                imdbId={item.imdbID}
                            />
                        )})
                    }
                </div>
            </InfiniteScroll>
            {
              error && <h3 style={{ width: '100%', textAlign: 'center' }}> { error } </h3>
            }
        </> 
       :
        <>
            <MovieCarousel />
            <Movies />
        </>  
      }
    </div>
  )
}

export default HomePage
