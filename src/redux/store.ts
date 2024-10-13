import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../models/SearchModel';

const store = configureStore({
    reducer: {
        search: searchSlice.reducer
    }
});

export default store;