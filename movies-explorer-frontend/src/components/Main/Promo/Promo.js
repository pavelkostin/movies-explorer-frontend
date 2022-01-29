import React from 'react';
import promoLogo from '../../../images/promoLogo.png';

export function Promo() {
    return (
        <>
            <div className='promo'>
                <img className='promo__logo' src={promoLogo} alt="логотип промо" />
                <h2 className='promo__header'>Учебный проект студента факультета Веб-разработки.</h2>
            </div>
        </>
    );
}