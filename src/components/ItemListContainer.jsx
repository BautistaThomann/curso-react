import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { app } from "../firebaseConfig";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Item } from "./Item";
import Swal from 'sweetalert2';

export function ItemListContainer() {

    const [productos, setProductos] = useState([]);
    const resultado = useParams();

    useEffect(() => {
        if (resultado.categoria) {
            handleTraerProductoPorCategoria();
        } else {
            handleTraerProducto();
        }
    }, [resultado.categoria]);

    const handleAgregarProducto = () => {
        const db = getFirestore(app);
        const coleccionProductos = collection(db, "productos");

        addDoc(coleccionProductos, {
            nombre: "Monitor 24 pulgadas",
            precio: 150000,
            descripcion: "Monitor LED de 24 pulgadas full HD",
            stock: 10,
            categoria: "perifericos",
            imagen: "/images/monitor-gamer.jpg"
            // desde la misma base de datos agregue los productos a mano
        })
        .then(() => {
            Swal.fire({
                title: '¡Producto agregado!',
                text: 'El producto se agregó correctamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        })
        .catch(() => {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo agregar el producto.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        });
    }

    const mostrarLoader = (mensaje = 'Cargando productos...') => {
        Swal.fire({
            title: mensaje,
            allowOutsideClick: false,
            background: '#1e1e1e',
            color: '#ffffff',       
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    };

    const handleTraerProducto = () => {
        const db = getFirestore(app);
        const coleccionProductos = collection(db, "productos");

        mostrarLoader();

        getDocs(coleccionProductos)
            .then((respuesta) => {
                const productosFinales = [];
                respuesta.forEach((producto) => {
                    productosFinales.push({
                        id: producto.id,
                        ...producto.data()
                    });
                });
                setProductos(productosFinales);
                Swal.close();
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los productos',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    }

    const handleTraerProductoPorCategoria = () => {
        const db = getFirestore(app);
        const coleccionProductos = collection(db, "productos");
        const filtro = query(coleccionProductos, where("categoria", "==", resultado.categoria));

        mostrarLoader();

        getDocs(filtro)
            .then((respuesta) => {
                const productosFinales = [];
                respuesta.forEach((producto) => {
                    productosFinales.push({
                        id: producto.id,
                        ...producto.data()
                    });
                });
                setProductos(productosFinales);
                Swal.close();
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los productos',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    }

    return (
        <>
            <div className="productos">
                {productos.map((producto, indice) => (
                    <Item key={indice} producto={producto} />
                ))}
            </div>
        </>
    )
}
