import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.png';

export function Register() {
    return (
        <section className='register'>
            <div className='register__container'>
                <Link to='/'>
                    <img className='register__logo' src={headerLogo} alt="логотип проекта Movie-Explorer" />
                </Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
            </div>
            <div className='register__input-list'>
                <div className='register__input-container'>
                    <div className='register__input-title'>Имя</div>
                    <input className='register__input' type='text'></input>
                </div>
                <div className='register__input-container'>
                    <div className='register__input-title'>E-mail</div>
                    <input className='register__input' type='text'></input>
                </div>
                <div className='register__input-container'>
                    <div className='register__input-title'>Пароль</div>
                    <input type='password' className='register__input register__input_error'></input>
                    <div className='register__input-error' type='text'>Что-то пошло не так...</div>
                </div>
            </div>
            <button className='register__submit-btn'>Зарегистрироваться</button>
            <div className='register__btn-container'>
                <div className='register__log-in'>Уже зарегистрированы?</div>
                <Link to='/signin' className='register__log-in-btn'>Войти</Link>
            </div>
        </section>
    );
}