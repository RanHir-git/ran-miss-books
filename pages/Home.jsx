import { animateCSS } from "../services/util.service.js"

const { useRef } = React

export function Home() {

    const h1Ref = useRef()
    const imgRef = useRef()

    function onActivate() {
        animateCSS(h1Ref.current, 'rubberBand')
            .then(() => {
                animateCSS(imgRef.current, 'bounceOut', { isRemoveClass: false })
            })

    }

    return (
        <section className="home container">
            <h1 ref={h1Ref} >Car's R Us!</h1>
            <img ref={imgRef} src="../assets/img/react.png" alt="hero-image" />
            <button onClick={onActivate}>Activate</button>
        </section>
    )
}