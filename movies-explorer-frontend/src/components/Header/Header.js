import React from "react";
import { Link } from "react-router-dom";
import headerLogo from '../../images/headerLogo.png';

export function Header({ linkPlaceHolder, loginPLaceHolder }) {
    return (
        <header className='header header_black'>
            <div className='header__container'>
                <Link to='/'>
                    <img className='header__logo' src={headerLogo} alt="логотип проекта Movie-Explorer" />
                </Link>
                <ul className='header__list header__list_hidden'>
                    <li className='header__list-item'>Фильмы</li>
                    <li className='header__list-item'>Сохранённые фильмы</li>
                </ul>
                <div className='header__account header__account_hidden'>
                    <Link to='/signup' className='header__email'>{loginPLaceHolder}</Link>
                    <Link to='/signin' className='header__link'>{linkPlaceHolder}</Link>
                </div>
                <button className='header__burger-menu'></button>
            </div>
        </header>
    );
}