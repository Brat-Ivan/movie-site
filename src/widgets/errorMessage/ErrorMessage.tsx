import { Container, Typography } from '@mui/material';

export const ErrorMessage = () => {
  return (
    <Container maxWidth="xl" sx={{ p: '0 24px', margin: 'auto' }}>
      <Typography variant="h6" component="p" textAlign="center" color="error">
        Произошла ошибка. Попробуйте обновить страницу или вернуться позже
      </Typography>
    </Container>
  );
};
