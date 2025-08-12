import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebaseConfig";

//componente hijo
export function FormularioCarrito({ onSendForm }) {

    const x = 1;

    const handleClick = () => {
        onSendForm(x);
    }

    const handleCompra = () => {
        const db = getFirestore(app);

        const coleccionVentas = collection(db, "ventas");

        addDoc(coleccionVentas, {
            nombre: "Monitor 24 pulgadas",
            precio: 150000,
            descripcion: "Monitor LED de 24 pulgadas full HD",
            stock: 10,
            categoria: "perifericos",
            imagen: "/images/monitor-gamer.jpg"

        })
    }

    return (
        <div>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" required placeholder="Ej: Bautista" />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" required placeholder="Ej: 1123456789" />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required placeholder="Ej: ejemplo@email.com" />
                </div>
            </form>
            <button onClick={handleCompra}>Agregar producto</button>
        </div>
    )
}
