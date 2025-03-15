import './App.css';
import Home from './pages/Home';
import Rooms from './pages/Rooms/Rooms'
import { createMuiTheme,ThemeProvider } from '@material-ui/core';
import {BrowserRouter as Router , Switch,Route} from "react-router-dom";
import BookNow from './pages/BookNow/BookNow';
import FoodItem from './pages/FoodItem/FoodItem';
import About from './pages/About/About';
import Contact from './pages/contact/Contact';
import {Provider} from "react-redux"
import store from './store/reducer/rootindex'
import FilterFeature from './pages/FilterFeature';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

function App() {

  const customtheme=createMuiTheme({
    palette:{
     
      primary:{
           
        main:"#ED5E93"

      },
      secondary:{
        main:"#FFF3FA"
      },
      info:{
        main:"#28161C"
      }
    
    },
   
    })



  return (
    <>
    <Router  >
      <Provider store={store} >
     <ThemeProvider theme={customtheme} >
     <Switch>
     <Route path="/Hotel-Website" exact component={Home} />
     <Route path="/Hotel-Website/Rooms" exact component={Rooms} />
     <Route path="/Hotel-Website/About" exact component={About} />
     <Route path="/Hotel-Website/Contact" exact component={Contact} />
     <Route path="/Hotel-Website/FoodItem" exact component={FoodItem} />
     <Route path="/Hotel-Website/Book-Now" exact component={BookNow} />
     <Route path="/Hotel-Website/Featured/:typ" exact component={FilterFeature} />
     <Route path="/Hotel-Website/AdminDashboard"  exact component={AdminDashboard} /> 
    </Switch>

    </ThemeProvider>
    </Provider>
    </Router>
    </>
  )

}
export default App;

