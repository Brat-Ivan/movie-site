export type Lists = {
  title: string;
  url: string;
  value: string;
}[];

export type Film = {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  countries: [
    {
      country: string;
    },
  ];
  genres: [
    {
      genre: string;
    },
  ];
  ratingKinopoisk: number;
  ratingImbd: number;
  year: string;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
};

export type FilmsList = {
  total: number;
  totalPages: number;
  items: Film[];
};

export type GenresAndCountries = {
  genres: {
    id: number;
    genre: string;
  }[];
  countries: {
    id: number;
    country: string;
  }[];
};

export type SequelsAndPrequels = {
  filmId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: string;
}[];

export type SequelsAndPrequelsDataElement = {
  kinopoiskId: number;
  filmId: number;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: string;
};

export type Staff = {
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
  watchedMovies?: Film[];
  favoriteMovies?: Film[];
};

export interface CounterState {
  countries: string;
  genreId: string;
  order: string;
  type: string;
  year: string;
  yearFrom: string;
  yearTo: string;
  page: number;
  keyword: string;
}
