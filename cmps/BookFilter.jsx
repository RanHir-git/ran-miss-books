import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterToEdit] = useState({ ...defaultFilter })

    const onSetFilterDebounce = useRef(debounce(onSetFilter, 400)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

    }


    const { txt, listPrice, onSale } = filterByToEdit
    return (
        <section className="Book-filter container">
            <h2>Filter Our Books</h2>

            <form>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="listPrice">Price (min):</label>
                <input onChange={handleChange} value={listPrice || ''} name="listPrice" id="listPrice" type="number" />

                <label htmlFor="onSale">On Sale:</label>
                <input onChange={handleChange} checked={onSale || false} name="onSale" id="onSale" type="checkbox" />


                {/* <button>Submit</button> */}
            </form>
        </section>
    )
}