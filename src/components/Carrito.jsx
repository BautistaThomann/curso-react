import { useState } from "react";
import { FormularioCarrito } from "./FormularioCarrito";

// componente padre
export function Carrito() {

    const [data, setData] = useState("Sin data recibida");

    const handleSendForm = (data) => {
        setData(data);
    }

    return (
        <div>
            <h2>Carrito</h2>
            <p>{data}</p>
            <FormularioCarrito onSendForm={handleSendForm} />
        </div>
    )
}