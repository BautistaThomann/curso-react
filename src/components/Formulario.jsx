import { useState } from "react"

export function Formulario() {

    const [nombre, setNombre] = useState("")
    const [usuarios, setUsuarios] = useState("")

    const handleChange = (evt) => {
        setNombre(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        setUsuarios(usuarios + "," + nombre)

    }
    
    return (
        <section>
            {/* <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} />
            </form>
            <div>
                <h2>Lista de Usuarios</h2>
                <ul>
                    <li>{usuarios}</li>
                </ul>
            </div> */}
        </section>
    )
}
