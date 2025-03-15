import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import img from './about.jpg'
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop:"3rem",
      marginBottom:"3rem"
    },
    grid:{
        paddingTop:"3rem",
        paddingBottom:"3rem"
    },
    paper:{
        background:"transparent",
        width:"80%"
    }

}))


const Aboutus = () => {
   const classes=useStyles()
   
    return (
        <>
         <div className={classes.root} >
        <Grid container  
         justifyContent="center"
         alignItems="center"
         className={classes.grid}



>

           

            <Grid item md={6} xs={12} >

                <Paper className={classes.Paper} elevation={0}>
                    <Typography  style={{fontWeight:700,textAlign:"center",color:"#ED5E93",fontSize:"14px"}} >
                        ABOUT US 
                     </Typography>
                     <div style={{marginTop:"10px",marginBottom:"20px"}} >

                     <Typography style={{textAlign:"center",fontSize:"2.5rem"}} >HotelEase</Typography>
                     <Typography style={{textAlign:"center",width:"80%",margin:"0 auto",marginTop:"10px",color:"#28161C",lineHeight:"26px"}}  >Lorem, ipsum dolor sit amet consectetur
                      adipisicing elit. Animi natus quasi quam alias quos libero cumque!
                       Quia modi quibusdam <br/> voluptates neque optio molestiae commodi, distinctio iure!
                        Quod hic delectus accusamus.</Typography>
                        <div style={{textAlign:"center",marginTop:"10px"}} >
              <Button component={Link} to="/Hotel-Website/About" style={{color:"#000",fontWeight:600}}  color="primary">Read More</Button>
              <Divider style={{width:"10%",margin:"0 auto",padding:"0.1rem",backgroundColor:"#ED5E93"}} />
                                 </div>
                        </div>
                </Paper>
                </Grid>

                <Grid item md={6} xs={12}  >
                    <div style={{display:"flex",justifyContent:"center"}} >

                    <img style={{width:"90%"}} src={process.env.PUBLIC_URL + '/images/about.jpg'} /> 
                    

                    </div>

                    </Grid>


            </Grid>

            

            </div>
            <Divider />




        </>
    )
}

export default Aboutus
