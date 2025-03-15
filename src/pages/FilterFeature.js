import React, {useEffect,useRef} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/navbar/Navbar';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles({


    root: {
      maxWidth: 300,
      marginTop:"2rem"
      
    },
    media: {
      minHeight: 140,
    },
    grid:{
        flexGrow:1,
        width:"90%",
        margin:"0 auto"
    },
    g:{
      display:"flex",
      justifyContent:"center"
    },
    fullImg:{
      width:"100%",
      height:"100vh",
      marginBottom:"50px",
      background:"rgba(0,0,0,0.9)",
      position:"fixed",
      top:0,
      left:0,
      display:"none",
      alignItems:"center",
      justifyContent:"center",
      zIndex:100
  },
  full:{

    width:"50%",
    height:"70vh",
    objectFit:"cover",

    
},
close:{
  position:"absolute",
  top:"5%",
  color:"#FFF",
  fontSize:"30px",
  right:"5%",
  cursor:"pointer"

},
  });

const FilterFeature = () => {
    const classes = useStyles();
    const {typ }=useParams();
    console.log(typ)

    
 
     const dispatch = useDispatch();
     
    const box=useRef()
    const media=useRef([])
    media.current=[];
    const imgsrc=useRef()

    const openimg=(pic)=>{
      box.current.style.display="flex"
      imgsrc.current.src=pic.src
      console.log(pic)
      
      
      

  }

  const closebtn=()=>{
      box.current.style.display="none"

      
  }

     useEffect(() => {
       
dispatch({type:"FEATURED",typ})

     }, [typ]);

     const {room}=useSelector(state=>state.roomsReducer)
     console.log(room)


    return (
        <>

          <Navbar/>

                     < Grid container className={classes.grid} >

                     <div ref={box}  className={  classes.fullImg}>
           
           <img ref={imgsrc}  src={ process.env.PUBLIC_URL + '/images/r10.jpg'}  className={classes.full}  alt="" />
           <span onClick={()=>closebtn()}  className={classes.close} > <CloseIcon  /> </span> 
       
               </div>

                      
                      {
                     
                     room.length ?  

                         room.map(r=>(
                           <Grid item md={4} sm={6} xs={12} className={classes.g} >
          <Card className={classes.root}>
                  <CardActionArea  >
                   
        <CardMedia
        ref={(el)=>(media.current[r.id]=el)}
        onClick={()=>openimg(media.current[r.id])}
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={ process.env.PUBLIC_URL + r.image }
          title={room.type}
        />
        <CardContent>
        <Typography gutterBottom style={{fontSize:"1rem",textTransform:"capitalize"}} >
            {r.type} Room
          </Typography>
           <div  style={{display:"flex",justifyContent:"start"}} >
          <Typography variant="body2" color="textSecondary" gutterBottom component="p">
           Facility : 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          &nbsp; {r.Facility}
          </Typography>
          </div>
          <div style={{display:"flex",justifyContent:"start"}} >
          <Typography variant="body2" gutterBottom color="textSecondary" component="p">
           Capacity : 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          &nbsp; {r.capacity}
          </Typography>
          </div>
          <div style={{display:"flex",justifyContent:"start"}} >
          <Typography variant="body2" color="textSecondary" gutterBottom component="p">
           Price : 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          &nbsp; {r.Price} per-night
          </Typography>
          </div>
        </CardContent>
        </CardActionArea>
      <CardActions>
        <Button component={Link} to="/Hotel-Website/Book-Now" size="small" color="primary">
          Book Now
        </Button>
 
      </CardActions>
     
    </Card>

                        </Grid>


                         )
                         )
                       
                      
                      :(<h1>empty</h1>)

                         }
                      


                       </Grid>




                    


               
                     






      
       
        </>
    )
}

export default FilterFeature
