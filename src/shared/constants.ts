import { Lists } from './types';

export const KINOPOISK_API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export const CURRENT_YEAR = new Date().getFullYear();
export const LEAST_YEAR = 1890;

export const enum ROUTES {
  home = '/',
  movie = '/movie',
  actor = '/actor',
  popular = '/popular',
  best = '/best',
  films = '/films',
  serials = '/serials',
  signIn = '/sign_in',
  signUp = '/sign_up',
  user = '/user',
  error = '*',
}

export const TOP_LISTS: Lists = [
  {
    title: 'Топ полулярных фильмов',
    url: ROUTES.popular,
    value: 'TOP_POPULAR_MOVIES',
  },
  {
    title: 'Топ лучших фильмов',
    url: ROUTES.best,
    value: 'TOP_250_MOVIES',
  },
];

export const MOVIE_LISTS: Lists = [
  {
    title: 'Фильмы',
    url: ROUTES.films,
    value: 'FILM',
  },
  {
    title: 'Сериалы',
    url: ROUTES.serials,
    value: 'TV_SERIES',
  },
];
