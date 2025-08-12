import { Routes, Route, NavLink  } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Nav } from './Nav.jsx'

export function Header({ name, age }) {
    return (
        <header className='header'>
            <NavLink to="/" className="link link-titulo">
                <h1 className='header-titulo'>Word</h1>
            </NavLink>

            <Routes>
                <Route path='/' element={
                    <div>
                        <input placeholder='Buscar...' />
                        <button>
                            <Search />
                        </button>
                    </div>
                }/>

            </Routes>

            <Nav />
        </header>
    )
}
