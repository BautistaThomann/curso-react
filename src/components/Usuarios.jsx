import { useState, useEffect } from "react"

export function Usuarios() {

    const [estado, setEstado] = useState([])

    //llamada a la API
    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/users')
        .then((respuesta) => {return respuesta.json()} )
        .then((usuarios) => {
            setEstado(usuarios)
        })

    },[])


    return (
        <div>
            {JSON.stringify(estado)}
        </div>
    )
}
