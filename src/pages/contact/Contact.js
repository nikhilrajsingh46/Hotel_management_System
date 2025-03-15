import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { makeStyles,  withStyles, } from '@material-ui/core/styles';
import img from './contact.jpg'
import Typography from '@material-ui/core/Typography'
import RoomIcon from '@material-ui/icons/Room';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';








const useStyles=makeStyles(theme=>({


    background:{
        background:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.1)),url(${img})`,
        width:"100%",
        backgroundPosition: 'center', 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height:"auto",
        paddingBottom:"5rem"
    },
       
        root: {
            '& > *': {
              margin: theme.spacing(1),
              width: '25ch',
            },
        
       

    },
    title:{
        paddingTop:"1.5rem",
        paddingBottom:"2rem"


    },
    room:{
        color:"#fff",
        fontSize:"2rem",

    },
    address:{
        width:"250px",
        margin:"0 auto",
        display:"flex"
        
    },
    grid1:{
        marginBottom:"3rem"
    
    },
    icon:{
        marginRight:"1rem",
        marginTop:"7px"
    },
    grid2:{
        height:"400px"
    }

}))

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },

    },
  })(TextField);



const Contact = () => {
    const classes=useStyles()
    return (
        <>
           <Navbar/>
           <div  className={classes.background} >

               <div className={classes.title} >

               <Typography color="primary" style={{fontWeight:"500",fontSize:"2.5rem",textAlign:"center"}} >Contact Us</Typography>
               <Typography component="p" varient="body1"  style={{textAlign:"center",width:"50%",margin:"0 auto",color:"#fff"}}  >
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit commodi dolor exercitationem modi. Nam asperiores maxime quae nulla, unde eius error minima

               </Typography>

                   </div>

               <Grid container   alignItems="center" >
                   <Grid item md={6} xs={12} className={classes.grid1} >
                    <div className={classes.info} >
                   <div className={classes.address}>

                       <div className={classes.icon} >
                       <RoomIcon className={classes.room} />
                           </div>

                           <div className={classes.lett}>
                               <Typography style={{fontSize:"1.5rem",letterSpacing:"2px",fontWeight:"600",color:"#16db3d"}} >Address</Typography>
                               <Typography style={{color:"#fff"}} >Bhaktapur Street No.247</Typography>
                               <Typography style={{color:"#fff"}} >Kathmandu,Nepal</Typography>
                               </div>

                           </div  >

                           <br/>

                           <div className={classes.address}>

         <div className={classes.icon} >
           <PhoneIcon className={classes.room} />
            </div>

    <div className={classes.lett}>
        <Typography style={{fontSize:"1.5rem",letterSpacing:"2px",fontWeight:"600",color:"#16db3d"}} >Phone</Typography>
        <Typography style={{color:"#fff"}} >9867545675</Typography>
        <Typography style={{color:"#fff"}} >023-580967</Typography>
        </div>

    </div  >

    <br/>

<div className={classes.address}>

<div className={classes.icon} >
<EmailIcon className={classes.room} />
</div>

<div className={classes.lett}>
<Typography  style={{fontSize:"1.5rem",letterSpacing:"2px",fontWeight:"600",color:"#16db3d"}} >Email</Typography>
<Typography style={{color:"#fff"}} >Hotelbooking@gmail.com</Typography>
<Typography style={{color:"#fff"}} >Hello@gmail.com</Typography>
</div>

</div  >
</div>



                  
                       </Grid>
                       <Grid item md={6} xs={12} className={classes.grid2} >
                        <Paper style={{width:"70%",margin:"0 auto",padding:"2.5rem 1rem 2.5rem 2rem  "}}  >

                            <Typography style={{fontSize:"1.5rem"}} gutterBottom >Send Message</Typography>
                            <Grid container>

                                <Grid item md={12} sm={12} xs={12} > 

                                <form className={classes.root}  >
                                    <CssTextField style={{width:"90%"}}  id="standard-basic" label="Full Name" />
                                    </form>


                                </Grid>

                                <Grid item md={12} sm={12} xs={12} >

                                  <form className={classes.root} noValidate autoComplete="off">
                                      <CssTextField  style={{width:"90%",}}  id="standard-basic" label="Email" />
                                                    </form>


                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12} >

                                         <form className={classes.root} noValidate autoComplete="off">
                                             <CssTextField  style={{width:"90%"}} multiline id="standard-basic" label="Type Your Message" />
                                                       </form>


                                           </Grid>
                                          

                                           <Grid item md={12} sm={12} xs={12}  >
                                           <Button variant="contained" style={{color:"#fff",backgroundColor:"#16db3d",marginTop:"1rem"}}>
                                           Send
                                                            </Button>


                                               </Grid>



                             </Grid>
                            </Paper>
                            </Grid>
                            </Grid>
                          

              </div>
       

        </>
    )
}

export default Contact
