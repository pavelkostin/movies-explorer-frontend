import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg';

export function Header({ loggedIn, handlePopupClick }) {

    const location = useLocation();

    const mainLocation = location.pathname === '/';

    const regOrLoginLocation =
        location.pathname === '/signin' ||
        location.pathname === '/signup';

    const elseLocations =
        location.pathname === '/' ||
        location.pathname === '/profile' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies';

    const moviesLocation = location.pathname === '/movies';
    const savedMoviesLocation = location.pathname === '/saved-movies';

    return (
        (!regOrLoginLocation && elseLocations) && <header className={`header ${(loggedIn && !mainLocation) ? 'header_black' : ''}`}>
            <div className='header__container'>
                {<Link to='/'>
                    <img className='header__logo' src={headerLogo} alt='логотип проекта Movie-Explorer' />
                </Link>}
                {!mainLocation && <div className={`header__list ${loggedIn ? '' : 'header__list_hidden'}`}>
                    <Link to='/movies' className={!moviesLocation ? 'header__list-item' : 'header__list-item header__list-item_bold'}>Фильмы</Link>
                    <Link to='/saved-movies' className={!savedMoviesLocation ? 'header__list-item' : 'header__list-item header__list-item_bold' }>Сохранённые фильмы</Link>
                </div>}
                {<div className={`${loggedIn ? 'header__account_hidden' : 'header__account'}`}>
                    <Link to={`${loggedIn ? '/profile' : '/signup'}`} className='header__email'>{`${loggedIn ? 'Аккаунт' : 'Регистрация'}`}</Link>
                    <Link to={`${loggedIn ? '/profile' : '/signin'}`} className={` ${loggedIn ? 'header__link header__link_auth' : 'header__link'}`}>
                        {`${loggedIn ? '' : 'Войти'}`}
                    </Link>
                </div>}
                <button
                    onClick={handlePopupClick}
                    className={`header__burger-menu ${loggedIn && 'header__burger-menu_visible'}`}>
                </button>
            </div>
        </header>
    );
}