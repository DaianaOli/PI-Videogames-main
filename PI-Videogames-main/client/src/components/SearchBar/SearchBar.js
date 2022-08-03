import {React, useState} from 'react'
import { connect } from 'react-redux'
import { searchByName, getAllGames } from '../../actions/actions'
import './searchbar.css'


function SearchBar({searchByName, getAllGames}) {

    const [input, setInput] = useState({
        buscar: ''
    })

    const handleInputChange = function(e) {
          setInput({
          [e.target.name]: e.target.value
        });
    }

    const handleOnClick = () => {
        searchByName(input.buscar)
        setInput({
            buscar: ''
        });
    }

    const handleOnClickAll = () => {
        getAllGames()
        setInput({
            buscar: ''
        });
    }

    return (
      <div className="searchbar-div">
        <input
          className="bar-btn"
          name="buscar"
          placeholder="Search game..."
          onChange={handleInputChange}
          value={input.buscar}
          autoComplete="off"
        ></input>
        <button className="btn" onClick={handleOnClick}>
          Search
        </button>
        <button className="btn" onClick={handleOnClickAll}>
          Load All
        </button>
      </div>
    );
}

export default connect(null, { searchByName, getAllGames })(SearchBar)