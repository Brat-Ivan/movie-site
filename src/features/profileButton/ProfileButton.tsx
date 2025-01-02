import { AccountCircle } from '@mui/icons-material';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../shared/constants';

export const ProfileButton = () => {
  const storedAuthorizedUser = localStorage.getItem('authorized_user');
  const authorizedUser = storedAuthorizedUser
    ? JSON.parse(storedAuthorizedUser)
    : '';

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  return (
    <>
      {!authorizedUser && (
        <div>
          <IconButton
            size="large"
            color="inherit"
            sx={{ padding: '4px' }}
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              setAnchorEl(e.currentTarget)
            }
          >
            <AccountCircle sx={{ fontSize: '32px' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            disableScrollLock
            onClose={() => setAnchorEl(null)}
            sx={{ top: '40px' }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                navigate(ROUTES.signIn);
              }}
            >
              Вход
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                navigate(ROUTES.signUp);
              }}
            >
              Регистрация
            </MenuItem>
          </Menu>
        </div>
      )}
      {authorizedUser && (
        <div>
          <IconButton
            size="large"
            color="inherit"
            sx={{ padding: '4px' }}
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              setAnchorEl(e.currentTarget)
            }
          >
            <Avatar
              sx={{
                width: { xs: '32px', sm: '40px' },
                height: { xs: '32px', sm: '40px' },
                fontSize: { xs: '20px', sm: '24px' },
              }}
            >
              {authorizedUser[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            disableScrollLock
            onClose={() => setAnchorEl(null)}
            sx={{ top: '40px' }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                navigate(ROUTES.user);
              }}
            >
              Профиль
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                localStorage.removeItem('authorized_user');
                navigate(ROUTES.home);
              }}
            >
              Выйти
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};
