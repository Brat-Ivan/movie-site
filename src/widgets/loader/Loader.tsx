import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" margin="auto">
      <CircularProgress size="8rem" />
    </Box>
  );
};
