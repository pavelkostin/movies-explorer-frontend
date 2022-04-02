import React, { useState } from 'react';

export function SearchForm({ onSearch, onSearchShort }) {

    const [searchItem, setSearchItem] = useState('');
    const [active, setActive] = useState(false);
    const [error, setError] = useState('');

    function getInputValue(e) {
        setSearchItem(e.target.value);
        setError('');
    }

    function removeFocus(e) {
        setError('')
    }

    function checkInput(e) {
        if (searchItem === '') {
            setError('Нужно ввести ключевое слово')
        } else {
            setError('')
        }
    }

    function searchFilm(e) {
        e.preventDefault();
        checkInput();
        if (active && searchItem !== '') {
            setError('');
            onSearchShort(searchItem);
        } else if (searchItem !== '') {
            setError('');
            onSearch(searchItem);
        } else {
            setError('Нужно ввести ключевое слово')
        }
    }

    function clickButtonTrue() {
        setActive(true);
        if (searchItem !== '') {
            onSearchShort(searchItem);
        }
    }

    function clickButtonFalse() {
        setActive(false);
        if (searchItem !== '') {
            onSearch(searchItem);
        }
    }

    return (
        <section className='search-section'>
            <form className='search-label' onSubmit={searchFilm}>
                <input
                    className='search-input'
                    type='text'
                    name='film'
                    placeholder='Фильм'
                    defaultValue={searchItem}
                    onChange={getInputValue}
                    onBlur={removeFocus}
                    /* required */
                />
                <button className='search-btn' type='submit'>Найти</button>
            </form>
            {error && <div className='search-input-error'>{error}</div>}
            <div className='search-container'>
                <button
                    className={`search-switch ${active ? '' : 'search-switch_start'}`}
                    onClick={active ? clickButtonFalse : clickButtonTrue}
                >
                    <div className='search-circle'></div>
                </button>
                <h3 className='search-para'>Короткометражки</h3>
            </div>
        </section>
    );
}
