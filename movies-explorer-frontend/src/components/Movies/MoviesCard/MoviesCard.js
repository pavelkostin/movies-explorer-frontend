import imgSaveFilm from '../../../images/img-save-film.svg';
import imageFilm from '../../../images/photo.jpg';
import imageDelFilm from '../../../images/img-del-film.svg';

export function MoviesCard() {
    return (
                <li className='movies-card'>

                    <div className='movies-card__container'>
                        <h3 className='movies-card__title'>В погоне за Бэнкси</h3>
                        <p className='movies-card__duration'>27 минут</p>
                    </div>

                    <img className='movies-card__img' src={imageFilm} alt='film-pic' />

                    <div className='movies-card__img-container'>
                        {/* <img src={imgSaveFilm} alt='saved' /> */}
                        <p className='movies-card__para'>Сохранить</p>
                        {/* <img src={imageDelFilm} alt='delete' /> */}
                    </div>
                </li>
    );
}