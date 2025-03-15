import React from 'react'
import { SliderData } from './SliderData'
import  './Slider.css'
import { Divider, Paper,Button,Typography,makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';


const useStyles=makeStyles(theme=>({
    slider:{
        position: 'relative',
        height: '88vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
  
    slide:{
        position: 'absolute',
        width: '100%',
        top: '0',
         height: 'auto',
     opacity: '0',
     transitionDuration: '0.5s ease',
     
    },

    image:{
        width: '100%',
        height:'88vh',
        objectFit: 'cover',
    },

    active:{
        opacity: 1,
      transitionDuration:'0.5s',
    transform: 'scale(1)',
    },

    paper:{
  
        height:'auto',
        zIndex:15,
        background:'rgba(0,0,0,0.5)',
       lineHeight:'2rem',
         padding:'20px 20px',
         [theme.breakpoints.down('sm')]:{
                width:'70%',
                padding:'30px 10px',
                
            
                
        },
        heading:{
         
            [theme.breakpoints.down('sm')]:{
                fontSize:'3rem'
                
            
                
        },
        },

       
         body:{
             color:"#fff"
         },

         line:{
            width:'6%',
            margin:' .1rem auto',
            [theme.breakpoints.down('sm')]:{
              width:'10%',
         },
        }

      
    },


       

}))

 
       




const Slider = ({slides}) => {
    const classes=useStyles()
    const [current,setcurrent]=React.useState(0);
    const length=slides.length

    const prevSlide=()=>{
      setcurrent(current===0 ? length-1 : current-1 );
    }
    const nextSlide=()=>{
        setcurrent(current===length-1 ? 0 : current+1);
    }
    if (!Array.isArray(slides) || slides.length<=0){
        return null;
    }




    return (
     
        
        <section className={classes.slider} >
                 <ArrowBackIosIcon  className="left" onClick={prevSlide} />
                   <ArrowForwardIosIcon className="right" onClick={nextSlide}  />
       {
          

         
           SliderData.map((img,index)=>{
              
            return(
              <div className={index===current? 'slide active' : classes.slide}  key={index} >
              {index===current && (
                   <img className={classes.image} src={img.image} alt="img" />
             
                   
                   
                   ) }
                  
        


                  
                  </div>

           )})


       }

                                          
                        <Paper className={classes.paper} >
                 <Typography style={{fontSize:"3rem",textAlign:'center',fontWeight:600}} color="primary" className={classes.heading} 
                 >
                   Luxurious Rooms 
                    </Typography>

                    <div style={{width:"40%",margin:"0 auto",marginBottom:"1rem"}} >
                    <Divider style={{height:'.3rem', backgroundColor:"#FFF3FA" }}  varient="middle" />
                    </div>
                           
                      <Typography  style={{color:"#e57373",textAlign:'center',marginBottom:"1rem"}} variant="body1"  >
                   Best Place to Stay and have fun 
                    </Typography>
                      <div style={{display:'flex',justifyContent:"center",padding:"0 1rem "}} >
                     <Button component={Link} to="/Hotel-Website/Rooms" style={{margin:"0 1rem",color:"#000",fontWeight:600}} variant="contained" color="secondary">
                                    View Rooms
                          </Button>
                            <Button component={Link} to="/Hotel-Website/Book-Now" style={{margin:"0 1rem",color:"FFF3FA",fontWeight:600}} variant="contained" color="primary">
                                  Book Now
                                </Button>
                                  </div>
                             </Paper>
                                                   
                       
 

 

        </section>
      
        
 
    )
}

export default Slider
