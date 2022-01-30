import React from "react";
import { Link } from "react-router-dom";
import headerLogo from '../../images/headerLogo.png';

export function Header({ loggedIn, handlePopupClick, linkPlaceHolder, loginPLaceHolder }) {


    return (
        <header className='header header_black'>
            <div className='header__container'>
                <Link to='/'>
                    <img className='header__logo' src={headerLogo} alt='логотип проекта Movie-Explorer' />
                </Link>
                <ul className={`header__list ${loggedIn ? '' : 'header__list_hidden'}`}>
                    <li className='header__list-item'>Фильмы</li>
                    <li className='header__list-item'>Сохранённые фильмы</li>
                </ul>
                <div className={`${loggedIn ? 'header__account_hidden' : 'header__account'}`}>
                    <Link to={`${loggedIn ? '/profile' : '/signup'}`} className='header__email'>{`${loggedIn ? 'Аккаунт' : 'Регистрация'}`}</Link>
                    <Link to={`${loggedIn ? '/profile' : '/signin'}`} className={` ${loggedIn ? 'header__link header__link_auth' : 'header__link'}`}>
                        {`${loggedIn ? '' : 'Войти'}`}
                    </Link>
                </div>
                <button
                    onClick={handlePopupClick}
                    className={`header__burger-menu ${loggedIn && 'header__burger-menu_visible'}`}>
                </button>
            </div>
        </header>
    );
}