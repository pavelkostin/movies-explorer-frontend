import React from 'react'

export function Preloader({ preloader }) {
    return (
        <div className='search-section'>
            <div className={`preloader ${preloader ? 'preloader_visible' : ''} `}>
                <div className='preloader__container'>
                    <span className='preloader__round'></span>
                </div>
            </div>
        </div>

    )
};
