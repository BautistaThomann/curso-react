import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { app } from "../firebaseConfig";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Item } from "./Item";

export function ItemListContainer() {

    const [productos, setProductos] = useState([]);

    const resultado = useParams();

    useEffect(() => { 
        if (resultado.categoria) {
            //traer productos por categoria
            handleTraerProductoPorCategoria();
        } else{
            //traer todos los productos
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

        })
    }

    const handleTraerProducto = () => {
        const db = getFirestore(app);

        const coleccionProductos = collection(db, "productos");

        const pedido = getDocs(coleccionProductos)

        pedido
            .then((respuesta) => {
                console.log("Salio todo bien")
                
                const productosFinales = [];

                respuesta.forEach((producto) => {
                    const productoFinal ={
                        id: producto.id,
                        ...producto.data()
                    }

                    productosFinales.push(productoFinal);
                })

                setProductos(productosFinales);

            })
            .catch(() => {
                console.log("Error al traer los productos")
            })
    }

    const handleTraerProductoPorCategoria = () => {
        const db = getFirestore(app);

        const coleccionProductos = collection(db, "productos");

        const filtro = query(coleccionProductos, where("categoria", "==", resultado.categoria));

        const pedido = getDocs(filtro)

        pedido
            .then((respuesta) => {
                console.log("Salio todo bien")
                
                const productosFinales = [];

                respuesta.forEach((producto) => {
                    productosFinales.push(producto.data())
                })

                console.log(productosFinales)
                setProductos(productosFinales);

            })
            .catch(() => {
                console.log("Error al traer los productos")
            })
    }

    return (
        <>
            <div className="productos">
                {/* por cada producto hace un div diferente */}
                {productos.map((producto, indice) => (
                    <Item key={indice} producto={producto} />
                ))}
            </div>
        </>
    )
}
