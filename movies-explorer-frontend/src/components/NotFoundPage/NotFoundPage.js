import { Link } from 'react-router-dom';
export function NotFoundPage() {
    return (
        <>
            <main className='not-found-page'>
                <h2 className='not-found-page__title'>404</h2>
                <p className='not-found-page__para'>Страница не найдена</p>
                <Link to='/' className='not-found-page__back-page'>Назад</Link >
            </main>
        </>
    );
}