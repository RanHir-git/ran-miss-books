import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"
import { bookService } from "../services/car.service.js"
import { CarDetails } from "./CarDetails.jsx"

const { useState, useEffect } = React

export function CarIndex() {

    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedCarId, setSelectedCarId] = useState(null)

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function loadCars() {
        bookService.query(filterBy) // { txt: '...', minSpeed:150 }
            .then(setCars)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveCar(carId) {
        bookService.remove(carId)
            .then(() => {
                setCars(cars => (
                    cars.filter(car => car.id !== carId)
                ))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSelectCarId(carId) {
        setSelectedCarId(carId)
    }

    function onSetFilter(newFilterBy) { //{ txt: '...' }
        setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
    }


    if (!cars) return <div>Loading...</div>
    return (
        <section className="car-index">
            {!selectedCarId &&
                <React.Fragment>
                    <CarFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />

                    <CarList
                        cars={cars}
                        onRemoveCar={onRemoveCar}
                        onSelectCarId={onSelectCarId}
                    />
                </React.Fragment>
            }

            {selectedCarId &&
                <CarDetails
                    carId={selectedCarId}
                    onBack={() => setSelectedCarId(null)}
                />
            }
        </section>
    )

}