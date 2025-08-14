import { useState, useEffect } from "react";

export function ContadorStock({ stock, contador, setContador }) {

    const [localContador, setLocalContador] = useState(contador || 0);

    useEffect(() => {
        setLocalContador(contador);
    }, [contador]);

    const handleSumar = () => {
        if (localContador < stock) {
            setLocalContador(localContador + 1);
            setContador(localContador + 1);
        }
    }

    const handleRestar = () => {
        if (localContador > 1) {
            setLocalContador(localContador - 1);
            setContador(localContador - 1);
        }
    }

    return (
        <div>
            <button onClick={handleRestar}>-</button>
            <span> {localContador} </span>
            <button onClick={handleSumar}>+</button>
        </div>
    );
}
