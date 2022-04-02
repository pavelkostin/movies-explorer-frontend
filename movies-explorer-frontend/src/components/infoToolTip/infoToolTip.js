
export function InfoToolTip({ message, errorStyle }) {
    return (
        <div className={`tooltip tooltip_opened ${errorStyle && 'tooltip_red'}`}>
            <h2 className='tooltip__title'>{message}</h2>
        </div>
    )
}
