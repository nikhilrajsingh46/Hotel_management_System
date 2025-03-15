import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Slider from '../components/slider/Slider'
import Services from '../components/services/Services'
import Food from '../components/Food/Food'
import { SliderData } from '../components/slider/SliderData';
import Featured from '../components/featured/Featured'
import Footer from '../components/Footer/Footer'
import Aboutus from '../components/About/Aboutus'
import Recom from '../components/recomended/Recom'
const Home = () => {
    return (
        
         <div>
       <Navbar/>
       <Slider slides={SliderData} />
       <Aboutus/>
       <Services/>
       <Recom/>
       <Featured/>
       <Footer/>
    </div>
  );
    }

export default Home
