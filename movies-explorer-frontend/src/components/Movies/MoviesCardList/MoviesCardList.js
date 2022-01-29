import { MoviesCard } from '../MoviesCard/MoviesCard';


export function MoviesCardList() {
    return (
            <section className='card-list__section'>
                <ul className='card-list'>
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                </ul>
            </section>
    );
}