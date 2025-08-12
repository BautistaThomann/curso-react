import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { CarritoContext } from "../providers/CarritoProvider.jsx"
import { app } from "../firebaseConfig";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

export function DetalleDeProducto() {

    const resultadoDelContexto = useContext(CarritoContext)

    const [producto, setProducto] = useState({});

    const resultado = useParams();

    useEffect(() => {
        handleTraerDetalle();
    }, []);


    const handleClick = () => {
        // HACER Q SE SUME UNO POR CADA CLICK AL AGREGAR AL CARRITO
        resultadoDelContexto.setCantidad(2)
    }

    const handleTraerDetalle = () => {
        const db = getFirestore(app);
        const coleccionProductos = collection(db, "productos");
        const filtro = doc(coleccionProductos, resultado.id);

        const pedido = getDoc(filtro);

        pedido
            .then((respuesta) => {
                setProducto(respuesta.data());
            })
            .catch(() => {
                console.log("Salio algo mal");
            })
    }

    return (    
        <div className="detalle-producto">
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>{Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(producto.precio)}</p>
            <button onClick={handleClick}>Añadir al carrito</button>
        </div>
    )
}
