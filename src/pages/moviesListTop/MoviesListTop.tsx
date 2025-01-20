import { ArrowBack } from '@mui/icons-material';
import {
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TOP_LISTS } from '../../shared/constants';
import { useGetFilmsTopQuery } from '../../shared/services';
import { ErrorMessage } from '../../widgets/errorMessage';
import { Loader } from '../../widgets/loader';
import { MoviesList } from '../../widgets/moviesList';

export const MoviesListTop = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const movieType = TOP_LISTS.find(el => el.url === location.pathname);

  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: movieType!.value,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (error) return <ErrorMessage />;

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ p: '0 24px' }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        pt={2}
        pl={{ sm: 0, md: 8, xl: 11 }}
        mb={2}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack
            sx={{
              color: 'primary.main',
              transition: 'opacity 0.3s',
            }}
          />
        </IconButton>
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'}
          component="h1"
          color="text.primary"
        >
          {movieType?.title}
        </Typography>
      </Stack>
      <MoviesList
        movies={data!.items}
        totalPages={data!.totalPages}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};
