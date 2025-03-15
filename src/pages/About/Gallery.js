import React,{useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';



const useStyles=makeStyles(theme=>({



img:{
    width:"100%",
    cursor:"pointer",
    transition:"0.4s",
    '&:hover': 
    { 
        
        transform:'scale(0.8) Rotate(-15deg)',
        borderRadius:"20px",
        boxShadow:"0 32px 75px rgba(68,77,136, 0.2)",
    }

   
},
root:{
    flexGrow: 1,
    width:"80%",
    margin:"0 auto",
},
image:{
    width:"250px",
    padding:"10px 20px 10px 20px ",

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

}



}))

const Gallery = () => {
    const classes=useStyles()
    const box=useRef()
    const imgsrc=useRef()
    const imgs1=useRef()
    const imgs2=useRef()
    const imgs3=useRef()
    const imgs4=useRef()
    const imgs5=useRef()
    const imgs6=useRef()
    const imgs7=useRef()
    const imgs8=useRef()

    

    const openimg=(pic)=>{
        box.current.style.display="flex"
        imgsrc.current.src=pic.src
       
        
        

    }

    const closebtn=()=>{
        box.current.style.display="none"
      
    }

    





    return (
        <>
       <div className={classes.imgGallery}>

       <div ref={box}  className={  classes.fullImg}>
           
    <img ref={imgsrc}  src={ process.env.PUBLIC_URL + '/images/r10.jpg'}  className={classes.full}  alt="" />
    <span onClick={()=>closebtn()}  className={classes.close} > <CloseIcon  /> </span> 

        </div>



       <div className={classes.gallery} >         

<Grid container className={classes.root} >

<Grid item md={3} sm={4} xs={12} className={classes.image}>
<img 
 src={ process.env.PUBLIC_URL + '/images/r1.jpg'}
 ref={imgs1}
 onClick={()=>

    openimg(imgs1.current)
    }
 
 className={classes.img}  alt="" />

</Grid>
<Grid item md={3} sm={4} xs={12} className={classes.image} >
<img 
ref={imgs2}
 onClick={()=>

    openimg(imgs2.current)
    }

src={ process.env.PUBLIC_URL + '/images/r2.jpg'} className={classes.img}  alt="" />

</Grid>
<Grid item md={3} sm={4} xs={12} className={classes.image} >
<img
ref={imgs3}
 onClick={()=>

    openimg(imgs3.current)
    }

src={ process.env.PUBLIC_URL + '/images/r3.jpg'} className={classes.img}  alt="" />

</Grid>
<Grid item md={3} sm={4} xs={12} className={classes.image} >
<img
ref={imgs4}
 onClick={()=>

    openimg(imgs4.current)
    }

src={ process.env.PUBLIC_URL + '/images/r4.jpg'} className={classes.img}  alt="" />

</Grid>
<Grid item md={3} sm={4} xs={12} className={classes.image} >
<img
ref={imgs5}
 onClick={()=>

    openimg(imgs5.current)
    }

src={ process.env.PUBLIC_URL + '/images/r5.jpg'} className={classes.img}  alt="" />

</Grid>
<Grid item md={3} sm={4} xs={12} className={classes.image} >
<img
ref={imgs6}
 onClick={()=>

    openimg(imgs6.current)
    }

src={ process.env.PUBLIC_URL + '/images/r6.jpg'} className={classes.img}  alt="" />

</Grid>
<Grid item md={3} sm={4} xs={12} className={classes.image} >
<img ref={imgs7 }  onClick={()=>

openimg(imgs7.current)
} src={ process.env.PUBLIC_URL + '/images/r7.jpg'} className={classes.img}  alt="" />

</Grid>
<Grid item md={3} sm={4} xs={12} className={classes.image} >
<img
ref={imgs8}

src={ process.env.PUBLIC_URL + '/images/r8.jpg'}  onClick={()=>

    openimg(imgs8.current)
    }
 className={classes.img}  alt="" />

</Grid>


</Grid>

</div>



           </div> 







        </>
    )
}

export default Gallery
