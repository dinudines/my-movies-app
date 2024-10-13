import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchText: "",
    status: 'idle', // idle | loading | succeeded | failed
    error: '',
    result: [],
    page: 1,
    hasMore: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMovies = createAsyncThunk<any, { searchKey: string, page: number }>('movies/fetchMovies', async ({ searchKey, page }) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=bd2ee65&s=${searchKey}&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data;
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        resetMovies: (state) => {
            state.result = [];
            state.page = 1;
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovies.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            if(action.payload.Response === 'True') {
                state.status = 'succeeded';
                state.result = [...state.result, ...action.payload.Search];
                state.page += 1;
                state.hasMore = action.payload.Search.length > 0;
                state.error = ''
            } else {
                state.status = 'failed';
                state.error = action.payload.Error;
                state.page = 1;
            }
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error?.message || 'Something went wrong !';
        });
    },
});

export const { updateSearchText, resetMovies } = searchSlice.actions;
export default searchSlice;
