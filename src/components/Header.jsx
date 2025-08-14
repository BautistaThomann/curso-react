import { NavLink } from 'react-router-dom'
import { Nav } from './Nav.jsx'

export function Header() {
    return (
        <header className='header'>
            <NavLink to="/" className="link link-titulo">
                <h1 className='header-titulo'>GameZone</h1>
            </NavLink>
            <Nav />
        </header>
    )
}
