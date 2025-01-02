import { Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ErrorNotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography
        variant="h2"
        component="h1"
        color="text.primary"
        sx={{
          p: { xs: '100px 0 25px', sm: '200px 0 50px' },
          fontSize: { xs: '2.5rem', sm: '3.75rem' },
        }}
      >
        404 - Not found
      </Typography>
      <Link
        variant="body1"
        component={RouterLink}
        color="primary"
        to="/"
        sx={{ textDecoration: 'none' }}
      >
        Вернуться на главную страницу
      </Link>
    </Container>
  );
};
