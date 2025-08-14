import { Routes, Route } from "react-router-dom"
import { ItemListContainer } from "./ItemListContainer"
import { DetalleDeProducto } from "./DetalleDeProducto"
import { Nosotros } from "./Nosotros"
import { Carrito } from "./Carrito"

export function Main() {

    return (
        <main className='main'>
            <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/producto/:id" element={<DetalleDeProducto />} />
                <Route path="/categoria/:categoria" element={<ItemListContainer />} />
                <Route path="/carrito" element={<Carrito />} />
            </Routes>
        </main>
    )
    
}
