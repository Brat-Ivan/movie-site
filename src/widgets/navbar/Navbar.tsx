import { Link, List, ListItem, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../shared/constants';

export const Navbar = () => {
  return (
    <Stack component="nav" width="70%" margin="0 auto">
      <List
        sx={{
          display: 'flex',
          flexDirection: { sm: 'row', xs: 'column' },
          rowGap: 4,
          columnGap: 2,
          width: '100%',
          fontSize: { xs: '20px', sm: '16px', md: '18px' },
        }}
      >
        <ListItem sx={{ padding: 0, justifyContent: 'center' }}>
          <Link
            component={RouterLink}
            to={ROUTES.home}
            sx={{
              textDecoration: 'none',
              color: { sm: '#fff', xs: 'primary' },
            }}
          >
            Главная
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0, justifyContent: 'center' }}>
          <Link
            component={RouterLink}
            to={ROUTES.films}
            sx={{
              textDecoration: 'none',
              color: { sm: '#fff', xs: 'primary' },
            }}
          >
            Фильмы
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0, justifyContent: 'center' }}>
          <Link
            component={RouterLink}
            to={ROUTES.serials}
            sx={{
              textDecoration: 'none',
              color: { sm: '#fff', xs: 'primary' },
            }}
          >
            Сериалы
          </Link>
        </ListItem>
      </List>
    </Stack>
  );
};
