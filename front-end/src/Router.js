import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { DishReview } from './components/DishReview';
import { AddDish } from './components/AddDish';
import { AddRestaurant } from './components/AddRestaurant';
import { DishDetail } from './components/DishDetail';
import { Search } from './components/Search';
import { About } from './components/About';
import { RestaurantDetail } from './components/RestaurantDetail';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import {Favorites} from './components/Favorites';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} /> 
          <Route 
            path="/login"
            element={<Login />} 
          />
          <Route 
            path="/register"
            element={<Register />} 
          />
          <Route path="/" element={<Layout />}>
          <Route 
            path="restaurant/:restaurantID/dish"
            element={<AddDish />} 
          />
          <Route
            path="restaurant/:restaurantID/dish/:dishID/rating"
            element={<DishReview />} 
          />
          <Route 
            path="/restaurant/:restaurantID/dish/:dishID"
            element={<DishDetail />} 
          />
           <Route 
            path="/restaurant/:restaurantID"
            element={<RestaurantDetail />} 
          />
          <Route 
            path="/restaurant"
            element={<AddRestaurant />} 
          />
          <Route 
            path="/search"
            element={<Search />} 
          />
          <Route 
            path="/about"
            element={<About />} 
          />
          <Route 
            path="/home"
            element={<Home />} 
          />
          <Route 
            path="/profile"
            element={<Profile />} 
          />
           <Route 
            path="/favorites"
            element={<Favorites />} 
          />
          {/* catch all */}
          <Route 
            path="/*"
            element={<Home />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { MyRoutes };