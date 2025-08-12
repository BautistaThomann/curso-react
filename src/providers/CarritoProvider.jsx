import { Children, createContext, use } from 'react'
import { useState } from 'react'

//esta variable es el contexto
export const CarritoContext = createContext()

//esta variable es el provider
const CarritoProvider = CarritoContext.Provider

//componente envoltorio
export function CustomCarritoProvider({ children }) {

    const [cantidad, setCantidad] = useState(0)

    //valor del contexto
    const elValorDelcontexto = {
        cantidad: cantidad,
        carrito: [],
        precioTotal: 0,
        setCantidad: setCantidad
    }

    //aca se retorna el provider
    return (
        //esta linea es la que le da el valor al contexto
        <CarritoProvider value={elValorDelcontexto}>
            {children}
        </CarritoProvider>
    )
}
