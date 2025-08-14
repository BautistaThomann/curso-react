import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../providers/CarritoProvider";

export function Nav() {

    const valorDelContexto = useContext(CarritoContext)

    return (
        <nav className="nav">
            <NavLink to="/nosotros" className="link">Nosotros</NavLink>
            <NavLink to="/categoria/componentes" className="link">Componentes</NavLink>
            <NavLink to="/categoria/perifericos" className="link">Periféricos</NavLink>
            {/* icono carrito */}
            <NavLink to="/carrito">
                <ShoppingCart />
                {valorDelContexto.cantidad}
            </NavLink>
        </nav>
    )
}