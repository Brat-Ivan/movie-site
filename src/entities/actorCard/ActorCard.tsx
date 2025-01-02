import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
//@ts-expect-error Error: "Could not find a declaration file for module 'bear-react-carousel'" ts(7016)
import { BearSlideImage } from 'bear-react-carousel';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../shared/constants';
import { Staff } from '../../shared/types';

type Props = {
  actor: Staff;
};

export const ActorCard = ({ actor }: Props) => {
  const theme = useTheme();

  return (
    <Stack pr="16px">
      <RouterLink to={`${ROUTES.actor}/${actor.staffId}`}>
        <Box
          width="120px"
          height="180px"
          sx={{
            objectFit: 'cover',
            border: `2px solid ${theme.palette.primary.main}`,
          }}
          mb={1}
        >
          <BearSlideImage
            imageUrl={actor.posterUrl}
            width="100%"
            height="100%"
          />
        </Box>
      </RouterLink>
      <Link
        component={RouterLink}
        textAlign="center"
        to={`${ROUTES.actor}/${actor.staffId}`}
        sx={{ textDecoration: 'none' }}
      >
        <Typography
          maxWidth="120px"
          lineHeight={1.25}
          textAlign="center"
          sx={{
            transition: 'opacity 0.3s',
            '&:hover': {
              opacity: '0.8',
            },
          }}
        >
          {actor.nameRu || actor.nameEn}
        </Typography>
      </Link>
    </Stack>
  );
};
