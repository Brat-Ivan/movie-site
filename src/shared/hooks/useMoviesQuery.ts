import { useSelector } from 'react-redux';

import type { RootState } from '../../app/store';
import { TOP_LISTS } from '../../shared/constants';
import {
  useGetFilmsQuery,
  useGetFilmsTopQuery,
  useGetFilteredFilmsQuery,
} from '../../shared/services';

export const useMoviesQuery = () => {
  const { countries, order, year, yearFrom, yearTo, page } = useSelector(
    (state: RootState) => state.currentQuery,
  );

  const responsePopular = useGetFilmsTopQuery({
    type: TOP_LISTS[0].value,
    page,
  });

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LISTS[1].value,
    page,
  });

  const responseFilms = useGetFilmsQuery({
    countries,
    genreId: '1',
    order,
    type: 'FILM',
    year,
    page,
  });

  const responseSerials = useGetFilmsQuery({
    countries,
    genreId: '1',
    order,
    type: 'TV_SERIES',
    year,
    page,
  });

  const responseFiltered = useGetFilteredFilmsQuery({
    countries,
    genreId: '1',
    order,
    type: 'TV_SERIES',
    yearFrom,
    yearTo,
    page,
  });

  const isLoading =
    responsePopular.isFetching ||
    responseBest.isFetching ||
    responseFilms.isFetching ||
    responseSerials.isFetching ||
    responseFiltered.isFetching;

  const hasError =
    responsePopular.error ||
    responseBest.error ||
    responseFilms.error ||
    responseSerials.error ||
    responseFiltered.error;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseFiltered,
  };
};
