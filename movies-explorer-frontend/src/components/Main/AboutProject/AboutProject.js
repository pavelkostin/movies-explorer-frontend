import React from 'react';

export function AboutProject() {

    

    return (
        <div className='about'>
            <h2 className='about__header'>О проекте</h2>
            <div className='about__description'>
                <div className='about__description-item'>
                    <h4 className='about__description-header'>Дипломный проект включал 5 этапов</h4>
                    <p className='about__description-para'>Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about__description-item'>
                    <h4 className='about__description-header'>На выполнение диплома ушло 5 недель</h4>
                    <p className='about__description-para'>У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <section className='about__scale'>
                <ul className='about__scale-description'>
                    <li>
                        <div>
                            <h3 className='about__scale-header about__scale-header_green'>1 неделя</h3>
                        </div>
                        <p className='about__scale-para'>Back-end</p>
                    </li>
                    <li>
                        <div>
                            <h3 className='about__scale-header about__scale-header_white'>4 недели</h3>
                        </div>
                        <p className='about__scale-para'>Front-end</p>
                    </li>
                </ul>
            </section>
        </div>
    );
}


