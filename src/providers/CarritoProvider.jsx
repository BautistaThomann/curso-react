import { createContext, useState } from 'react';

export const CarritoContext = createContext();

export function CustomCarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);
    const [cantidadTotal, setCantidadTotal] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);

    const handleAgregarAlCarrito = (producto, cantidad = 1) => {
        const existe = carrito.find(item => item.id === producto.id);
        if (existe) {
            setCarrito(
                carrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad }]);
        }
        setCantidadTotal(cantidadTotal + cantidad);
        setPrecioTotal(precioTotal + producto.precio * cantidad);
    };

    const handleEliminarDelCarrito = (producto) => {
        const item = carrito.find(p => p.id === producto.id);
        if (item) {
            setCarrito(carrito.filter(p => p.id !== producto.id));
            setCantidadTotal(cantidadTotal - item.cantidad);
            setPrecioTotal(precioTotal - item.precio * item.cantidad);
        }
    };

    const handleVaciarCarrito = () => {
        setCarrito([]);
        setCantidadTotal(0);
        setPrecioTotal(0);
    };

    return (
        <CarritoContext.Provider value={{
            carrito,
            cantidadTotal,
            precioTotal,
            handleAgregarAlCarrito,
            handleEliminarDelCarrito,
            handleVaciarCarrito
        }}>
            {children}
        </CarritoContext.Provider>
    );
}
