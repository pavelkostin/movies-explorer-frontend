export function SearchForm() {
    return (
        <section className='search-section'>
            <div className='search'>
                <p className='search-film'>Фильм</p>
                <button className='search-btn'>Найти</button>
            </div>
            <div className='search-container'>
                <div className='search-switch'>
                    <div className='search-circle'></div>
                </div>
                <h3 className='search-para'>Короткометражки</h3>
            </div>
        </section>
    );
}
