import './search-input-style.css'

function SearchInput(props) {
    return(
        <form action="" name="search-form" className='form search-form' onSubmit={event => event.preventDefault()}>
            <input type="text" placeholder='Введите строку для поиска' className="search-form__field" onChange={props.searchInputValue}/>
        </form>
    )
}

export default SearchInput;