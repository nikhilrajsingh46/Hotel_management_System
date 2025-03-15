import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import img from './img4.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Gallery from './Gallery';
import Footer from '../../components/Footer/Footer';





const useStyles=makeStyles(theme=>({

    root: {
        flexGrow: 1,
        
        paddingTop:"3rem",
        paddingBottom:"3rem",
        width:"100%",
        display:"flex",

        
 
      },

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
    textgrid:{
        display:"flex",
        justifyContent:"center",
        width:"80%",
        margin:"0 auto",
        [theme.breakpoints.down('sm')]:{
            width:'100%',
          
            
        
            
    },



    },
    p:{
        textAlign:"justify",fontSize:"1rem",lineHeight:"1.7rem",width:"80%",margin:"0 auto"
    },

    gallery:{
        marginTop:"6rem",
        height:"auto"
    },

    root1:{
        flexGrow:1
    }




}))

const About = () => {
    const classes=useStyles()
    return (
        <>
         <Navbar/>

         <div  className={classes.background} >
        <div>
            <h1 className={classes.text} > Welcome To HotelEase </h1>


        </div>
        </div>

        <div>
            <Grid container className={classes.root} >
            <Grid item md={6} sm={12} xs={12} style={{display:"flex",justifyContent:"center"}} >

<div style={{width:"95%",margin:"0 auto"}}>

    <img style={{width:"100%",height:"100vh",objectFit:"cover"}} src={ process.env.PUBLIC_URL + '/images/abt.jpg'} alt="" />

    

    </div>
    </Grid>

                <Grid item md={6} sm={12} xs={12} className={classes.textgrid} >
                < div>
                <Card elevation={0}  >
      <CardContent>
          <Typography style={{fontSize:"2rem",textAlign:"center",fontWeight:700,color:"#ED5E93"}} gutterBottom >
            HotelEase
          </Typography>

          <Typography style={{textAlign:"center",fontSize:"1.5rem",color:"#28161C"}} gutterBottom >A Perfect Place To Live and Enjoy</Typography>
          <br/>

        <Typography variant="body2" component="p" className={classes.p} >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut voluptatibus cupiditate illo, aliquid dolor assumenda, tenetur sed inventore fuga culpa, at nemo accusamus. Quasi, nam ducimus perferendis non laudantium corporis.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam sed, deserunt vero ullam libero ipsum incidunt quae repellendus eos maxime tenetur doloremque quisquam repudiandae, id illum quam fugiat hic reprehenderit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quam sunt sequi, eveniet, sit asperiores soluta ullam veniam minus magni obcaecati quas. At officiis voluptatum tempora laborum eius dolorum numquam.
          <br/>
          <br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, vero officiis. Fugiat exercitationem, sit earum ullam est eligendi at repellendus aliquid error amet debitis laborum, illo hic? Rerum, iste blanditiis.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt fuga sequi odio aliquam saepe quia! Placeat natus commodi asperiores inventore illum eligendi quidem, quibusdam recusandae. Provident a cupiditate soluta sapiente?

         
        </Typography>
      </CardContent>

    </Card>


                    </div>
                    </Grid>


                    <Grid item md={12} xs={12} sm={12} className={classes.gallery} >
                        
                    <div>
                        <Typography style={{fontSize:"14px",color:'#ED5E93',textTransform:"uppercase",letterSpacing:"2px",fontWeight:700,textAlign:"center"}} gutterBottom >Gallery</Typography>
                        <Typography style={{fontSize:"44px",color:"#19191a",textAlign:"center"}} gutterBottom >Discover Our Work</Typography>

                        </div>

                        <Gallery/>



                        </Grid>




                </Grid>

            </div>

            
           <Footer/> 

           

 




         






        </>
    )
}

export default About
