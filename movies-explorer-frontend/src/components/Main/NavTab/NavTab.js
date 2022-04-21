import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export function NavTab() {

    

    return (
        <section className='navtab'>
            <ul className='navtab__list'>
                <li><NavLink to='/' className='navtab__link'>О проекте</NavLink></li>
                <li><Link to='/' className='navtab__link navtab__link_margin'>Технологии</Link></li>
                <li><Link to='/' className='navtab__link'>Студент</Link></li>
            </ul>
        </section>
    );
}