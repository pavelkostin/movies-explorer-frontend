import { NavLink, Link } from 'react-router-dom';
import closeIcon from '../../images/close-icon.svg';

export function Popup() {
    return (
        <div className='popup'>

            <div className='popup__container'>
                <div className='popup__container-logo'>
                    {/* <img className='header__logo_popup' src={closeIcon} alt='popup-close' /> */}
                    <button className='popup__close-btn'></button>
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