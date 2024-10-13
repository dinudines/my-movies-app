import { FunctionComponent } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface MovieCardCarouselProps {
    title: string;
    poster: string;
    posterbackground: string;
}

const MovieCardCarousel: FunctionComponent<MovieCardCarouselProps> = (props) => {
    const { title, poster, posterbackground } = props;
    return (
        <Card style={{ display: 'flex', flexDirection: 'row-reverse', height: 350}}>
            <CardMedia
                component="img"
                alt="Movie Title"
                height="350"
                image={poster}
                title={title}
                style={{ width: '50%', objectFit: 'fill' }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `linear-gradient(to right, ${posterbackground} 100%, transparent 100%)`,
                    color: 'white',
                    width: '50%',
                    padding: 2,
                }}
            >
                <CardContent>
                    <Typography variant="h4" component="div" style={{ textAlign: 'left' }}>
                        { title }
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: 8 }}>
                        English | Kannada | Tamil | Telugu
                    </Typography>
                </CardContent>
            </Box>
    </Card>
    );
};

export default MovieCardCarousel