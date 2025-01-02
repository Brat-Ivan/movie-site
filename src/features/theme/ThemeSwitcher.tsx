import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { toggleTheme } from './themeSlice';

export const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === 'dark',
  );

  return (
    <IconButton
      size="large"
      color="inherit"
      sx={{
        padding: '4px',
        fontSize: '10px',
      }}
      onClick={() => dispatch(toggleTheme())}
    >
      {isDarkMode ? (
        <LightModeIcon sx={{ fontSize: '26px' }} />
      ) : (
        <ModeNightIcon sx={{ fontSize: '26px' }} />
      )}
    </IconButton>
  );
};
