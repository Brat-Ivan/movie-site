import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
//@ts-expect-error Error: "Could not find a declaration file for module 'bear-react-carousel'" ts(7016)
import BearCarousel from 'bear-react-carousel';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ActorCard } from '../../entities/actorCard';
import { SequelsAndPrequelsCard } from '../../entities/sequelsAndPrequelsCard';
import { ROUTES } from '../../shared/constants';
import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffByFilmIdQuery,
  useGetTrailerQuery,
} from '../../shared/services';
import { Film, Staff, User } from '../../shared/types';
import { ErrorMessage } from '../../widgets/errorMessage';
import { Loader } from '../../widgets/loader';

export const MovieInfo = () => {
  const { id } = useParams();

  const responseFilm = useGetFilmQuery(id);
  const responseTrailer = useGetTrailerQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffByFilmIdQuery(id);

  const [directors, setDirectors] = useState<Staff[]>([]);

  useEffect(() => {
    if (responseStaff.data) {
      const filteredDirectors = responseStaff.data
        .filter((el: Staff) => el.professionText === 'Режиссеры')
        .slice(0, 3);

      setDirectors(filteredDirectors.length ? filteredDirectors : []);
    }
  }, [responseStaff.data]);

  const navigate = useNavigate();

  const storedAuthorizedUser = localStorage.getItem('authorized_user');
  const authorizedUser = storedAuthorizedUser
    ? JSON.parse(storedAuthorizedUser)
    : '';

  const storedUsers = localStorage.getItem('users');
  const users = storedUsers ? JSON.parse(storedUsers) : [];

  const getUserIndex = () =>
    storedUsers
      ? JSON.parse(storedUsers).findIndex(
          (user: User) => user.username === authorizedUser,
        )
      : null;

  const currentUserInfo = users[getUserIndex()];

  const trailer = responseTrailer?.data?.items?.find(
    (trailer: Record<string, string>) => trailer.site === 'YOUTUBE',
  );

  const watchedMovies = currentUserInfo?.watchedMovies || [];
  const favoriteMovies = currentUserInfo?.favoriteMovies || [];

  const [isWatched, setIsWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getWatchedMovieIndex = () =>
    watchedMovies.findIndex(
      (movie: Film) => movie.kinopoiskId === responseFilm.data.kinopoiskId,
    );

  const getFavoriteMovieIndex = () =>
    favoriteMovies.findIndex(
      (movie: Film) => movie.kinopoiskId === responseFilm.data.kinopoiskId,
    );

  useEffect(() => {
    if (responseFilm.data) {
      setIsWatched(getWatchedMovieIndex() >= 0);
    }
  }, [responseFilm.data]);

  useEffect(() => {
    if (responseFilm.data) {
      setIsFavorite(getFavoriteMovieIndex() >= 0);
    }
  }, [responseFilm.data]);

  const addToWatchedMovies = () => {
    setIsWatched(!isWatched);

    if (isWatched) {
      watchedMovies.splice(getWatchedMovieIndex(), 1);
    } else {
      watchedMovies.push(responseFilm.data);
    }

    currentUserInfo.watchedMovies = watchedMovies;
    localStorage.setItem('users', JSON.stringify(users));
  };

  const addToFavoriteMovies = () => {
    setIsFavorite(!isFavorite);

    if (isFavorite) {
      favoriteMovies.splice(getFavoriteMovieIndex(), 1);
    } else {
      favoriteMovies.push(responseFilm.data);
    }

    currentUserInfo.favoriteMovies = favoriteMovies;
    localStorage.setItem('users', JSON.stringify(users));
  };

  const convertDataToSlide = (data: Staff[] | undefined) =>
    data
      ?.filter((el: Staff) => el.professionText === 'Актеры')
      .map((actor: Staff) => <ActorCard key={actor.staffId} actor={actor} />);

  if (
    responseFilm.isLoading ||
    responseTrailer.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return <Loader />;
  }

  if (responseFilm.error) return <ErrorMessage />;

  return (
    <Container maxWidth="xl" sx={{ p: '0 24px' }}>
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2, mb: 4 }}
      >
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <Box
            sx={{
              maxWidth: '400px',
              width: '100%',
              aspectRatio: '2/3',
              m: { xs: '0 auto 24px', lg: '0 0 32px' },
            }}
          >
            <img
              src={responseFilm.data.posterUrl}
              alt={responseFilm.data.nameRu}
              width="100%"
              height="100%"
            />
          </Box>
          <Stack
            maxWidth={'400px'}
            rowGap={2}
            sx={{ m: { xs: '0 auto', lg: '0' } }}
          >
            {trailer && (
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '16/9',
                  m: { xs: '0 auto', lg: '0' },
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.url
                    .split('/')
                    .pop()
                    .replace('watch?v=', '')}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </Box>
            )}
            <Button
              variant="contained"
              color={isWatched ? 'success' : 'primary'}
              onClick={() =>
                authorizedUser ? addToWatchedMovies() : navigate(ROUTES.signIn)
              }
            >
              {isWatched ? 'Просмотрено' : 'Добавить в "Просмотренные"'}
            </Button>
            <Button
              variant="contained"
              color={isFavorite ? 'success' : 'primary'}
              onClick={() =>
                authorizedUser ? addToFavoriteMovies() : navigate(ROUTES.signIn)
              }
            >
              {isFavorite ? 'В "Избранном"' : 'Добавить в "Избранное"'}
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={{ lg: 6, sm: 12 }}>
          <Grid2 container>
            <Grid2 size={12}>
              <Typography
                variant="h5"
                component="h1"
                fontWeight="700"
                m="0 auto 32px"
                sx={{
                  maxWidth: { xs: '400px', lg: 'none' },
                  textAlign: { xs: 'center', lg: 'left' },
                }}
              >
                {responseFilm.data.nameRu ||
                  responseFilm.data.nameEn ||
                  responseFilm.data.nameOriginal}
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2
            container
            display="flex"
            justifyContent="space-between"
            rowGap={1.5}
            columnGap={3}
          >
            <Grid2 size={4}>
              <Typography textAlign="right" color="text.secondary">
                Год
              </Typography>
            </Grid2>
            <Grid2 size={5}>
              <Typography gutterBottom>
                {responseFilm?.data?.year ? responseFilm.data.year : '—'}
              </Typography>
            </Grid2>

            <Grid2 size={4} textAlign="right">
              <Typography color="text.secondary">Страна</Typography>
            </Grid2>
            <Grid2 size={5}>
              {responseFilm.data.countries.length ? (
                responseFilm.data.countries.map(
                  ({ country }: Record<string, string>) => (
                    <Typography gutterBottom key={country}>
                      {country}
                    </Typography>
                  ),
                )
              ) : (
                <Typography gutterBottom>—</Typography>
              )}
            </Grid2>

            <Grid2 size={4} textAlign="right">
              <Typography color="text.secondary">Жанр</Typography>
            </Grid2>
            <Grid2 size={5}>
              {responseFilm.data.genres.length ? (
                responseFilm.data.genres.map(
                  ({ genre }: Record<string, string>) => (
                    <Typography gutterBottom key={genre}>
                      {genre}
                    </Typography>
                  ),
                )
              ) : (
                <Typography gutterBottom>—</Typography>
              )}
            </Grid2>

            <Grid2 size={4} textAlign="right">
              <Typography color="text.secondary">Режиссер</Typography>
            </Grid2>
            <Grid2 size={5}>
              {directors.length > 0
                ? directors.map(({ nameRu, nameEn }) => (
                    <Typography gutterBottom key={nameRu}>
                      {nameRu || nameEn}
                    </Typography>
                  ))
                : '—'}
            </Grid2>

            <Grid2 size={4} textAlign="right">
              <Typography color="text.secondary">Время</Typography>
            </Grid2>
            <Grid2 size={5}>
              <Typography gutterBottom>
                {responseFilm.data.filmLength
                  ? `${responseFilm.data.filmLength} минут`
                  : '—'}
              </Typography>
            </Grid2>

            <Grid2 size={12} pt={4}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ textAlign: { xs: 'center', lg: 'left' } }}
              >
                Описание
              </Typography>
            </Grid2>
            <Grid2 size={12}>
              <Typography
                gutterBottom
                color="background.default"
                sx={{
                  borderRadius: '8px',
                  backgroundColor: 'primary.main',
                  p: 1,
                }}
              >
                {responseFilm.data.description || 'Описание отсутствует'}
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>

      {responseStaff.data && (
        <Stack alignItems="center" mb={4}>
          <Typography variant="h5" component="h2" mb={2}>
            Актеры
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            width="100%"
            height="230px"
            sx={{
              p: { xl: '0 128px' },
              '& .bear-react-carousel__container': { justifyContent: 'center' },
            }}
          >
            <BearCarousel
              data={convertDataToSlide(responseStaff.data)}
              slidesPerView={3}
              slidesPerGroup={3}
              isEnableNavButton
              breakpoints={{
                767: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                },
                1279: {
                  slidesPerView: 8,
                  slidesPerGroup: 8,
                },
              }}
            />
          </Stack>
        </Stack>
      )}

      {responseSequelsAndPrequels.data && (
        <Stack alignItems="center">
          <Typography variant="h5" component="h2" mb={2}>
            Сиквелы и приквелы
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ columnGap: 3 }}
          >
            {responseSequelsAndPrequels.data.map(el => (
              <SequelsAndPrequelsCard key={el.kinopoiskId} movie={el} />
            ))}
          </Stack>
        </Stack>
      )}
    </Container>
  );
};
