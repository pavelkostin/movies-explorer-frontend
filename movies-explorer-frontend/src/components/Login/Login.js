import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg';

export function Login() {
    return (
        <>
            <main className='register'>
                <div className='register__container'>
                    <Link to='/'>
                        <img className='register__logo' src={headerLogo} alt="логотип проекта Movie-Explorer" />
                    </Link>
                    <h2 className='register__title'>Добро пожаловать!</h2>
                </div>
                <div>
                    <div className='register__input-container'>
                        <div className='register__input-title'>E-mail</div>
                        <input required className='register__input' type='text'></input>
                    </div>
                    <div className='register__input-container'>
                        <div className='register__input-title'>Пароль</div>
                        <input required type='password' className='register__input'></input>
                        <div className='register__input-error' type='text'>Что-то пошло не так...</div>
                    </div>
                </div>
                <div className='login__container'>
                    <button className='register__submit-btn'>Войти</button>
                    <div className='register__btn-container'>
                        <div className='register__log-in'>Ещё не зарегистрированы?</div>
                        <Link to='/signup' className='register__log-in-btn'>Регистрация</Link>
                    </div>
                </div>
            </main>
        </>
    );
}