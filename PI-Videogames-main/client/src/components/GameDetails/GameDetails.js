import React from 'react'
import {useEffect} from 'react'
import { connect }from 'react-redux'
import { getVideogameDetail } from '../../actions/actions'
import Navbar from '../NavBar/NavBar'
import photo from '../imagenes/images.jpg'
import { NavLink } from 'react-router-dom'
import './gamedetail.css'


function GameDetails(props) {

  const {getVideogameDetail, gameDetails} = props
  const {idVideogame} = props.match.params;
  // me carga los details del juego
    useEffect(() => {
    getVideogameDetail(idVideogame);
    },[getVideogameDetail, idVideogame])

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
            
            {
              <p>
                <strong>Release Date</strong>:{" "}
                {`${gameDetails.releaseDate || "None"}`}
              </p>
            }
            <p>
              <strong>Rating</strong>:  {`${gameDetails.rating}`}
            </p>
            {gameDetails.description &&
            gameDetails.genres &&
            gameDetails.platforms ? (
              <div className="div-descr">
                {
                  <p className="descripcion">
                  <strong>Description</strong>: 
                    {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                  </p>
                }
                {
                  <p>
                    <strong>Genres</strong>:
                    {`${gameDetails.genres.join(", ")}`}
                  </p>
                }
                {
                  <p>
                    <strong>Platforms</strong>:{" "}
                    {`${
                      typeof gameDetails.platforms === "string"
                        ? gameDetails.platforms
                        : gameDetails.platforms.join(", ")
                    }`}
                  </p>
                }
                
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