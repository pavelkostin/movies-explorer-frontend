import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import {
  splice, slice, concat,
} from 'lodash';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Header } from '../Header/Header';
import { Popup } from '../Popup/Popup';
import { Footer } from '../Footer/Footer';
import * as Auth from '../../utils/Auth';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';

function App() {
  const LIMIT = 3;
  const [moreFilmsBtn, setMoreFilmsBtn] = useState(true);
  const [index, setIndex] = useState(LIMIT);
  const [slicedMovies, setSlacedMovies] = useState([]);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [errorStyle, setErrorStyle] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessApiError, setIsSuccessApiError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // user

  useEffect(() => {
    MainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err))
  }, [loggedIn])

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            history.push('/movies')
          }
        });
    }
  }, [history, loggedIn])

  // popup

  function handlePopupClick() {
    setIsPopupOpen(true)
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  // reg, auth, signout

  function registration(name, email, password) {
    Auth.register(name, email, password)
      .then((res) => {
        if (res) {
          setTimeout(() => {
            history.push('/signin')
          }, 2000)
        }
      })
      .catch(async (err) => {
        const newErr = await err;
        setErrorStyle(true);
        setIsSuccess(true);
        setMessage(newErr.message)
        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)
      });
  }

  function authorization(password, email) {
    Auth.login(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      })
      .then(() => {
        setLoggedIn(true);
        history.push('/movies')
      })
      .catch(async (err) => {
        const newErr = await err;
        setErrorStyle(true);
        setIsSuccess(true);
        setMessage(newErr.message)
        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)
      });
  }

  function handleUpdateUser(user) {
    MainApi.setUserInfo(user)
      .then((currentUser) => {
        setCurrentUser(currentUser)
        setErrorStyle(false);
        setIsSuccess(true)
        setMessage('Внимание! Вы изменили данные профиля!')
        setTimeout(() => {
          setIsSuccess(false)
        }, 2000)
      })
      .catch((err) => console.log(err))
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }

  // search / search saved films

  function fetchFilmsShort(searchItem) {

    // для showmore
    setMovies([]);
    setSlacedMovies([]);
    setIndex(LIMIT);
    setMoreFilmsBtn(true);
    setPreloader(true);
    setPreloader(true);

    MoviesApi.getFilms()
      .then((data) => {
        const filteredShort = data.filter(function (item) {
          return item.nameRU.includes(searchItem) && item.duration < 40;
        })
        if (filteredShort.length === 0) {
          setMoreFilmsBtn(false);
          setMessage('');
          setTimeout(() => {
            setNoResults(true);
            setMessage('ничего не найдено');
            setPreloader(false);
            setMovies([]);
          }, 500)
        } else {
          setTimeout(() => {
            setPreloader(false);
            setNoResults(false);
            setMessage('');
            /* setMovies(filteredShort); */

            // для showmore
            const a = slice(filteredShort, 0, LIMIT);
            setMovies(a);
            setSlacedMovies(filteredShort);

          }, 500)
        }
      })
      .catch(async (err) => {
        const newErr = await err;
        if (newErr) {
          setTimeout(() => {
            setMessage('')
            setPreloader(false);
            setIsSuccessApiError(true);
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
          }, 2000)
        }
      });
  }


  function fetchAllFilms(searchItem) {

    // для showmore
    setMovies([]);
    setSlacedMovies([]);
    setIndex(LIMIT);
    setMoreFilmsBtn(true);
    setPreloader(true);

    MoviesApi.getFilms()
      .then((data) => {
        const filteredMovies = data.filter(function (item) {
          return item.nameRU.includes(searchItem);
        })
        if (filteredMovies.length === 0) {
          setMoreFilmsBtn(false);
          setMessage('');
          setTimeout(() => {
            setMessage('');
            setNoResults(true);
            setMessage('ничего не найдено');
            setPreloader(false);
            setMovies([]);
          }, 500)
        } else {
          setTimeout(() => {
            setPreloader(false);
            setNoResults(false);
            setMessage('');

            // для showmore
            const a = slice(filteredMovies, 0, LIMIT);
            setMovies(a);
            setSlacedMovies(filteredMovies);

          }, 500)
        }
      })
      .catch(async (err) => {
        const newErr = await err;
        if (newErr) {
          setTimeout(() => {
            setMessage('');
            setPreloader(false);
            setIsSuccessApiError(true);
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
          }, 2000)
        }
      });
  }

  // display more films/saved films

  function handleMoreFilmsClick() {
    const newIndex = index + LIMIT;
    const d = slice(slicedMovies, index, newIndex);
    const e = concat(movies, d);
    setIndex(newIndex);
    setMovies(e);
  }

  function handleMoreSavedFilms() {
    const newIndex = index + LIMIT;
    const d = slice(slicedMovies, index, newIndex);
    const e = concat(savedMovies, d);
    setIndex(newIndex);
    setSavedMovies(e);
  }


  // show more button

  useEffect(() => {
    if (movies.length === slicedMovies.length) {
      setMoreFilmsBtn(false);
    } else {
      setMoreFilmsBtn(true);
    }
  }, [slicedMovies, movies]);

  useEffect(() => {
    if (savedMovies.length === slicedMovies.length) {
      setMoreFilmsBtn(false);
    } else if(savedMovies.length < slicedMovies.length) {
      setMoreFilmsBtn(false);
    } else {
      setMoreFilmsBtn(true);
    }
  }, [slicedMovies, savedMovies]);


  // saved movies

  useEffect(() => {

    setSavedMovies([]);
    setSlacedMovies([]);
    setIndex(LIMIT);
    setMoreFilmsBtn(true);

    setPreloader(true);

    MainApi.getMovies()
      .then((data) => {
        const myMovies = data.filter(function (item) {
          return item.owner === currentUser.id;
        })
        setSavedMovies(myMovies)
        setPreloader(false);

        const a = slice(myMovies, 0, LIMIT);
        setSavedMovies(a);
        setSlacedMovies(myMovies);

      })
      .catch((err) => console.log(err))
  }, [loggedIn, currentUser.id]);

  function fetchAllSavedMovies(searchItem) {

    // для showmore
    setSavedMovies([]);
    setSlacedMovies([]);
    setIndex(LIMIT);
    setMoreFilmsBtn(true);
    setPreloader(true);

    MainApi.getMovies()
      .then((data) => {
        const filteredMovies = data.filter(function (item) {
          return item.nameRU.includes(searchItem) && item.owner === currentUser.id;
        })
        if (filteredMovies.length === 0) {
          setMessage('');
          setTimeout(() => {
            setNoResults(true);
            setMessage('ничего не найдено');
            setPreloader(false);
            setSavedMovies([]);
          }, 500)

        } else {
          setTimeout(() => {
            setPreloader(false);
            setNoResults(false);
            setMessage('');
            /* setSavedMovies(filteredMovies); */
            // для showmore
            const a = slice(filteredMovies, 0, LIMIT);
            setSavedMovies(a);
            setSlacedMovies(filteredMovies);
          }, 500)
          /* localStorage.setItem('movies', JSON.stringify(filteredMovies)); */
        }
      })
      .catch(async (err) => {
        const newErr = await err;
        if (newErr) {
          setTimeout(() => {
            setMessage('');
            setPreloader(false);
            setIsSuccessApiError(true);
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
          }, 2000)
        }
      });
  }

  function fetchShortSavedMovies(searchItem) {
    setPreloader(true);
    MainApi.getMovies()
      .then((data) => {
        const shortSavedMovies = data.filter(function (item) {
          return item.nameRU.includes(searchItem) && item.duration < 40 && item.owner === currentUser.id;
        })
        if (shortSavedMovies.length === 0) {
          setMessage('');
          setTimeout(() => {
            setNoResults(true);
            setMessage('ничего не найдено');
            setPreloader(false);
            setSavedMovies([]);
          }, 500)
          setMessage('');
        } else {
          setTimeout(() => {
            setPreloader(false);
            setNoResults(false);
            setMessage('');
            setSavedMovies(shortSavedMovies);
          }, 500);
          /* localStorage.setItem('shortMovies', JSON.stringify(shortSavedMovies)); */
        }
      })
      .catch(async (err) => {
        const newErr = await err;
        if (newErr) {
          setTimeout(() => {
            setMessage('');
            setPreloader(false);
            setIsSuccessApiError(true);
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
          }, 2000)
        }
      });
  }

  function saveMovie(movie) {
    setPreloader(true);
    MainApi.postMovie(movie)
      .then((newMovie) => {
        setSavedMovies(savedMovies);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([newMovie, ...savedMovies])
        )
        /* setSavedMovies(savedMovies); */
        setPreloader(false);
      })
      .catch(async (err) => {
        const newErr = await err;
        if (newErr.message === 'Validation failed') {
          setTimeout(() => {
            setPreloader(false);
            setIsSuccessApiError(true);
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
          }, 2000)
        }
      });
  }

  function removeMovie(movie) {
    setPreloader(false);
    MainApi.deleteMovie(movie)
      .then((deletedMovie) => {
        setSavedMovies(movies => movies.filter((state) => state.movieId !== deletedMovie.movieId))
        localStorage.removeItem(
          'savedMovies',
          JSON.stringify([deletedMovie, ...savedMovies])
        )
        setPreloader(false);
      })
      .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className='page'>

        <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />

        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <Route path='/signin'>
            <Login
              authorization={authorization}
              isSuccess={isSuccess}
              message={message}
              errorStyle={errorStyle}
            />
          </Route>

          <Route path='/signup'>
            <Register
              registration={registration}
              isSuccess={isSuccess}
              message={message}
              errorStyle={errorStyle}
            />
          </Route>

          <ProtectedRoute exact path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            movies={movies}
            onSearch={fetchAllFilms}
            onSearchShort={fetchFilmsShort}
            saveMovie={saveMovie}
            savedMovies={savedMovies}
            preloader={preloader}
            noResults={noResults}
            message={message}

            isSuccess={isSuccess}
            isSuccessApiError={isSuccessApiError}
            handleMoreFilmsClick={handleMoreFilmsClick}
            moreFilmsBtn={moreFilmsBtn}
          />

          <ProtectedRoute exact path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            fetchShortSavedMovies={fetchShortSavedMovies}
            fetchAllSavedMovies={fetchAllSavedMovies}
            removeMovie={removeMovie}
            preloader={preloader}
            noResults={noResults}
            message={message}

            isSuccess={isSuccess}
            isSuccessApiError={isSuccessApiError}
            handleMoreSavedFilms={handleMoreSavedFilms}
            moreFilmsBtn={moreFilmsBtn}
          />

          <ProtectedRoute exact path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            signOut={signOut}
            isSuccess={isSuccess}
            message={message}
            onUpdateUser={handleUpdateUser}
            errorStyle={errorStyle}
          />

          <Route path='/*'>
            <NotFoundPage />
          </Route>

        </Switch>

        <Popup isOpen={isPopupOpen} onClose={closePopup} />

        <Footer />

      </main>
    </CurrentUserContext.Provider >
  );
}

export default withRouter(App);
