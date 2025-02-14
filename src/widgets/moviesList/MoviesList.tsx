import { Pagination, Stack, useMediaQuery, useTheme } from '@mui/material';

import { MovieCard } from '../../entities/movieCard';
import { Film } from '../../shared/types';

type Props = {
  movies: Film[];
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const MoviesList = (props: Props) => {
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        columnGap="24px"
        padding="0 48px"
      >
        {props.movies.map(movie => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </Stack>
      <Stack alignItems="center">
        <Pagination
          count={props.totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
          size={isSmallScreen ? 'medium' : 'large'}
          siblingCount={0}
          boundaryCount={1}
          page={props.page}
          onChange={handlePageChange}
          sx={{ p: '24px 0 32px' }}
        />
      </Stack>
    </>
  );
};
