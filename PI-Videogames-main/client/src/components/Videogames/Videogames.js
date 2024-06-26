import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'
import { connect } from 'react-redux'
import Videogame from '../Videogame/Videogame'
import Pagination from '../Pagination/Pagination'
import FilteredBy from '../FilterBy/FilterBy'
import './videogames.css'
import { getAllGames, getGenres } from '../../actions/actions'
import notFound from '../imagenes/notf.gif'
import loading from '../imagenes/carg.gif'

function Videogames({allGames, getAllGames, getGenres }) {

    const [currentPage, setCurrentPage] = useState(1)

    const [cardPerPage] = useState(15)

    //* indices de la paginación:
    const indexOfLastCard = currentPage * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage;

    var currentCards; //"cards" que se deben mostrar en la pantalla

    // en caso de que al buscar un juego en particular no encuentra ninguno
    if(typeof allGames === 'string'){
        currentCards = allGames
    }else {
        currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard) //uso los indices para "fraccionar que juegos muestro"
    }
    
    const paginate = (pageNumber) => {
         setCurrentPage(pageNumber)
    }

    useEffect (() => {
        getAllGames()
        getGenres()
    }, [getAllGames, getGenres])

    return (
      <div className="container">
        <NavBar />
        <SearchBar />
        <FilteredBy />
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="games-div">
          {currentCards.length > 1 ? (
            currentCards?.map((g) => (
              <Videogame
                key={g.id}
                name={g.name}
                rating={g.rating}
                genres={g.genres}
                image={g.background_image}
                id={g.id}
              />
            ))
          ) : typeof currentCards === "string" ? (
            <div className='cont-nf'>
              <p className='nf'>GAME NOT FOUND</p>
              <img className="notfound" src={notFound} alt="error404"></img>
            </div>
          ) : (
            <div className='cont-ld'>
              <p className='load'>LOADING</p>
              <img className="search" src={loading} alt=""></img>
            </div>
          )}
        </div>
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    );
}

const mapStateToProps = (state) => {
    return {
        allGames: state.filtered
    }
}

export default connect(mapStateToProps,{ getAllGames, getGenres }) (Videogames)