import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../models/searchModel';

const store = configureStore({
    reducer: {
        search: searchSlice.reducer
    }
});

export default store;