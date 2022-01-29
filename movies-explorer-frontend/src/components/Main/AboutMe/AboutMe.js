import React from 'react';
import photo from '../../../images/photo.jpg';

export function AboutMe() {
    return (
        <section className='about'>
            <h2 className='about__header'>Студент</h2>
            <div className='about-me__container'>
                
                <div className='about-me__info'>
                    <h3 className='about-me__header'>Павел</h3>
                    <p className='about-me__para'>Фронтенд-разработчик, 31 год</p>
                    <p className='about-me__para-2'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                        После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <ul className='about-me__list'>
                        <li><a className='about-me__link' href='https://github.com/pavelkostin'>Github</a></li>
                        <li><a className='about-me__link' href='https://www.facebook.com/pavel.kostin.98'>Facebook</a></li>
                    </ul>
                </div>
                <img src={photo} className='about-me__photo' alt='user-pic' />
            </div>
        </section>
    );
}