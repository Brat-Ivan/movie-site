import { configureStore } from '@reduxjs/toolkit';

import currentQueryReducer from '../features/currentQuery';
import searchQueryReducer from '../features/searchQuery';
import themeReducer from '../features/theme';
import { http } from '../shared/services';

export const store = configureStore({
  reducer: {
    [http.reducerPath]: http.reducer,
    currentQuery: currentQueryReducer,
    searchQuery: searchQueryReducer,
    theme: themeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(http.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
