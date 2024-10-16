import { FunctionComponent, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, Box, InputBase, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSearchText } from '../models/SearchModel';

type StickyHeaderProps = object

const StickyHeader: FunctionComponent<StickyHeaderProps> = () => {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    const clearSearch = () => {
        setSearchText('');
        setSearchVisible(false);
        dispatch(updateSearchText(''));
    };

    const handleAppClick = () => {
        clearSearch();
        navigate('/my-movies-app/');
    }

    const handleFavClick = () => {
        navigate('/my-movies-app/favourites');
    }

    return (
        <AppBar position="sticky" className='sticky_header_main'>
            <Toolbar>
                <Container style={{ display: 'flex', maxWidth: '1920px' }}> 
                    <Typography variant="h6" onClick={handleAppClick} style={{ color: 'inherit', textDecoration: 'none', marginLeft: '-2rem', cursor: 'pointer' }}>
                        My Movies App
                    </Typography>
                    <div style={{ marginLeft: 'auto' }}> 
                        {isSearchVisible && (
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '25rem', maxWidth: '80%' }}>
                                <InputBase
                                    placeholder="search…"
                                    value={searchText}
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                        dispatch(updateSearchText(e.target.value));
                                    }}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        paddingLeft: 1,
                                        paddingRight: 1,
                                        marginRight: 1,
                                        flexGrow: 1,
                                        width: '100%'
                                    }}
                                />
                                <IconButton onClick={clearSearch} style={{ backgroundColor: 'white', transform: 'scale(0.75)' }}>
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        )}
                        {!isSearchVisible && ['/my-movies-app', '/my-movies-app/'].includes(location.pathname) && ( 
                            <>
                                <IconButton edge="end" color="inherit" aria-label="search" onClick={toggleSearch}>
                                    <SearchIcon />
                                </IconButton>
                                <Tooltip title="My Favourites" arrow>
                                    <IconButton color="inherit" onClick={handleFavClick}>
                                        <FavoriteIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default StickyHeader;