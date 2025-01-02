import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../app/store';
import { ROUTES } from '../../shared/constants';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useGetFilmsByKeywordQuery } from '../../shared/services';

const movieTypes: Record<string, string> = {
  FILM: 'фильм',
  TV_SERIES: 'сериал',
  TV_SHOW: 'телешоу',
  MINI_SERIES: 'мини-сериал',
};

export const Search = () => {
  const theme = useTheme();

  const [input, setInput] = useState('');

  const navigate = useNavigate();

  const { countries, genreId, order, type, year, page, keyword } = useSelector(
    (state: RootState) => state.searchQuery,
  );

  const { data, isFetching } = useGetFilmsByKeywordQuery({
    countries,
    genreId,
    order,
    type,
    year,
    page,
    keyword,
  });

  useDebounce(input, 300);

  return (
    <Autocomplete
      freeSolo
      getOptionLabel={option => {
        return typeof option === 'string'
          ? option
          : `${option.nameRu || option.nameEn || option.nameOriginal} ${
              option.type ? `(${movieTypes[option.type]})` : ''
            }${option.year ? `, ${option.year}` : ''}`;
      }}
      options={data ? data.items : []}
      onInputChange={(_, value) => setInput(value)}
      onChange={(_, value) =>
        value && typeof value !== 'string'
          ? navigate(`${ROUTES.movie}/${value.kinopoiskId}`)
          : null
      }
      renderInput={params => (
        <TextField
          {...params}
          label="Поиск"
          size="small"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isFetching ? (
                    <CircularProgress
                      size={16}
                      sx={{
                        position: 'absolute',
                        right: '40px',
                        color: `${theme.palette.text.secondary}`,
                      }}
                    />
                  ) : null}
                  <SearchIcon
                    sx={{
                      position: 'absolute',
                      right: '12px',
                      color: `${theme.palette.text.secondary}`,
                    }}
                  />
                </React.Fragment>
              ),
              type: 'search',
            },
          }}
        />
      )}
      sx={{
        width: { md: '240px', xl: '300px' },
        borderRadius: '8px',
        backgroundColor: 'background.default',
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'text.primary',
          },
        },
        '& .MuiInputLabel-root': {
          '&.Mui-focused': {
            color: 'text.primary',
          },
        },
        '&.MuiAutocomplete-hasClearIcon.MuiAutocomplete-root .MuiOutlinedInput-root':
          {
            paddingRight: '56px',
          },
        '& fieldset': { borderRadius: '8px' },
      }}
    />
  );
};
