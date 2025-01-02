import { ArrowBack } from '@mui/icons-material';
import { Container, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from '../../app/store';
import { Filters } from '../../features/filters';
import { MOVIE_LISTS } from '../../shared/constants';
import {
  useGetFilteredFilmsQuery,
  useGetGenresAndCountriesQuery,
} from '../../shared/services';
import { ErrorMessage } from '../../widgets/errorMessage';
import { Loader } from '../../widgets/loader';
import { MoviesList } from '../../widgets/moviesList';

export const MoviesListMain = () => {
  const location = useLocation();

  const { countries, order, yearFrom, yearTo, genreId } = useSelector(
    (state: RootState) => state.currentQuery,
  );

  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);

  const responseFilms = useGetFilteredFilmsQuery({
    type: movieType!.value,
    countries,
    order,
    yearFrom,
    yearTo,
    genreId,
    page,
  });

  const responseGenresAndCountries = useGetGenresAndCountriesQuery({});

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilms.error || responseGenresAndCountries.error)
    return <ErrorMessage />;

  if (responseFilms.isLoading || responseGenresAndCountries.isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="xl" sx={{ p: '0 24px' }}>
      <Stack flexDirection="row" pt={2} pl={11} mb={2}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack
            sx={{
              color: 'primary.main',
              transition: 'opacity 0.3s',
            }}
          />
        </IconButton>
        <Typography variant="h4" component="h1" color="text.primary">
          {movieType?.title}
        </Typography>
      </Stack>
      <Filters
        countriesList={responseGenresAndCountries.data!.countries}
        genresList={responseGenresAndCountries.data!.genres}
        countries={countries}
        order={order}
        yearFrom={yearFrom}
        yearTo={yearTo}
        genreId={genreId}
      />
      <MoviesList
        movies={responseFilms.data!.items}
        totalPages={responseFilms.data!.totalPages}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};
