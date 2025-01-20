import { Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ErrorNotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', m: 'auto' }}>
      <Typography
        variant="h2"
        component="h1"
        color="text.primary"
        sx={{
          p: { xs: '25px 0', md: '50px 0' },
          fontSize: { xs: '2.5rem', md: '3.75rem' },
        }}
      >
        404 - Not found
      </Typography>
      <Link
        variant="body1"
        component={RouterLink}
        color="primary"
        display="block"
        mb={8}
        to="/"
        sx={{ textDecoration: 'none' }}
      >
        Вернуться на главную страницу
      </Link>
    </Container>
  );
};
