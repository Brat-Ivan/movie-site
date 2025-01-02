import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { filterQuery, resetQuery } from '../../../src/features/currentQuery';
import { CURRENT_YEAR, LEAST_YEAR } from '../../shared/constants';

type Props = {
  countriesList: {
    id: number;
    country: string;
  }[];
  genresList: {
    id: number;
    genre: string;
  }[];
  countries: string;
  order: string;
  yearFrom: string;
  yearTo: string;
  genreId: string;
};

export const Filters = (props: Props) => {
  const dispatch = useDispatch();

  const orderList = [
    { title: 'По рейтингу', value: 'RATING' },
    { title: 'По количеству голосов', value: 'NUM_VOTE' },
  ];

  const yearList = new Array(CURRENT_YEAR - LEAST_YEAR + 1)
    .fill(null)
    .map((_, index) => ({
      value: CURRENT_YEAR - index,
    }));

  const [order, setOrder] = useState<string>(props.order);
  const [country, setCountry] = useState<string>(props.countries);
  const [genre, setGenre] = useState<string>(props.genreId);
  const [yearFrom, setYearFrom] = useState<string>(props.yearFrom);
  const [yearTo, setYearTo] = useState<string>(props.yearTo);

  const handleApplyFilters = () => {
    dispatch(
      filterQuery({
        order: order,
        countries: country,
        genreId: genre,
        yearFrom: yearFrom,
        yearTo: yearTo,
      }),
    );
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        p: { xs: 0 },
        margin: '16px auto 32px',
      }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Порядок</InputLabel>
        <Select value={order} onChange={e => setOrder(e.target.value)}>
          {orderList.map(order => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Страна</InputLabel>
        <Select value={country} onChange={e => setCountry(e.target.value)}>
          {props.countriesList.map(
            (country: { id: number; country: string }) => (
              <MenuItem key={country.id} value={country.id}>
                {country.country}
              </MenuItem>
            ),
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select value={genre} onChange={e => setGenre(e.target.value)}>
          {props.genresList.map((genre: { id: number; genre: string }) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Год с</InputLabel>
        <Select value={yearFrom} onChange={e => setYearFrom(e.target.value)}>
          {yearList.map((year: { value: number }) => (
            <MenuItem key={year.value} value={year.value}>
              {year.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Год по</InputLabel>
        <Select value={yearTo} onChange={e => setYearTo(e.target.value)}>
          {yearList.map((year: { value: number }) => (
            <MenuItem key={year.value} value={year.value}>
              {year.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" columnGap={2}>
        <Button variant="outlined" onClick={handleApplyFilters}>
          Применить
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setOrder('');
            setCountry('');
            setGenre('');
            setYearFrom('');
            setYearTo('');
            dispatch(resetQuery());
          }}
        >
          Сброс
        </Button>
      </Box>
    </Container>
  );
};
