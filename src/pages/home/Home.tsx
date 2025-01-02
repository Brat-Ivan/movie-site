import { Box, Container, Link, Stack } from '@mui/material';
//@ts-expect-error Error: "Could not find a declaration file for module 'bear-react-carousel'" ts(7016)
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../shared/constants';
import { useMoviesQuery } from '../../shared/hooks/useMoviesQuery';
import { ErrorMessage } from '../../widgets/errorMessage';
import { Loader } from '../../widgets/loader';
import { Film } from './../../shared/types';

export const Home = () => {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
  } = useMoviesQuery();

  if (hasError) return <ErrorMessage />;

  if (isLoading) return <Loader />;

  const convertDataToSlide = (data: Film[] | undefined) =>
    data?.map((row: Film) => (
      <Box
        key={row.kinopoiskId}
        pr="16px"
        width="236px"
        height="calc(220px / 2 * 3)"
      >
        <RouterLink to={`${ROUTES.movie}/${row.kinopoiskId}`}>
          <BearSlideImage
            imageUrl={row.posterUrlPreview}
            width="100%"
            height="100%"
          />
        </RouterLink>
      </Box>
    ));

  const carouselArr = [
    {
      title: 'Топ популярных фильмов',
      url: ROUTES.popular,
      data: convertDataToSlide(responsePopular.data?.items),
    },
    {
      title: 'Топ лучших фильмов',
      url: ROUTES.best,
      data: convertDataToSlide(responseBest.data?.items),
    },
    {
      title: 'Фильмы',
      url: ROUTES.films,
      data: convertDataToSlide(responseFilms.data?.items),
    },
    {
      title: 'Сериалы',
      url: ROUTES.serials,
      data: convertDataToSlide(responseSerials.data?.items),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ p: { xl: '0 128px' }, mb: 5 }}>
      {carouselArr.map(carousel => (
        <Stack key={carousel.title} mb={5}>
          <Link
            variant="h4"
            component={RouterLink}
            to={carousel.url}
            sx={{
              mt: 2,
              mb: 2,
              width: 'fit-content',
              textDecoration: 'none',
              transition: 'opacity 0.3s',
              '&:hover': { opacity: '0.8' },
            }}
          >
            {carousel.title}
          </Link>
          <BearCarousel
            data={carousel.data}
            slidesPerView={1}
            slidesPerGroup={1}
            isEnableNavButton
            autoPlayTime={5000}
            isEnableAutoPlay
            isEnableLoop
            breakpoints={{
              375: {
                autoPlayTime: 0,
              },
              768: {
                slidesPerView: 5,
              },
            }}
            width="100%"
          />
        </Stack>
      ))}
    </Container>
  );
};
