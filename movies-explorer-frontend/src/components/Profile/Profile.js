import { Header } from '../Header/Header';


export function Profile() {
    return (
            <section className='profile'>
                <h2 className='profile__title'>Привет, Павел!</h2>
                <div className='profile__container'>
                    <div className='profile__input-container'>
                        <div className='profile__input profile__input_title'>Имя</div>
                        <div className='profile__input'>Павел</div>
                    </div>
                    <div className='profile__input-container'>
                        <div className='profile__input profile__input_title'>E-mail</div>
                        <div className='profile__input'>pochta@yandex.ru</div>
                    </div>
                </div>
                <button className='profile__edit-btn'>Редактировать</button>
                <button className='profile__log-out-btn'>Выйти из аккаунта</button>
            </section>
    );
}