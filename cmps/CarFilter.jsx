import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function CarFilter({ defaultFilter, onSetFilter }) {

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
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

    }

    // function handleTxtChange({ target }) {
    //     const { value } = target
    //     setFilterToEdit(filterBy => ({ ...filterBy, txt: value }))
    // }

    // function handleMinSpeedChange({ target }) {
    //     const { value } = target
    //     setFilterToEdit(filterBy => ({ ...filterBy, minSpeed: +value }))
    // }

    const { txt, minSpeed } = filterByToEdit
    return (
        <section className="car-filter container">
            <h2>Filter Our Cars</h2>

            <form>
                <label htmlFor="txt">Vendor</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input onChange={handleChange} value={minSpeed || ''} name="minSpeed" id="minSpeed" type="number" />

                {/* <button>Submit</button> */}
            </form>
        </section>
    )
}