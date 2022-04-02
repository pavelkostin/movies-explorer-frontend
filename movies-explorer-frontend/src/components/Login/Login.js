import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg';
import { InfoToolTip } from '../infoToolTip/infoToolTip';

export function Login({ authorization, isSuccess, message, errorStyle }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);

    React.useEffect(() => {
        if (validEmail && validPass) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [buttonActive, validEmail, validPass])

    function removeFocusEmail(e) {
        checkEmailInput()
    }

    function removeFocusPass(e) {
        checkPassInput()
    }

    function checkEmailInput(e) {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!regex.test(String(email).toLocaleLowerCase())) {
            setEmailError('Некорректный email');
            setButtonActive(false);
            setValidEmail(false);
        } else {
            setEmailError('');
            setValidEmail(true);
        }
    }

    function checkPassInput(e) {
        if (password === '') {
            setPasswordError('Пароль не может быть пустым');
            setButtonActive(false);
            setValidPass(false);
        } else {
            setPasswordError('');
            setValidPass(true);
        }
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        checkEmailInput();
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        checkPassInput();
    }

    function handleSubmit(e) {
        e.preventDefault();
        authorization(email, password);
    }

    return (
        <section className='register'>
            {isSuccess && <InfoToolTip
                message={message}
                errorStyle={errorStyle}
            />}
            <div className='register__container'>
                <Link to='/'>
                    <img className='register__logo' src={headerLogo} alt='логотип проекта Movie-Explorer' />
                </Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
            </div>
            <form onSubmit={handleSubmit} className='register__form'>
                <div className='register__input-list'>
                    <div className='register__input-container'>
                        <div className='register__input-title'>E-mail</div>
                        <input
                            value={email}
                            required
                            className='register__input'
                            type='email'
                            onChange={handleChangeEmail}
                            onBlur={removeFocusEmail}
                        />
                        {emailError && <div className='register__input-error'>{emailError}</div>}
                    </div>
                    <div className='register__input-container'>
                        <div className='register__input-title'>Пароль</div>
                        <input
                            value={password}
                            required type='password'
                            className='register__input register__input_error'
                            onChange={handleChangePassword}
                            onBlur={removeFocusPass}
                        />
                        {passwordError && <div className='register__input-error'>{passwordError}</div>}
                    </div>
                </div>
                <button
                    disabled={buttonActive ? false : true}
                    className={buttonActive ? 'register__submit-btn' :
                        'register__submit-btn register__submit-btn_disabled'
                    }
                >Войти</button>
            </form>
            <div className='register__btn-container'>
                <div className='register__log-in'>Ещё не зарегистрированы?</div>
                <Link to='/signup' className='register__log-in-btn'>Регистрация</Link>
            </div>
        </section>
    );
}
