import {
  AppBar,
  Avatar,
  Box,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { MovieCard } from '../../entities/movieCard';
import { CustomTabPanel } from '../../features/customTabPanel';
import { Film, User } from '../../shared/types';

export const Profile = () => {
  const storedAuthorizedUser = localStorage.getItem('authorized_user');
  const authorizedUser = storedAuthorizedUser
    ? JSON.parse(storedAuthorizedUser)
    : '';

  const storedUsers = localStorage.getItem('users');
  const users = storedUsers ? JSON.parse(storedUsers) : [];

  const currentUserInfo =
    users[
      storedUsers
        ? JSON.parse(storedUsers).findIndex(
            (user: User) => user.username === authorizedUser,
          )
        : null
    ];

  const watchedMovies = currentUserInfo?.watchedMovies || [];
  const favoriteMovies = currentUserInfo?.favoriteMovies || [];

  const [value, setValue] = useState(0);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ p: { xl: '0 128px' } }}>
      <Stack
        display="flex"
        direction="row"
        justifyContent="center"
        alignItems="center"
        columnGap={4}
        p="64px 0"
      >
        <Avatar
          sx={{
            width: { xs: '64px', sm: '128px' },
            height: { xs: '64px', sm: '128px' },
            fontSize: { xs: '48px', sm: '96px' },
          }}
        >
          {authorizedUser[0].toUpperCase()}
        </Avatar>
        <Typography variant="h3" component="p">
          {authorizedUser}
        </Typography>
      </Stack>
      <Box>
        <AppBar
          position="static"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            color="secondary"
            centered
          >
            <Tab
              label="Просмотренные фильмы"
              sx={{ maxWidth: '50%', width: '50%' }}
            />
            <Tab
              label="Избранные фильмы"
              sx={{ maxWidth: '50%', width: '50%' }}
            />
          </Tabs>
        </AppBar>
        <CustomTabPanel value={value} index={0}>
          {watchedMovies.reverse().map((movie: Film) => (
            <MovieCard key={movie.kinopoiskId} movie={movie} />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {favoriteMovies.reverse().map((movie: Film) => (
            <MovieCard key={movie.kinopoiskId} movie={movie} />
          ))}
        </CustomTabPanel>
      </Box>
    </Container>
  );
};
