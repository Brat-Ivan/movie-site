import { Box, Typography } from '@mui/material';

type Props = {
  rating: number;
};

export const Rating = ({ rating }: Props) => {
  return (
    <Box
      position="absolute"
      borderRadius={1}
      bgcolor={
        rating >= 7
          ? 'var(--color-rating-high)'
          : rating >= 5
            ? 'var(--color-rating-medium)'
            : 'var(--color-rating-low)'
      }
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
