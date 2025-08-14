import { Link } from "react-router-dom";

export function Item({ producto }) {
    return (
        <div className="card-producto">
            <h2>{producto.nombre}</h2>
            <p>{Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(producto.precio)}</p>
            <Link to={`/producto/${producto.id}`} className="link-vermas">ver detalle</Link>
        </div>
    )
}
