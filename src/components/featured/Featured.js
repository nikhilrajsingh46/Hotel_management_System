import React from 'react'
import { Typography,Divider ,makeStyles,Grid} from '@material-ui/core'
import Single from './Single'
import Double from './Double'
import Family from './Family'

const useStyles=makeStyles(theme=>({

    root: {
        flexGrow: 1,
        width:'90%',
        margin:"0 auto ",
     
      },

heading:{
    fontSize:'2.5rem',
    textAlign:'center',


},
line:{
    width:'6%',
    margin:' .1rem auto',
    [theme.breakpoints.down('sm')]:{
      width:'10%'

}
},

grid:{
marginBottom:"2rem"
},

typo:{
    fontSize:"2rem",
    textAlign:"center"
}

}))


const Featured = () => {
    const classes=useStyles()
    return (
       <div>
       
       <div style={{marginBottom:"3rem",paddingTop:'3rem'}} >
              <Typography className={classes.heading}   color="initial">Featured Rooms</Typography>
              <div className={classes.line} >
                    <Divider style={{height:'.3rem',background:"red"}} varient="middle" />
                    </div>
                    </div> 

                    <Grid container className={classes.root} spacing={2} >

                       <Grid className={classes.grid} items xs={12} sm={12} md={4}>
                       
                         <Single/>

                               

                        </Grid>

                        <Grid className={classes.grid} items xs={12} sm={12}  md={4}>
                         
                        <Double/>



                         </Grid>

                         <Grid className={classes.grid} items xs={12} sm={12} md={4}>

                         <Family/>


                          </Grid> 

                        </Grid>


           </div>

    )
}

export default Featured
