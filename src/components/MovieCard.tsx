import { FunctionComponent, useState } from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import '../styles/MovieCard.scss';

interface MovieCardProps {
    title: string;
    plot: string;
    poster: string;
    duration: string;
    imdbId: string;
}

const MovieCard: FunctionComponent<MovieCardProps> = (props) => {
    const { title, plot, poster, duration, imdbId } = props;
    const [favorite, setFavorite] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        return favorites.includes(imdbId);
    });

    const toggleLocalStorageFavourites = (id: string) => {
        const storedFavorites = localStorage.getItem('favorites');
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        let updatedFavorites;

        if (favorites.includes(id)) {
            updatedFavorites = favorites.filter((favId: string) => favId !== id);
        } else {
            updatedFavorites = [...favorites, id];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const toggleFavorite = () => {
        setFavorite(!favorite);
        toggleLocalStorageFavourites(imdbId);
    };

    return (
        <Card className="movie-card">
        <CardActionArea className="card-action-area">
            <CardMedia
                component="img"
                alt="Movie Title"
                height="200"
                image={poster}
                title={ title }
                className="card-media"
            />
            <Box className="hover-content">
                { plot && <Typography variant="body2" className="plot">
                    { plot }
                </Typography>
                }
                {duration &&
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <AccessTimeIcon sx={{ marginRight: 1 }} />
                    <Typography variant="body2">
                        Run Time : { duration }
                    </Typography>
                </Box>
                }
                <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    className="play-btn"
                >
                    Play
                </Button>
            </Box>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="div">
                    { title }
                </Typography>
                <Tooltip title="Add to favourites" arrow>
                    <IconButton onClick={toggleFavorite} sx={{ color: 'red' }}>
                        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Tooltip>
            </CardContent>
        </CardActionArea>
    </Card>
    );
};

export default MovieCard;