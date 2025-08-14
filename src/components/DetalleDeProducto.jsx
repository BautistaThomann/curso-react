import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../providers/CarritoProvider.jsx";
import { app } from "../firebaseConfig";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { ContadorStock } from "./ContadorStock.jsx";
import Swal from "sweetalert2";

export function DetalleDeProducto() {
    const { handleAgregarAlCarrito } = useContext(CarritoContext);
    const [producto, setProducto] = useState({});
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
    const resultado = useParams();

    useEffect(() => {
        handleTraerDetalle();
    }, [resultado.id]);

    const handleClick = () => {
        if (cantidadSeleccionada === 0) {
            Swal.fire('Error', 'Seleccioná al menos 1 producto', 'error');
            return;
        }
        handleAgregarAlCarrito(producto, cantidadSeleccionada);
        Swal.fire({
            title: '¡Agregado al carrito!',
            text: `Se agregaron ${cantidadSeleccionada} unidades de ${producto.nombre}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }

    const handleTraerDetalle = () => {
        const db = getFirestore(app);
        const coleccionProductos = collection(db, "productos");
        const filtro = doc(coleccionProductos, resultado.id);

        getDoc(filtro)
            .then((respuesta) => {
                setProducto({ id: respuesta.id, ...respuesta.data() });
                setCantidadSeleccionada(1);
            })
            .catch(() => {
                Swal.fire('Error', 'No se pudo traer el detalle del producto', 'error');
            });
    }

    return (
        <div className="detalle-producto">
            <img src={producto.imagen} alt={producto.nombre} />
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>Stock: {producto.stock}</p>
            <ContadorStock stock={producto.stock} contador={cantidadSeleccionada} setContador={setCantidadSeleccionada} />
            <p>{Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(producto.precio)}</p>
            <button onClick={handleClick}>Añadir al carrito</button>
        </div>
    );
}
