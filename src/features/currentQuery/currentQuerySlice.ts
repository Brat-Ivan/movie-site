import { createSlice } from '@reduxjs/toolkit';

import { CounterState } from '../../shared/types';

const initialState: Omit<CounterState, 'keyword'> = {
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
