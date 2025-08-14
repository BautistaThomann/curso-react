import { useContext, useState } from "react";
import { CarritoContext } from "../providers/CarritoProvider.jsx";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebaseConfig";
import Swal from "sweetalert2";

export function FormularioCarrito() {
    const { carrito, handleVaciarCarrito, precioTotal } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    const handleCompra = async () => {
        if (!nombre || !telefono || !email || carrito.length === 0) {
            Swal.fire('Error', 'Completa todos los campos y agrega productos al carrito', 'error');
            return;
        }

        const db = getFirestore(app);
        const coleccionVentas = collection(db, "ventas");

        try {
            const docRef = await addDoc(coleccionVentas, {
                comprador: { nombre, telefono, email },
                productos: carrito,
                total: precioTotal,
                fecha: new Date()
            });

            Swal.fire({
                title: '¡Compra realizada!',
                html: `Gracias por tu compra.<br><strong>Ticket:</strong> ${docRef.id}`,
                icon: 'success',
                confirmButtonText: 'Ok'
            });

            //funcion q limpia el carrito
            handleVaciarCarrito();
            setNombre(""); setTelefono(""); setEmail("");
        } catch (error) {
            Swal.fire('Error', 'No se pudo procesar la compra', 'error');
        }
    }

    return (
        <div>
            <h2>Formulario de compra</h2>
            <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
            <input type="tel" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={handleCompra}>Confirmar compra</button>
        </div>
    )
}
