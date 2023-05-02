import './App.css';
import { MyRoutes } from './Router';
//import all routes 

function App() {

  //calling upon routes from following components:
/*  './components/Layout';
'./components/Home'
'./components/DishReview'
'./components/AddDish'
'./components/AddRestaurant'
'./components/DishDetail'
  import { Search } from './components/Search';
  import { About } from './components/About';
  import { RestaurantDetail } from './components/RestaurantDetail';
  import { Login } from './components/Login';
  import { Register } from './components/Register';
  import { Profile } from './components/Profile';
  import {Favorites} from './components/Favorites'; */

  return (
    <MyRoutes />
  );
}

export default App;
