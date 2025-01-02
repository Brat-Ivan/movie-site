import { Container, Stack, Typography } from '@mui/material';

import { CURRENT_YEAR } from '../../shared/constants';

export const Footer = () => {
  return (
    <Stack
      component="footer"
      sx={{
        background: theme => `${theme.palette.background.paper}`,
        padding: '16px 0',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: { md: '0 48px' },
        }}
      >
        <Typography
          color="text.secondary"
          sx={{ fontSize: { xs: '12px', sm: '14px' } }}
        >
          &copy; {CURRENT_YEAR}
          <br />
          &laquo;MovieSearch&raquo;
        </Typography>
        <Typography
          color="primary"
          sx={{
            textDecoration: 'none',
            fontSize: { xs: '24px', sm: '30px' },
            fontWeight: 700,
          }}
        >
          MovieSearch
        </Typography>
      </Container>
    </Stack>
  );
};
