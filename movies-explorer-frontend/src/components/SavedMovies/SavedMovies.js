import React, { useState }  from 'react';
import { SearchForm } from '../Movies/SearchForm/SearchForm';
import { MoviesCardList } from '../Movies/MoviesCardList/MoviesCardList';
import { Popup } from '../Popup/Popup';
import { Footer } from '../Footer/Footer';

export function SavedMovies({loggedIn}) {



    return (
        <>

            <SearchForm />
            <MoviesCardList />

            <Footer />
        </>

    );
}