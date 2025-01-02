import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../shared/constants';
import { SequelsAndPrequelsDataElement } from '../../shared/types';

type Props = {
  movie: SequelsAndPrequelsDataElement;
};

export const SequelsAndPrequelsCard = ({ movie }: Props) => {
  const theme = useTheme();

  return (
    <Stack alignItems="center" mb={5}>
      <RouterLink to={`${ROUTES.movie}/${movie.kinopoiskId}`}>
        <Box
          sx={{
            position: 'relative',
            width: '220px',
            height: '330px',
            mb: '16px',
            transition: 'transform 0.5s, box-shadow 0.5s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: `1px 1px 5px 1px ${theme.palette.primary.main}`,
            },
          }}
        >
          <img
            src={movie.posterUrlPreview}
            alt={movie.nameRu}
            width="100%"
            height="100%"
          />
        </Box>
      </RouterLink>
      <Link
        component={RouterLink}
        textAlign="center"
        to={`${ROUTES.movie}/${movie.kinopoiskId}`}
        sx={{ textDecoration: 'none' }}
      >
        <Typography
          sx={{
            overflowY: 'hidden',
            width: '200px',
            maxHeight: '40px',
            lineHeight: 1.25,
            transition: 'opacity 0.3s',
            '&:hover': {
              opacity: '0.8',
            },
          }}
        >
          {movie.nameRu || movie.nameEn || movie.nameOriginal}
        </Typography>
      </Link>
    </Stack>
  );
};
