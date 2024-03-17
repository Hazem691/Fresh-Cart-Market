import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../Assets/images/freshcart-logo.svg'
import { CounterContext } from '../../Context/Counter';
import { TokenCounter } from '../../Context/Token';
import { CartContext } from '../../Context/CartContext';
export default function NavBar() {
  let { token , setToken} = useContext(TokenCounter);
  let {numofCartItem} = useContext(CartContext);
  let navigation = useNavigate();
  function logOut(){
    localStorage.removeItem("usertoken") ;
    setToken(null);
    navigation("/login") ;

  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={'home'}>
            <img src={Logo} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'home'}>Home</Link>
              </li>
            
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'products'}>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'categories'}>Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'brands'}>Brands</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link active" aria-current="page" to={'wishlist'}>WishList</Link>
              </li>
            </ul> : null}

            <ul className=' ms-auto navbar-nav'>
              <li className='nav-item align-self-center '>
                <i className='fa-brands fa-instagram mx-1 '></i>
                <i className=' fa-brands fa-facebook mx-1'></i>
                <i className='fa-brands fa-tiktok mx-1'></i>

                <i className=' fa-brands fa-linkedin mx-1'></i>
                <i className='fa-brands fa-youtube mx-1'></i>

              </li>

              {token ? <><li className='nav-item'>
                <button className='nav-link'  onClick={logOut}>LogOut</button>
              </li>  
             
               <li className="nav-item">
                
                <Link className="nav-link active" aria-current="page" to={'cart'}><i className="fa fa-shopping-cart text-main"></i> <span className='p-1 text-danger'>{numofCartItem}</span></Link>
              </li></> : <><li className='nav-item'>
                           <Link className='nav-link' aria-current="page" to={'register'}>Register</Link>
                        </li>
                         <li className='nav-item'>
                         <Link className='nav-link' aria-current="page" to={'login'}>Login</Link>
                         </li>
                         
                         </>}


            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}
