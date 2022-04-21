import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { slice } from 'lodash';
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
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';
import { useLocation } from 'react-router-dom';

function App() {

  let LIMIT = 12;
  let STEP = 3;
  const [moreFilmsBtn, setMoreFilmsBtn] = useState(true);
  const [index, setIndex] = useState(LIMIT);
  const [slicedMovies, setSlacedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});

  const [message, setMessage] = useState('');
  const [errorStyle, setErrorStyle] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessApiError, setIsSuccessApiError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [clickedBtnSearch, setClickedBtnSearch] = useState(false);


  const location = useLocation();
  const isLocationSavedMovies = location.pathname === '/saved-movies';
  const isLocationMovies = location.pathname === '/movies';
  const screenWidth = window.screen.width;

  function changeLimit() {
    if (screenWidth > 1280) {
      LIMIT = 12;
      STEP = 3;
    } else if (screenWidth >= 768) {
      LIMIT = 8;
      STEP = 2;
    } else if (screenWidth > 480) {
      LIMIT = 5;
      STEP = 1;
    } else if (screenWidth > 320) {
      LIMIT = 5;
      STEP = 1;
    } else if (screenWidth < 320) {
      LIMIT = 5;
      STEP = 1;
    }
  }

  useEffect(() => {
    changeLimit()
  })

  // user
  useEffect(() => {
    mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err))
  }, [loggedIn])

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setLoggedIn(true)
      if (
        location.pathname === '/signup' ||
        location.pathname === '/signin'
      ) {
        history.push('/movies');
      } else if (
        location.pathname === '/saved-movies'
      ) {
        history.push('/saved-movies')
      } else if (
        location.pathname === '/profile'
      ) {
        history.push('/profile')
      }
    } else {
      setLoggedIn(false)
    }


  }, [loggedIn, history, location.pathname])

  // movies display
  useEffect(() => {

    const moviesFromStorage = localStorage.getItem('movies');
    if (!moviesFromStorage) {
      localStorage.setItem('movies', JSON.stringify([]));
    }
    const moviesParsed = JSON.parse(moviesFromStorage);

    const moviesFromStorageSliced = localStorage.getItem('slicedMovies');
    if (!moviesFromStorageSliced) {
      localStorage.setItem('slicedMovies', JSON.stringify([]));
    }
    const moviesFromStorageSlicedParsed = JSON.parse(moviesFromStorageSliced);

    setMovies(moviesParsed);
    setSlacedMovies(moviesFromStorageSlicedParsed);

  }, [loggedIn])

  // saved movies display
  useEffect(() => {
    setPreloader(true);
    setClickedBtnSearch(false);
    mainApi.getMovies()
      .then((data) => {
        const myMovies = data.filter(function (item) {
          return item.owner === currentUser.id;
        })
        setPreloader(false);
        setClickedBtnSearch(false);
        setSavedMovies(myMovies);
        localStorage.setItem('savedMovies', JSON.stringify(myMovies));
      })
      .catch((err) => console.log(err))
  }, [isLocationSavedMovies, isLocationMovies, loggedIn, currentUser.id]);

  // show more button
  useEffect(() => {

    if (movies === null || slicedMovies === null) {
      localStorage.setItem('movies', JSON.stringify([]));
      localStorage.setItem('slicedMovies', JSON.stringify([]));
    }

    else if (movies.length === slicedMovies.length) {
      setMoreFilmsBtn(false);
    } else {
      setMoreFilmsBtn(true);
    }
  }, [slicedMovies, movies, loggedIn]);

  // popup
  function handlePopupClick() {
    setIsPopupOpen(true)
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  // reg, auth, signout
  function registration(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if (res) {
          setTimeout(() => {
            /* history.push('/signin') */
            authorization(email, password);
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
    auth.login(password, email)
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
    mainApi.setUserInfo(user)
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
    localStorage.setItem('movies', JSON.stringify([]));
    localStorage.setItem('slicedMovies', JSON.stringify([]));

    localStorage.setItem('activeShortBtn', JSON.stringify(false));
    localStorage.removeItem('searchItem');

    setMovies([]);
    setSlacedMovies([]);


    setLoggedIn(false);
    history.push('/');
  }

  // search movies

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
          /* return item.nameRU.includes(searchItem) && item.duration < 40; */

          return item.nameRU.toLowerCase().includes(searchItem.toLowerCase()) &&
            item.duration < 40;
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

            // для showmore
            changeLimit();
            const a = slice(filteredShort, 0, LIMIT);
            setMovies(a);
            setSlacedMovies(filteredShort);

            localStorage.setItem('slicedMovies', JSON.stringify(filteredShort));
            localStorage.setItem('movies', JSON.stringify(a));

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
    setIndex(LIMIT);
    setMoreFilmsBtn(true);
    setPreloader(true);
    if (
      movies.length === slicedMovies.length) {
      setMoreFilmsBtn(false)
    } else {
      setMoreFilmsBtn(true);
    }

    MoviesApi.getFilms()
      .then((data) => {
        const filteredMovies = data.filter(function (item) {
          /* return item.nameRU.includes(searchItem) ; */
          return (
            item.nameRU.toLowerCase().includes(searchItem.toLowerCase())
          );

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

            changeLimit();
            const a = slice(filteredMovies, 0, LIMIT);
            setMovies(a);
            setSlacedMovies(filteredMovies);

            localStorage.setItem('slicedMovies', JSON.stringify(filteredMovies));
            localStorage.setItem('movies', JSON.stringify(a));


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

  // display more films click
  function handleMoreFilmsClick() {

    /* setMovies([]); */
    /* const newIndex = index + LIMIT; */


    const newIndex = index + STEP;
    const d = slice(slicedMovies, index, newIndex);
    const e = ([...movies, ...d])
    setIndex(newIndex);
    setMovies(e);
  }

  // saved movies

  function fetchAllSavedMovies(searchItem) {
    setPreloader(true)
    setMessage('');
    setClickedBtnSearch(true);
    setNoResults(true);
    let results = savedMovies.filter((item) => {
      return /* item.nameRU.includes(searchItem) */ (
        item.nameRU.toLowerCase().includes(searchItem.toLowerCase()) &&
        item.owner === currentUser.id);
    })
    if (results.length === 0) {
      setTimeout(() => {
        setNoResults(true);
        setMessage('ничего не найдено');
        setPreloader(false);
        setFilteredResults([]);
      }, 500)
    } else {
      setTimeout(() => {
        setPreloader(false);
        setNoResults(false);
        setMessage('');
        setFilteredResults(results);
      }, 500);
    }
  }

  function fetchShortSavedMovies(searchItem) {
    setPreloader(true)
    setMessage('');
    setClickedBtnSearch(true);
    setNoResults(true);
    let shortResults = savedMovies.filter((item) => {
      return /* item.nameRU.includes(searchItem) */ (
        item.nameRU.toLowerCase().includes(searchItem.toLowerCase())
        && item.owner === currentUser.id
        && item.duration < 40)
    })

    if (shortResults.length === 0) {
      setMessage('');
      setTimeout(() => {
        setNoResults(true);
        setMessage('ничего не найдено');
        setPreloader(false);
        setFilteredResults([]);
      }, 500)
      setMessage('');
    } else {
      setTimeout(() => {
        setPreloader(false);
        setNoResults(false);
        setMessage('');
        setFilteredResults(shortResults);
      }, 500);
    }


  }


  // save and remove
  function saveMovie(movie) {
    setPreloader(true);

    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    setSavedMovies(savedMovies);

    mainApi.postMovie(movie)

      .then((newMovie) => {

        const savedMoviesFromStorage = localStorage.getItem('savedMovies');

        if (!savedMoviesFromStorage) {
          localStorage.setItem('savedMovies', JSON.stringify([]));
          savedMoviesFromStorage = localStorage.geItem('savedMovies');
        }

        const savedMovies = JSON.parse(savedMoviesFromStorage);
        savedMovies.push(newMovie);

        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        setSavedMovies(savedMovies);

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

  function unSaveMovie(movie) {

    const a = localStorage.getItem('savedMovies');
    if (!a) {
      localStorage.setItem('savedMovies', JSON.stringify([]));
      a = localStorage.geItem('savedMovies');
    }
    const savedMovies = JSON.parse(a);

    const savedMovie = savedMovies.filter(function (item) {
      return item.movieId === movie.id;
    })


    removeMovie(savedMovie[0]._id);

  }

  function removeMovie(movie) {
    setPreloader(false);

    mainApi.deleteMovie(movie)

      .then((deletedMovie) => {

        setSavedMovies(savedMovies =>
          savedMovies.filter((state) =>
            state.movieId !== deletedMovie.movieId))

        setPreloader(false);
      })
      .catch((err) => console.log(err))
  }


  //component
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className='page'>

        <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />

        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <Route exact path='/signin'>
            <Login
              authorization={authorization}
              isSuccess={isSuccess}
              message={message}
              errorStyle={errorStyle}
            />
          </Route>

          <Route exact path='/signup'>
            <Register
              registration={registration}
              isSuccess={isSuccess}
              message={message}
              errorStyle={errorStyle}
            />
          </Route>

          <ProtectedRoute exact path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            signOut={signOut}
            isSuccess={isSuccess}
            message={message}
            onUpdateUser={handleUpdateUser}
            errorStyle={errorStyle}
          />

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
            removeMovie={removeMovie}
            unSaveMovie={unSaveMovie}
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
            movies={movies}
            filteredResults={filteredResults}
            clickedBtnSearch={clickedBtnSearch}
          />

          <Route exact path='/*'>
            <NotFoundPage />
          </Route>

          <Redirect to='/*' />

        </Switch>

        <Popup isOpen={isPopupOpen} onClose={closePopup} />

        <Footer />

      </main>
    </CurrentUserContext.Provider >
  );
}

export default App;