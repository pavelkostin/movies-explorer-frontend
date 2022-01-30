import { NavLink, Link } from 'react-router-dom';

export function Popup({isOpen, onClose}) {
    return (
        <div className={`popup ${isOpen && 'popup_visible'}`} >

            <div className='popup__container'>
                <div className='popup__container-logo'>
                    <button onClick={onClose} className='popup__close-btn'></button>
                </div>
                <div className='popup__container-info'>
                    <div className='popup__nav-list'>
                        <NavLink className='popup__link' to='/'>Главная</NavLink>
                        <NavLink className='popup__link' to='/movies'>Фильмы</NavLink>
                        <NavLink className='popup__link' to='/saved-movies'>Сохранённые фильмы</NavLink>
                    </div>
                    <div className='popup__account'>
                        <div className='header__email_popup'>Аккаунт</div>
                        <Link to='profile' className='header__link_auth'></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}