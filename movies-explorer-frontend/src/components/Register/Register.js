import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg';
import { InfoToolTip } from '../infoToolTip/infoToolTip';

export function Register({ registration, isSuccess, message, errorStyle }) {

    const [validName, setValidName] = useState(false);
    const [validPass, setValidPass] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonActive, setButtonActive] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    React.useEffect(() => {
        if (validName && validEmail && validPass) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [buttonActive, validName, validEmail, validPass])

    function removeFocusName(e) {
        checkNameInput()
    }

    function removeFocusEmail(e) {
        checkEmailInput()
    }

    function removeFocusPass(e) {
        checkPassInput()
    }

    function checkNameInput(e) {
        if ((name.length < 2) || (name.length > 30)) {
            setNameError('Длина имени должна быть от 2 до 30 символов');
            setButtonActive(false);
            setValidName(false);
        } else {
            setNameError('');
            setValidName(true);
        }
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

    function handleChangeName(e) {
        setName(e.target.value);
        checkNameInput()
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        checkEmailInput()
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        checkPassInput()
    }

    function handleSubmit(e) {
        e.preventDefault();
        registration(name, email, password);
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
                        <div className='register__input-title'>Имя</div>
                        <input
                            value={name}
                            required
                            className='register__input'
                            type='text'
                            onChange={handleChangeName}
                            onBlur={removeFocusName}
                        />
                        {nameError && <div className='register__input-error'>{nameError}</div>}
                    </div>
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
                            className={passwordError ? 'register__input register__input_error' : 'register__input'}
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
                >Зарегистрироваться</button>
            </form>

            <div className='register__btn-container'>
                <div className='register__log-in'>Уже зарегистрированы?</div>
                <Link to='/signin' className='register__log-in-btn'>Войти</Link>
            </div>

        </section>
    );
}