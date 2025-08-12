import { Routes, Route } from "react-router-dom"
import { ItemListContainer } from "./ItemListContainer"
import { DetalleDeProducto } from "./DetalleDeProducto"
import { Carrito } from "./Carrito"

export function Main() {

    return (
        <main className='main'>
            <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/about" element={<h2>About</h2>} />
                <Route path="/contact" element={<h2>Contact</h2>} />
                <Route path="/producto/:id" element={<DetalleDeProducto />} />

                <Route path="/categoria/:categoria" element={<ItemListContainer />} />

                <Route path="/carrito" element={<Carrito />} />
            </Routes>
        </main>
    )

}
