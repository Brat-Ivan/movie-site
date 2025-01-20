import { Box, Typography } from '@mui/material';

type Props = {
  rating: number;
};

export const Rating = ({ rating }: Props) => {
  const getRatingColor = (rating: number) => {
    return rating >= 7
      ? '--color-rating-high'
      : rating >= 5
        ? '--color-rating-medium'
        : '--color-rating-low';
  };

  return (
    <Box
      position="absolute"
      borderRadius={1}
      bgcolor={`var(${getRatingColor(rating)})`}
      padding="2px 10px"
      top={8}
      left={8}
    >
      <Typography
        width="30px"
        color="var(--color-white)"
        fontSize="18px"
        fontWeight="700"
        textAlign="center"
      >
        {rating.toFixed(1)}
      </Typography>
    </Box>
  );
};
