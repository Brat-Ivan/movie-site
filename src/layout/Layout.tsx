import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Footer } from '../widgets/footer';
import { Header } from '../widgets/header';

export const Layout = () => (
  <Stack
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100vh',
    }}
  >
    <Header />
    <Stack
      component="main"
      flexGrow="1"
      sx={{ pt: { xs: '66px', sm: '74px' } }}
    >
      <Outlet />
    </Stack>
    <Footer />
  </Stack>
);
