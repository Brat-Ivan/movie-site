import { Route, Routes } from 'react-router-dom';

import { ActorInfo } from '../pages/actorInfo';
import { ErrorNotFound } from '../pages/errorNotFound';
import { Home } from '../pages/home';
import { MovieInfo } from '../pages/movieInfo';
import { MoviesListMain } from '../pages/MoviesListMain';
import { MoviesListTop } from '../pages/moviesListTop';
import { SignIn } from '../pages/signIn';
import { SignUp } from '../pages/signUp';
import { Layout } from './layout';

import 'bear-react-carousel/dist/index.css';

import { Profile } from '../pages/profile';
import { ROUTES } from '../shared/constants';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={`${ROUTES.movie}/:id`} element={<MovieInfo />} />
          <Route path={`${ROUTES.actor}/:id`} element={<ActorInfo />} />
          <Route path={ROUTES.popular} element={<MoviesListTop />} />
          <Route path={ROUTES.best} element={<MoviesListTop />} />
          <Route path={ROUTES.films} element={<MoviesListMain />} />
          <Route path={ROUTES.serials} element={<MoviesListMain />} />
          <Route path={ROUTES.signIn} element={<SignIn />} />
          <Route path={ROUTES.signUp} element={<SignUp />} />
          <Route path={ROUTES.user} element={<Profile />} />
          <Route path={ROUTES.error} element={<ErrorNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
