import React from 'react';
import { Promo } from './Promo/Promo';
import { NavTab } from './NavTab/NavTab';
import { AboutProject } from './AboutProject/AboutProject';
import { Techs } from './Techs/Techs';
import { AboutMe } from './AboutMe/AboutMe';
import { Portfolio } from './Portfolio/Portfolio';
import { Footer } from '../Footer/Footer';

export function Main({ loggedIn, handlePopupClick }) {
    return (
        <>
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