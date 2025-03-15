import React from 'react'
import { makeStyles,Typography,Divider, Grid} from '@material-ui/core'
import BreakFast from './BreakFast'
import Lunch from './Lunch'
import Tea from './Tea'
import Dinner from './Dinner'

const useStyles=makeStyles(theme=>({
root:{
flexGrow:1,
width:"90%",
margin:'0 auto',
display:'flex',
justifyContent:'center'
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
    textAlign:'center',
    marginBottom:'3rem'

},
gt:{
    fontSize:'2.1rem',
    paddingBottom:'2rem'
}

}))


const Food = () => {
    const classes=useStyles()
    return (
        <>
                 <div style={{marginBottom:"3rem",paddingTop:'3rem'}} >
              <Typography className={classes.heading}   color="initial">FoodItem</Typography>
              <div className={classes.line} >
                    <Divider style={{height:'.3rem',background:"red"}} varient="middle" />
                    </div>
                    </div> 

                    <Grid container className={classes.root} >
                      <Grid items md={6} xs={12} sm={12} className={classes.grid} >
                       
                         <Typography 
                         color="initial" className={classes.gt} >Breakfast</Typography> 

                          <BreakFast/>
                       
                       


                        </Grid>
                        <Grid items md={6} xs={12} sm={12} className={classes.grid} >
                         
                         <Typography color="initial" className={classes.gt} >Lunch</Typography>
                                   
                                       <Lunch/>

                             </Grid> 
                         <Grid items md={6} xs={12} sm={12} className={classes.grid} > 
                           <Typography color="initial" className={classes.gt} >Tea</Typography>

                              <Tea/>


                      </Grid>
                      <Grid items md={6} xs={12} sm={12} className={classes.grid} > 

                           <Typography color="initial" className={classes.gt} >Dinner</Typography>

                           <Dinner/>



                            </Grid>


                        </Grid>
        </>
    )
}

export default Food
