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
}

const initialState: CounterState = {
  countries: '',
  genreId: '',
  order: '',
  type: '',
  year: '',
  yearFrom: '',
  yearTo: '',
  page: 1,
};

export const currentQuerySlice = createSlice({
  name: 'currentQuery',
  initialState,
  reducers: {
    filterQuery: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    resetQuery: () => ({
      ...initialState,
    }),
  },
});

export const { filterQuery, resetQuery } = currentQuerySlice.actions;

export default currentQuerySlice.reducer;
