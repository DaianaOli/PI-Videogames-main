import  axios from 'axios';
import {
    GET_ALL_GAMES,
    SEARCH_BY_NAME,
    GET_VIDEOGAME_DETAIL,
    GET_GENRES,ORDER_BY,
    FILTER_BY,} from "./const.js";

//Trae los juegos de la API y DB
export function getAllGames(){
    return async function(dispatch){
        return axios
        .get('/videogames/')
        .then((res)=>{
            dispatch({type: GET_ALL_GAMES, payload: res.data});
        }).catch((err)=>{
            return err
        })
    }
}

//Trae los juegos por nombre
export function searchByName(name){
    return async function (dispatch){
        return axios
        .get(`/videogames?name=${name}`)
        .then((res)=>{
            dispatch({type: SEARCH_BY_NAME, payload: res.data})
        }).catch((err)=>{
            return err
        })
    }
}

//Trae los detalles del juego pasado por id
export function getVideogameDetail(id){
    return function(dispatch){
        axios 
        .get (`/videogame/${id}`)
        .then((res) => {
            console.log(res.data)
            dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data });
        }).catch((err) => {
            return err;
        });
    }
}

//Ordenamiento
export function orderBy(order) {
    return function (dispatch) {
      dispatch({ type: ORDER_BY, payload: order });
    };
  }
  
//Filtrado
  export function filterBy(order) {
    return function (dispatch) {
      dispatch({ type: FILTER_BY, payload: order });
    };
  }

//Trae todos los genres
export function getGenres() {
    return function (dispatch) {
        axios
        .get(`/genres`)
        .then((res) => {
            dispatch({ type: GET_GENRES, payload: res.data });
        })
        .catch((err) => {
            return err;
        });
    };
}

