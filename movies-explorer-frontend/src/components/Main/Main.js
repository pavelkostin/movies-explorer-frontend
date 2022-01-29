import React from 'react';
import { Header } from '../Header/Header';
import { Promo } from './Promo/Promo';
import { NavTab } from './NavTab/NavTab';
import { AboutProject } from './AboutProject/AboutProject';
import { Techs } from './Techs/Techs';
import { AboutMe } from './AboutMe/AboutMe';
import { Portfolio } from './Portfolio/Portfolio';
import { Footer } from '../Footer/Footer';

export function Main() {
    return (
        <>
            <Header linkPlaceHolder='Войти' loginPLaceHolder='Регистрация'></Header>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </>

    );
}