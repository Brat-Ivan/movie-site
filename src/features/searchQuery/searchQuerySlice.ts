import { createSlice } from '@reduxjs/toolkit';

import { CounterState } from '../../shared/types';

const initialState: CounterState = {
  countries: '',
  genreId: '',
  order: 'NUM_VOTE',
  type: '',
  year: '',
  yearFrom: '',
  yearTo: '',
  page: 1,
  keyword: '',
};

export const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setSearchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
