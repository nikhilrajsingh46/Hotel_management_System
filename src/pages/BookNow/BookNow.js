import React from 'react'
import {Formik,Form } from 'formik'
import * as Yup from 'yup'
import { Paper,Typography,Grid } from '@material-ui/core'
import TextFields from './Field/TextFields'
import countries from './Field/countries.json';
import Select from './Field/Select'
import DateTimePicker from './Field/DateTimePicker'
import Checkboxes from './Field/Checkboxes'
import ButtonWrapper from './Field/ButtonWrapper'
import Navbar from '../../components/navbar/Navbar'
import img from './back.jpg'
import { makeStyles } from '@material-ui/core/styles';



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

}))

const initial_form_state={
firstName:'',
lastName:'',
email:'',
phone:'',
addressline1:'',
addressline2:'',
city:'',
state:'',
country:'',
date:'',
time:'',
message:'',
termsOfService: false
}
const form_valid=Yup.object().shape({
    firstName:Yup.string()
    .required('Required'),
    lastName:Yup.string()
    .required('Required'),
    email:Yup.string()
    .email('Invalid email.')
    .required('Required'),
    phone:Yup.number()
    .integer()
    .typeError("Please enter a valid phone number ")
    .required("Required"),
    addressline1:Yup.string()
    .required('Required'),
    addressline2:Yup.string(),
    city:Yup.string()
    .required('Required'),
    state:Yup.string()
    .required('Required'),
    country:Yup.string()
    .required('Required'),
    date: Yup.date()
    .required('Required'),
  message: Yup.string(),
  termsOfService: Yup.boolean()
  .oneOf([true], 'The terms and conditions must be accepted.')
  .required('The terms and conditions must be accepted.'),




  
})

const Formics = () => {
    const classes=useStyles()


    return (
        <>
        <Navbar />
        <div  className={classes.background} >
        <Typography style={{fontSize:"2.5rem",textAlign:"center",paddingTop:"2rem",marginBottom:"2rem"}} color="primary" >Hotel Booking Form</Typography>

            <Paper style={{maxWidth:"70%",margin:"0 auto",backgroundColor:'#fff',paddingBottom:"1.9rem",paddingTop:"1.9rem",}} elevation={2}>



                   <Formik initialValues={{...initial_form_state}} validationSchema={form_valid} onSubmit={values=>{
                       console.log(values)
                   }} >
                       <Form>
                 <Grid container  spacing={2} style={{marginLeft:'1rem', margin:'0 auto', width:'90%' }} >
                     
                     <Grid item xs={12} >
                     <Typography variant="h3" style={{fontSize:'1.2rem',fontWeight:600,color:"#16db3d"}}  >
                      Your Details 
                     </Typography>
      
                     </Grid>
                     <Grid item xs={6} md={6} >
                       <TextFields name="firstName" label="First Name"  />
                         </Grid>
                         <Grid item xs={6} md={6} >
                       <TextFields name="lastName" label="Last Name"  />
                         </Grid>

                         <Grid item xs={12} md={12} >
                       <TextFields name="email" label="Email"  />
                         </Grid>

                         <Grid item xs={12} md={12} >
                       <TextFields name="phone" label="Phone"  />
                         </Grid>
                         <Grid item xs={12} >
                     <Typography variant="h3" style={{fontSize:'1.2rem',fontWeight:600,color:"#16db3d"}}  c>
                      Address
                     </Typography>
      
                     </Grid>
                     <Grid item xs={12} md={6} >
                       <TextFields name="addressline1" label="Address Line1"  />
                         </Grid>
                         <Grid item xs={12} md={6} >
                       <TextFields name="addressline2" label="Address Line 2"  />
                         </Grid>

                         <Grid item xs={6} >
                       <TextFields name="city" label="City"  />
                         </Grid>

                         <Grid item xs={6} >
                       <TextFields name="state" label="State"  />
                         </Grid>
                         <Grid item xs={12} >
                       <Select name="country" label="Country" options={countries}  />
                         </Grid>

                         <Grid item xs={12} >
                     <Typography variant="h3" style={{fontSize:'1.2rem',fontWeight:600,color:"#16db3d"}}  >
                      Booking Information 
                     </Typography>
      
                     </Grid>
                   
                   
                     <Grid item xs={12} md={6}>
                    <DateTimePicker
                      name="date"
                      label="Arrival Date"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <DateTimePicker
                      name="time"
                      label="Departure Date"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFields
                      name="message"
                      label="Message"
                      multiline={true}
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkboxes
                      name="termsOfService"
                      legend="Terms Of Service"
                      label="I agree"
                    />
                  </Grid>
                  <Grid item xs={12} >
                  <ButtonWrapper>
                      Submit Form
                    </ButtonWrapper>
                      </Grid>


                

                   
                     </Grid>
                     </Form>
                     </Formik>
            </Paper>
            </div>
        </>
    )
}

export default Formics
