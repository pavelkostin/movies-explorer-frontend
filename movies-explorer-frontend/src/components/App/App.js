import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Header } from '../Header/Header';
import { Popup } from '../Popup/Popup';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handlePopupClick() {
    setIsPopupOpen(true)
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <main className='page'>

      <Switch>
        <Route exact path='/'>
          <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path='/movies'>
          <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
          <SavedMovies loggedIn={loggedIn} />
        </Route>
        <Route path='/profile'>
          <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
          <Profile />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/*'>
          <NotFoundPage />
        </Route>
      </Switch>
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
    </main>
  );
}

export default App;
