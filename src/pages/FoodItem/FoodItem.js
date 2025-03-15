import React from 'react'
import Food from '../../components/Food/Food'
import Navbar from '../../components/navbar/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import img from './food.jpg'
import Footer from '../../components/Footer/Footer';


const useStyles=makeStyles(theme=>({

    background:{
        background:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.1)),url(${img})`,
        width:"100%",height:"90vh",
        backgroundPosition: 'center', 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:"7rem"

    },
    text:{
        color:"#facfe8",
        fontWeight:800,
        fontSize:"3rem",
        textAlign:"center",
        textTransform:"uppercase",
        letterSpacing:"2px"
    },

}))

const FoodItem = () => {
    const classes=useStyles()
    return (
        <>
        <Navbar/>
        <div  className={classes.background} >
        <div>
            <h1 className={classes.text} > Enjoy The Best Quality Of Food Here </h1>


        </div>
        </div>
        <div>
        <Food/>

        </div>
        <Footer/>
            
        </>
    )
}

export default FoodItem
