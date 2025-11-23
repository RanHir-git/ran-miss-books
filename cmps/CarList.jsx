import { CarPreview } from "./CarPreview.jsx";

export function CarList({ cars, onRemoveCar, onSelectCarId }) {

    return (
        <ul className="car-list container">
            {cars.map(car => (
                <li key={car.id}>
                    <CarPreview car={car} />
                    <section>
                        <button onClick={() => onRemoveCar(car.id)}>
                            Remove
                        </button>
                        <button onClick={() => onSelectCarId(car.id)}>
                            Details
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )

}