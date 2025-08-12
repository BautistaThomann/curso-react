import { ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../providers/CarritoProvider";

export function Nav() {

    const valorDelContexto = useContext(CarritoContext)

    return (
        <nav className="nav">
            <NavLink to="/about" className="link">About</NavLink>
            <NavLink to="/categoria/componentes" className="link">Componentes</NavLink>
            <NavLink to="/categoria/perifericos" className="link">Periféricos</NavLink>
            <NavLink to="/contact" className="link">Contact</NavLink>
            {/* icono carrito */}
            <NavLink to="/carrito">
                <ShoppingCart />
                {valorDelContexto.cantidad}
            </NavLink>
        </nav>
    )
}