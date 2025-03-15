import { Grid } from '@material-ui/core'
import React,{useRef} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useSelector } from 'react-redux'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Filter from './Filter';
import Footer from '../../components/Footer/Footer';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';




const useStyles = makeStyles({
    root: {
      maxWidth: 460,
      
      
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

    media: {
      minHeight: 340,
    },
    grid:{
        padding:"1rem"
    }
  });

const Rooms = () => {
const classes = useStyles();
const {rooms} =useSelector(state=>state.roomsReducer)
const [items,setItems]=React.useState(rooms);

const filterItem=(item)=>{
    const updatedItem=rooms.filter((room)=>{
      return room.type===item;
    });

    setItems(updatedItem)
    }

    const ascendingSort = () => {
      const sorted = [...rooms].sort((a, b) => {
        return a.Price - b.Price;
      });
      setItems(sorted);
    }

    const descendingSort = () => {
      const sorted = [...rooms].sort((a, b) => {
        return b.Price - a.Price;
      });
      setItems(sorted);
    }


    const box=useRef()
    const media=useRef([])
    media.current=[];
    const imgsrc=useRef()


    console.log(box.current)

    const openimg=(pic)=>{
        box.current.style.display="flex"
        imgsrc.current.src=pic.src
        console.log(pic.src)
        
        
        

    }

    const closebtn=()=>{
        box.current.style.display="none"

        
    }

    




    return (
        <>
        <Navbar/>

        <div ref={box}  className={  classes.fullImg}>
           
           <img ref={imgsrc}  src={ process.env.PUBLIC_URL + '/images/r10.jpg'}  className={classes.full}  alt="" />
           <span onClick={()=>closebtn()}  className={classes.close} > <CloseIcon  /> </span> 
       
               </div>

        <Filter filterItem={filterItem} setItems={setItems} ascendingSort={ascendingSort} descendingSort={descendingSort} />
           < Grid container style={{width:"90%",margin:"0 auto"}} >


               
                     
                     {
                         items.map(room =>(

                        
               <Grid className={classes.grid} item md={4} sm={6} xs={12}>

                  <div style={{display:"flex",justifyContent:"center"}}  >

                  <Card className={classes.root}>
                  <CardActionArea  onClick={()=>console.log("clihhi")} >
                   
        <CardMedia
        ref={(el)=>(media.current[room.id]=el)}
        onClick={()=>openimg(media.current[room.id])}
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={ process.env.PUBLIC_URL + room.image }
          title={room.type}
        />
        <CardContent>
        <Typography gutterBottom style={{fontSize:"1rem",textTransform:"capitalize"}} >
            {room.type} Room
          </Typography>
           <div  style={{display:"flex",justifyContent:"start"}} >
          <Typography variant="body2" color="textSecondary" gutterBottom component="p">
           Facility : 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          &nbsp; {room.Facility}
          </Typography>
          </div>
          <div style={{display:"flex",justifyContent:"start"}} >
          <Typography variant="body2" gutterBottom color="textSecondary" component="p">
           Capacity : 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          &nbsp; {room.capacity}
          </Typography>
          </div>
          <div style={{display:"flex",justifyContent:"start"}} >
          <Typography variant="body2" color="textSecondary" gutterBottom component="p">
           Price : 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          &nbsp; {room.Price} per-night
          </Typography>
          </div>
        </CardContent>
        </CardActionArea>
      <CardActions>
        <Button component={Link} to="/Hotel-Website/Book-Now"  size="small" color="primary">
          Book Now
        </Button>
 
      </CardActions>
     
    </Card>


               
                </div>

                      </Grid>

                     ))}


                  


        


               </Grid>

               <Footer/>



        </>
    )
}

export default Rooms
