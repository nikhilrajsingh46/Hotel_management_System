import React,{useState} from 'react'
import {MenuItems} from './MenuItems'
import  './Navbar.css'
import { NavLink } from 'react-router-dom'




const Navbar = () => {
   const [value,changevalue] = useState(false)
   const clicked=()=>{
     changevalue(!value)
   }
    return (
        <>
          <nav className="NavClass">

              <NavLink to="/Hotel-Website"   className="Logo"  >  HotelEase </NavLink>
              <div className="Menu-Icon" onClick={clicked} >
                  <i className={value? 'fas fa-times':'fas fa-bars'} ></i>
               </div>


              <ul className={value ? 'nav-menu active' : 'nav-menu' } >
                  {
                      MenuItems.map(
                          (item,index)=>{
                              return(
                                 <li key={index}  ><NavLink exact className={item.cName} activeClassName="activelink"  to={item.url} >{item.title}</NavLink></li>
                              )
                          }
                      
                      )
                    }
                   
                 
              </ul>
              <NavLink to="/Hotel-Website/Book-Now" className="button"  >Book Now</NavLink>
              <NavLink to="/Hotel-Website/AdminDashboard" className="Login"  >Login</NavLink>
             

          </nav>

        </>
    )
}

export default Navbar
