import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1.5),
      minWidth: 110,
      paddingBottom:"10px"
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));



const Filter = (props) => {
    const {rooms} =useSelector(state=>state.roomsReducer)
     const length=rooms.length

    const classes = useStyles();

    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
      setValue(event.target.value);}

 





    return (
           <div style={{position:"relative" ,top:"4px",bottom:"20px" }} >
                 
        <Toolbar variant="dense">
        
          <Typography  style={{flexGrow:.3}} variant="h6" color="inherit">
            Total Rooms : {length}
          </Typography>
                
          <div style={{flexGrow:.3}} >
          <FormControl className={classes.formControl}>
          
          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
         
         
        >
          <MenuItem style={{color:"red"}}  value="Lowest" onClick={() => props.ascendingSort()}   >Lowest</MenuItem>
          <MenuItem style={{color:"red"}}  value="Highest" onClick={() => props.descendingSort()}    >Highest</MenuItem>
        </Select>

        </FormControl>
 
      
</div>

<div style={{flexGrow:.3}} >
          <FormControl className={classes.formControl}>
          
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
          

        >
          <MenuItem style={{color:"red"}} onClick={()=>props.setItems(rooms)}    >All</MenuItem>
          <MenuItem style={{color:"red"}} value="Single" onClick={()=>props.filterItem("single")} >Single Room </MenuItem>
          <MenuItem style={{color:"red"}} value="Double" onClick={()=>props.filterItem("double")}  >Double Room </MenuItem>
          <MenuItem style={{color:"red"}} value="Family" onClick={()=>props.filterItem("family")} >Family Room</MenuItem>




        </Select>

        </FormControl>
 
      
</div>

        </Toolbar>
      
        </div>
    )
}

export default Filter