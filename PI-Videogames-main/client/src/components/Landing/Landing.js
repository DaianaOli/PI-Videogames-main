import { Link } from 'react-router-dom';
import './Landing.css'
import img from '../imagenes/nS1.gif'

export default function Landing() {

  return (
    <div>
    <h1 className='
    title'>Let's get started!</h1>
        <Link to="/videogames">
          <button className="myButton">HOME</button>
        </Link>
        <div className='img'>
          <img src={img} alt="logo" />
        </div>
    </div>
    
  );
}