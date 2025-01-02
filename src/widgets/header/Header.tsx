import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ProfileButton } from '../../features/profileButton';
import { Search } from '../../features/search';
import { ThemeSwitcher } from '../../features/theme';
import { Navbar } from '../navbar';
import { Menu as HamburgerMenu } from './../../features/menu';

export const Header = () => {
  const trigger = useScrollTrigger({
    target: window,
  });

  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar component="header" className="header" sx={{ padding: '5px 0' }}>
        <Container maxWidth="xl" sx={{ p: { xs: '0', md: '0 24px' } }}>
          <Toolbar>
            <IconButton
              size="large"
              sx={{ display: { xs: 'flex', sm: 'none' }, p: '4px', mr: '8px' }}
              onClick={() => setOpenMenu(prev => !prev)}
            >
              <HamburgerMenu openMenu={openMenu} />
            </IconButton>
            <Drawer
              variant="persistent"
              open={openMenu}
              anchor="right"
              sx={{
                display: { xs: 'inherit', sm: 'none' },
                '& .MuiDrawer-paper': {
                  width: '80%',
                  height: '100%',
                },
              }}
              onClick={() => setOpenMenu(prev => !prev)}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="50vh"
              >
                <Navbar />
              </Box>
            </Drawer>
            <Typography
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                fontSize: { xs: '20px', sm: '24px', md: '30px' },
                fontWeight: 700,
                padding: '4px',
              }}
              component={Link}
              to="/"
            >
              MovieSearch
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                padding: '4px',
                width: '40%',
              }}
            >
              <Navbar />
            </Box>
            <Box sx={{ flexGrow: 20 }} />
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setOpenSearch(prev => !prev)}
              sx={{ display: { xs: 'block', md: 'none' }, padding: '4px' }}
            >
              <SearchIcon sx={{ fontSize: '32px' }} />
            </IconButton>
            <Drawer
              open={openSearch}
              anchor="top"
              onClose={() => setOpenSearch(prev => !prev)}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  width: '100%',
                  height: '74px',
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="50vh"
              >
                <Search />
              </Box>
            </Drawer>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Search />
            </Box>
            <Box sx={{ flexGrow: { xs: 1, sm: 5 } }} />
            <ThemeSwitcher />
            <Box sx={{ flexGrow: { xs: 1, sm: 5 } }} />
            <ProfileButton />
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};
