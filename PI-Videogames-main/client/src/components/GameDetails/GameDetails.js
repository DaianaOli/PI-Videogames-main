import React from 'react'
import {useEffect} from 'react'
import { connect }from 'react-redux'
import { getVideogameDetail } from '../../actions/actions'
import Navbar from '../NavBar/NavBar'
import photo from '../imagenes/images.jpg'
import { NavLink } from 'react-router-dom'
import './gamedetail.css'
import{ useDispatch} from 'react-redux'


function GameDetails(props) {

  const {getVideogameDetail, gameDetails} = props
  const {idVideogame} = props.match.params;
  const dispatch = useDispatch()
  // me carga los details del juego
    useEffect(() => {
    getVideogameDetail(idVideogame);
    dispatch({type: 'GET_VIDEOGAME_DETAIL', payload: []})
    },[getVideogameDetail, dispatch])

  return (
    <div>
      <Navbar />
      <div className="details-div">
        {gameDetails ? (
          <div className='detail-contenedor-div'>
            <h3 className="title">{gameDetails.name}</h3>
            {gameDetails.background_image ? (
              <div className="div-img">
                <img src={gameDetails.background_image} alt="Videogame"></img>
              </div>
            ) : (
              <div className="div-img">
                <img src={photo} alt="Videogame"></img>
              </div>
            )}
            {gameDetails.description &&
            gameDetails.genres &&
            gameDetails.platforms ? (
              <div className="div-descr">
                {
                  <p className="descripcion">
                  <strong>Description</strong>: 
                      <p>{gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                      </p>
                  </p>
                }
                {
                  <p className='genres'>
                    <strong>Genres</strong>: 
                    {`${gameDetails.genres.join(", ")}`}
                  </p>
                }
                {
                  <p className='platforms'>
                    <strong>Platforms</strong>:{" "}
                    {`${
                      typeof gameDetails.platforms === "string"
                        ? gameDetails.platforms
                        : gameDetails.platforms.join(", ")
                    }`}
                  </p>
                }
                {
              <p className='rd'>
                <strong>Release Date</strong>:{" "}
                {`${gameDetails.releaseDate || "None"}`}
              </p>
            }
            <p className='rating'>
              <strong>Rating</strong>:  {`${gameDetails.rating}`}
            </p>
                
                <NavLink to="/videogames">
                  <button>Back</button>
                </NavLink>
              </div>
            ) : (
              <h1>Loading</h1>
            )}
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      gameDetails: state.gameDetails
  }
}

export default connect(mapStateToProps, {getVideogameDetail}) (GameDetails)