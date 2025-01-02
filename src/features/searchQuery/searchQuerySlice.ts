import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  countries: string;
  genreId: string;
  order: string;
  type: string;
  year: string;
  yearFrom: string;
  yearTo: string;
  page: number;
  keyword: string;
}

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
