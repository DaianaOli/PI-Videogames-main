import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

function NavBar() {
    
    return (
        <div className="navbar">
                <NavLink to="/videogames"><button>Videogames</button></NavLink>
                <NavLink to="/"><button>Start</button></NavLink>
                <NavLink to="/creategame"><button>Create Game</button></NavLink>
                <NavLink to="/about"><button>About</button></NavLink>
        </div>
    )
}

export default NavBar