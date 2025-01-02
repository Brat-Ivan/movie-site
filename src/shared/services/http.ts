import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError } from 'axios';

import { KINOPOISK_API_KEY } from '../constants';
import { FilmsList, GenresAndCountries, SequelsAndPrequels } from '../types';

const excludeGenres = [
  '',
  'для взрослых',
  'игра',
  'концерт',
  'новости',
  'реальное ТВ',
  'ток-шоу',
  'церемония',
];

const axiosBaseQuery = async (url: string) => {
  try {
    const result = await axios({
      url: `https://kinopoiskapiunofficial.tech/api${url}`,
      headers: {
        'X-API-KEY': KINOPOISK_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data,
      },
    };
  }
};

export const http = createApi({
  reducerPath: 'http',
  baseQuery: axiosBaseQuery,
  endpoints: builder => ({
    getFilmsTop: builder.query<FilmsList, { type: string; page: number }>({
      query: ({ type, page }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),

    getFilms: builder.query<
      FilmsList,
      {
        countries: string;
        genreId: string;
        order: string;
        type: string;
        year: string;
        page: number;
      }
    >({
      query: ({ countries, genreId, order, type, year, page }) =>
        `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&year=${year}&page=${page}`,
    }),

    getFilteredFilms: builder.query<
      FilmsList,
      {
        countries: string;
        genreId: string;
        order: string;
        type: string;
        yearFrom: string;
        yearTo: string;
        page: number;
      }
    >({
      query: ({ countries, genreId, order, type, yearFrom, yearTo, page }) =>
        `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${yearFrom}&yearTo=${yearTo}&page=${page}`,
    }),

    getFilmsByKeyword: builder.query<
      FilmsList,
      {
        countries: string;
        genreId: string;
        order: string;
        type: string;
        year: string;
        page: number;
        keyword: string;
      }
    >({
      query: ({ countries, genreId, order, type, year, page, keyword = '' }) =>
        `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&year=${year}&page=${page}&keyword=${keyword}`,
    }),

    getGenresAndCountries: builder.query({
      query: () => `/v2.2/films/filters`,
      transformResponse: (response: GenresAndCountries) => ({
        ...response,
        genres: response.genres.filter(
          ({ genre }) => !excludeGenres.includes(genre),
        ),
      }),
    }),

    getFilm: builder.query({
      query: id => `/v2.2/films/${id}`,
    }),

    getTrailer: builder.query({
      query: id => `/v2.2/films/${id}/videos`,
    }),

    getSequelsAndPrequels: builder.query({
      query: id => `/v2.1/films/${id}/sequels_and_prequels`,
      transformResponse: (response: SequelsAndPrequels) =>
        response.map(el => ({ ...el, kinopoiskId: el.filmId })),
    }),

    getStaffByFilmId: builder.query({
      query: id => `/v1/staff?filmId=${id}`,
    }),

    getStaffById: builder.query({
      query: id => `/v1/staff/${id}`,
    }),
  }),
});

export const {
  useGetFilmsTopQuery,
  useGetFilmsQuery,
  useGetFilteredFilmsQuery,
  useGetFilmsByKeywordQuery,
  useGetGenresAndCountriesQuery,
  useGetFilmQuery,
  useGetTrailerQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffByFilmIdQuery,
  useGetStaffByIdQuery,
} = http;
