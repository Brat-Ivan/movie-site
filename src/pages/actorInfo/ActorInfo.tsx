import { Box, Container, Grid2, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetStaffByIdQuery } from '../../shared/services';
import { ErrorMessage } from '../../widgets/errorMessage';
import { Loader } from '../../widgets/loader';

export const ActorInfo = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (error) return <ErrorMessage />;

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ p: '0 24px' }}>
      <Grid2
        container
        justifyContent="center"
        spacing={2}
        columnGap={5}
        sx={{ pt: 2, mt: { md: 2 }, mb: 4 }}
      >
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box
            width="296px"
            height="444px"
            sx={{
              objectFit: 'cover',
              m: { xs: '0 auto', lg: '0 auto 0 0' },
            }}
          >
            <img
              src={data.posterUrl}
              alt={data.nameRu}
              width="100%"
              height="100%"
            />
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Stack
            mb={4}
            sx={{
              textAlign: { xs: 'center', lg: 'left' },
            }}
          >
            <Typography variant="h5" component="h1" fontWeight="700">
              {data.nameRu || data.nameEn}
            </Typography>
            <Typography color="text.secondary">
              {data.nameRu && data.nameEn}
            </Typography>
          </Stack>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            mb={2}
            sx={{ textAlign: { xs: 'center', lg: 'left' } }}
          >
            Об актере
          </Typography>
          <Grid2
            container
            justifyContent="space-between"
            rowGap={1.5}
            columnGap={3}
          >
            <Grid2 size={4} textAlign="right">
              <Typography gutterBottom color="text.secondary">
                Карьера
              </Typography>
            </Grid2>
            <Grid2 size={5}>
              <Typography gutterBottom>{data.profession}</Typography>
            </Grid2>

            <Grid2 size={4} textAlign="right">
              <Typography gutterBottom color="text.secondary">
                Рост
              </Typography>
            </Grid2>
            <Grid2 size={5}>
              <Typography gutterBottom>
                {data?.growth ? data.growth : '—'}
              </Typography>
            </Grid2>

            <Grid2 size={4} textAlign="right">
              <Typography gutterBottom color="text.secondary">
                Дата рождения
              </Typography>
            </Grid2>
            <Grid2 size={5}>
              <Typography gutterBottom>
                {data.birthday?.split('-').reverse().join('.') || '—'}{' '}
                {data?.age ? '— ' + `${data.age}` + ' лет' : ''}
              </Typography>
            </Grid2>

            <Grid2 size={4} textAlign="right">
              <Typography gutterBottom color="text.secondary">
                Место рождения
              </Typography>
            </Grid2>
            <Grid2 size={5}>
              <Typography gutterBottom>
                {data?.birthplace ? data.birthplace : '—'}
              </Typography>
            </Grid2>

            <Grid2 size={4} textAlign="right">
              <Typography gutterBottom color="text.secondary">
                Всего фильмов
              </Typography>
            </Grid2>
            <Grid2 size={5}>
              <Typography gutterBottom>{data.films.length}</Typography>
            </Grid2>

            {data.facts.length !== 0 && (
              <Grid2 mt={4}>
                <Grid2 size={12}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    mb={2}
                    sx={{ textAlign: { xs: 'center', lg: 'left' } }}
                  >
                    Факты
                  </Typography>
                </Grid2>
                <Grid2
                  size={12}
                  color="background.default"
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: 'primary.main',
                    p: 1,
                  }}
                  mb={2}
                >
                  {data.facts.map((fact: string, index: number) => (
                    <Typography gutterBottom key={index}>
                      - {fact}
                    </Typography>
                  ))}
                </Grid2>
              </Grid2>
            )}
          </Grid2>
        </Grid2>
      </Grid2>

      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        textAlign="center"
        mb={2}
      >
        Фильмы
      </Typography>
      <Stack mb={5} sx={{ p: { md: '0 128px' } }}>
        <Stack direction="row" mb={1}>
          <Typography width={12} fontWeight="700" textAlign="end" mr={4}>
            №
          </Typography>
          <Typography fontWeight="700" mr={4}>
            Навзвание
          </Typography>
          <Typography fontWeight="700" ml="auto">
            Рейтинг
          </Typography>
        </Stack>
        {data.films.map(
          (film: Record<string, string | number>, index: number) => (
            <Stack key={index} direction="row">
              <Typography width={12} textAlign="end" mr={4}>
                {index + 1}
              </Typography>
              <Typography mr={4}>{film.nameRu || film.nameEn}</Typography>
              <Typography ml="auto">{film.rating}</Typography>
            </Stack>
          ),
        )}
      </Stack>
    </Container>
  );
};
