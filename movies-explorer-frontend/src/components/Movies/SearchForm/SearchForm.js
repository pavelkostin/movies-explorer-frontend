import React, { useState } from 'react';

export function SearchForm() {

    const [shortFilms, setShortFilms] = useState(false);

    function clickButton() {
        setShortFilms(true);
    }

    return (
        <section className='search-section'>

            <label className='search-label'>
                <input
                    className='search-input'
                    type='text'
                    name='film'
                    placeholder='Фильм'
                    required
                    />
                <button className='search-btn'>Найти</button>
            </label>


            <div className='search-container'>
                <button className={`search-switch ${shortFilms ? '' : 'search-switch_start'}`} onClick={clickButton}>
                    <div className='search-circle'></div>
                </button>
                <h3 className='search-para'>Короткометражки</h3>
            </div>
        </section>
    );
}
