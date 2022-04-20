import { useHistory } from 'react-router-dom';

export function NotFoundPage() {

    const history = useHistory();
    function handleClick() {
        history.goBack();
    }

    return (
        <>
            <main className='not-found-page'>
                <h2 className='not-found-page__title'>404</h2>
                <p className='not-found-page__para'>Страница не найдена</p>
                <button onClick={handleClick} className='not-found-page__back-page'>Назад</button >
            </main>
        </>
    );
}