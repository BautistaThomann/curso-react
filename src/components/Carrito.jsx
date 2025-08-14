import { useContext } from "react";
import { CarritoContext } from "../providers/CarritoProvider.jsx";
import { FormularioCarrito } from "./FormularioCarrito.jsx";
import Swal from "sweetalert2";

export function Carrito() {
    const { carrito, precioTotal, handleAgregarAlCarrito, handleEliminarDelCarrito, handleVaciarCarrito } = useContext(CarritoContext);

    const handleEliminar = (producto) => {
        Swal.fire({
            title: `¿Querés eliminar ${producto.nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleEliminarDelCarrito(producto);
                Swal.fire('Eliminado', 'Producto eliminado del carrito', 'success');
            }
        });
    };

    const handleVaciar = () => {
        if (carrito.length === 0) return;
        Swal.fire({
            title: '¿Querés vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleVaciarCarrito();
                Swal.fire('Vaciado', 'El carrito fue vaciado', 'success');
            }
        });
    };

    const aumentarCantidad = (producto) => {
        handleAgregarAlCarrito(producto, 1);
    };

    const disminuirCantidad = (producto) => {
        if (producto.cantidad > 1) {
            handleAgregarAlCarrito({ ...producto, precio: producto.precio }, -1);
        } else {
            handleEliminar(producto);
        }
    };

    return (
        <div className="carrito">
            <h2>Carrito de compras</h2>

            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    <ul>
                        {carrito.map((producto, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <span>
                                    {producto.nombre} - ${producto.precio} x {producto.cantidad} = ${producto.precio * producto.cantidad}
                                </span>
                                <button style={{ marginLeft: "5px" }} onClick={() => disminuirCantidad(producto)}>-</button>
                                <button style={{ marginLeft: "5px" }} onClick={() => aumentarCantidad(producto)}>+</button>
                                <button style={{ marginLeft: "10px" }} onClick={() => handleEliminar(producto)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total: ${precioTotal}</strong></p>
                    <button onClick={handleVaciar}>Vaciar carrito</button>
                </>
            )}

            <hr />

            <FormularioCarrito />
        </div>
    );
}
