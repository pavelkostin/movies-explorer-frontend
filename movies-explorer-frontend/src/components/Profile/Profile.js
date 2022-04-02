import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { InfoToolTip } from '../infoToolTip/infoToolTip';

export function Profile({ errorStyle, isSuccess, onUpdateUser, signOut, message }) {


    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);

    const [buttonActive, setButtonActive] = useState(false);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function changeName(e) {
        setName(e.target.value)
    }

    function changeEmail(e) {
        setEmail(e.target.value)
    }

    function editProfile(e) {
        e.preventDefault();

        onUpdateUser({
            name: name,
            email: email,
        })
    }

    useEffect(() => {
        checkInputs()
    })

    function checkInputs() {
        if (!name || !email) return;
        if (name !== currentUser.name || email !== currentUser.email) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }

    }


    return (
        <>

            <section className='profile'>
                {isSuccess && <InfoToolTip
                    message={message}
                    errorStyle={errorStyle}
                />}
                <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                <form className='profile__container' onSubmit={editProfile}>
                    <div className='profile__input-container'>
                        <div className='profile__input profile__input_title'>Имя</div>
                        <input
                            defaultValue={name}
                            className='profile__input'
                            onChange={changeName}
                            name='name'
                        />
                    </div>
                    <div className='profile__input-container'>
                        <div className='profile__input profile__input_title'>E-mail</div>
                        <input
                            name='email'
                            className='profile__input'
                            defaultValue={email}
                            onChange={changeEmail}
                        />
                    </div>
                    <div className='profile__btn-container'>
                        <button disabled={buttonActive ? false : true}
                            className={buttonActive ?
                                'profile__edit-btn profile__edit-btn_active' :
                                'profile__edit-btn'}
                            type='submit'>
                            Редактировать
                        </button>
                        <button onClick={signOut} className='profile__log-out-btn'>Выйти из аккаунта</button>
                    </div>
                </form>
            </section>
        </>
    );
}